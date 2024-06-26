import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { setWelcomeText } from '../../../api/controller/config';
import { getWelcomeText } from '../../../api/controller/ui';
import MdDialog from '../../../component/dialog/md-dialog';
import WiwaMarkdownRenderer from '../../../component/ui/wiwa-markdown-renderer';
import WiwaButton from '../../../component/ui/wiwa-button';
import { AuthContext, DialogContext, ErrorContext, ResourceContext } from '../../../context';

const WELCOME_TEXT_DIALOG_ID = 'admin-base-info-welcome-text-dialog-001';

const WelcomeTextEditor = () => {
    const resourceState = useContext(ResourceContext);

    const [welcomeText, setWelcomeText] = useState<string>();
    const [showWelcomeTextDialog, setShowWelcomeTextDialog] = useState(false);

    useEffect(() => {
        getWelcomeText().then(data => setWelcomeText(data.data?.value));
    }, []);

    return (
        <>
            <div className="border border-solid flex flex-row justify-between">
                <div className="p-5 flex content-stretch justify-center items-center">
                    <WiwaMarkdownRenderer className="prose max-w-none" md={welcomeText}/>
                </div>
                <div className="p-5 flex content-stretch justify-center items-center">
                    <WiwaButton
                        className="btn-primary"
                        title={resourceState?.common?.action.edit}
                        onClick={() => setShowWelcomeTextDialog(true)}
                    ><Edit size={18}/></WiwaButton>
                </div>
            </div>
            <WelcomeTextDialog
                showDialog={showWelcomeTextDialog}
                closeHandler={() => setShowWelcomeTextDialog(false)}
                defaultValue={welcomeText || ''}
                setDefaultValue={setWelcomeText}
            />
        </>
    )
}

export default WelcomeTextEditor;

const WelcomeTextDialog = ({showDialog, closeHandler, defaultValue, setDefaultValue}: {
    showDialog: boolean,
    closeHandler: () => void,
    defaultValue: string,
    setDefaultValue: (defaultValue: string) => void
}) => {
    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue, showDialog]);

    const submit = async () => {
        setBusy(true);
        try {
            if (valid) {
                const response = await setWelcomeText(value || '', authState?.authToken?.accessToken);
                errorState?.addError(response.error);
                setDefaultValue(response.data?.value || '');
                closeHandler();
            }
        } finally {
            setBusy(false);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={busy || false}
            id={WELCOME_TEXT_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.admin?.baseInfo.welcomeText.title}
            label={resourceState?.admin?.baseInfo.welcomeText.valueLabel}
            required={true}
            placeholder={resourceState?.admin?.baseInfo.welcomeText.valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if ((value || '').trim().length === 0) {
                    setValid(false);
                    return {
                        valid: false,
                        message: resourceState?.admin?.baseInfo.welcomeText.valueRequired
                    };
                }
                setValid(true);
                return {valid: true};
            }}
            rows={20}
            okHandler={submit}
            cancelHandler={closeHandler}
        />
        , dialogState.modalRoot))
}
