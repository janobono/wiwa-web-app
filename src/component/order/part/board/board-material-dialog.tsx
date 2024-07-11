import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PartEditorContext } from '../part-editor-provider';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { BoardPosition } from '../../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { Board, BoardField } from '../../../../api/model/board';
import { getBoardImagePath } from '../../../../api/controller/ui';
import BoardSearchCriteriaForm from '../../../board/board-search-criteria-form.tsx';
import { BoardContext } from '../../../board/board-provider.tsx';
import BoardTable from '../../../board/board-table.tsx';
import WiwaPageable from '../../../ui/wiwa-pageable.tsx';

const BoardMaterialDialog = ({boardPosition, showDialog, setShowDialog}: {
    boardPosition: BoardPosition,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const boardState = useContext(BoardContext);
    const partEditorState = useContext(PartEditorContext);
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [board, setBoard] = useState<Board>();

    useEffect(() => {
        boardState?.getBoards().then();
        boardState?.setSelected(undefined);
        setBoard(partEditorState?.boardMaterialData.find(item => item.boardPosition === boardPosition)?.board);
    }, [showDialog]);

    useEffect(() => {
        if (boardState?.selected) {
            setBoard(boardState?.selected);
        }
    }, [boardState?.selected]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog
            id={`part-editor-board-material-dialog-${boardPosition}`}
            maxWidth={true}
            showDialog={showDialog}
            closeHandler={() => setShowDialog(false)}
        >
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {`${commonResourceState?.resource?.partEditor.boardMaterialDialogTitle} ${partEditorState?.getBoardName(boardPosition)}`}
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
                            src={getBoardImagePath(board ? board.id : -1)}
                            alt="Board image"
                        />
                        <span className="text-xs">{board ? `${board.code} ${board.name}` : ''}</span>
                    </div>
                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={board === undefined}
                            onClick={() => {
                                partEditorState?.setBoardMaterial(boardPosition, board);
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

export default BoardMaterialDialog;
