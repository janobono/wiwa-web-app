import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { ArrowDown, ArrowUp, Edit, Plus, Trash } from 'react-feather';

import WiwaSelectCodeListItem from '../../component/app/wiwa-select-code-list-item';
import BaseDialog from '../../component/dialog/base-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import { CodeList, CodeListItem, CodeListItemData, Page } from '../../model/service';
import { CONTEXT_PATH, deleteData, getData, patchData, postData, putData, setQueryParam } from '../../data';

const PATH_CODE_LIST_ITEMS = CONTEXT_PATH + 'code-lists/items';

const CODE_LIST_ITEM_DIALOG_ID = 'code-list-item-dialog-001';

const CodeListItemsPage = () => {
    const {codeListId} = useParams();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [showDialog, setShowDialog] = useState(false);
    const [parentItem, setParentItem] = useState<CodeListItem>();
    const [selectedItem, setSelectedItem] = useState<CodeListItem>();

    const [data, setData] = useState<CodeListItem[]>();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        fetchData().then();
    }, [parentItem]);

    const fetchData = async () => {
        setError(undefined);
        setSubmitting(true);
        try {
            if (authState?.accessToken !== undefined) {
                const queryParams = new URLSearchParams();
                if (parentItem) {
                    setQueryParam(queryParams, 'parent-id', parentItem.id);
                } else {
                    setQueryParam(queryParams, 'root', 'true');
                }
                const response = await getData<Page<CodeListItem>>(
                    PATH_CODE_LIST_ITEMS,
                    queryParams,
                    authState?.accessToken || ''
                );

                if (response.error) {
                    setError(resourceState?.manager?.codeLists.codeListItems.fetchDataError);
                } else if (response.data) {
                    setData(response.data.content);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const okHandler = async (codeListItemData: CodeListItemData) => {
        setSubmitting(true);
        setError(undefined);
        try {
            let response;
            if (selectedItem) {
                response = await putData<CodeList>(
                    PATH_CODE_LIST_ITEMS + '/' + selectedItem.id,
                    codeListItemData,
                    authState?.accessToken || ''
                );
            } else {
                response = await postData<CodeList>(
                    PATH_CODE_LIST_ITEMS,
                    codeListItemData,
                    authState?.accessToken || ''
                );
            }
            if (response.data) {
                await fetchData();
                setShowDialog(false);
            } else {
                if (selectedItem) {
                    setError(resourceState?.manager?.codeLists.codeListItems.editCodeListItem.error);
                } else {
                    setError(resourceState?.manager?.codeLists.codeListItems.addCodeListItem.error);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const moveUpHandler = async (id: number) => {
        setSubmitting(true);
        setError(undefined);
        try {
            const response = await patchData<CodeList>(
                PATH_CODE_LIST_ITEMS + '/' + id + '/move-up',
                undefined,
                authState?.accessToken || ''
            );
            if (response.data) {
                await fetchData();
            } else {
                setError(resourceState?.manager?.codeLists.codeListItems.moveUpCodeListItem.error);
            }
        } finally {
            setSubmitting(false);
        }
    }

    const moveDownHandler = async (id: number) => {
        setSubmitting(true);
        setError(undefined);
        try {
            const response = await patchData<CodeList>(
                PATH_CODE_LIST_ITEMS + '/' + id + '/move-down',
                undefined,
                authState?.accessToken || ''
            );
            if (response.data) {
                await fetchData();
            } else {
                setError(resourceState?.manager?.codeLists.codeListItems.moveDownCodeListItem.error);
            }
        } finally {
            setSubmitting(false);
        }
    }

    const deleteHandler = async (id: number) => {
        setSubmitting(true);
        setError(undefined);
        try {
            const response = await deleteData(
                PATH_CODE_LIST_ITEMS + '/' + id,
                authState?.accessToken || ''
            )
            if (response.error) {
                setError(resourceState?.manager?.codeLists.codeListItems.deleteCodeListItem.error);
            } else {
                await fetchData();
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
                <div className="flex flex-col p-5 w-full">
                    <WiwaSelectCodeListItem codeListId={Number(codeListId)} itemSelectedHandler={setParentItem}/>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.manager?.codeLists.codeListItems.id}</th>
                                <th>{resourceState?.manager?.codeLists.codeListItems.code}</th>
                                <th>{resourceState?.manager?.codeLists.codeListItems.value}</th>
                                <th>
                                    <WiwaButton
                                        title={resourceState?.manager?.codeLists.codeListItems.addCodeListItem.title}
                                        className="btn-primary btn-xs"
                                        disabled={submitting}
                                        onClick={() => {
                                            setSelectedItem(undefined);
                                            setShowDialog(true);
                                        }}
                                    >
                                        <Plus size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map(item =>
                                <tr key={item.id} className="hover">
                                    <td>{item.id}</td>
                                    <td>{item.code}</td>
                                    <td>{item.value}</td>
                                    <th>
                                        <div className="join">
                                            <WiwaButton
                                                title={resourceState?.manager?.codeLists.codeListItems.editCodeListItem.title}
                                                className="btn-primary btn-xs join-item"
                                                disabled={submitting}
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setShowDialog(true);
                                                }}
                                            >
                                                <Edit size={18}/>
                                            </WiwaButton>

                                            <WiwaButton
                                                title={resourceState?.manager?.codeLists.codeListItems.moveUpCodeListItem.title}
                                                className="btn-primary btn-xs join-item"
                                                disabled={submitting}
                                                onClick={() => {
                                                    if (item.id !== undefined) {
                                                        moveUpHandler(item.id).then();
                                                    }
                                                }}
                                            >
                                                <ArrowUp size={18}/>
                                            </WiwaButton>

                                            <WiwaButton
                                                title={resourceState?.manager?.codeLists.codeListItems.moveDownCodeListItem.title}
                                                className="btn-primary btn-xs join-item"
                                                disabled={submitting}
                                                onClick={() => {
                                                    if (item.id !== undefined) {
                                                        moveDownHandler(item.id).then();
                                                    }
                                                }}
                                            >
                                                <ArrowDown size={18}/>
                                            </WiwaButton>

                                            <WiwaButton
                                                className="btn-accent btn-xs join-item"
                                                title={resourceState?.manager?.codeLists.codeListItems.deleteCodeListItem.title}
                                                disabled={submitting}
                                                onClick={() => {
                                                    dialogState?.showDialog({
                                                        type: DialogType.YES_NO,
                                                        title: resourceState?.manager?.codeLists.codeListItems.deleteCodeListItem.title,
                                                        message: resourceState?.manager?.codeLists.codeListItems.deleteCodeListItem.message,
                                                        callback: (answer: DialogAnswer) => {
                                                            if (answer === DialogAnswer.YES) {
                                                                deleteHandler(item.id).then();
                                                            }
                                                        }
                                                    });
                                                }}
                                            ><Trash size={18}/>
                                            </WiwaButton>
                                        </div>
                                    </th>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <CodeListItemDataDialog
                    showDialog={showDialog}
                    codeListId={Number(codeListId)}
                    parent={parentItem}
                    codeList={selectedItem}
                    okHandler={okHandler}
                    cancelHandler={() => {
                        setError(undefined);
                        setShowDialog(false);
                    }}
                    error={error}
                    submitting={submitting}
                />
            </>
    )
}

export default CodeListItemsPage;

const CodeListItemDataDialog = (
    {
        showDialog,
        codeListId,
        parent,
        codeList,
        okHandler,
        cancelHandler,
        error,
        submitting
    }: {
        showDialog: boolean,
        codeListId: number,
        parent?: CodeListItem,
        codeList?: CodeListItem,
        okHandler: (codeListItemData: CodeListItemData) => void,
        cancelHandler: () => void,
        error?: string,
        submitting: boolean
    }) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [code, setCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);

    const [value, setValue] = useState('');
    const [valueValid, setValueValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (codeList) {
            setCode(codeList.code);
            setCodeValid(true);

            setValue(codeList.value);
            setValueValid(true);
        } else {
            setCode('');
            setCodeValid(true);

            setValue('');
            setValueValid(true);
        }
    }, [showDialog, codeList]);

    useEffect(() => {
        setFormValid(codeValid && valueValid);
    }, [codeValid, valueValid]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={CODE_LIST_ITEM_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.codeLists.codeListItems.codeListItemDialog.title}
                    </div>

                    <WiwaFormInput
                        label={resourceState?.manager?.codeLists.codeListItems.codeListItemDialog.codeLabel}
                        required={true}
                        placeholder={resourceState?.manager?.codeLists.codeListItems.codeListItemDialog.codePlaceholder}
                        value={code}
                        setValue={setCode}
                        setValid={setCodeValid}
                        validate={() => {
                            if (code.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.codeLists.codeListItems.codeListItemDialog.codeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.manager?.codeLists.codeListItems.codeListItemDialog.valueLabel}
                        required={true}
                        placeholder={resourceState?.manager?.codeLists.codeListItems.codeListItemDialog.valuePlaceholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.codeLists.codeListItems.codeListItemDialog.valueRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={submitting || !formValid}
                            onClick={() => {
                                okHandler({codeListId, parentId: (parent ? parent.id : undefined), code, value});
                            }}
                        >{resourceState?.common?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={submitting}
                            onClick={() => {
                                cancelHandler();
                            }}
                        >{resourceState?.common?.action.cancel}
                        </WiwaButton>
                    </div>
                    {error &&
                        <label className="label">
                            <span className="label-text-alt text-error">{error}</span>
                        </label>
                    }
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
