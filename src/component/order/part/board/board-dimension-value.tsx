import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { UnitId } from '../../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../../context';
import WiwaFormInputInteger from '../../../ui/wiwa-form-input-integer.tsx';

const BoardDimensionDialog = ({name, data, setData, showDialog, setShowDialog}: {
    name?: string,
    data?: number,
    setData: (data: number) => void,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [title, setTitle] = useState('');
    const [value, setValue] = useState<number>();
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        if (name) {
            setTitle(`${commonResourceState?.resource?.partEditor.dimensionDialog.title} ${name}`);
        } else {
            setTitle(commonResourceState?.resource?.partEditor.dimensionDialog.title || '');
        }
        setValue(data);
    }, [name, data, showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog
            id="part-editor-dimensions-dialog"
            showDialog={showDialog}
            closeHandler={() => setShowDialog(false)}
        >
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {title}
                    </div>

                    <WiwaFormInputInteger
                        label={`${commonResourceState?.resource?.partEditor.dimensionDialog.label} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`}
                        required={true}
                        placeholder={commonResourceState?.resource?.partEditor.dimensionDialog.placeholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value === undefined) {
                                return {
                                    valid: false,
                                    message: commonResourceState?.resource?.partEditor.dimensionDialog.required
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!valueValid}
                            onClick={() => {
                                if (value) {
                                    setData(value);
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

export default BoardDimensionDialog;
