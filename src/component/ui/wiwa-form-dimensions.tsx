import { ReactNode, useEffect, useRef, useState } from 'react';

import WiwaInput from './wiwa-input';
import { Dimensions } from '../../api/model';
import { ValidationResult } from '../../model/ui';

const WiwaFormDimensions = (
    {
        label,
        required = false,
        name,
        placeholderX,
        placeholderY,
        value,
        setValue,
        setValid,
        validate = () => {
            return {valid: true}
        },
        children,
        disabled,
        min,
        max,
    }: {
        label?: string,
        required?: boolean,
        name?: string,
        placeholderX?: string,
        placeholderY?: string,
        value?: Dimensions,
        setValue: (value?: Dimensions) => void,
        setValid?: (valid: boolean) => void,
        validate?: () => ValidationResult,
        children?: ReactNode,
        disabled?: boolean,
        min?: string
        max?: string
    }
) => {
    const didMount = useRef(false);
    const [valueX, setValueX] = useState('');
    const [valueY, setValueY] = useState('');
    const [message, setMessage] = useState<string>();

    const revalidate = () => {
        if (validate && setValid) {
            const validationResult = validate();
            setValid(validationResult.valid);
            setMessage(validationResult.message);
        }
    }

    useEffect(() => {
        if (value) {
            setValueX(String(value.x));
            setValueY(String(value.y));
        }
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        revalidate();
    }, [value]);

    useEffect(() => {
        if (valueX === undefined || valueX.replace(/[^0-9]/g, '').length === 0) {
            setValue(undefined);
            return;
        }
        if (valueY === undefined || valueY.replace(/[^0-9]/g, '').length === 0) {
            setValue(undefined);
            return;
        }
        setValue({x: Number(valueX.replace(/[^0-9]/g, '')), y: Number(valueY.replace(/[^0-9]/g, ''))});
    }, [valueX, valueY]);

    return (
        <div className="form-control w-full">
            {label &&
                <label className="label">
                    <span className="label-text">{label + (required ? '*' : '')}</span>
                </label>
            }
            <div className="flex grid-cols-2 gap-5 w-full">
                <WiwaInput
                    type="number"
                    pattern="[0-9]"
                    id={name + 'x'}
                    name={name + 'x'}
                    placeholder={placeholderX}
                    value={valueX}
                    onChange={event => setValueX(event.target.value)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            revalidate();
                        }
                    }}
                    disabled={disabled}
                    min={min}
                    max={max}
                />
                <WiwaInput
                    type="number"
                    pattern="[0-9]"
                    id={name + 'y'}
                    name={name + 'y'}
                    placeholder={placeholderY}
                    value={valueY}
                    onChange={event => setValueY(event.target.value)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            revalidate();
                        }
                    }}
                    disabled={disabled}
                    min={min}
                    max={max}
                />
            </div>
            {message &&
                <label className="label">
                    <span className="label-text-alt text-error">{message}</span>
                </label>
            }
            {children}
        </div>
    )
}

export default WiwaFormDimensions;
