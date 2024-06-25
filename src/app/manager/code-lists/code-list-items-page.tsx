import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { ArrowDown, ArrowUp, Edit, Plus, Trash } from 'react-feather';

import {
    addCodeListItem,
    deleteCodeListItem,
    getCodeListItems,
    moveCodeListItemDown,
    moveCodeListItemUp,
    setCodeListItem
} from '../../../api/controller/code-list-item';
import { CodeListItem, CodeListItemChange, CodeListItemField } from '../../../api/model/code-list';
import CodeListItemTable from '../../../component/app/manager/code-list/code-list-item-table';
import SelectCodeListItem from '../../../component/code-list/select-code-list-item';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormInputString from '../../../component/ui/wiwa-form-input-string';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const CODE_LIST_ITEM_DIALOG_ID = 'code-list-item-dialog-001';

const CodeListItemsPage = () => {
    const {codeListId} = useParams();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<CodeListItem[]>();
    const [selected, setSelected] = useState<CodeListItem>();

    const [parentItem, setParentItem] = useState<CodeListItem>();

    const [editMode, setEditMode] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, [authState?.authUser, parentItem]);

    useEffect(() => {
        if (selected && data) {
            const index = data.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                setSelected(data[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    const fetchData = async () => {
        setBusy(true);
        try {
            const response = await getCodeListItems(
                {
                    codeListId: Number(codeListId),
                    root: !parentItem,
                    parentId: parentItem?.id,
                },
                {
                    page: 0,
                    size: 10000,
                    sort: {
                        field: CodeListItemField.sortNum,
                        asc: true
                    }
                },
                authState?.authToken?.accessToken
            );
            setData(response?.data?.content);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const okHandler = async (codeListItemChange: CodeListItemChange) => {
        setBusy(true);
        try {
            let response;
            if (editMode) {
                if (selected) {
                    response = await setCodeListItem(selected.id, codeListItemChange, authState?.authToken?.accessToken);
                }
            } else {
                response = await addCodeListItem(codeListItemChange, authState?.authToken?.accessToken);
            }

            if (data && response?.data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === response.data.id);
                if (index !== -1) {
                    newData[index] = response.data;
                } else {
                    newData.push(response.data);
                }
                setData(newData);
            }

            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const moveUpHandler = async (id: number) => {
        setBusy(true);
        try {
            const response = await moveCodeListItemUp(id, authState?.authToken?.accessToken);
            errorState?.addError(response?.error);
            fetchData().then();
        } finally {
            setBusy(false);
        }
    }

    const moveDownHandler = async (id: number) => {
        setBusy(true);
        try {
            const response = await moveCodeListItemDown(id, authState?.authToken?.accessToken);
            errorState?.addError(response?.error);
            fetchData().then();
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (id: number) => {
        setBusy(true);
        try {
            const response = await deleteCodeListItem(id, authState?.authToken?.accessToken);
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.splice(index, 1);
                }
                setData(newData);
            }
            errorState?.addError(response?.error);
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
                    label: resourceState?.common?.navigation.managerNav.codeLists || '',
                    to: '/manager/code-lists'
                },
                {
                    key: 2,
                    label: resourceState?.common?.navigation.managerNav.codeListItems || '',
                    to: `/manager/code-lists/${codeListId}/items`
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <SelectCodeListItem codeListId={Number(codeListId)} itemSelectedHandler={setParentItem}/>

                <div className="join join-vertical md:join-horizontal w-full">
                    <WiwaButton
                        title={resourceState?.common?.action.add}
                        className="btn-primary join-item"
                        disabled={busy}
                        onClick={() => {
                            setEditMode(false);
                            setShowDialog(true);
                        }}
                    >
                        <Plus size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        title={resourceState?.common?.action.edit}
                        className="btn-secondary join-item"
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            if (selected) {
                                setEditMode(true);
                                setShowDialog(true);
                            }
                        }}
                    >
                        <Edit size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        title={resourceState?.common?.action.moveUp}
                        className="btn-ghost join-item"
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            if (selected) {
                                moveUpHandler(selected.id).then();
                            }
                        }}
                    >
                        <ArrowUp size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        title={resourceState?.common?.action.moveDown}
                        className="btn-ghost join-item"
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            if (selected) {
                                moveDownHandler(selected.id).then();
                            }
                        }}
                    >
                        <ArrowDown size={18}/>
                    </WiwaButton>

                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.common?.action.delete}
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: resourceState?.manager?.codeLists.codeListItems.deleteCodeListItem.title,
                                message: resourceState?.manager?.codeLists.codeListItems.deleteCodeListItem.message,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        if (selected) {
                                            deleteHandler(selected.id).then();
                                        }
                                        setSelected(undefined);
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </div>

                <div className="overflow-x-auto">
                    <CodeListItemTable
                        fields={Object.values(CodeListItemField)}
                        rows={data}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
            </div>

            <CodeListItemDataDialog
                showDialog={showDialog}
                codeListId={Number(codeListId)}
                parent={parentItem}
                codeList={editMode ? selected : undefined}
                okHandler={(data) => {
                    okHandler(data).then();
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
                submitting={busy}
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
        okHandler: (codeListItemChange: CodeListItemChange) => void,
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

                    <WiwaFormInputString
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

                    <WiwaFormInputString
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
