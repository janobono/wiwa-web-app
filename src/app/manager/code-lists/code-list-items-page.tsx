import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { ArrowDown, ArrowUp, Edit, Plus, Trash } from 'react-feather';

import { CodeListItem, CodeListItemChange } from '../../../api/model/code-list';
import WiwaSelectCodeListItem from '../../../component/app/wiwa-select-code-list-item';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormInput from '../../../component/ui/wiwa-form-input';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useCodeListItemState } from '../../../state/code-list-item';
import { useResourceState } from '../../../state/resource';

const CODE_LIST_ITEM_DIALOG_ID = 'code-list-item-dialog-001';

const CodeListItemsPage = () => {
    const {codeListId} = useParams();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();
    const codeListItemState = useCodeListItemState();

    const [showDialog, setShowDialog] = useState(false);
    const [parentItem, setParentItem] = useState<CodeListItem>();
    const [selectedItem, setSelectedItem] = useState<CodeListItem>();

    const [error, setError] = useState<string>();

    useEffect(() => {
        fetchData().then();
    }, [authState?.authUser, parentItem]);

    const fetchData = async () => {
        setError(undefined);
        const response = await codeListItemState?.getCodeListItems({
            codeListId: Number(codeListId),
            parentId: parentItem?.id
        });
        if (response?.error) {
            setError(resourceState?.manager?.codeLists.codeListItems.fetchDataError);
        }
    }

    const okHandler = async (codeListItemChange: CodeListItemChange) => {
        setError(undefined);
        let response;
        if (selectedItem) {
            response = await codeListItemState?.setCodeListItem(selectedItem.id, codeListItemChange);
        } else {
            response = await codeListItemState?.addCodeListItem(codeListItemChange);
        }
        if (response?.error) {
            if (selectedItem) {
                setError(resourceState?.manager?.codeLists.codeListItems.editCodeListItem.error);
            } else {
                setError(resourceState?.manager?.codeLists.codeListItems.addCodeListItem.error);
            }
        }
    }

    const moveUpHandler = async (id: number) => {
        setError(undefined);
        const response = await codeListItemState?.moveUpCodeListItem(id);
        if (response?.error) {
            setError(resourceState?.manager?.codeLists.codeListItems.moveUpCodeListItem.error);
        }
        fetchData().then();
    }

    const moveDownHandler = async (id: number) => {
        setError(undefined);
        const response = await codeListItemState?.moveDownCodeListItem(id);
        if (response?.error) {
            setError(resourceState?.manager?.codeLists.codeListItems.moveDownCodeListItem.error);
        }
        fetchData().then();
    }

    const deleteHandler = async (id: number) => {
        setError(undefined);
        const response = await codeListItemState?.deleteCodeListItem(id);
        if (response?.error) {
            setError(resourceState?.manager?.codeLists.codeListItems.deleteCodeListItem.error);
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
                                        disabled={codeListItemState?.busy}
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
                            {codeListItemState?.data?.map(item =>
                                <tr key={item.id} className="hover">
                                    <td>{item.id}</td>
                                    <td>{item.code}</td>
                                    <td>{item.value}</td>
                                    <th>
                                        <div className="join">
                                            <WiwaButton
                                                title={resourceState?.manager?.codeLists.codeListItems.editCodeListItem.title}
                                                className="btn-primary btn-xs join-item"
                                                disabled={codeListItemState?.busy}
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
                                                disabled={codeListItemState?.busy}
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
                                                disabled={codeListItemState?.busy}
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
                                                disabled={codeListItemState?.busy}
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
                    okHandler={(data) => {
                        okHandler(data).then();
                        setShowDialog(false);
                    }}
                    cancelHandler={() => {
                        setError(undefined);
                        setShowDialog(false);
                    }}
                    error={error}
                    submitting={codeListItemState?.busy || false}
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
