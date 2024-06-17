import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Edit, Trash } from 'react-feather';
import WiwaButton from '../../../component/ui/wiwa-button.tsx';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';
import { deleteBoardImage, setBoardImage } from '../../../api/controller/board';
import { getBoardImagePath } from '../../../api/controller/ui';
import ImageDialog from '../../../component/dialog/image-dialog.tsx';
import { createPortal } from 'react-dom';

const BOARD_IMAGE_DIALOG_ID = 'board-image-dialog-001';

const BoardImagePage = () => {
    const {boardId} = useParams();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<string>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (!busy && boardId !== undefined) {
            setData(getBoardImagePath(Number(boardId)));
        } else {
            setData(undefined);
        }
    }, [boardId, busy]);

    const cancelHandler = async () => {
        setShowDialog(false);
    }

    const okHandler = async (file: File) => {
        setError(undefined);
        setBusy(true);
        try {
            if (boardId) {
                const response = await setBoardImage(Number(boardId), file, authState?.authToken?.accessToken);
                if (response?.error) {
                    setError(resourceState?.manager?.boards.boardImage.editError);
                }
            }
        } finally {
            setBusy(false);
        }
        setShowDialog(false);
    }

    const deleteHandler = async () => {
        setError(undefined);
        setBusy(true);
        try {
            if (boardId) {
                const response = await deleteBoardImage(Number(boardId), authState?.authToken?.accessToken);
                if (response?.error) {
                    setError(resourceState?.manager?.boards.boardImage.deleteError);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    return (error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-row w-full items-center justify-center pb-5">
                        <div className="join">
                            <WiwaButton
                                title={resourceState?.common?.action.edit}
                                className="btn-secondary join-item"
                                disabled={busy}
                                onClick={() => {
                                    setShowDialog(true);
                                }}
                            >
                                <Edit size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                title={resourceState?.common?.action.delete}
                                disabled={busy}
                                onClick={() => {
                                    dialogState?.showDialog({
                                        type: DialogType.YES_NO,
                                        title: resourceState?.manager?.boards.boardImage.deleteTitle,
                                        message: resourceState?.manager?.boards.boardImage.deleteMessage,
                                        callback: (answer: DialogAnswer) => {
                                            if (answer === DialogAnswer.YES) {
                                                deleteHandler().then();
                                            }
                                        }
                                    });
                                }}
                            ><Trash size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                    <div className="flex flex-row w-full items-center justify-center pb-5">
                        <img
                            className="flex-none w-48 h-48 object-scale-down object-center"
                            src={data}
                            alt={boardId}
                        />
                    </div>
                </div>

                <BoardImageDialog
                    busy={busy}
                    showDialog={showDialog}
                    okHandler={okHandler}
                    cancelHandler={cancelHandler}
                />
            </>
    )
}

export default BoardImagePage;

const BoardImageDialog = ({busy, showDialog, okHandler, cancelHandler}: {
    busy: boolean,
    showDialog: boolean,
    okHandler: (file: File) => void,
    cancelHandler: () => void,
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

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
            id={BOARD_IMAGE_DIALOG_ID}
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
