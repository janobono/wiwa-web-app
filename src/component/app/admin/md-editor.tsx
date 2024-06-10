import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { ClientResponse } from '../../../api/controller';
import { SingleValueBody } from '../../../api/model';
import MdDialog from '../../../component/dialog/md-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaMarkdownRenderer from '../../../component/ui/wiwa-markdown-renderer';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';

const MdEditor = (
    {
        dialogId,
        title,
        valueLabel,
        valuePlaceholder,
        valueRequired,
        errorMessage,
        loadValue,
        saveValue
    }: {
        dialogId: string,
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        errorMessage: string,
        loadValue: () => Promise<ClientResponse<SingleValueBody<string>>>,
        saveValue: (value: string, token?: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    }
) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<string>();
    const [showDialog, setShowDialog] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        loadValue().then(data => setValue(data.data?.value));
    }, [loadValue]);

    const okHandler = async (value: string) => {
        setBusy(true);
        try {
            const response = await saveValue(value || '', authState?.authToken?.accessToken);
            if (response?.error) {
                setError(errorMessage);
            } else {
                setValue(response.data?.value || '');
                setShowDialog(false);
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="border border-solid flex flex-col justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={title}
                            onClick={() => setShowDialog(true)}
                        ><Edit size={18}/></WiwaButton>
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaMarkdownRenderer className="prose max-w-none" md={value}/>
                    </div>
                </div>
            </div>
            <MdEditorDialog
                dialogId={dialogId}
                title={title}
                valueLabel={valueLabel}
                valuePlaceholder={valuePlaceholder}
                valueRequired={valueRequired}
                error={error}
                busy={busy}
                defaultValue={value || ''}
                showDialog={showDialog}
                cancelHandler={() => setShowDialog(false)}
                okHandler={okHandler}
            />
        </>
    )
}

export default MdEditor;

const MdEditorDialog = (
    {
        dialogId,
        title,
        valueLabel,
        valuePlaceholder,
        valueRequired,
        error,
        busy,
        defaultValue,
        showDialog,
        cancelHandler,
        okHandler
    }: {
        dialogId: string,
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        error: string | undefined,
        busy: boolean,
        defaultValue: string,
        showDialog: boolean,
        cancelHandler: () => void,
        okHandler: (value: string) => void
    }) => {
    const dialogState = useDialogState();

    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(defaultValue);
    }, [showDialog, defaultValue]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={busy}
            id={dialogId}
            showDialog={showDialog}
            title={title}
            label={valueLabel}
            required={true}
            placeholder={valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if ((value || '').trim().length === 0) {
                    return {
                        valid: false,
                        message: valueRequired
                    };
                }
                return {valid: true};
            }}
            rows={20}
            error={error}
            okHandler={() => okHandler(value)}
            cancelHandler={cancelHandler}
        />
        , dialogState.modalRoot))
}
