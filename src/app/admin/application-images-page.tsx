import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Plus, Trash } from 'react-feather';

import { deleteApplicationImage, getApplicationImages, setApplicationImage } from '../../api/controller/config';
import { Page } from '../../api/model';
import { ApplicationImageInfo, ApplicationImageInfoField } from '../../api/model/application';
import ApplicationImageInfoTable from '../../component/app/admin/application-image-table';
import ImageDialog from '../../component/dialog/image-dialog';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { AuthContext, DialogContext, ErrorContext, ResourceContext } from '../../context';
import { DialogAnswer, DialogType } from '../../context/model/dialog';

const APP_IMAGE_DIALOG_ID = 'admin-app-images-image-dialog-001';

const ApplicationImagesPage = () => {
    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<ApplicationImageInfo>>();
    const [selected, setSelected] = useState<ApplicationImageInfo>();

    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData(page()).then();
    }, []);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);

        if (selected && data) {
            const index = data.content.findIndex(item => item.fileName === selected.fileName);
            if (index !== -1) {
                setSelected(data.content[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    const fetchData = async (page: number) => {
        setBusy(true);
        try {
            const response = await getApplicationImages({page, size: 10}, authState?.authToken?.accessToken);

            setData(response?.data);

            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const addHandler = async (file: File) => {
        setBusy(true);
        try {
            const response = await setApplicationImage(file, authState?.authToken?.accessToken);

            if (data && response?.data) {
                const newData = {...data};
                newData.content = [response.data, ...data.content];
                setData(newData);
                setSelected(response.data);
                setShowDialog(false);
            }

            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (filename: string) => {
        setBusy(true);
        try {
            const response = await deleteApplicationImage(filename, authState?.authToken?.accessToken);

            if (data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.fileName === filename);
                if (index !== -1) {
                    newData.content.splice(index, 1);
                    setData(newData);
                }
            }

            setSelected(undefined);

            errorState?.addError(response?.error);
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

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.adminNav.applicationImages || '',
                    to: '/admin/application-images'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <div className="join">
                    <WiwaButton
                        className="btn-primary join-item"
                        title={resourceState?.common?.action.add}
                        disabled={busy}
                        onClick={() => setShowDialog(true)}
                    ><Plus size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        className="btn-ghost join-item"
                        title={resourceState?.common?.action.copy}
                        disabled={busy || selected === undefined}
                        onClick={() => navigator.clipboard.writeText(
                            window.location.href
                                .replace('admin', 'api/ui')
                            + '/' + selected?.fileName)
                        }
                    ><Copy size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.common?.action.delete}
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: resourceState?.admin?.applicationImages.deleteImageQuestionTitle,
                                message: resourceState?.admin?.applicationImages.deleteImageQuestionMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        if (selected) {
                                            deleteHandler(selected.fileName).then();
                                        }
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </div>

                <div className="overflow-x-auto">
                    <ApplicationImageInfoTable
                        fields={Object.values(ApplicationImageInfoField)}
                        rows={data?.content}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>

                <div className="w-full flex justify-center">
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
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default ApplicationImagesPage;

const AppImageDialog = ({showDialog, okHandler, cancelHandler, disabled}: {
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
            okHandler={submitHandler}
            cancelHandler={cancelHandler}
        />, dialogState.modalRoot))
}
