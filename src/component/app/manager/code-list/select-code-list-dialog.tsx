import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'react-feather';

import CodeListTable from './code-list-table';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaInput from '../../../ui/wiwa-input';
import WiwaPageable from '../../../ui/wiwa-pageable';
import { getCodeLists } from '../../../../api/controller/code-list';
import { Page } from '../../../../api/model';
import { CodeList, CodeListField } from '../../../../api/model/code-list';
import { AuthContext, DialogContext, ErrorContext, ResourceContext } from '../../../../context';

const SelectCodeListDialog = (
    {
        dialogId,
        showDialog,
        setShowDialog,
        okHandler
    }: {
        dialogId: string,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void,
        okHandler: (codeList: CodeList) => void
    }
) => {
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

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);
    }, [data]);

    const fetchData = async () => {
        setBusy(true);
        try {
            const response = await getCodeLists({searchField}, {page, size: 10}, authState?.authToken?.accessToken);
            setData(response?.data);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
            <BaseDialog id={dialogId} showDialog={showDialog}
                        closeHandler={() => setShowDialog(false)}>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center">
                            {resourceState?.manager?.selectCodeListDialog.title}
                        </div>
                        <div className="flex flex-col p-5 w-full">
                            <div className="flex flex-row w-full items-center justify-center">
                                <div className="join pb-5 w-2/3">
                                    <WiwaInput
                                        className="join-item"
                                        placeholder={resourceState?.manager?.selectCodeListDialog.searchPlaceholder}
                                        value={searchField}
                                        onChange={event => setSearchField(event.target.value)}
                                        onKeyUp={(event) => {
                                            if (event.key === 'Enter') {
                                                fetchData().then();
                                            }
                                        }}
                                    />
                                    <WiwaButton
                                        title={resourceState?.manager?.selectCodeListDialog.searchTitle}
                                        className="join-item"
                                        onClick={fetchData}
                                    ><Search size={18}/></WiwaButton>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <CodeListTable
                                    fields={Object.values(CodeListField)}
                                    rows={data?.content}
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
                                    disabled={busy}
                                />
                            </div>
                        </div>
                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                disabled={selected === undefined}
                                onClick={() => {
                                    if (selected) {
                                        okHandler(selected);
                                        setShowDialog(false);
                                    }
                                }}
                            >{resourceState?.common?.action.ok}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    setShowDialog(false);
                                }}
                            >{resourceState?.common?.action.cancel}
                            </WiwaButton>
                        </div>
                    </div>
                </div>
            </BaseDialog>
            , dialogState.modalRoot)
    )
}

export default SelectCodeListDialog;
