import { ReactNode, useEffect, useRef, useState } from 'react';

import { ValidationResult } from './';
import WiwaInput from './wiwa-input';

const WiwaFormInputString = (
    {
        label,
        required = false,
        name,
        placeholder,
        value,
        setValue,
        setValid,
        validate = () => {
            return {valid: true}
        },
        children,
        disabled
    }: {
        label?: string,
        required?: boolean,
        name?: string,
        placeholder?: string,
        value?: string,
        setValue: (value: string) => void,
        setValid?: (valid: boolean) => void,
        validate?: () => ValidationResult,
        children?: ReactNode,
        disabled?: boolean
    }) => {
    const didMount = useRef(false);
    const [message, setMessage] = useState<string>();

    const revalidate = () => {
        if (validate && setValid) {
            const validationResult = validate();
            setValid(validationResult.valid);
            setMessage(validationResult.message);
        }
    }

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        revalidate();
    }, [value]);

    return (
        <div className="form-control w-full">
            {label &&
                <label className="label">
                    <span className="label-text">{label + (required ? '*' : '')}</span>
                </label>
            }
            <WiwaInput
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={event => setValue(event.target.value)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        revalidate();
                    }
                }}
                disabled={disabled}
            />
            {message &&
                <label className="label">
                    <span className="label-text-alt text-error">{message}</span>
                </label>
            }
            {children}
        </div>
    )
}

export default WiwaFormInputString;
