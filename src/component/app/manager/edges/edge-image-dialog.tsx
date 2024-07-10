import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ImageDialog from '../../../dialog/image-dialog';
import { DialogContext, ManagerResourceContext } from '../../../../context';

const EdgeImageDialog = ({dialogId, busy, showDialog, okHandler, cancelHandler}: {
    dialogId: string,
    busy: boolean,
    showDialog: boolean,
    okHandler: (file: File) => void,
    cancelHandler: () => void,
}) => {
    const dialogState = useContext(DialogContext);
    const managerResourceState = useContext(ManagerResourceContext);

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
            disabled={busy}
            id={dialogId}
            showDialog={showDialog}
            title={managerResourceState?.resource?.edges.edgeImage.editTitle}
            label={managerResourceState?.resource?.edges.edgeImage.editFileLabel}
            required={true}
            placeholder={managerResourceState?.resource?.edges.edgeImage.editFilePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: managerResourceState?.resource?.edges.edgeImage.editFileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: managerResourceState?.resource?.edges.edgeImage.editFileFormat
                    }
                }
                return {valid: true};
            }}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />
        , dialogState.modalRoot))
}

export default EdgeImageDialog;
