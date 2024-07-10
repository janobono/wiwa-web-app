import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PartEditorContext } from '../part-editor-provider';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputInteger from '../../../ui/wiwa-form-input-integer';
import WiwaFormDimensions from '../../../ui/wiwa-form-dimensions';
import WiwaSelect from '../../../ui/wiwa-select';
import { Dimensions } from '../../../../api/model';
import { BoardPosition, CornerPosition, UnitId } from '../../../../api/model/application';
import { PartCornerRounded, PartCornerStraight, PartCornerType } from '../../../../api/model/order/part';
import { CommonResourceContext, DialogContext } from '../../../../context';

const CornerDialog = ({cornerPosition, showDialog, setShowDialog}: {
    cornerPosition: CornerPosition,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const partEditorState = useContext(PartEditorContext);
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [index, setIndex] = useState<string>(PartCornerType.ROUNDED);

    const [radius, setRadius] = useState<number>();
    const [radiusValid, setRadiusValid] = useState(false);

    const [cornerDimensions, setCornerDimensions] = useState<Dimensions>();
    const [cornerDimensionsValid, setCornerDimensionsValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setIndex(PartCornerType.ROUNDED);
        setRadius(undefined);
        setCornerDimensions(undefined);

        const partCorner = partEditorState?.cornerData.find(item => item.cornerPosition === cornerPosition)?.partCorner;

        if (partCorner) {
            switch (partCorner.type) {
                case PartCornerType.ROUNDED:
                    setRadius((partCorner as PartCornerRounded).radius);
                    break;
                case PartCornerType.STRAIGHT:
                    setIndex(PartCornerType.STRAIGHT);
                    setCornerDimensions((partCorner as PartCornerStraight).dimensions);
                    break;
            }
        }
    }, [showDialog]);

    useEffect(() => {
        setFormValid((index === PartCornerType.ROUNDED && radiusValid) || (index === PartCornerType.STRAIGHT && cornerDimensionsValid));
    }, [index, radiusValid, cornerDimensionsValid]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={`part-editor-corner-dialog-${cornerPosition}`} showDialog={showDialog}
                    closeHandler={() => setShowDialog(false)}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {`${commonResourceState?.resource?.partEditor.cornerDialog.title} ${partEditorState?.getCornerName(cornerPosition)}`}
                    </div>

                    <WiwaSelect
                        value={index}
                        onChange={event => setIndex(event.currentTarget.value)}
                    >
                        <option value={PartCornerType.ROUNDED}>
                            {commonResourceState?.resource?.partEditor.corner.rounded}
                        </option>
                        <option value={PartCornerType.STRAIGHT}>
                            {commonResourceState?.resource?.partEditor.corner.straight}
                        </option>
                    </WiwaSelect>

                    {index === PartCornerType.ROUNDED &&
                        <WiwaFormInputInteger
                            label={`${commonResourceState?.resource?.partEditor.cornerDialog.radiusLabel} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`}
                            required={true}
                            placeholder={commonResourceState?.resource?.partEditor.cornerDialog.radiusPlaceholder}
                            value={radius}
                            setValue={setRadius}
                            setValid={setRadiusValid}
                            validate={() => {
                                if (radius === undefined) {
                                    return {
                                        valid: false,
                                        message: commonResourceState?.resource?.partEditor.cornerDialog.radiusRequired
                                    };
                                }

                                const dimensions = partEditorState?.boardDimensionsData.find(item => item.boardPosition === BoardPosition.TOP)?.dimensions;
                                if (dimensions) {
                                    const min = Math.min(dimensions.x, dimensions.y);
                                    if (radius > min) {
                                        return {
                                            valid: false,
                                            message: `${commonResourceState?.resource?.partEditor.cornerDialog.radiusInvalid} ${min}`
                                        };
                                    }
                                }
                                return {valid: true};
                            }}
                            min="0"
                        />
                    }

                    {index === PartCornerType.STRAIGHT &&
                        <WiwaFormDimensions
                            label={`${commonResourceState?.resource?.partEditor.cornerDialog.cornerDimensionsLabel} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`}
                            required={true}
                            placeholderX={commonResourceState?.resource?.partEditor.cornerDialog.cornerDimensionsPlaceholderX}
                            placeholderY={commonResourceState?.resource?.partEditor.cornerDialog.cornerDimensionsPlaceholderY}
                            value={cornerDimensions}
                            setValue={setCornerDimensions}
                            setValid={setCornerDimensionsValid}
                            validate={() => {
                                if (cornerDimensions === undefined) {
                                    return {
                                        valid: false,
                                        message: commonResourceState?.resource?.partEditor.cornerDialog.cornerDimensionsRequired
                                    };
                                }

                                const dimensions = partEditorState?.boardDimensionsData.find(item => item.boardPosition === BoardPosition.TOP)?.dimensions;
                                if (dimensions) {
                                    if (cornerDimensions.x > dimensions.x || cornerDimensions.y > dimensions.y) {
                                        return {
                                            valid: false,
                                            message: `${commonResourceState?.resource?.partEditor.cornerDialog.cornerDimensionsInvalid} [x:${dimensions.x},y:${dimensions.y}]`
                                        };
                                    }
                                }
                                return {valid: true};
                            }}
                        />
                    }

                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!formValid}
                            onClick={() => {
                                switch (index) {
                                    case PartCornerType.ROUNDED: {
                                        const rounded: PartCornerRounded = {
                                            type: PartCornerType.ROUNDED,
                                            radius: radius || -1
                                        }
                                        partEditorState?.setPartCorner(cornerPosition, rounded);
                                        break;
                                    }
                                    case PartCornerType.STRAIGHT: {
                                        const straight: PartCornerStraight = {
                                            type: PartCornerType.STRAIGHT,
                                            dimensions: cornerDimensions || {x: -1, y: -1}
                                        }
                                        partEditorState?.setPartCorner(cornerPosition, straight);
                                        break;
                                    }
                                }
                                setShowDialog(false);
                            }}
                        >{commonResourceState?.resource?.imageDialog.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={() => setShowDialog(false)}
                        >{commonResourceState?.resource?.imageDialog.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>, dialogState.modalRoot))
}

export default CornerDialog;
