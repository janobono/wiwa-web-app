import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import BaseDialog from '../../component/dialog/base-dialog';
import ImageDialog from '../../component/dialog/image-dialog';
import MdDialog from '../../component/dialog/md-dialog';
import { useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import { useUiState } from '../../component/state/ui-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { useConfigState } from '../../component/state/config-state-provider.tsx';

const LOGO_DIALOG_ID = 'admin-base-info-logo-dialog-001';
const TITLE_DIALOG_ID = 'admin-base-info-title-dialog-001';
const WELCOME_TEXT_DIALOG_ID = 'admin-base-info-welcome-text-dialog-001';

const BaseInfoPage = () => {
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [showLogoDialog, setShowLogoDialog] = useState(false);
    const [showTitleDialog, setShowTitleDialog] = useState(false);
    const [showWelcomeTextDialog, setShowWelcomeTextDialog] = useState(false);

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="border border-solid flex flex-row justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <img
                            className="flex-none w-24 h-24 object-scale-down object-center"
                            src={uiState?.logoUrl}
                            alt="Logo"
                        />
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.baseInfo.logo.title}
                            onClick={() => setShowLogoDialog(true)}
                        ><Edit size={18}/></WiwaButton>
                    </div>
                </div>

                <div className="border border-solid flex flex-row justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <span className="normal-case text-xl font-bold">{uiState?.title}</span>
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.baseInfo.title.title}
                            onClick={() => setShowTitleDialog(true)}
                        ><Edit size={18}/></WiwaButton>
                    </div>
                </div>

                <div className="border border-solid flex flex-row justify-between">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaMarkdownRenderer className="prose max-w-none" md={uiState?.welcomeText}/>
                    </div>
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.baseInfo.welcomeText.title}
                            onClick={() => setShowWelcomeTextDialog(true)}
                        ><Edit size={18}/></WiwaButton>
                    </div>
                </div>
            </div>
            <LogoDialog
                showDialog={showLogoDialog}
                okHandler={() => setShowLogoDialog(false)}
                cancelHandler={() => setShowLogoDialog(false)}
            />
            <TitleDialog
                showDialog={showTitleDialog}
                okHandler={() => setShowTitleDialog(false)}
                cancelHandler={() => setShowTitleDialog(false)}
            />
            <WelcomeTextDialog
                showDialog={showWelcomeTextDialog}
                okHandler={() => setShowWelcomeTextDialog(false)}
                cancelHandler={() => setShowWelcomeTextDialog(false)}
            />
        </>
    )
}

export default BaseInfoPage;

const LogoDialog = ({showDialog, okHandler, cancelHandler}: {
    showDialog: boolean,
    okHandler: () => void,
    cancelHandler: () => void
}) => {
    const configState = useConfigState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [file, setFile] = useState<File>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        setFile(undefined);
        setError(undefined);
    }, [showDialog]);

    const submitHandler = async () => {
        setError(undefined);
        if (file) {
            const response = await configState?.setLogo(file);
            if (response?.error) {
                setError(resourceState?.admin?.baseInfo.logo.error);
            } else {
                okHandler();
            }
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <ImageDialog
            disabled={configState?.busy}
            id={LOGO_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.admin?.baseInfo.logo.title}
            label={resourceState?.admin?.baseInfo.logo.fileLabel}
            required={true}
            placeholder={resourceState?.admin?.baseInfo.logo.filePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: resourceState?.admin?.baseInfo.logo.fileRequired
                    }
                }
                if (file.type !== 'image/png') {
                    return {
                        valid: false,
                        message: resourceState?.admin?.baseInfo.logo.fileFormat
                    }
                }
                return {valid: true};
            }}
            error={error}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />, dialogState.modalRoot))
}

const TitleDialog = ({showDialog, okHandler, cancelHandler}: {
    showDialog: boolean,
    okHandler: () => void,
    cancelHandler: () => void
}) => {
    const configState = useConfigState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (uiState?.title) {
            setValue(uiState?.title);
        }
    }, [uiState?.title, showDialog]);

    const submit = async () => {
        setError(undefined);
        if (valid) {
            const response = await configState?.setTitle(value);
            if (response?.error) {
                setError(resourceState?.admin?.baseInfo.title.error);
            } else {
                okHandler();
            }
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={TITLE_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.baseInfo.title.title}
                    </div>

                    <WiwaFormInput
                        label={resourceState?.admin?.baseInfo.title.titleLabel}
                        required={true}
                        placeholder={resourceState?.admin?.baseInfo.title.titlePlaceholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValid}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.baseInfo.title.titleRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={configState?.busy || !valid}
                            onClick={submit}
                        >{resourceState?.admin?.baseInfo.title.submit}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={configState?.busy}
                            onClick={cancelHandler}
                        >{resourceState?.admin?.baseInfo.title.cancel}
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
        , dialogState.modalRoot))
}

const WelcomeTextDialog = ({showDialog, okHandler, cancelHandler}: {
    showDialog: boolean,
    okHandler: () => void,
    cancelHandler: () => void
}) => {
    const configState = useConfigState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (uiState?.welcomeText) {
            setValue(uiState?.welcomeText);
        }
    }, [uiState?.welcomeText, showDialog]);

    const submit = async () => {
        if (valid) {
            const response = await configState?.setWelcomeText(value);
            if (response?.error) {
                setError(resourceState?.admin?.baseInfo.welcomeText.error);
            } else {
                okHandler();
            }
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={configState?.busy || false}
            id={WELCOME_TEXT_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.admin?.baseInfo.welcomeText.title}
            label={resourceState?.admin?.baseInfo.welcomeText.valueLabel}
            required={true}
            placeholder={resourceState?.admin?.baseInfo.welcomeText.valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if (value.trim().length === 0) {
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
            error={error}
            okHandler={submit}
            cancelHandler={cancelHandler}
        />
        , dialogState.modalRoot))
}
