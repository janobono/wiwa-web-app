import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Image, List, Plus, Trash } from 'react-feather';

import { BoardField } from '../../../api/model/board';
import BoardChangeDialog from '../../../component/app/manager/boards/board-change-dialog';
import { BoardContext } from '../../../component/board/board-provider';
import BoardTable from '../../../component/board/board-table';
import BoardSearchCriteriaForm from '../../../component/board/board-search-criteria-form';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaPageable from '../../../component/ui/wiwa-pageable';
import { DialogContext, ResourceContext } from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const BOARD_DIALOG_ID = 'manager-board-dialog-001';

const BoardsPage = () => {
    const navigate = useNavigate();

    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);
    const boardState = useContext(BoardContext);

    const [editMode, setEditMode] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        boardState?.getBoards().then();
    }, []);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.managerNav.boards || '',
                    to: '/manager/boards'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <BoardSearchCriteriaForm searchHandler={(criteria) => boardState?.setCriteria(criteria)}>
                    <>
                        <WiwaButton
                            title={resourceState?.common?.action.add}
                            className="btn-primary join-item"
                            disabled={boardState?.busy}
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
                            disabled={boardState?.busy || !boardState?.editEnabled}
                            onClick={() => {
                                setEditMode(true);
                                setShowDialog(true);
                            }}
                        >
                            <Edit size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            title={resourceState?.common?.action.categories}
                            className="btn-ghost join-item"
                            disabled={boardState?.busy || !boardState?.editEnabled}
                            onClick={() => {
                                if (boardState?.selected) {
                                    navigate('/manager/boards/categories');
                                }
                            }}
                        >
                            <List size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            title={resourceState?.common?.action.image}
                            className="btn-ghost join-item"
                            disabled={boardState?.busy || !boardState?.editEnabled}
                            onClick={() => {
                                if (boardState?.selected) {
                                    navigate('/manager/boards/image');
                                }
                            }}
                        >
                            <Image size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            title={resourceState?.common?.action.delete}
                            disabled={boardState?.busy || !boardState?.editEnabled}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: resourceState?.manager?.boards.deleteBoard.title,
                                    message: resourceState?.manager?.boards.deleteBoard.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            boardState?.deleteBoard().then();
                                        }
                                    }
                                });
                            }}
                        ><Trash size={18}/>
                        </WiwaButton>
                    </>
                </BoardSearchCriteriaForm>

                <div className="overflow-x-auto">
                    <BoardTable
                        fields={Object.values(BoardField)}
                        rows={boardState?.data}
                        selected={boardState?.selected}
                        setSelected={(selected) => boardState?.setSelected(selected)}
                    />
                </div>

                <div className="flex justify-center w-full">
                    <WiwaPageable
                        isPrevious={boardState?.previous || false}
                        previousHandler={() => boardState?.setPage(boardState?.page + 1)}
                        page={(boardState?.page || 0) + 1}
                        pageHandler={() => boardState?.getBoards()}
                        isNext={boardState?.next || false}
                        nextHandler={() => boardState?.setPage(boardState?.page - 1)}
                        disabled={boardState?.busy}
                    />
                </div>
            </div>

            <BoardChangeDialog
                dialogId={BOARD_DIALOG_ID}
                showDialog={showDialog}
                board={editMode ? boardState?.selected : undefined}
                okHandler={(data) => {
                    if (editMode) {
                        boardState?.setBoard(data).then();
                    } else {
                        boardState?.addBoard(data).then();
                    }
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
                submitting={boardState?.busy || false}
            />
        </>
    )
}

export default BoardsPage;
