import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const classes = {
    base: 'text-gray-500 hover:text-gray-700 transition-colors duration-300',
    active: 'underline'
}

const WiwaNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    (
        {
            children,
            className,
            ...props
        }, ref
    ) => (
        <NavLink
            ref={ref}
            className={({isActive}) => twMerge(`
            ${classes.base}
            ${isActive ? classes.active : ''} 
            ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </NavLink>
    ));

WiwaNavLink.displayName = 'WiwaNavLink';

export default WiwaNavLink;
