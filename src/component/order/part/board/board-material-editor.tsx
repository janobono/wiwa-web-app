import { useContext, useState } from 'react';
import { Image } from 'react-feather';

import BoardMaterialValue from './board-material-value';
import BoardDialog from '../board-dialog';
import { PartEditorContext } from '../part-editor-provider';
import BoardProvider from '../../../board/board-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { BoardPosition } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

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
                    title={commonResourceState?.resource?.partEditor.actions.editBoard}
                    className="btn-primary btn-xs join-item"
                    onClick={() => setShowDialog(true)}
                >
                    <Image size={12}/>
                </WiwaButton>
            </BoardMaterialValue>

            <BoardProvider>
                <BoardDialog
                    title={partEditorState?.getBoardName(boardPosition)}
                    data={partEditorState?.boardData.find(item => item.boardPosition === boardPosition)?.board}
                    setData={(data) => partEditorState?.setBoard([boardPosition], data)}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                />
            </BoardProvider>
        </>
    )
}

export default BoardMaterialEditor;
