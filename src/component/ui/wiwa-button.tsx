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
            className={twMerge(`btn btn-xs md:btn-sm ${className ?? ''}`)}
            {...props}
        >
            {children}
        </button>
    )
}

export default WiwaButton;
