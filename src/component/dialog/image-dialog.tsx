import { useContext, useEffect, useState } from 'react';

import BaseDialog from './base-dialog';
import { ValidationResult } from '../ui';
import WiwaButton from '../ui/wiwa-button';
import WiwaFormFile from '../ui/wiwa-form-file';
import { CommonResourceContext } from '../../context';

const ImageDialog = (
    {
        disabled,
        id,
        showDialog,
        title,
        label,
        required,
        placeholder,
        value,
        setValue,
        validate,
        okHandler,
        cancelHandler
    }: {
        disabled?: boolean,
        id: string,
        showDialog: boolean,
        title?: string,
        label?: string,
        required?: boolean,
        placeholder?: string,
        value?: File,
        setValue: (value: File) => void,
        validate?: () => ValidationResult,
        okHandler: () => void,
        cancelHandler: () => void
    }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [valid, setValid] = useState(false);
    const [preview, setPreview] = useState<string>()

    useEffect(() => {
        if (validate) {
            validate();
        }
    }, [validate]);

    useEffect(() => {
        setPreview(undefined);
        if (value && valid) {
            setPreview(URL.createObjectURL(value));
        }
    }, [value, valid]);

    return (
        <BaseDialog id={id} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {title}
                    </div>

                    <WiwaFormFile
                        label={label}
                        required={required}
                        placeholder={placeholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValid}
                        validate={validate}
                    />

                    <img
                        className="flex-none w-48 h-48 object-scale-down object-center"
                        src={preview}
                        alt={commonResourceState?.resource?.imageDialog.alt}
                    />

                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={disabled || !valid}
                            onClick={okHandler}
                        >{commonResourceState?.resource?.imageDialog.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={disabled}
                            onClick={cancelHandler}
                        >{commonResourceState?.resource?.imageDialog.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
    )
}

export default ImageDialog;
