import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ImageDialog from '../../../dialog/image-dialog';
import { AdminResourceContext, DialogContext } from '../../../../context';

const ApplicationImageDialog = ({dialogId, showDialog, okHandler, cancelHandler, disabled}: {
    dialogId: string,
    showDialog: boolean,
    okHandler: (file: File) => void,
    cancelHandler: () => void,
    disabled?: boolean
}) => {
    const dialogState = useContext(DialogContext);
    const adminResourceState = useContext(AdminResourceContext);

    const [file, setFile] = useState<File>();

    useEffect(() => {
        if (!showDialog) {
            setFile(undefined);
        }
    }, [showDialog]);

    const submitHandler = () => {
        if (file) {
            okHandler(file);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <ImageDialog
            disabled={disabled}
            id={dialogId}
            showDialog={showDialog}
            title={adminResourceState?.resource?.applicationImages.addAppImage.title}
            label={adminResourceState?.resource?.applicationImages.addAppImage.fileLabel}
            required={true}
            placeholder={adminResourceState?.resource?.applicationImages.addAppImage.filePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: adminResourceState?.resource?.applicationImages.addAppImage.fileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: adminResourceState?.resource?.applicationImages.addAppImage.fileFormat
                    }
                }
                return {valid: true};
            }}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />, dialogState.modalRoot))
}

export default ApplicationImageDialog;
