import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PartEditorContext } from '../part-editor-provider';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputInteger from '../../../ui/wiwa-form-input-integer';
import WiwaFormDimensions from '../../../ui/wiwa-form-dimensions';
import WiwaSelect from '../../../ui/wiwa-select';
import { Dimensions } from '../../../../api/model';
import { CornerPosition, UnitId } from '../../../../api/model/application';
import { PartCornerType } from '../../../../api/model/order/part';
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

        const data = partEditorState?.cornerData.find(item => item.cornerPosition === cornerPosition);

        if (data?.type) {
            switch (data?.type) {
                case PartCornerType.ROUNDED:
                    setRadius(data.radius);
                    break;
                case PartCornerType.STRAIGHT:
                    setIndex(PartCornerType.STRAIGHT);
                    setCornerDimensions(data.dimensions);
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

                                // TODO validate

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

                                // TODO validate

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
                                        partEditorState?.setCornerRadius(cornerPosition, radius || -1);
                                        break;
                                    }
                                    case PartCornerType.STRAIGHT: {
                                        partEditorState?.setCornerDimensions(cornerPosition, cornerDimensions || {
                                            x: -1,
                                            y: -1
                                        });
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
