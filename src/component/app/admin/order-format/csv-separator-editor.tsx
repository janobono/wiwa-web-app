import { useContext, useEffect, useState } from 'react';

import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import { ResourceContext } from '../../../../context';

const CsvSeparatorEditor = ({busy, separator, submitHandler}: {
    busy: boolean,
    separator: string,
    submitHandler: (separator: string) => Promise<void>
}) => {
    const resourceState = useContext(ResourceContext);

    const [value, setValue] = useState('');
    const [valueValid, setValueValid] = useState(false);

    useEffect(() => {
        setValue(separator);
    }, [separator]);

    return (
        <div className="container p-5 mx-auto">
            <WiwaFormInputString
                label={resourceState?.admin?.orderFormat.editEntry.label}
                required={true}
                placeholder={resourceState?.admin?.orderFormat.editEntry.placeholder}
                value={value}
                setValue={setValue}
                setValid={setValueValid}
                validate={() => {
                    if (value.trim().length === 0) {
                        return {
                            valid: false,
                            message: resourceState?.admin?.orderFormat.editEntry.required
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
                >{resourceState?.common?.action.submit}
                </WiwaButton>
            </div>
        </div>
    )
}

export default CsvSeparatorEditor;
