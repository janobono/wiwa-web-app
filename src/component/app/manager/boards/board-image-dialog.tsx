import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ImageDialog from '../../../dialog/image-dialog';
import { DialogContext, ResourceContext } from '../../../../context';

const BoardImageDialog = ({dialogId, busy, showDialog, okHandler, cancelHandler}: {
    dialogId: string,
    busy: boolean,
    showDialog: boolean,
    okHandler: (file: File) => void,
    cancelHandler: () => void,
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
            disabled={busy}
            id={dialogId}
            showDialog={showDialog}
            title={resourceState?.manager?.boards.boardImage.editTitle}
            label={resourceState?.manager?.boards.boardImage.editFileLabel}
            required={true}
            placeholder={resourceState?.manager?.boards.boardImage.editFilePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: resourceState?.manager?.boards.boardImage.editFileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: resourceState?.manager?.boards.boardImage.editFileFormat
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
