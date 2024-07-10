import { forwardRef, SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const WiwaSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>((
    {
        className,
        children,
        ...props
    }, ref
) => (
    <select
        ref={ref}
        className={twMerge(`select select-bordered w-full ${className ?? ''}`)}
        {...props}
    >
        {children}
    </select>
));

WiwaSelect.displayName = 'WiwaSelect';

export default WiwaSelect;
