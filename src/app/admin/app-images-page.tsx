import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash } from 'react-feather';

import ImageDialog from '../../component/dialog/image-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { ApplicationImage, Page } from '../../model/service';
import { CONTEXT_PATH, deleteData, getData, postFile, setPageableQueryParams } from '../../data';

const PATH_CONFIG_APPLICATION_IMAGES = CONTEXT_PATH + 'config/application-images';

const APP_IMAGE_DIALOG_ID = 'admin-app-images-image-dialog-001';

const AppImagesPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [data, setData] = useState<Page<ApplicationImage>>();
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const fetchData = async (page: number) => {
        setData(undefined);
        setSubmitting(true);
        setError(undefined);
        try {
            if (authState && authState.accessToken) {
                const queryParams = new URLSearchParams();
                setPageableQueryParams(queryParams, {
                    page,
                    size: 8,
                    sort: {
                        field: 'fileName',
                        asc: true
                    }
                });
                const response = await getData<Page<ApplicationImage>>(
                    PATH_CONFIG_APPLICATION_IMAGES,
                    queryParams,
                    authState.accessToken
                );
                if (response.error) {
                    setError(resourceState?.admin?.appImages.loadImagesError);
                } else if (response.data) {
                    setData(response.data);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const addHandler = async (file: File) => {
        setSubmitting(true);
        setError(undefined);
        try {
            const response = await postFile<ApplicationImage>(
                PATH_CONFIG_APPLICATION_IMAGES,
                file,
                authState?.accessToken || ''
            );
            if (response.data) {
                if (data) {
                    const newData = {...data};
                    newData.content = [response.data, ...data.content];
                    setData(newData);
                }
                setShowDialog(false);
            } else {
                setError(resourceState?.admin?.appImages.addImageError);
            }
        } finally {
            setSubmitting(false);
        }
    }

    const deleteHandler = async (filename: string) => {
        setSubmitting(true);
        setError(undefined);
        try {
            const response = await deleteData(
                PATH_CONFIG_APPLICATION_IMAGES + '/' + filename,
                authState?.accessToken || ''
            )
            if (response.error) {
                console.log(response.error);
            }
            await fetchData(page());
        } finally {
            setSubmitting(false);
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
    }, [authState?.accessToken]);

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
                            title={resourceState?.admin?.appImages.addImage}
                            disabled={submitting}
                            onClick={() => setShowDialog(true)}
                        ><Plus size={24}/>
                        </WiwaButton>
                    </div>

                    <div className="w-full flex justify-center pt-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start w-full">
                            {data?.content.map(appImage =>
                                <AppImage
                                    key={appImage.fileName}
                                    applicationImage={appImage}
                                    deleteHandler={deleteHandler}
                                    disabled={submitting}
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
                            disabled={submitting}
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

export default AppImagesPage;

const AppImage = ({applicationImage, deleteHandler, disabled}: {
    applicationImage: ApplicationImage,
    deleteHandler: (filename: string) => void,
    disabled?: boolean
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col border border-solid p-5 w-full">
            <div className="flex flex-row justify-end w-full">
                <WiwaButton
                    className="btn-accent"
                    title={resourceState?.admin?.appImages.deleteImage}
                    disabled={disabled}
                    onClick={() => {
                        dialogState?.showDialog({
                            type: DialogType.YES_NO,
                            title: resourceState?.admin?.appImages.deleteImageQuestionTitle,
                            message: resourceState?.admin?.appImages.deleteImageQuestionMessage,
                            callback: (answer: DialogAnswer) => {
                                if (answer === DialogAnswer.YES) {
                                    deleteHandler(applicationImage.fileName);
                                }
                            }
                        });
                    }}
                ><Trash size={24}/>
                </WiwaButton>
            </div>

            <img
                className="flex-none w-full h-24 object-scale-down object-center"
                src={applicationImage.thumbnail}
                alt={applicationImage.fileName}
                title={applicationImage.fileName}
            />

            <p className="w-full text-center">
                {applicationImage.fileName.length > 25 ? applicationImage.fileName.substring(0, 22) + '...' : applicationImage.fileName}
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
            title={resourceState?.admin?.appImages.addAppImage.title}
            label={resourceState?.admin?.appImages.addAppImage.fileLabel}
            required={true}
            placeholder={resourceState?.admin?.appImages.addAppImage.filePlaceholder}
            value={file}
            setValue={setFile}
            validate={() => {
                if (file === undefined) {
                    return {
                        valid: false,
                        message: resourceState?.admin?.appImages.addAppImage.fileRequired
                    }
                }
                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                    return {
                        valid: false,
                        message: resourceState?.admin?.appImages.addAppImage.fileFormat
                    }
                }
                return {valid: true};
            }}
            error={error}
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />, dialogState.modalRoot))
}
