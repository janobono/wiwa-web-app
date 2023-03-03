import React, { InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { ValidationResult, WiwaInput, WiwaLabel } from './index';

interface WiwaInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password' | 'email',
    label: string,
    setValue: (value: string) => void,
    valid: boolean,
    setValid: (valid: boolean) => void,
    validate: () => ValidationResult
}

const WiwaFormInput: React.FC<WiwaInputProps> = (props) => {
    const didMount = React.useRef(false);
    const [message, setMessage] = useState<string>();

    const revalidate = useCallback(() => {
        const validationResult = props.validate();
        props.setValid(validationResult.valid);
        setMessage(validationResult.message);
    }, [props.value]);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        revalidate();
    }, [props.value]);

    return (
        <>
            <WiwaLabel htmlFor={props.name}>{props.label + (props.required ? '*' : '')}</WiwaLabel>
            {props.children}
            <WiwaInput
                className="w-full p-0.5"
                type={props.type}
                id={props.name}
                name={props.name}
                pattern={props.pattern}
                placeholder={props.placeholder}
                value={props.value}
                onChange={event => props.setValue(event.target.value)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        revalidate();
                    }
                }}
            />
            {message && (
                <span className="text-xs md:text-base text-red-500">{message}</span>
            )}
        </>
    );
}

export default WiwaFormInput;

export const EMAIL_REGEX = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
