import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { setLogo } from '../../../../api/controller/config';
import { getLogoPath } from '../../../../api/controller/ui';
import ImageDialog from '../../../../component/dialog/image-dialog';
import WiwaButton from '../../../../component/ui/wiwa-button';
import {
    AdminResourceContext,
    AuthContext,
    CommonResourceContext,
    DialogContext,
    ErrorContext
} from '../../../../context';

const LOGO_DIALOG_ID = 'admin-base-info-logo-dialog-001';

const LogoEditor = () => {
    const commonResourceState = useContext(CommonResourceContext);

    const [showLogoDialog, setShowLogoDialog] = useState(false);

    return (
        <>
            <div className="border border-solid flex flex-row justify-between">
                <div className="p-5 flex content-stretch justify-center items-center">
                    <img
                        className="flex-none w-24 h-24 object-scale-down object-center"
                        src={getLogoPath()}
                        alt="Logo"
                    />
                </div>
                <div className="p-5 flex content-stretch justify-center items-center">
                    <WiwaButton
                        className="btn-primary"
                        title={commonResourceState?.resource?.action.edit}
                        onClick={() => setShowLogoDialog(true)}
                    ><Edit size={18}/></WiwaButton>
                </div>
            </div>
            <LogoDialog
                showDialog={showLogoDialog}
                closeHandler={() => setShowLogoDialog(false)}
            />
        </>
    )
}

export default LogoEditor;

const LogoDialog = ({showDialog, closeHandler}: {
    showDialog: boolean,
    closeHandler: () => void
}) => {
    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const adminResourceState = useContext(AdminResourceContext);

    const [busy, setBusy] = useState(false);
    const [file, setFile] = useState<File>();

    useEffect(() => {
        setFile(undefined);
    }, [showDialog]);

    const submitHandler = async () => {
        setBusy(true);
        try {
            if (file) {
                const response = await setLogo(file, authState?.authToken?.accessToken);
                errorState?.addError(response?.error);
                closeHandler();
            }
        } finally {
            setBusy(false);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <ImageDialog
            disabled={busy}
            id={LOGO_DIALOG_ID}
            showDialog={showDialog}
            title={adminResourceState?.resource?.baseInfo.logo.title}
            label={adminResourceState?.resource?.baseInfo.logo.fileLabel}
            required={true}
            placeholder={adminResourceState?.resource?.baseInfo.logo.filePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: adminResourceState?.resource?.baseInfo.logo.fileRequired
                    }
                }
                if (file.type !== 'image/png') {
                    return {
                        valid: false,
                        message: adminResourceState?.resource?.baseInfo.logo.fileFormat
                    }
                }
                return {valid: true};
            }}
            okHandler={submitHandler}
            cancelHandler={closeHandler}
        />, dialogState.modalRoot))
}
