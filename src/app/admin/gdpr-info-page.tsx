import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import MdDialog from '../../component/dialog/md-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { useConfigState } from '../../component/state/config-state-provider';
import { useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import WiwaButton from '../../component/ui/wiwa-button';
import { SingleValueBody } from '../../model/service';
import { CONTEXT_PATH, getData, postData } from '../../data';

const PATH_UI_GDPR_INFO = CONTEXT_PATH + 'ui/gdpr-info';
const PATH_CONFIG_GDPR_INFO = CONTEXT_PATH + 'config/gdpr-info';
const GDPR_INFO_DIALOG_ID = 'admin-gdpr-info-dialog-001';

const GdprInfoPage = () => {
    const configState = useConfigState();
    const resourceState = useResourceState();

    const [gdprInfo, setGdprInfo] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (configState?.up) {
            const fetchGdprInfo = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_GDPR_INFO);
                if (response.data) {
                    setGdprInfo(response.data.value);
                }
            }
            fetchGdprInfo().then();
        }
    }, [configState?.up]);

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="border border-solid flex flex-col justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.gdprInfo.title}
                            onClick={() => setShowDialog(true)}
                        ><Edit size={24}/></WiwaButton>
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaMarkdownRenderer className="prose max-w-none" md={gdprInfo}/>
                    </div>
                </div>
            </div>
            <GdprInfoDialog
                gdprInfo={gdprInfo}
                setGdprInfo={setGdprInfo}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    )
}

export default GdprInfoPage;

const GdprInfoDialog = (
    {
        gdprInfo,
        setGdprInfo,
        showDialog,
        setShowDialog
    }: {
        gdprInfo: string,
        setGdprInfo: (gdprInfo: string) => void,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void
    }) => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [error, setError] = useState<string>();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setValue(gdprInfo);
    }, [gdprInfo, showDialog]);

    const okHandler = async () => {
        setDisabled(true);
        try {
            if (valid) {
                const response = await postData(
                    PATH_CONFIG_GDPR_INFO,
                    {value},
                    authState?.accessToken || ''
                );
                if (response.error) {
                    setError(resourceState?.admin?.gdprInfo.error);
                } else {
                    setGdprInfo(value);
                    setShowDialog(false);
                }
            }
        } finally {
            setDisabled(false);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={disabled}
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
