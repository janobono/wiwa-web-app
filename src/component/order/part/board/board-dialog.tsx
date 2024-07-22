import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { BoardContext } from '../../../board/board-provider';
import BoardSearchCriteriaForm from '../../../board/board-search-criteria-form';
import BoardTable from '../../../board/board-table';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaPageable from '../../../ui/wiwa-pageable';
import { getBoardImagePath } from '../../../../api/controller/ui';
import { Board, BoardField } from '../../../../api/model/board';
import { CommonResourceContext, DialogContext } from '../../../../context';

const BoardDialog = ({name, data, setData, showDialog, setShowDialog}: {
    name?: string,
    data?: Board,
    setData: (data: Board) => void,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const boardState = useContext(BoardContext);
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (name) {
            setTitle(`${commonResourceState?.resource?.partEditor.boardDialog.title} ${name}`);
        } else {
            setTitle(commonResourceState?.resource?.partEditor.boardDialog.title || '');
        }
        boardState?.getBoards().then();
        boardState?.setSelected(data);
    }, [name, data, showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog
            id="part-editor-board-dialog"
            maxWidth={true}
            showDialog={showDialog}
            closeHandler={() => setShowDialog(false)}
        >
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {title}
                    </div>
                    <BoardSearchCriteriaForm searchHandler={(criteria) => boardState?.setCriteria(criteria)}/>

                    <div className="overflow-x-auto">
                        <BoardTable
                            fields={[BoardField.code, BoardField.name, BoardField.boardCode, BoardField.structureCode, BoardField.length, BoardField.width, BoardField.thickness, BoardField.price, BoardField.image]}
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

                    <div className="flex flex-row gap-2 items-center">
                        <img
                            className="flex-none w-24 h-24 object-scale-down object-center"
                            src={getBoardImagePath(boardState?.selected ? boardState.selected.id : -1)}
                            alt="Board image"
                        />
                        <span
                            className="text-xs">{boardState?.selected ? `${boardState.selected.code} ${boardState.selected.name}` : ''}</span>
                    </div>
                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={boardState?.selected === undefined}
                            onClick={() => {
                                if (boardState?.selected) {
                                    setData(boardState?.selected);
                                }
                                setShowDialog(false);
                            }}
                        >{commonResourceState?.resource?.imageDialog.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={() => setShowDialog(false)}
                        >{commonResourceState?.resource?.imageDialog.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>, dialogState.modalRoot))
}

export default BoardDialog;
