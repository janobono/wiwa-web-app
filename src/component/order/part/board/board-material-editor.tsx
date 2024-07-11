import { useContext, useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';

import BoardMaterialValue from './board-material-value';
import BoardMaterialDialog from './board-material-dialog';
import { PartEditorContext } from '../part-editor-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { BoardPosition } from '../../../../api/model/application';
import { Board } from '../../../../api/model/board';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';
import BoardProvider from '../../../board/board-provider.tsx';

const BoardMaterialEditor = (
    {
        boardPosition,
        rotate
    }: {
        boardPosition: BoardPosition,
        rotate: boolean,
    }
) => {
    const dialogState = useContext(DialogContext);
    const partEditorState = useContext(PartEditorContext)
    const commonResourceState = useContext(CommonResourceContext);

    const [board, setBoard] = useState<Board>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setBoard(partEditorState?.boardMaterialData.find(item => item.boardPosition === boardPosition)?.board);
    }, [boardPosition, partEditorState?.boardMaterialData]);

    return (
        <>
            <BoardMaterialValue boardPosition={boardPosition} rotate={rotate}>
                <div className="join">
                    <WiwaButton
                        title={commonResourceState?.resource?.action.edit}
                        className="btn-primary btn-xs join-item"
                        onClick={() => setShowDialog(true)}
                    >
                        <Edit size={12}/>
                    </WiwaButton>
                    <WiwaButton
                        disabled={board === undefined}
                        title={commonResourceState?.resource?.action.delete}
                        className="btn-accent btn-xs join-item"
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: `${commonResourceState?.resource?.partEditor.deleteBoardMaterialQuestionTitle} ${partEditorState?.getBoardName(boardPosition)}`,
                                message: commonResourceState?.resource?.partEditor.deleteBoardMaterialQuestionMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        partEditorState?.setBoardMaterial(boardPosition, undefined);
                                    }
                                }
                            });
                        }}
                    >
                        <Trash size={12}/>
                    </WiwaButton>
                </div>
            </BoardMaterialValue>

            <BoardProvider>
                <BoardMaterialDialog
                    boardPosition={boardPosition}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                />
            </BoardProvider>
        </>
    )
}

export default BoardMaterialEditor;
