import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Edit, List, Plus, Search, Trash } from 'react-feather';

import { CodeList, CodeListChange, CodeListField } from '../../../api/model/code-list';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormInput from '../../../component/ui/wiwa-form-input';
import WiwaInput from '../../../component/ui/wiwa-input';
import WiwaPageable from '../../../component/ui/wiwa-pageable';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useCodeListState } from '../../../state/code-list';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';
import CodeListTable from '../../../component/code-list/code-list-table.tsx';

const CODE_LIST_DIALOG_ID = 'code-list-dialog-001';

const CodeListsPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const codeListState = useCodeListState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [editMode, setEditMode] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<CodeList>();
    const [searchField, setSearchField] = useState('');
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, [authState?.authUser]);

    useEffect(() => {
        setPrevious(codeListState?.data !== undefined && !codeListState?.data.first);
        setNext(codeListState?.data !== undefined && !codeListState?.data.last);

        if (selected && codeListState?.data) {
            const index = codeListState.data.content.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                setSelected(codeListState.data.content[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [codeListState?.data, selected]);

    const fetchData = async () => {
        setError(undefined);
        const response = await codeListState?.getCodeLists({searchField}, {
            page, size: 10
        });
        if (response?.error) {
            setError(resourceState?.manager?.codeLists.fetchDataError);
        }
    }

    const okHandler = async (codeListChange: CodeListChange) => {
        setError(undefined);
        let response;
        if (editMode) {
            if (selected) {
                response = await codeListState?.setCodeList(selected.id, codeListChange);
            }
        } else {
            response = await codeListState?.addCodeList(codeListChange);
        }

        if (response?.data) {
            setSelected(response?.data);
        }

        if (response?.error) {
            if (editMode) {
                setError(resourceState?.manager?.codeLists.editCodeList.error);
            } else {
                setError(resourceState?.manager?.codeLists.addCodeList.error);
            }
        }
    }

    const deleteHandler = async (id: number) => {
        setError(undefined);
        const response = await codeListState?.deleteCodeList(id);
        if (response?.error) {
            setError(resourceState?.manager?.codeLists.deleteCodeList.error);
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
                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="join pb-5 w-2/3">
                            <WiwaInput
                                className="join-item"
                                placeholder={resourceState?.manager?.codeLists.searchCodeList.placeholder}
                                value={searchField}
                                onChange={event => setSearchField(event.target.value)}
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        fetchData().then();
                                    }
                                }}
                            />
                            <WiwaButton
                                title={resourceState?.common?.action.search}
                                className="join-item"
                                onClick={fetchData}
                            ><Search size={18}/></WiwaButton>
                        </div>

                        <div className="join pb-5 px-5">
                            <WiwaButton
                                title={resourceState?.common?.action.add}
                                className="btn-primary join-item"
                                disabled={codeListState?.busy}
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
                                disabled={codeListState?.busy || selected === undefined}
                                onClick={() => {
                                    setEditMode(true);
                                    setShowDialog(true);
                                }}
                            >
                                <Edit size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                title={resourceState?.common?.action.items}
                                className="btn-ghost join-item"
                                disabled={codeListState?.busy || selected === undefined}
                                onClick={() => {
                                    if (selected) {
                                        navigate('/manager/code-lists/' + selected.id + '/items');
                                    }
                                }}
                            >
                                <List size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                title={resourceState?.common?.action.delete}
                                disabled={codeListState?.busy || selected === undefined}
                                onClick={() => {
                                    dialogState?.showDialog({
                                        type: DialogType.YES_NO,
                                        title: resourceState?.manager?.codeLists.deleteCodeList.title,
                                        message: resourceState?.manager?.codeLists.deleteCodeList.message,
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
                    </div>

                    <div className="overflow-x-auto">
                        <CodeListTable
                            fields={Object.values(CodeListField)}
                            codeLists={codeListState?.data?.content}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>

                    <div className="w-full flex justify-center pt-5">
                        <WiwaPageable
                            isPrevious={previous}
                            previousHandler={() => setPage(page + 1)}
                            page={page + 1}
                            pageHandler={() => fetchData()}
                            isNext={next}
                            nextHandler={() => setPage(page - 1)}
                            disabled={codeListState?.busy}
                        />
                    </div>
                </div>

                <CodeListDataDialog
                    showDialog={showDialog}
                    codeList={editMode ? selected : undefined}
                    okHandler={(data) => {
                        okHandler(data).then();
                        setShowDialog(false);
                    }}
                    cancelHandler={() => {
                        setError(undefined);
                        setShowDialog(false);
                    }}
                    submitting={codeListState?.busy || false}
                />
            </>
    )
}

export default CodeListsPage;

const CodeListDataDialog = ({showDialog, codeList, okHandler, cancelHandler, submitting}: {
    showDialog: boolean,
    codeList?: CodeList,
    okHandler: (codeListChange: CodeListChange) => void,
    cancelHandler: () => void,
    submitting: boolean
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [code, setCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (codeList) {
            setCode(codeList.code);
            setCodeValid(true);

            setName(codeList.name);
            setNameValid(true);
        } else {
            setCode('');
            setCodeValid(true);

            setName('');
            setNameValid(true);
        }
    }, [showDialog, codeList]);

    useEffect(() => {
        setFormValid(codeValid && nameValid);
    }, [codeValid, nameValid]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={CODE_LIST_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.codeLists.codeListDialog.title}
                    </div>

                    <WiwaFormInput
                        label={resourceState?.manager?.codeLists.codeListDialog.codeLabel}
                        required={true}
                        placeholder={resourceState?.manager?.codeLists.codeListDialog.codePlaceholder}
                        value={code}
                        setValue={setCode}
                        setValid={setCodeValid}
                        validate={() => {
                            if (code.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.codeLists.codeListDialog.codeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.manager?.codeLists.codeListDialog.nameLabel}
                        required={true}
                        placeholder={resourceState?.manager?.codeLists.codeListDialog.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.codeLists.codeListDialog.nameRequired
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
                                okHandler({code, name});
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
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
