import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Edit, List, Plus, Search, Trash } from 'react-feather';

import BaseDialog from '../../component/dialog/base-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaInput from '../../component/ui/wiwa-input';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { CodeList, CodeListData, Page } from '../../model/service';
import {
    CONTEXT_PATH,
    deleteData,
    getData,
    postData,
    putData,
    setPageableQueryParams,
    setQueryParam
} from '../../data';

const PATH_CODE_LISTS = CONTEXT_PATH + 'code-lists';

const CODE_LIST_DIALOG_ID = 'code-list-dialog-001';

const CodeListsPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [showDialog, setShowDialog] = useState(false);
    const [selectedCodeList, setSelectedCodeList] = useState<CodeList>();

    const [data, setData] = useState<Page<CodeList>>();
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const fetchData = async () => {
        setError(undefined);
        setSubmitting(true);
        try {
            if (authState?.accessToken !== undefined) {
                const pageable = {
                    page: page,
                    size: 10,
                    sort: {
                        field: 'name',
                        asc: true
                    }
                }

                const queryParams = new URLSearchParams();
                setPageableQueryParams(queryParams, pageable);
                setQueryParam(queryParams, 'searchField', searchField);
                const response = await getData<Page<CodeList>>(
                    PATH_CODE_LISTS,
                    queryParams,
                    authState?.accessToken || ''
                );

                if (response.error) {
                    setError(resourceState?.manager?.codeLists.fetchDataError);
                } else if (response.data) {
                    setData(response.data);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const okHandler = async (codeListData: CodeListData) => {
        setSubmitting(true);
        setError(undefined);
        try {
            let response;
            if (selectedCodeList) {
                response = await putData<CodeList>(
                    PATH_CODE_LISTS + '/' + selectedCodeList.id,
                    codeListData,
                    authState?.accessToken || ''
                );
            } else {
                response = await postData<CodeList>(
                    PATH_CODE_LISTS,
                    codeListData,
                    authState?.accessToken || ''
                );
            }
            if (response.data) {
                if (selectedCodeList) {
                    await fetchData();
                } else {
                    if (data) {
                        const newData = {...data};
                        newData.content = [response.data, ...data.content];
                        setData(newData);
                    }
                }
                setShowDialog(false);
            } else {
                if (selectedCodeList) {
                    setError(resourceState?.manager?.codeLists.editCodeList.error);
                } else {
                    setError(resourceState?.manager?.codeLists.addCodeList.error);
                }
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
                PATH_CODE_LISTS + '/' + id,
                authState?.accessToken || ''
            )
            if (response.error) {
                setError(resourceState?.manager?.codeLists.deleteCodeList.error);
            } else {
                await fetchData();
            }
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);
    }, [data]);

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
                                title={resourceState?.manager?.codeLists.searchCodeList.title}
                                className="join-item"
                                onClick={fetchData}
                            ><Search size={18}/></WiwaButton>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.manager?.codeLists.id}</th>
                                <th>{resourceState?.manager?.codeLists.code}</th>
                                <th>{resourceState?.manager?.codeLists.name}</th>
                                <th>
                                    <WiwaButton
                                        title={resourceState?.manager?.codeLists.addCodeList.title}
                                        className="btn-primary md:btn-xs"
                                        disabled={submitting}
                                        onClick={() => {
                                            setSelectedCodeList(undefined);
                                            setShowDialog(true);
                                        }}
                                    >
                                        <Plus size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.content.map(codeList =>
                                <tr key={codeList.id} className="hover">
                                    <td>{codeList.id}</td>
                                    <td>{codeList.code}</td>
                                    <td>{codeList.name}</td>
                                    <th>
                                        <div className="join">
                                            <WiwaButton
                                                title={resourceState?.manager?.codeLists.editCodeList.title}
                                                className="btn-primary md:btn-xs join-item"
                                                disabled={submitting}
                                                onClick={() => {
                                                    setSelectedCodeList(codeList);
                                                    setShowDialog(true);
                                                }}
                                            >
                                                <Edit size={18}/>
                                            </WiwaButton>
                                            <WiwaButton
                                                title={resourceState?.manager?.codeLists.codeListItems.title}
                                                className="btn-secondary md:btn-xs join-item"
                                                disabled={submitting}
                                                onClick={() => navigate(codeList.id + '/items')}
                                            >
                                                <List size={18}/>
                                            </WiwaButton>
                                            <WiwaButton
                                                className="btn-accent md:btn-xs join-item"
                                                title={resourceState?.manager?.codeLists.deleteCodeList.title}
                                                disabled={submitting}
                                                onClick={() => {
                                                    dialogState?.showDialog({
                                                        type: DialogType.YES_NO,
                                                        title: resourceState?.manager?.codeLists.deleteCodeList.title,
                                                        message: resourceState?.manager?.codeLists.deleteCodeList.message,
                                                        callback: (answer: DialogAnswer) => {
                                                            if (answer === DialogAnswer.YES) {
                                                                deleteHandler(codeList.id).then();
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
                    <div className="w-full flex justify-center pt-5">
                        <WiwaPageable
                            isPrevious={previous}
                            previousHandler={() => setPage(page + 1)}
                            page={page + 1}
                            pageHandler={() => fetchData()}
                            isNext={next}
                            nextHandler={() => setPage(page - 1)}
                            disabled={submitting}
                        />
                    </div>
                </div>

                <CodeListDataDialog
                    showDialog={showDialog}
                    codeList={selectedCodeList}
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

export default CodeListsPage;

const CodeListDataDialog = ({showDialog, codeList, okHandler, cancelHandler, error, submitting}: {
    showDialog: boolean,
    codeList?: CodeList,
    okHandler: (codeListData: CodeListData) => void,
    cancelHandler: () => void,
    error?: string,
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