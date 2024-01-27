import { useDialogState } from '../../../component/state/dialog-state-provider.tsx';
import { useResourceState } from '../../../component/state/resource-state-provider.tsx';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import BaseDialog from '../../../component/dialog/base-dialog.tsx';
import WiwaFormInput from '../../../component/ui/wiwa-form-input.tsx';
import WiwaButton from '../../../component/ui/wiwa-button.tsx';
import { useProductConfigState } from '../../../component/state/product-config-state-provider.tsx';

const VAT_RATE_DIALOG_ID = 'manager-product-config-vat-rate-dialog-001';

const VatRateDialog = ({showDialog, setShowDialog}: {
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const dialogState = useDialogState();
    const productConfigState = useProductConfigState();
    const resourceState = useResourceState();

    const [value, setValue] = useState<number>();
    const [valid, setValid] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (productConfigState?.vatRate) {
            setValue(productConfigState?.vatRate);
        }
    }, [productConfigState?.vatRate, showDialog]);

    const submit = async () => {
        setError(undefined);
        if (valid && value) {
            const response = await productConfigState?.setVatRate(value);
            if (response?.error) {
                setError(resourceState?.manager?.productConfig.vatRate.error);
            } else {
                setShowDialog(false);
            }
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={VAT_RATE_DIALOG_ID} showDialog={showDialog} closeHandler={() => setShowDialog(false)}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.productConfig.vatRate.title}
                    </div>

                    <WiwaFormInput
                        type="number"
                        min="0"
                        required={true}
                        value={value ? value.toString() : ''}
                        setValue={(data) => setValue(Number(data))}
                        setValid={setValid}
                        validate={() => {
                            if (value === undefined) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.productConfig.vatRate.required
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={productConfigState?.busy || !valid}
                            onClick={submit}
                        >{resourceState?.admin?.baseInfo.title.submit}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={productConfigState?.busy}
                            onClick={() => setShowDialog(false)}
                        >{resourceState?.admin?.baseInfo.title.cancel}
                        </WiwaButton>
                    </div>
                    {error &&
                        <label className="label">
                            <span className="label-text-alt text-error">{error}</span>
                        </label>
                    }
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}

export default VatRateDialog;
