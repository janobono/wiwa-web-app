import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const WiwaInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((
    {
        className,
        children,
        ...props
    }, ref
) => (
    <input
        ref={ref}
        className={twMerge(`input input-bordered input-xs md:input-sm w-full ${className ?? ''}`)}
        {...props}
    >
        {children}
    </input>
));

WiwaInput.displayName = 'WiwaInput';

export default WiwaInput;
