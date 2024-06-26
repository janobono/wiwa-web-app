import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { ValidationResult } from './';

const WiwaFormFile = (
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
        children
    }: {
        label?: string,
        required?: boolean,
        name?: string,
        placeholder?: string,
        value?: File,
        setValue: (value: File) => void,
        setValid?: (valid: boolean) => void,
        validate?: () => ValidationResult,
        children?: ReactNode
    }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const didMount = useRef(false);
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if (inputRef !== null && inputRef.current !== null) {
            const dataTransfer = new DataTransfer();
            if (value) {
                dataTransfer.items.add(value);
            }
            inputRef.current.files = dataTransfer.files;
        }
    }, [value]);

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
            <input
                ref={inputRef}
                type="file"
                id={name}
                name={name}
                placeholder={placeholder}
                className="file-input file-input-bordered w-full"
                onChange={event => {
                    if (event.target.files && setValue) {
                        setValue(event.target.files[0]);
                    }
                }}
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

export default WiwaFormFile;
