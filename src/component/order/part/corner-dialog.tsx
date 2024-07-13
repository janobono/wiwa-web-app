import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../../dialog/base-dialog';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormInputInteger from '../../ui/wiwa-form-input-integer';
import WiwaFormDimensions from '../../ui/wiwa-form-dimensions';
import WiwaSelect from '../../ui/wiwa-select';
import { Dimensions } from '../../../api/model';
import { UnitId } from '../../../api/model/application';
import { PartCornerType } from '../../../api/model/order/part';
import { CommonResourceContext, DialogContext } from '../../../context';

const CornerDialog = (
    {
        title,
        dimensionsData,
        setDimensionsData,
        radiusData,
        setRadiusData,
        showDialog,
        setShowDialog
    }: {
        title?: string,
        dimensionsData?: Dimensions,
        setDimensionsData: (data: Dimensions) => void,
        radiusData?: number,
        setRadiusData: (data: number) => void,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void
    }
) => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [titleText, setTitleText] = useState('');

    const [index, setIndex] = useState<string>(PartCornerType.ROUNDED);

    const [radius, setRadius] = useState<number>();
    const [radiusValid, setRadiusValid] = useState(false);

    const [dimensions, setDimensions] = useState<Dimensions>();
    const [dimensionsValid, setDimensionsValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (title) {
            setTitleText(`${commonResourceState?.resource?.partEditor.cornerDialog.title} ${title}`);
        } else {
            setTitleText(commonResourceState?.resource?.partEditor.cornerDialog.title || '');
        }
        setIndex(dimensionsData === undefined ? PartCornerType.ROUNDED : PartCornerType.STRAIGHT);
        setRadius(radiusData);
        setDimensions(dimensionsData);
    }, [title, dimensionsData, radiusData, showDialog]);

    useEffect(() => {
        setFormValid((index === PartCornerType.ROUNDED && radiusValid) || (index === PartCornerType.STRAIGHT && dimensionsValid));
    }, [index, radiusValid, dimensionsValid]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog
            id="part-editor-corner-dialog"
            showDialog={showDialog}
            closeHandler={() => setShowDialog(false)}
        >
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {titleText}
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
                            value={dimensions}
                            setValue={setDimensions}
                            setValid={setDimensionsValid}
                            validate={() => {
                                if (dimensions === undefined) {
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
                                        if (radius) {
                                            setRadiusData(radius);
                                        }
                                        break;
                                    }
                                    case PartCornerType.STRAIGHT: {
                                        if (dimensions) {
                                            setDimensionsData(dimensions);
                                        }
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
