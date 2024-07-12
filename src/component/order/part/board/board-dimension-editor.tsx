import { useContext, useState } from 'react';
import { Edit } from 'react-feather';

import BoardDimensionValue from './board-dimension-value';
import BoardDimensionsDialog from './board-dimensions-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { BoardDimension, BoardPosition } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const BoardDimensionEditor = (
    {
        boardPosition,
        boardDimension
    }: {
        boardPosition: BoardPosition,
        boardDimension: BoardDimension
    }
) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <BoardDimensionValue boardPosition={boardPosition} boardDimension={boardDimension}>
                <WiwaButton
                    title={commonResourceState?.resource?.action.edit}
                    className="btn-primary btn-xs join-item"
                    onClick={() => setShowDialog(true)}
                >
                    <Edit size={12}/>
                </WiwaButton>
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
