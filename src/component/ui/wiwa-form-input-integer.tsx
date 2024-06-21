import { ReactNode, useEffect, useRef, useState } from 'react';

import WiwaInput from './wiwa-input';
import { ValidationResult } from '../../model/ui';

const WiwaFormInputDecimal = (
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
        disabled,
        min,
        max,
    }: {
        label?: string,
        required?: boolean,
        name?: string,
        placeholder?: string,
        value?: number,
        setValue: (value?: number) => void,
        setValid?: (valid: boolean) => void,
        validate?: () => ValidationResult,
        children?: ReactNode,
        disabled?: boolean,
        min?: string,
        max?: string
    }) => {
    const didMount = useRef(false);
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        revalidate();
    }, [value]);

    const revalidate = () => {
        if (validate && setValid) {
            const validationResult = validate();
            setValid(validationResult.valid);
            setMessage(validationResult.message);
        }
    }

    return (
        <div className="form-control w-full">
            {label &&
                <label className="label">
                    <span className="label-text">{label + (required ? '*' : '')}</span>
                </label>
            }
            <WiwaInput
                type="number"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value ? String(value) : ''}
                onChange={event => {
                    const data = event.target.value.replace(/[^0-9]/g, '');
                    if (data.length > 0) {
                        setValue(Number(data));
                    } else {
                        setValue(undefined);
                    }
                }}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        revalidate();
                    }
                }}
                disabled={disabled}
                min={min}
                max={max}
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

export default WiwaFormInputDecimal;
