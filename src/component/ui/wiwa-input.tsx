import React, { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const classes = {
    base: 'block bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10'
}

const WiwaInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    (
        {
            children,
            className,
            ...props
        }, ref
    ) => (
        <input
            ref={ref}
            className={twMerge(`
            ${classes.base} 
            ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </input>
    ));

WiwaInput.displayName = 'WiwaInput';

export default WiwaInput;
