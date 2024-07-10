import { ReactNode, useEffect, useRef, useState } from 'react';

import { alwaysValid, ValidationResult } from './';
import WiwaInput from './wiwa-input';

const WiwaFormInputDatetime = (
    {
        label,
        required = false,
        name,
        placeholder,
        value,
        setValue,
        setValid,
        validate = alwaysValid,
        children,
        disabled
    }: {
        label?: string,
        required?: boolean,
        name?: string,
        placeholder?: string,
        value?: Date,
        setValue: (value?: Date) => void,
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

    const formatDate = (date?: Date) => {
        if (date) {
            const year = `${date.getFullYear()}`.padStart(4, '0');
            const month = `${date.getMonth() + 1}`.padStart(2, '0');
            const day = `${date.getDate()}`.padStart(2, '0');
            const hours = `${date.getHours()}`.padStart(2, '0');
            const minutes = `${date.getMinutes()}`.padStart(2, '0');
            const seconds = `${date.getSeconds()}`.padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        }
        return '';
    }

    const parseDate = (s: string) => {
        try {
            return new Date(Date.parse(s));
        } catch (error) {
            return undefined;
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
                type="datetime-local"
                id={name}
                name={name}
                placeholder={placeholder}
                value={formatDate(value)}
                onChange={event => setValue(parseDate(event.target.value))}
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

export default WiwaFormInputDatetime;
