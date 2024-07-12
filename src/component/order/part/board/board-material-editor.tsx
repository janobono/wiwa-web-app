import { useContext, useState } from 'react';
import { Edit } from 'react-feather';

import BoardMaterialValue from './board-material-value';
import BoardMaterialDialog from './board-material-dialog';
import { PartEditorContext } from '../part-editor-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { BoardPosition } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';
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
    const partEditorState = useContext(PartEditorContext)
    const commonResourceState = useContext(CommonResourceContext);

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <BoardMaterialValue boardPosition={boardPosition} rotate={rotate}>
                <WiwaButton
                    title={commonResourceState?.resource?.action.edit}
                    className="btn-primary btn-xs join-item"
                    onClick={() => setShowDialog(true)}
                >
                    <Edit size={12}/>
                </WiwaButton>
            </BoardMaterialValue>

            <BoardProvider>
                <BoardMaterialDialog
                    board={partEditorState?.boardData.find(item => item.boardPosition === boardPosition)?.board}
                    setBoard={(board) => partEditorState?.setBoard(boardPosition, board)}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                />
            </BoardProvider>
        </>
    )
}

export default BoardMaterialEditor;
