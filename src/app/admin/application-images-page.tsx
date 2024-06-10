import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Plus, Trash } from 'react-feather';

import { ApplicationImageInfo } from '../../api/model/application';
import ImageDialog from '../../component/dialog/image-dialog';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { DialogAnswer, DialogType } from '../../model/ui';
import { useDialogState } from '../../state/dialog';
import { useResourceState } from '../../state/resource';
import { Page } from '../../api/model';
import { useAuthState } from '../../state/auth';
import { deleteApplicationImage, getApplicationImages, setApplicationImage } from '../../api/controller/config';

const APP_IMAGE_DIALOG_ID = 'admin-app-images-image-dialog-001';

const ApplicationImagesPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<ApplicationImageInfo>>();

    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [error, setError] = useState<string>();

    const fetchData = async (page: number) => {
        setError(undefined);
        setBusy(true);
        try {
            const response = await getApplicationImages({page, size: 8}, authState?.authToken?.accessToken);
            if (response.data) {
                setData(response.data);
            } else {
                setError(resourceState?.admin?.applicationImages.loadImagesError);
            }
        } finally {
            setBusy(false);
        }
    }

    const addHandler = async (file: File) => {
        setError(undefined);
        setBusy(true);
        try {
            const response = await setApplicationImage(file, authState?.authToken?.accessToken);
            if (response?.data) {
                if (data) {
                    const newData = {...data};
                    newData.content = [response.data, ...data.content];
                    setData(newData);
                }
                setShowDialog(false);
            } else {
                setError(resourceState?.admin?.applicationImages.addImageError);
            }
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (filename: string) => {
        setError(undefined);
        setBusy(true);
        try {
            const response = await deleteApplicationImage(filename, authState?.authToken?.accessToken);
            if (response?.error) {
                setError(resourceState?.admin?.applicationImages.deleteImageError);
            } else {
                if (data) {
                    const newData = {...data};
                    const index = newData.content.findIndex(item => item.fileName === filename);
                    if (index !== -1) {
                        newData.content.splice(index, 1);
                        setData(newData);
                    }
                }
            }
        } finally {
            setBusy(false);
        }
    }

    const page = () => {
        if (data) {
            return data.number;
        }
        return 0;
    }

    useEffect(() => {
        fetchData(page()).then();
    }, []);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);
    }, [data]);

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="w-full flex justify-end">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.common?.action.add}
                            disabled={busy}
                            onClick={() => setShowDialog(true)}
                        ><Plus size={18}/>
                        </WiwaButton>
                    </div>

                    <div className="w-full flex justify-center pt-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start w-full">
                            {data?.content.map(appImage =>
                                <AppImage
                                    key={appImage.fileName}
                                    applicationImageInfo={appImage}
                                    deleteHandler={deleteHandler}
                                    disabled={busy}
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-center pt-5">
                        <WiwaPageable
                            isPrevious={previous}
                            previousHandler={() => fetchData(page() - 1).then()}
                            page={page() + 1}
                            pageHandler={() => fetchData(page()).then()}
                            isNext={next}
                            nextHandler={() => fetchData(page() + 1).then()}
                            disabled={busy}
                        />
                    </div>
                </div>

                <AppImageDialog
                    showDialog={showDialog}
                    okHandler={addHandler}
                    cancelHandler={() => {
                        setError(undefined);
                        setShowDialog(false);
                    }}
                    error={error}
                />
            </>
    )
}

export default ApplicationImagesPage;

const AppImage = ({applicationImageInfo, deleteHandler, disabled}: {
    applicationImageInfo: ApplicationImageInfo,
    deleteHandler: (filename: string) => void,
    disabled?: boolean
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col border border-solid p-5 w-full">
            <div className="flex flex-row justify-end w-full">
                <div className="join">
                    <WiwaButton
                        className="btn-ghost join-item"
                        title={resourceState?.common?.action.copy}
                        onClick={() => navigator.clipboard.writeText(
                            window.location.href
                                .replace('admin', 'api/ui')
                            + '/' + applicationImageInfo.fileName)
                        }
                    ><Copy size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.common?.action.delete}
                        disabled={disabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: resourceState?.admin?.applicationImages.deleteImageQuestionTitle,
                                message: resourceState?.admin?.applicationImages.deleteImageQuestionMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        deleteHandler(applicationImageInfo.fileName);
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </div>
            </div>

            <img
                className="flex-none w-full h-24 object-scale-down object-center"
                src={applicationImageInfo.thumbnail}
                alt={applicationImageInfo.fileName}
                title={applicationImageInfo.fileName}
            />

            <p className="w-full text-center">
                {applicationImageInfo.fileName.length > 25 ? applicationImageInfo.fileName.substring(0, 22) + '...' : applicationImageInfo.fileName}
            </p>
        </div>
    )
}

const AppImageDialog = ({showDialog, okHandler, cancelHandler, error, disabled}: {
    showDialog: boolean,
    okHandler: (file: File) => void,
    cancelHandler: () => void,
    error?: string,
    disabled?: boolean
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
            disabled={disabled}
            id={APP_IMAGE_DIALOG_ID}
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
            error={error}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />, dialogState.modalRoot))
}
