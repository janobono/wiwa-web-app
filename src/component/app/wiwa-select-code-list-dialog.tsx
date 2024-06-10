import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'react-feather';

import BaseDialog from '../dialog/base-dialog';
import WiwaButton from '../ui/wiwa-button';
import WiwaInput from '../ui/wiwa-input';
import WiwaPageable from '../ui/wiwa-pageable';
import { CodeList } from '../../api/model/code-list';
import { useCodeListState } from '../../state/code-list';
import { useDialogState } from '../../state/dialog';
import { useResourceState } from '../../state/resource';

const WiwaSelectCodeListDialog = (
    {
        dialogId,
        showDialog,
        setShowDialog,
        onSelectCodeList
    }: {
        dialogId: string,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void,
        onSelectCodeList: (codeList: CodeList) => void
    }
) => {
    const dialogState = useDialogState();
    const codeListState = useCodeListState();
    const resourceState = useResourceState();

    const [selectedCodeList, setSelectedCodeList] = useState<CodeList>();

    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [error, setError] = useState<string>();

    const fetchData = async () => {
        setError(undefined);
        const response = await codeListState?.getCodeLists({searchField}, {page, size: 10});
        if (response?.error) {
            setError(resourceState?.common?.selectCodeListDialog.error);
        }
    }

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        setPrevious(codeListState?.data !== undefined && !codeListState?.data.first);
        setNext(codeListState?.data !== undefined && !codeListState?.data.last);
    }, [codeListState?.data]);

    return (!dialogState?.modalRoot ? null : createPortal(
            <BaseDialog id={dialogId} showDialog={showDialog}
                        closeHandler={() => setShowDialog(false)}>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center">
                            {resourceState?.common?.selectCodeListDialog.title}
                        </div>
                        {error ?
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
                                                placeholder={resourceState?.common?.selectCodeListDialog.searchPlaceholder}
                                                value={searchField}
                                                onChange={event => setSearchField(event.target.value)}
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        fetchData().then();
                                                    }
                                                }}
                                            />
                                            <WiwaButton
                                                title={resourceState?.common?.selectCodeListDialog.searchTitle}
                                                className="join-item"
                                                onClick={fetchData}
                                            ><Search size={18}/></WiwaButton>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>{resourceState?.common?.selectCodeListDialog.id}</th>
                                                <th>{resourceState?.common?.selectCodeListDialog.code}</th>
                                                <th>{resourceState?.common?.selectCodeListDialog.name}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {codeListState?.data?.content.map(codeList =>
                                                <tr key={codeList.id}
                                                    className={'hover ' + (codeList.id === selectedCodeList?.id ? 'bg-primary-content' : '')}
                                                    onClick={() => setSelectedCodeList(codeList)}
                                                >
                                                    <td>{codeList.id}</td>
                                                    <td>{codeList.code}</td>
                                                    <td>{codeList.name}</td>
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
                                            disabled={codeListState?.busy}
                                        />
                                    </div>
                                </div>
                            </>
                        }
                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                disabled={selectedCodeList === undefined}
                                onClick={() => {
                                    if (selectedCodeList) {
                                        onSelectCodeList(selectedCodeList);
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

export default WiwaSelectCodeListDialog;
