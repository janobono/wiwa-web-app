import React, { InputHTMLAttributes } from 'react';
import { WiwaInput, WiwaLabel } from './index';

interface WiwaFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    message: string | undefined,
    setValue: (value: File) => void
}

const WiwaFileInput: React.FC<WiwaFileInputProps> = (props) => {
    return (
        <>
            <WiwaLabel htmlFor={props.name}>{props.label + (props.required ? '*' : '')}</WiwaLabel>
            <WiwaInput
                className="w-full p-0.5"
                type="file"
                id={props.name}
                name={props.name}
                onChange={event => {
                    if (event.target.files) {
                        props.setValue(event.target.files[0]);
                    }
                }}
            />
            {props.message && (
                <span className="text-xs md:text-base text-red-500">{props.message}</span>
            )}
        </>
    );
}

export default WiwaFileInput;
