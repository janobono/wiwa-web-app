import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Trash } from 'react-feather';

import { EdgeContext } from '../edges-base-page';
import { deleteEdgeImage, setEdgeImage } from '../../../api/controller/edge';
import { getEdgeImagePath } from '../../../api/controller/ui';
import ImageDialog from '../../../component/dialog/image-dialog';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import { AuthContext, DialogContext, ErrorContext, ResourceContext } from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const BOARD_IMAGE_DIALOG_ID = 'edge-image-dialog-001';

const EdgeImagePage = () => {
    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const edgeState = useContext(EdgeContext);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (!busy && edgeState?.selected !== undefined) {
            setData(getEdgeImagePath(edgeState.selected.id));
        } else {
            setData(undefined);
        }
    }, [edgeState?.selected, busy]);

    const cancelHandler = async () => {
        setShowDialog(false);
    }

    const okHandler = async (file: File) => {
        setBusy(true);
        try {
            if (edgeState?.selected) {
                const response = await setEdgeImage(edgeState.selected.id, file, authState?.authToken?.accessToken);
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
            if (edgeState?.selected) {
                const response = await deleteEdgeImage(edgeState.selected.id, authState?.authToken?.accessToken);
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
                    label: resourceState?.common?.navigation.managerNav.edges || '',
                    to: '/manager/edges'
                },
                {
                    key: 2,
                    label: resourceState?.common?.navigation.managerNav.edgeImage || '',
                    to: '/manager/edges/image'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
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
                                title: resourceState?.manager?.edges.edgeImage.deleteTitle,
                                message: resourceState?.manager?.edges.edgeImage.deleteMessage,
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
                <div className="flex flex-row w-full items-center justify-center">
                    <img
                        className="flex-none w-48 h-48 object-scale-down object-center"
                        src={data}
                        alt={edgeState?.selected?.name}
                    />
                </div>
            </div>

            <EdgeImageDialog
                busy={busy}
                showDialog={showDialog}
                okHandler={okHandler}
                cancelHandler={cancelHandler}
            />
        </>
    )
}

export default EdgeImagePage;

const EdgeImageDialog = ({busy, showDialog, okHandler, cancelHandler}: {
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
            id={BOARD_IMAGE_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.manager?.edges.edgeImage.editTitle}
            label={resourceState?.manager?.edges.edgeImage.editFileLabel}
            required={true}
            placeholder={resourceState?.manager?.edges.edgeImage.editFilePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: resourceState?.manager?.edges.edgeImage.editFileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: resourceState?.manager?.edges.edgeImage.editFileFormat
                    }
                }
                return {valid: true};
            }}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />
        , dialogState.modalRoot))
}
