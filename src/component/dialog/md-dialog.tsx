import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import BaseDialog from './base-dialog';
import WiwaButton from '../ui/wiwa-button';
import WiwaFormTextarea from '../ui/wiwa-form-textarea';
import WiwaMarkdownRenderer from '../ui/wiwa-markdown-renderer';
import { ValidationResult } from '../../model/ui';
import { useResourceState } from '../../state/resource';

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
        error,
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
        error?: string,
        okHandler: () => void,
        cancelHandler: () => void
    }) => {
    const resourceState = useResourceState();

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
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {title}
                    </div>
                    <div className="tabs tabs-bordered py-5">
                        <a
                            className={twMerge(`tab tab-bordered ${editor ? 'tab-active' : ''}`)}
                            onClick={() => setEditor(true)}
                        >{resourceState?.common?.mdDialog.editor}</a>
                        <a
                            className={twMerge(`tab tab-bordered ${editor ? '' : 'tab-active'}`)}
                            onClick={() => setEditor(false)}
                        >{resourceState?.common?.mdDialog.preview}</a>
                    </div>
                    {editor ?
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
                        :
                        <WiwaMarkdownRenderer className="prose max-w-none" md={value}/>
                    }
                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={disabled || !valid}
                            onClick={okHandler}
                        >{resourceState?.common?.mdDialog.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={disabled}
                            onClick={cancelHandler}
                        >{resourceState?.common?.mdDialog.cancel}
                        </WiwaButton>
                    </div>
                    {error &&
                        <label className="label">
                            <span className="label-text-alt text-error">{error}</span>
                        </label>
                    }
                </div>
            </div>
        </BaseDialog>
    )
}

export default MdDialog;
