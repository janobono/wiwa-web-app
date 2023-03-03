import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const classes = {
    base: 'text-gray-500 hover:text-gray-700 transition-colors duration-300'
}

const WiwaLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
    (
        {
            children,
            className,
            ...props
        }, ref
    ) => (
        <a
            ref={ref}
            className={twMerge(`
            ${classes.base} 
            ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </a>
    ));

WiwaLink.displayName = 'WiwaLink';

export default WiwaLink;
