import React, { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const classes = {
    base: 'w-8 h-8 border-4 rounded-full animate-spin border-solid border-blue-500 border-t-transparent'
}

const WiwaSpinner = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    (
        {
            children,
            className,
            ...props
        }, ref
    ) => (
        <div
            ref={ref}
            className={twMerge(`
            ${classes.base} 
            ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </div>
    ));

WiwaSpinner.displayName = 'WiwaSpinner';

export default WiwaSpinner;
