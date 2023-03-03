import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const classes = {
    base: 'border select-none focus:outline-none focus:shadow-outline border-gray-200 bg-gray-200 text-gray-700 hover:bg-gray-300',
    disabled: 'opacity-50 cursor-not-allowed',
    pill: 'rounded-full',
    size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2 py-1 text-sm',
        base: 'px-4 py-2 text',
        lg: 'px-8 py-3 text-lg'
    },
    variant: {
        primary: 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600',
        success: 'border-green-500 bg-green-500 text-white hover:bg-green-600',
        error: 'border-red-500 bg-red-500 text-white hover:bg-red-600',
        warning: 'border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'border-teal-500 bg-teal-500 text-white hover:bg-teal-600',
        dark: 'border-gray-700 bg-gray-700 text-white hover:bg-gray-800',
        light: 'border-gray-200 bg-gray-200 text-gray-700 hover:bg-gray-300'
    }
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'submit' | 'button',
    variant?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'dark' | 'light',
    size?: 'xs' | 'sm' | 'base' | 'lg',
    pill?: boolean | undefined,
    disabled?: boolean | undefined
}

const WiwaButton = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            type = 'button',
            variant = 'primary',
            size = 'base',
            pill,
            disabled = false,
            className,
            ...props
        }, ref
    ) => (
        <button
            ref={ref}
            disabled={disabled}
            type={type}
            className={twMerge(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className ?? ''}
            `)}
            {...props}
        >
            {children}
        </button>
    ));

WiwaButton.displayName = 'WiwaButton';

export default WiwaButton;
