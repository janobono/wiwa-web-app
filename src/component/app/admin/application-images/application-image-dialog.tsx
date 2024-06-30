import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ImageDialog from '../../../dialog/image-dialog';
import { DialogContext, ResourceContext } from '../../../../context';

const ApplicationImageDialog = ({dialogId, showDialog, okHandler, cancelHandler, disabled}: {
    dialogId: string,
    showDialog: boolean,
    okHandler: (file: File) => void,
    cancelHandler: () => void,
    disabled?: boolean
}) => {
    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);

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
            title={resourceState?.admin?.applicationImages.addAppImage.title}
            label={resourceState?.admin?.applicationImages.addAppImage.fileLabel}
            required={true}
            placeholder={resourceState?.admin?.applicationImages.addAppImage.filePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: resourceState?.admin?.applicationImages.addAppImage.fileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: resourceState?.admin?.applicationImages.addAppImage.fileFormat
                    }
                }
                return {valid: true};
            }}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />, dialogState.modalRoot))
}

export default ApplicationImageDialog;
