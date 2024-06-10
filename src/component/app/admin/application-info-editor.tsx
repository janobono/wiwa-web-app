import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Plus, Trash } from 'react-feather';

import { setApplicationInfo } from '../../../api/controller/config';
import { getApplicationInfo } from '../../../api/controller/ui';
import MdDialog from '../../../component/dialog/md-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaMarkdownRenderer from '../../../component/ui/wiwa-markdown-renderer';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';

const APP_INFO_DIALOG_ID = 'admin-app-info-item-dialog-001';

const ApplicationInfoEditor = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState<boolean>();
    const [data, setData] = useState<string[]>();

    const [currentIndex, setCurrentIndex] = useState<number>();
    const [currentItem, setCurrentItem] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getApplicationInfo().then(data => setData(data.data));
    }, []);

    const editHandler = (index?: number) => {
        if (index !== undefined && data !== undefined) {
            setCurrentIndex(index);
            setCurrentItem(data[index]);
        } else {
            setCurrentIndex(undefined);
            setCurrentItem('');
        }
        setShowDialog(true);
    }

    const setItemHandler = (item: string, index?: number) => {
        setBusy(true);
        try {
            if (data) {
                const _data = [...data];
                if (index !== undefined) {
                    _data[index] = item;
                } else {
                    _data.push(item);
                }
                saveData(_data).then();
                setShowDialog(false);
            }
        } finally {
            setBusy(false);
        }
    }

    const deleteItemHandler = (index: number) => {
        setBusy(true);
        try {
            if (data) {
                const _data = [...data];
                _data.splice(index, 1);
                saveData(_data).then();
            }
        } finally {
            setBusy(false);
        }
    }

    const saveData = async (data: string[]) => {
        const response = await setApplicationInfo(data, authState?.authToken?.accessToken);
        setData(response.data);
    }

    return (
        <>
            <div className="border border-solid flex flex-row justify-between">
                <div className="flex flex-col p-5 gap-5 w-full">
                    <div className="flex flex-row gap-5 w-full align-middle">
                        <div className="flex w-full items-center justify-center">
                            <span>
                                {resourceState?.admin?.baseInfo.applicationInfo.title}
                            </span>
                        </div>
                        <div className="flex justify-end">
                            <WiwaButton
                                className="btn-primary join-item"
                                title={resourceState?.common?.action.add}
                                disabled={busy}
                                onClick={() => {
                                    editHandler();
                                }}
                            ><Plus size={18}/>
                            </WiwaButton>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {data ?
                            data.map(
                                (item, index) =>
                                    <AppInfoItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        deleteHandler={deleteItemHandler}
                                        editHandler={editHandler}
                                        disabled={busy}
                                    />
                            )
                            : <></>
                        }
                    </div>
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

export default ApplicationInfoEditor;

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
                        title={resourceState?.common?.action.edit}
                        disabled={disabled}
                        onClick={() => {
                            editHandler(index);
                        }}
                    ><Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.common?.action.delete}
                        disabled={disabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: resourceState?.admin?.baseInfo.applicationInfo.deleteItemQuestionTitle,
                                message: resourceState?.admin?.baseInfo.applicationInfo.deleteItemQuestionMessage,
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
            title={resourceState?.admin?.baseInfo.applicationInfo.editItemDialog.title}
            label={resourceState?.admin?.baseInfo.applicationInfo.editItemDialog.valueLabel}
            required={true}
            placeholder={resourceState?.admin?.baseInfo.applicationInfo.editItemDialog.valuePlaceholder}
            value={value}
            setValue={setValue}
            validate={() => {
                if (value.trim().length === 0) {
                    return {
                        valid: false,
                        message: resourceState?.admin?.baseInfo.applicationInfo.editItemDialog.valueRequired
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
