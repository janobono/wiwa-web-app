import { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';

import BoardDimensionValue from './board-dimension-value';
import DimensionsDialog from '../dimensions-dialog';
import { PartEditorContext } from '../part-editor-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { BoardDimension, BoardPosition } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const BoardDimensionEditor = (
    {
        boardPosition,
        shadowBoardPositions = [],
        boardDimension
    }: {
        boardPosition: BoardPosition,
        shadowBoardPositions?: BoardPosition[],
        boardDimension: BoardDimension
    }
) => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <BoardDimensionValue boardPosition={boardPosition} boardDimension={boardDimension}>
                <WiwaButton
                    title={commonResourceState?.resource?.partEditor.actions.editDimensions}
                    className="btn-primary btn-xs join-item"
                    onClick={() => setShowDialog(true)}
                >
                    <div className="grid grid-cols-2">
                        <ArrowLeft size={12}/>
                        <ArrowRight size={12}/>
                    </div>
                </WiwaButton>
            </BoardDimensionValue>

            <DimensionsDialog
                title={partEditorState?.getBoardName(boardPosition)}
                data={partEditorState?.boardData.find(item => item.boardPosition === boardPosition)?.dimensions}
                setData={(data) => partEditorState?.setBoardDimensions([boardPosition, ...shadowBoardPositions], data)}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    )
}

export default BoardDimensionEditor;
