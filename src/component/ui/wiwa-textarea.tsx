import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const classes = {
    base: 'block bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10'
}

const WiwaTextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    (
        {
            children,
            className,
            ...props
        }, ref
    ) => (
        <textarea
            ref={ref}
            className={twMerge(`
            ${classes.base} 
            ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </textarea>
    ));

WiwaTextArea.displayName = 'WiwaTextArea';

export default WiwaTextArea;
