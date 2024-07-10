import { useContext, useEffect, useState } from 'react';

import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import { AdminResourceContext, CommonResourceContext } from '../../../../context';

const CsvSeparatorEditor = ({busy, separator, submitHandler}: {
    busy: boolean,
    separator: string,
    submitHandler: (separator: string) => Promise<void>
}) => {
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [value, setValue] = useState('');
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        setValue(separator);
    }, [separator]);

    return (
        <div className="container p-5 mx-auto">
            <WiwaFormInputString
                label={adminResourceState?.resource?.orderFormat.editEntry.label}
                required={true}
                placeholder={adminResourceState?.resource?.orderFormat.editEntry.placeholder}
                value={value}
                setValue={setValue}
                setValid={setValueValid}
                validate={() => {
                    if (value.trim().length === 0) {
                        return {
                            valid: false,
                            message: adminResourceState?.resource?.orderFormat.editEntry.required
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
                        submitHandler(separator).then();
                    }}
                >{commonResourceState?.resource?.action.submit}
                </WiwaButton>
            </div>
        </div>
    )
}

export default CsvSeparatorEditor;
