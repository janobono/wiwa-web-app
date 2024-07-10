import { useContext, useEffect, useState } from 'react';
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
import CodeListItemTable from '../../../component/app/manager/code-lists/code-list-item-table';
import SelectCodeListItem from '../../../component/code-list/select-code-list-item';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormInputString from '../../../component/ui/wiwa-form-input-string';
import {
    AuthContext,
    CommonResourceContext,
    DialogContext,
    ErrorContext,
    ManagerResourceContext
} from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const CODE_LIST_ITEM_DIALOG_ID = 'code-lists-item-dialog-001';

const CodeListItemsPage = () => {
    const {codeListId} = useParams();

    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);

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
                {key: 0, label: commonResourceState?.resource?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.managerNav.codeLists || '',
                    to: '/manager/code-lists'
                },
                {
                    key: 2,
                    label: commonResourceState?.resource?.navigation.managerNav.codeListItems || '',
                    to: `/manager/code-lists/${codeListId}/items`
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <SelectCodeListItem codeListId={Number(codeListId)} itemSelectedHandler={setParentItem}/>

                <div className="join join-vertical md:join-horizontal w-full">
                    <WiwaButton
                        title={commonResourceState?.resource?.action.add}
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
                        title={commonResourceState?.resource?.action.edit}
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
                        title={commonResourceState?.resource?.action.moveUp}
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
                        title={commonResourceState?.resource?.action.moveDown}
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
                        title={commonResourceState?.resource?.action.delete}
                        disabled={busy || selected === undefined}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: managerResourceState?.resource?.codeLists.codeListItems.deleteCodeListItem.title,
                                message: managerResourceState?.resource?.codeLists.codeListItems.deleteCodeListItem.message,
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
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);

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
                        {managerResourceState?.resource?.codeLists.codeListItems.codeListItemDialog.title}
                    </div>

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.codeLists.codeListItems.codeListItemDialog.codeLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.codeLists.codeListItems.codeListItemDialog.codePlaceholder}
                        value={code}
                        setValue={setCode}
                        setValid={setCodeValid}
                        validate={() => {
                            if (code.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.codeLists.codeListItems.codeListItemDialog.codeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.codeLists.codeListItems.codeListItemDialog.valueLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.codeLists.codeListItems.codeListItemDialog.valuePlaceholder}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.codeLists.codeListItems.codeListItemDialog.valueRequired
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
                        >{commonResourceState?.resource?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={submitting}
                            onClick={() => {
                                cancelHandler();
                            }}
                        >{commonResourceState?.resource?.action.cancel}
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
