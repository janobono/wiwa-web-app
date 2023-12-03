import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const WiwaButton = (
    {
        type = 'button',
        disabled = false,
        className,
        children,
        ...props
    }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={twMerge(`btn btn-sm md:btn-md ${className ?? ''}`)}
            {...props}
        >
            {children}
        </button>
    )
}

export default WiwaButton;
