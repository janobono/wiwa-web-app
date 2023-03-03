import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const classes = {
    active: 'border select-none focus:outline-none focus:shadow-outline border-gray-200 bg-gray-300 text-gray-700 hover:bg-gray-200',
    base: 'border select-none focus:outline-none focus:shadow-outline border-gray-200 bg-gray-200 text-gray-700 hover:bg-gray-300',
    disabled: 'opacity-50 cursor-not-allowed',
    pill: 'rounded-full',
    size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2 py-1 text-sm',
        base: 'px-4 py-2 text',
        lg: 'px-8 py-3 text-lg'
    }
}

interface ButtonProps extends NavLinkProps {
    size?: 'xs' | 'sm' | 'base' | 'lg',
    pill?: boolean | undefined
}

const WiwaNavButton = forwardRef<HTMLAnchorElement, ButtonProps>(
    (
        {
            children,
            size = 'base',
            pill,
            className,
            ...props
        }, ref
    ) => (
        <NavLink
            ref={ref}
            className={({isActive}) => twMerge(`
            ${isActive ? classes.active : classes.base}
            ${classes.size[size]}
            ${pill && classes.pill}
            ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </NavLink>
    ));

WiwaNavButton.displayName = 'WiwaNavButton';

export default WiwaNavButton;
