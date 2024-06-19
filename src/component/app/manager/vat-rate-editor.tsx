import { useEffect, useState } from 'react';

import WiwaFormInputDecimal from '../../ui/wiwa-form-input-decimal';
import WiwaButton from '../../ui/wiwa-button.tsx';
import { getVatRate, setVatRate } from '../../../api/controller/config';
import { useAuthState } from '../../../state/auth';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const VatRateEditor = () => {
    const authState = useAuthState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<number>();
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        getVatRate(authState?.authToken?.accessToken).then(data => setValue(data?.data?.value));
    }, [authState?.authToken?.accessToken]);

    const submitHandler = async (value: number) => {
        setBusy(true);
        try {
            const response = await setVatRate(value, authState?.authToken?.accessToken);
            setValue(response?.data?.value);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container p-5 mx-auto">
            <WiwaFormInputDecimal
                label={resourceState?.manager?.orderInputs.vatRate.label}
                required={true}
                placeholder={resourceState?.manager?.orderInputs.vatRate.placeholder}
                value={value}
                setValue={setValue}
                setValid={setValueValid}
                validate={() => {
                    if (value === undefined) {
                        return {
                            valid: false,
                            message: resourceState?.manager?.orderInputs.vatRate.required
                        };
                    }
                    return {valid: true};
                }}
            />

            <div className="flex flex-col items-center justify-center p-5">
                <WiwaButton
                    className="btn-primary"
                    disabled={busy || !valueValid}
                    onClick={() => {
                        if (value) {
                            submitHandler(Number(value)).then();
                        }
                    }}
                >{resourceState?.common?.action.submit}
                </WiwaButton>
            </div>
        </div>
    )
}

export default VatRateEditor;
