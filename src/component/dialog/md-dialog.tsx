import { useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import BaseDialog from './base-dialog';
import { ValidationResult } from '../ui';
import WiwaButton from '../ui/wiwa-button';
import WiwaFormTextarea from '../ui/wiwa-form-textarea';
import WiwaMarkdownRenderer from '../ui/wiwa-markdown-renderer';
import { CommonResourceContext } from '../../context';

const MdDialog = (
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
        validate = () => {
            return {valid: true}
        },
        rows,
        okHandler,
        cancelHandler
    }: {
        disabled: boolean,
        id: string,
        showDialog: boolean,
        title?: string,
        label?: string,
        required?: boolean,
        placeholder?: string,
        value?: string,
        setValue: (value: string) => void,
        validate?: () => ValidationResult,
        rows?: number,
        okHandler: () => void,
        cancelHandler: () => void
    }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [editor, setEditor] = useState(true);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (validate) {
            validate();
        }
    }, [validate]);

    return (
        <BaseDialog id={id} showDialog={showDialog} closeHandler={cancelHandler} maxWidth={true}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {title}
                    </div>
                    <div className="tabs tabs-bordered">
                        <a
                            className={twMerge(`tab tab-bordered ${editor ? 'tab-active' : ''}`)}
                            onClick={() => setEditor(true)}
                        >{commonResourceState?.resource?.mdDialog.editor}</a>
                        <a
                            className={twMerge(`tab tab-bordered ${editor ? '' : 'tab-active'}`)}
                            onClick={() => setEditor(false)}
                        >{commonResourceState?.resource?.mdDialog.preview}</a>
                    </div>
                    {editor ?
                        <>
                            <WiwaButton
                                className="btn-primary join-item"
                                disabled={disabled || !valid}
                                onClick={() => {
                                    fetch('/example.md').then(response => {
                                        response.text().then(text => {
                                            setValue(text);
                                        })
                                    });
                                }}
                            >{commonResourceState?.resource?.mdDialog.example}
                            </WiwaButton>
                            <WiwaFormTextarea
                                label={label}
                                required={required}
                                placeholder={placeholder}
                                value={value}
                                setValue={setValue}
                                validate={validate}
                                setValid={setValid}
                                rows={rows}
                            />
                        </>
                        :
                        <WiwaMarkdownRenderer className="prose max-w-none" md={value}/>
                    }
                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={disabled || !valid}
                            onClick={okHandler}
                        >{commonResourceState?.resource?.mdDialog.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={disabled}
                            onClick={cancelHandler}
                        >{commonResourceState?.resource?.mdDialog.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
    )
}

export default MdDialog;
