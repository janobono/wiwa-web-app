import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ImageDialog from '../../../dialog/image-dialog';
import { DialogContext, ManagerResourceContext } from '../../../../context';

const BoardImageDialog = ({dialogId, busy, showDialog, okHandler, cancelHandler}: {
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
            title={managerResourceState?.resource?.boards.boardImage.editTitle}
            label={managerResourceState?.resource?.boards.boardImage.editFileLabel}
            required={true}
            placeholder={managerResourceState?.resource?.boards.boardImage.editFilePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: managerResourceState?.resource?.boards.boardImage.editFileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: managerResourceState?.resource?.boards.boardImage.editFileFormat
                    }
                }
                return {valid: true};
            }}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />
        , dialogState.modalRoot))
}

export default BoardImageDialog;
