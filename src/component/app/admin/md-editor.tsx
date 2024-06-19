import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { ClientResponse } from '../../../api/controller';
import { SingleValueBody } from '../../../api/model';
import MdDialog from '../../../component/dialog/md-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaMarkdownRenderer from '../../../component/ui/wiwa-markdown-renderer';
import { useAuthState } from '../../../state/auth';
import { useErrorState } from '../../../state/error';
import { useDialogState } from '../../../state/dialog';

const MdEditor = (
    {
        dialogId,
        title,
        valueLabel,
        valuePlaceholder,
        valueRequired,
        loadValue,
        saveValue
    }: {
        dialogId: string,
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        loadValue: () => Promise<ClientResponse<SingleValueBody<string>>>,
        saveValue: (value: string, token?: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    }
) => {
    const authState = useAuthState();
    const errorState = useErrorState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<string>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        loadValue().then(data => setValue(data.data?.value));
    }, [loadValue]);

    const okHandler = async (value: string) => {
        setBusy(true);
        try {
            const response = await saveValue(value || '', authState?.authToken?.accessToken);
            setValue(response.data?.value || '');
            errorState?.addError(response?.error);
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
            okHandler={() => okHandler(value)}
            cancelHandler={cancelHandler}
        />
        , dialogState.modalRoot))
}
