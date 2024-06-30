import { useContext, useEffect, useState } from 'react';

import { getPriceForGluingLayer, setPriceForGluingLayer } from '../../../../api/controller/config';
import { UnitId } from '../../../../api/model/application';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputDecimal from '../../../ui/wiwa-form-input-decimal';
import { AuthContext, ErrorContext, ResourceContext } from '../../../../context';

const PriceForGluingLayerEditor = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<number>();
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        getPriceForGluingLayer(authState?.authToken?.accessToken).then(data => setValue(data?.data?.price));
    }, [authState?.authToken?.accessToken]);

    const submitHandler = async (value: number) => {
        setBusy(true);
        try {
            const response = await setPriceForGluingLayer(value, authState?.authToken?.accessToken);
            setValue(response?.data?.price);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container p-5 mx-auto">
            <WiwaFormInputDecimal
                label={`${resourceState?.manager?.orderInputs.priceForGluingLayer.label} 1[${resourceState?.getUnit(UnitId.SQUARE_METER)}]`}
                required={true}
                placeholder={resourceState?.manager?.orderInputs.priceForGluingLayer.placeholder}
                value={value}
                setValue={setValue}
                setValid={setValueValid}
                validate={() => {
                    if (value === undefined) {
                        return {
                            valid: false,
                            message: resourceState?.manager?.orderInputs.priceForGluingLayer.required
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

export default PriceForGluingLayerEditor;
