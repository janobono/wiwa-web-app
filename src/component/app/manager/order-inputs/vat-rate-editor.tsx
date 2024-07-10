import { useContext, useEffect, useState } from 'react';

import WiwaFormInputDecimal from '../../../ui/wiwa-form-input-decimal';
import WiwaButton from '../../../ui/wiwa-button.tsx';
import { getVatRate, setVatRate } from '../../../../api/controller/config';
import { AuthContext, CommonResourceContext, ErrorContext, ManagerResourceContext } from '../../../../context';

const VatRateEditor = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);

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
                label={managerResourceState?.resource?.orderInputs.vatRate.label}
                required={true}
                placeholder={managerResourceState?.resource?.orderInputs.vatRate.placeholder}
                value={value}
                setValue={setValue}
                setValid={setValueValid}
                validate={() => {
                    if (value === undefined) {
                        return {
                            valid: false,
                            message: managerResourceState?.resource?.orderInputs.vatRate.required
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
                >{commonResourceState?.resource?.action.submit}
                </WiwaButton>
            </div>
        </div>
    )
}

export default VatRateEditor;
