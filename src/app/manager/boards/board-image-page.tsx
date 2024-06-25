import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Trash } from 'react-feather';

import { useBoardState } from '../boards-base-page';
import { deleteBoardImage, setBoardImage } from '../../../api/controller/board';
import { getBoardImagePath } from '../../../api/controller/ui';
import ImageDialog from '../../../component/dialog/image-dialog';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const BOARD_IMAGE_DIALOG_ID = 'board-image-dialog-001';

const BoardImagePage = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const boardState = useBoardState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (!busy && boardState?.selected !== undefined) {
            setData(getBoardImagePath(boardState.selected.id));
        } else {
            setData(undefined);
        }
    }, [boardState?.selected, busy]);

    const cancelHandler = async () => {
        setShowDialog(false);
    }

    const okHandler = async (file: File) => {
        setBusy(true);
        try {
            if (boardState?.selected) {
                const response = await setBoardImage(boardState.selected.id, file, authState?.authToken?.accessToken);
                errorState?.addError(response?.error);
            }
        } finally {
            setBusy(false);
        }
        setShowDialog(false);
    }

    const deleteHandler = async () => {
        setBusy(true);
        try {
            if (boardState?.selected) {
                const response = await deleteBoardImage(boardState.selected.id, authState?.authToken?.accessToken);
                errorState?.addError(response?.error);
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.managerNav.boards || '',
                    to: '/manager/boards'
                },
                {
                    key: 2,
                    label: resourceState?.common?.navigation.managerNav.boardImage || '',
                    to: '/manager/boards/image'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <div className="flex flex-row w-full items-center justify-center">
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
                <div className="flex flex-row w-full items-center justify-center">
                    <img
                        className="flex-none w-48 h-48 object-scale-down object-center"
                        src={data}
                        alt={boardState?.selected?.name}
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
