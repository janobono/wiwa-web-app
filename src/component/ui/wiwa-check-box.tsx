import React, { PropsWithChildren } from 'react';
import { WiwaLabel } from './index';

interface WiwaCheckBoxProps extends PropsWithChildren {
    name: string,
    value: boolean,
    setValue: (value: boolean) => void,
    message: string | undefined,
    disabled: boolean,
    required: boolean,
}

const WiwaCheckBox: React.FC<WiwaCheckBoxProps> = (props) => {
    return (
        <>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="h-4 w-4"
                    id={props.name}
                    name={props.name}
                    checked={props.value}
                    onChange={() => props.setValue(!props.value)}
                />
                <WiwaLabel className="ml-2" htmlFor={props.name}>{props.children}</WiwaLabel>
            </div>
            {props.required && !props.value && props.message && (
                <span className="text-xs md:text-base text-red-500">{props.message}</span>
            )}
        </>
    );
}

export default WiwaCheckBox;
