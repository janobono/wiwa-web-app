import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Edit, List, Plus, Search, Trash } from 'react-feather';

import { addCodeList, deleteCodeList, getCodeLists, setCodeList } from '../../../api/controller/code-list';
import { Page } from '../../../api/model';
import { CodeList, CodeListChange, CodeListField } from '../../../api/model/code-list';
import CodeListTable from '../../../component/app/manager/code-lists/code-list-table';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormInputString from '../../../component/ui/wiwa-form-input-string';
import WiwaInput from '../../../component/ui/wiwa-input';
import WiwaPageable from '../../../component/ui/wiwa-pageable';
import { AuthContext, DialogContext, ErrorContext, ResourceContext } from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const CODE_LIST_DIALOG_ID = 'code-lists-dialog-001';

const CodeListsPage = () => {
    const navigate = useNavigate();

    const authState = useContext(AuthContext);
    const dialogState = useContext(DialogContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<CodeList>>();
    const [selected, setSelected] = useState<CodeList>();

    const [searchField, setSearchField] = useState('');
    const [page, setPage] = useState(0);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);

        if (selected && data) {
            const index = data.content.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                setSelected(data.content[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    const fetchData = async () => {
        setBusy(true);
        try {
            const response = await getCodeLists(
                {searchField},
                {page, size: 10},
                authState?.authToken?.accessToken
            );
            setData(response?.data);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const okHandler = async (codeListChange: CodeListChange) => {
        setBusy(true);
        try {
            let response;
            if (editMode) {
                if (selected) {
                    response = await setCodeList(selected.id, codeListChange, authState?.authToken?.accessToken);
                }
            } else {
                response = await addCodeList(codeListChange, authState?.authToken?.accessToken);
            }

            if (data && response?.data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === response.data.id);
                if (index !== -1) {
                    newData.content[index] = response.data;
                } else {
                    newData.content.push(response.data);
                }
                setData(newData);
            }

            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (id: number) => {
        setBusy(true);
        try {
            const response = await deleteCodeList(id, authState?.authToken?.accessToken);

            setSelected(undefined);

            if (data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content.splice(index, 1);
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
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="join join-vertical md:join-horizontal w-full">
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
                            setEditMode(true);
                            setShowDialog(true);
                        }}
                    >
                        <Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={resourceState?.common?.action.items}
                        className="btn-ghost join-item"
                        disabled={busy || selected === undefined}
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
                        disabled={busy || selected === undefined}
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
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </div>

                <div className="overflow-x-auto">
                    <CodeListTable
                        fields={Object.values(CodeListField)}
                        rows={data?.content}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>

                <div className="flex justify-center w-full">
                    <WiwaPageable
                        isPrevious={previous}
                        previousHandler={() => setPage(page + 1)}
                        page={page + 1}
                        pageHandler={() => fetchData()}
                        isNext={next}
                        nextHandler={() => setPage(page - 1)}
                        disabled={busy}
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
                cancelHandler={() => setShowDialog(false)}
                submitting={busy || false}
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
    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);

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

                    <WiwaFormInputString
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

                    <WiwaFormInputString
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
