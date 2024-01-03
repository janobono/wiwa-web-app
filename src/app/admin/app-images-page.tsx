import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash } from 'react-feather';

import ImageDialog from '../../component/dialog/image-dialog';
import { useApplicationImageState } from '../../component/state/application-image-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { ApplicationImage } from '../../model/service';

const APP_IMAGE_DIALOG_ID = 'admin-app-images-image-dialog-001';

const AppImagesPage = () => {
    const applicationImageState = useApplicationImageState();
    const resourceState = useResourceState();

    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [error, setError] = useState<string>();

    const fetchData = async (page: number) => {
        setError(undefined);
        const response = await applicationImageState?.getApplicationImages(page, 8);
        if (response?.error) {
            setError(resourceState?.admin?.appImages.loadImagesError);
        }
    }

    const addHandler = async (file: File) => {
        setError(undefined);
        const response = await applicationImageState?.addApplicationImage(file);
        if (response?.data) {
            setShowDialog(false);
        } else {
            setError(resourceState?.admin?.appImages.addImageError);
        }
    }

    const deleteHandler = async (filename: string) => {
        setError(undefined);
        const response = await applicationImageState?.deleteApplicationImage(filename);
        if (response?.error) {
            setError(resourceState?.admin?.appImages.deleteImageError);
        }
    }

    const page = () => {
        if (applicationImageState?.data) {
            return applicationImageState?.data.number;
        }
        return 0;
    }

    useEffect(() => {
        fetchData(page()).then();
    }, []);

    useEffect(() => {
        setPrevious(applicationImageState?.data !== undefined && !applicationImageState?.data.first);
        setNext(applicationImageState?.data !== undefined && !applicationImageState?.data.last);
    }, [applicationImageState?.data]);

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
                            disabled={applicationImageState?.busy}
                            onClick={() => setShowDialog(true)}
                        ><Plus size={18}/>
                        </WiwaButton>
                    </div>

                    <div className="w-full flex justify-center pt-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start w-full">
                            {applicationImageState?.data?.content.map(appImage =>
                                <AppImage
                                    key={appImage.fileName}
                                    applicationImage={appImage}
                                    deleteHandler={deleteHandler}
                                    disabled={applicationImageState?.busy}
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
                            disabled={applicationImageState?.busy}
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
                ><Trash size={18}/>
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
