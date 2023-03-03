import React, { forwardRef, LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const classes = {
    base: 'block text-xs md:text-base'
}

const WiwaLabel = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
    (
        {
            children,
            className,
            ...props
        }, ref
    ) => (
        <label
            ref={ref}
            className={twMerge(`
            ${classes.base} 
            ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </label>
    ));

WiwaLabel.displayName = 'WiwaLabel';

export default WiwaLabel;
