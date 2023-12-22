import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Edit, Plus, Trash } from 'react-feather';

import MdDialog from '../../component/dialog/md-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { ApplicationInfo } from '../../model/service';
import { CONTEXT_PATH, getData, postData } from '../../data';

const PATH_CONFIG_APPLICATION_INFO = CONTEXT_PATH + 'config/application-info';
const PATH_UI_APPLICATION_INFO = CONTEXT_PATH + 'ui/application-info';

const APP_INFO_DIALOG_ID = 'admin-app-info-item-dialog-001';

const AppInfoPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [data, setData] = useState<ApplicationInfo>();

    const [currentIndex, setCurrentIndex] = useState<number>();
    const [currentItem, setCurrentItem] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setError(undefined);
        setChanged(false);
        const fetchApplicationInfo = async () => {
            const response = await getData<ApplicationInfo>(PATH_UI_APPLICATION_INFO);
            if (response.data) {
                setData(response.data);
            }
        }
        fetchApplicationInfo().then();
    }, []);

    const editHandler = (index?: number) => {
        if (index !== undefined && data !== undefined) {
            setCurrentIndex(index);
            setCurrentItem(data.items[index]);
        } else {
            setCurrentIndex(undefined);
            setCurrentItem('');
        }
        setShowDialog(true);
    }

    const setItemHandler = (item: string, index?: number) => {
        if (data) {
            const _data = {items: [...data.items]};
            if (index !== undefined) {
                _data.items[index] = item;
            } else {
                _data.items.push(item);
            }
            setData(_data);
            setShowDialog(false);
            setChanged(true);
        }
    }

    const deleteItemHandler = (index: number) => {
        if (data) {
            const _data = {items: [...data.items]};
            _data.items.splice(index, 1);
            setData(_data);
        }
    }

    const confirmHandler = async () => {
        setSubmitting(true);
        try {
            if (data) {
                const response = await postData<ApplicationInfo>(
                    PATH_CONFIG_APPLICATION_INFO,
                    data,
                    authState?.accessToken || ''
                );
                if (response.error) {
                    setError(resourceState?.admin?.applicationInfo.error);
                } else {
                    setData(data);
                    setChanged(false);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 gap-5 w-full">
                    <div className="w-full flex justify-end">
                        <div className="join">
                            <WiwaButton
                                className="btn-primary join-item"
                                title={resourceState?.admin?.applicationInfo.add}
                                disabled={submitting}
                                onClick={() => {
                                    editHandler();
                                }}
                            ><Plus size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                className="btn-secondary join-item"
                                title={resourceState?.admin?.applicationInfo.confirm}
                                disabled={submitting || !changed}
                                onClick={confirmHandler}
                            ><Check size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {data ?
                            data.items.map(
                                (item, index) =>
                                    <AppInfoItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        deleteHandler={deleteItemHandler}
                                        editHandler={editHandler}
                                        disabled={submitting}
                                    />
                            )
                            : <></>
                        }
                    </div>
                </div>

                <AppInfoDialog
                    index={currentIndex}
                    item={currentItem}
                    showDialog={showDialog}
                    okHandler={setItemHandler}
                    cancelHandler={() => {
                        setShowDialog(false);
                    }}
                />
            </>
    )
}

export default AppInfoPage;

const AppInfoItem = (
    {
        item,
        index,
        deleteHandler,
        editHandler,
        disabled
    }: {
        item: string,
        index: number,
        deleteHandler: (index: number) => void,
        editHandler: (index: number) => void,
        disabled?: boolean
    }) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col border border-solid p-5 w-full">
            <div className="flex flex-row justify-end w-full">
                <div className="join">
                    <WiwaButton
                        className="btn-primary join-item"
                        title={resourceState?.admin?.applicationInfo.edit}
                        disabled={disabled}
                        onClick={() => {
                            editHandler(index);
                        }}
                    ><Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.admin?.applicationInfo.delete}
                        disabled={disabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: resourceState?.admin?.applicationInfo.deleteItemQuestionTitle,
                                message: resourceState?.admin?.applicationInfo.deleteItemQuestionMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        deleteHandler(index);
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </div>
            </div>

            <WiwaMarkdownRenderer className="prose prose-sm" md={item}/>
        </div>
    )
}

const AppInfoDialog = (
    {
        index,
        item,
        showDialog,
        okHandler,
        cancelHandler,
    }: {
        index?: number
        item: string,
        showDialog: boolean,
        okHandler: (item: string, index?: number) => void,
        cancelHandler: () => void,
    }) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(item);
    }, [item, showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={false}
            id={APP_INFO_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.admin?.applicationInfo.editItemDialog.title}
            label={resourceState?.admin?.applicationInfo.editItemDialog.valueLabel}
            required={true}
            placeholder={resourceState?.admin?.applicationInfo.editItemDialog.valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if (value.trim().length === 0) {
                    return {
                        valid: false,
                        message: resourceState?.admin?.applicationInfo.editItemDialog.valueRequired
                    };
                }
                return {valid: true};
            }}
            rows={20}
            okHandler={() => okHandler(value, index)}
            cancelHandler={cancelHandler}
        />
        , dialogState.modalRoot))
}
