import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../../dialog/base-dialog';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormDimensions from '../../ui/wiwa-form-dimensions';
import { Dimensions } from '../../../api/model';
import { UnitId } from '../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../context';

const DimensionsDialog = ({title, data, setData, showDialog, setShowDialog}: {
    title?: string,
    data?: Dimensions,
    setData: (data: Dimensions) => void,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [titleText, setTitleText] = useState('');
    const [dimensions, setDimensions] = useState<Dimensions>();
    const [dimensionsValid, setDimensionsValid] = useState(false);

    useEffect(() => {
        if (title) {
            setTitleText(`${commonResourceState?.resource?.partEditor.dimensionsDialog.title} ${title}`);
        } else {
            setTitleText(commonResourceState?.resource?.partEditor.dimensionsDialog.title || '');
        }
        setDimensions(data);
    }, [title, data, showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog
            id="part-editor-dimensions-dialog"
            showDialog={showDialog}
            closeHandler={() => setShowDialog(false)}
        >
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {titleText}
                    </div>

                    <WiwaFormDimensions
                        label={`${commonResourceState?.resource?.partEditor.dimensionsDialog.label} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`}
                        required={true}
                        placeholderX={commonResourceState?.resource?.partEditor.dimensionsDialog.placeholderX}
                        placeholderY={commonResourceState?.resource?.partEditor.dimensionsDialog.placeholderY}
                        value={dimensions}
                        setValue={setDimensions}
                        setValid={setDimensionsValid}
                        validate={() => {
                            if (dimensions === undefined) {
                                return {
                                    valid: false,
                                    message: commonResourceState?.resource?.partEditor.dimensionsDialog.required
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!dimensionsValid}
                            onClick={() => {
                                if (dimensions) {
                                    setData(dimensions);
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

export default DimensionsDialog;
