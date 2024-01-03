import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import MdDialog from '../../component/dialog/md-dialog';
import { useConfigState } from '../../component/state/config-state-provider';
import { useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import { useUiState } from '../../component/state/ui-state-provider';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import WiwaButton from '../../component/ui/wiwa-button';

const GDPR_INFO_DIALOG_ID = 'admin-gdpr-info-dialog-001';

const GdprInfoPage = () => {
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="border border-solid flex flex-col justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.gdprInfo.title}
                            onClick={() => setShowDialog(true)}
                        ><Edit size={18}/></WiwaButton>
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaMarkdownRenderer className="prose max-w-none" md={uiState?.gdprInfo}/>
                    </div>
                </div>
            </div>
            <GdprInfoDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    )
}

export default GdprInfoPage;

const GdprInfoDialog = (
    {
        showDialog,
        setShowDialog
    }: {
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void
    }) => {
    const configState = useConfigState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setValue(uiState?.gdprInfo || '');
    }, [uiState?.gdprInfo, showDialog]);

    const okHandler = async () => {
        if (valid) {
            const response = await configState?.setGdprInfo(value);
            if (response?.error) {
                setError(resourceState?.admin?.gdprInfo.error);
            } else {
                setShowDialog(false);
            }
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={configState?.busy || false}
            id={GDPR_INFO_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.admin?.gdprInfo.title}
            label={resourceState?.admin?.gdprInfo.valueLabel}
            required={true}
            placeholder={resourceState?.admin?.gdprInfo.valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if (value.trim().length === 0) {
                    setValid(false);
                    return {
                        valid: false,
                        message: resourceState?.admin?.gdprInfo.valueRequired
                    };
                }
                setValid(true);
                return {valid: true};
            }}
            rows={20}
            error={error}
            okHandler={okHandler}
            cancelHandler={() => setShowDialog(false)}
        />
        , dialogState.modalRoot))
}
