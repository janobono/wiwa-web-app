import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import { setTitle } from '../../../api/controller/config';
import { getTitle } from '../../../api/controller/ui';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaFormInputString from '../../../component/ui/wiwa-form-input-string';
import WiwaButton from '../../../component/ui/wiwa-button';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const TITLE_DIALOG_ID = 'admin-base-info-title-dialog-001';

const TitleEditor = () => {
    const resourceState = useResourceState();

    const [title, setTitle] = useState<string>();
    const [showTitleDialog, setShowTitleDialog] = useState(false);

    useEffect(() => {
        getTitle().then(data => setTitle(data.data?.value));
    }, []);

    return (
        <>
            <div className="border border-solid flex flex-row justify-between">
                <div className="p-5 flex content-stretch justify-center items-center">
                    <span className="normal-case text-xl font-bold">{title}</span>
                </div>
                <div className="p-5 flex content-stretch justify-center items-center">
                    <WiwaButton
                        className="btn-primary"
                        title={resourceState?.common?.action.edit}
                        onClick={() => setShowTitleDialog(true)}
                    ><Edit size={18}/></WiwaButton>
                </div>
            </div>

            <TitleDialog
                showDialog={showTitleDialog}
                closeHandler={() => setShowTitleDialog(false)}
                defaultValue={title || ''}
                setDefaultValue={setTitle}
            />
        </>
    )
}

export default TitleEditor;

const TitleDialog = ({showDialog, closeHandler, defaultValue, setDefaultValue}: {
    showDialog: boolean,
    closeHandler: () => void,
    defaultValue: string,
    setDefaultValue: (defaultValue: string) => void
}) => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

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
                const response = await setTitle(value || '', authState?.authToken?.accessToken);
                errorState?.addError(response?.error);
                setDefaultValue(response.data?.value || '');
                closeHandler();
            }
        } finally {
            setBusy(false);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={TITLE_DIALOG_ID} showDialog={showDialog} closeHandler={closeHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.baseInfo.title.title}
                    </div>

                    <WiwaFormInputString
                        label={resourceState?.admin?.baseInfo.title.titleLabel}
                        required={true}
                        placeholder={resourceState?.admin?.baseInfo.title.titlePlaceholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValid}
                        validate={() => {
                            if ((value || '').trim().length === 0) {
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
                            disabled={busy || !valid}
                            onClick={submit}
                        >{resourceState?.common?.action.submit}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={busy}
                            onClick={closeHandler}
                        >{resourceState?.common?.action.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
