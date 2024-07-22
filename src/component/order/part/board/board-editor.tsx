import { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, Image } from 'react-feather';

import BoardDialog from './board-dialog';
import BoardDimensionsDialog from './board-dimensions-dialog';
import BoardValue from './board-value';
import { BoardData } from '../part-editor-provider';
import BoardProvider from '../../../board/board-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { Dimensions } from '../../../../api/model';
import { BoardPosition } from '../../../../api/model/application';
import { Board } from '../../../../api/model/board';
import { CommonResourceContext } from '../../../../context';

const BoardEditor = (
    {
        structure,
        rotate,
        position,
        name,
        data,
        setBoard,
        setDimensions
    }: {
        structure: boolean,
        rotate: boolean,
        position: BoardPosition,
        name?: string,
        data?: BoardData,
        setBoard: (position: BoardPosition, data: Board) => void,
        setDimensions: (position: BoardPosition, dimensions: Dimensions) => void
    }
) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showBoardDialog, setShowBoardDialog] = useState(false);

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <BoardValue
                    structure={structure}
                    rotate={rotate}
                    name={name}
                    data={data}
                >
                    <div className="join">
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.actions.editDimensions}
                            className="btn-primary btn-xs join-item"
                            onClick={() => setShowDimensionsDialog(true)}
                        >
                            <div className="grid grid-cols-2">
                                <ArrowLeft size={12}/>
                                <ArrowRight size={12}/>
                            </div>
                        </WiwaButton>
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.actions.editBoard}
                            className="btn-primary btn-xs join-item"
                            onClick={() => setShowBoardDialog(true)}
                        >
                            <Image size={12}/>
                        </WiwaButton>
                    </div>
                </BoardValue>
            </div>

            <BoardDimensionsDialog
                name={name}
                data={data?.dimensions}
                setData={(data) => setDimensions(position, data)}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />
            <BoardProvider>
                <BoardDialog
                    name={name}
                    data={data?.board}
                    setData={(data) => setBoard(position, data)}
                    showDialog={showBoardDialog}
                    setShowDialog={setShowBoardDialog}
                />
            </BoardProvider>
        </>
    )
}

export default BoardEditor;
