import { ReactNode, useEffect, useRef, useState } from 'react';

import WiwaTextArea from './wiwa-textarea';
import { ValidationResult } from '../../model/ui';

const WiwaFormTextarea = (
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
        rows = 5,
        children
    }: {
        label?: string,
        required?: boolean,
        name?: string,
        placeholder?: string,
        value?: string,
        setValue: (value: string) => void,
        setValid?: (valid: boolean) => void,
        validate?: () => ValidationResult,
        rows?: number,
        children?: ReactNode
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
            <WiwaTextArea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                rows={rows}
                onChange={event => setValue(event.target.value)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        revalidate();
                    }
                }}
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

export default WiwaFormTextarea;
