import { useContext, useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';

import BoardDimensionValue from './board-dimension-value';
import BoardDimensionsDialog from './board-dimensions-dialog';
import { PartEditorContext } from '../part-editor-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { Dimensions } from '../../../../api/model';
import { BoardDimension, BoardPosition } from '../../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';

const BoardDimensionEditor = (
    {
        boardPosition,
        boardDimension
    }: {
        boardPosition: BoardPosition,
        boardDimension: BoardDimension
    }
) => {
    const dialogState = useContext(DialogContext);
    const partEditorState = useContext(PartEditorContext)
    const commonResourceState = useContext(CommonResourceContext);

    const [dimensions, setDimensions] = useState<Dimensions>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setDimensions(partEditorState?.boardDimensionsData.find(item => item.boardPosition === boardPosition)?.dimensions);
    }, [boardPosition, partEditorState?.boardDimensionsData]);

    return (
        <>
            <BoardDimensionValue boardPosition={boardPosition} boardDimension={boardDimension} size={28}>
                <div className="join">
                    <WiwaButton
                        title={commonResourceState?.resource?.action.edit}
                        className="btn-primary btn-xs join-item"
                        onClick={() => setShowDialog(true)}
                    >
                        <Edit size={12}/>
                    </WiwaButton>
                    <WiwaButton
                        disabled={dimensions === undefined}
                        title={commonResourceState?.resource?.action.delete}
                        className="btn-accent btn-xs join-item"
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: `${commonResourceState?.resource?.partEditor.deleteBoardDimensionsQuestionTitle} ${partEditorState?.getBoardName(boardPosition)}`,
                                message: commonResourceState?.resource?.partEditor.deleteBoardDimensionsQuestionMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        partEditorState?.setBoardDimensions(boardPosition, undefined);
                                    }
                                }
                            });
                        }}
                    >
                        <Trash size={12}/>
                    </WiwaButton>
                </div>
            </BoardDimensionValue>

            <BoardDimensionsDialog
                boardPosition={boardPosition}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    )
}

export default BoardDimensionEditor;
