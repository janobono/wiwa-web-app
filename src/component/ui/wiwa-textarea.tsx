import { forwardRef, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

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
            className={twMerge(`textarea textarea-bordered w-full ${className ?? ''}`)}
            {...props}
        >
            {children}
        </textarea>
    ));

WiwaTextArea.displayName = 'WiwaTextArea';

export default WiwaTextArea;

