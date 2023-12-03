import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import MdDialog from '../../component/dialog/md-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { useConfigState } from '../../component/state/config-state-provider';
import { useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { SingleValueBody } from '../../model/service';
import { CONTEXT_PATH, getData, postData } from '../../data';

const PATH_UI_COOKIES_INFO = CONTEXT_PATH + 'ui/cookies-info';
const PATH_CONFIG_COOKIES_INFO = CONTEXT_PATH + 'config/cookies-info';
const COOKIES_INFO_DIALOG_ID = 'admin-cookies-info-dialog-001';

const CookiesInfoPage = () => {
    const configState = useConfigState();
    const resourceState = useResourceState();

    const [cookiesInfo, setCookiesInfo] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (configState?.up) {
            const fetchCookiesInfo = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_COOKIES_INFO);
                if (response.data) {
                    setCookiesInfo(response.data.value);
                }
            }
            fetchCookiesInfo().then();
        }
    }, [configState?.up]);

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="border border-solid flex flex-col justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.cookiesInfo.title}
                            onClick={() => setShowDialog(true)}
                        ><Edit size={24}/></WiwaButton>
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaMarkdownRenderer className="prose max-w-none" md={cookiesInfo}/>
                    </div>
                </div>
            </div>
            <CookiesInfoDialog
                cookiesInfo={cookiesInfo}
                setCookiesInfo={setCookiesInfo}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    )
}

export default CookiesInfoPage;

const CookiesInfoDialog = (
    {
        cookiesInfo,
        setCookiesInfo,
        showDialog,
        setShowDialog
    }: {
        cookiesInfo: string,
        setCookiesInfo: (cookiesInfo: string) => void,
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
        setValue(cookiesInfo);
    }, [cookiesInfo, showDialog]);

    const okHandler = async () => {
        setDisabled(true);
        try {
            if (valid) {
                const response = await postData(
                    PATH_CONFIG_COOKIES_INFO,
                    {value},
                    authState?.accessToken || ''
                );
                if (response.error) {
                    setError(resourceState?.admin?.cookiesInfo.error);
                } else {
                    setCookiesInfo(value);
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
            id={COOKIES_INFO_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.admin?.cookiesInfo.title}
            label={resourceState?.admin?.cookiesInfo.valueLabel}
            required={true}
            placeholder={resourceState?.admin?.cookiesInfo.valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if (value.trim().length === 0) {
                    setValid(false);
                    return {
                        valid: false,
                        message: resourceState?.admin?.cookiesInfo.valueRequired
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
