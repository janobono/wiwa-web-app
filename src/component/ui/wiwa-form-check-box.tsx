import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const WiwaFormCheckBox = (
    {
        name,
        value,
        setValue,
        className,
        children
    }: {
        name?: string,
        value: boolean,
        setValue: (value: boolean) => void,
        className?: string,
        children?: ReactNode
    }) => {
    return (
        <div className={twMerge(`form-control w-full ${className ?? ''}`)}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={value}
                onChange={() => setValue(!value)}
                className="checkbox"
            />
            {children}
        </div>
    );
}

export default WiwaFormCheckBox;
