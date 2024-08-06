import { useContext, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Image } from 'react-feather';

import { PartFrameEditorContext } from './part-frame-editor-provider';
import BoardDialog from '../board/board-dialog';
import BoardDimensionsDialog from '../board/board-dimensions-dialog';
import BoardDimensionDialog from '../board/board-dimension-value';
import BoardProvider from '../../../board/board-provider';
import BoardValue from '../board/board-value';
import EdgeDialog from '../edge/edge-dialog';
import EdgeEditor from '../edge/edge-editor';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaSelect from '../../../ui/wiwa-select';
import { Dimensions } from '../../../../api/model';
import { BoardPosition, EdgePosition } from '../../../../api/model/application';
import { FrameType } from '../../../../api/model/order/part';
import { CommonResourceContext } from '../../../../context';

const PartFrameForm = () => {
    const partFrameEditorState = useContext(PartFrameEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [selectedBoard, setSelectedBoard] = useState<BoardPosition>();

    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showWidthDialog, setShowWidthDialog] = useState(false);
    const [showBoardsDialog, setShowBoardsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    const [frameDimensions, setFrameDimensions] = useState<Dimensions>();

    return (
        <>
            <div className="flex flex-row items-center w-full gap-5">
                <div className="join pr-5">
                    <WiwaButton
                        title={commonResourceState?.resource?.partEditor.actions.editFrameDimensions}
                        className="btn-primary join-item"
                        onClick={() => setShowDimensionsDialog(true)}
                    >
                        <div className="grid grid-cols-2">
                            <ArrowLeft size={12}/>
                            <ArrowRight size={12}/>
                        </div>
                    </WiwaButton>
                    <WiwaButton
                        title={commonResourceState?.resource?.partEditor.actions.editFrameWidth}
                        className="btn-primary join-item"
                        onClick={() => {
                            setSelectedBoard(undefined);
                            setShowWidthDialog(true);
                        }}
                    >
                        <div className="grid grid-cols-1">
                            <ArrowUp size={12}/>
                            <ArrowDown size={12}/>
                        </div>
                    </WiwaButton>
                    <WiwaButton
                        title={commonResourceState?.resource?.partEditor.actions.editAllBoards}
                        className="btn-primary join-item"
                        onClick={() => setShowBoardsDialog(true)}
                    >
                        <Image size={12}/>
                    </WiwaButton>
                    <WiwaButton
                        title={commonResourceState?.resource?.partEditor.actions.editAllEdges}
                        className="btn-secondary join-item"
                        onClick={() => setShowEdgeDialog(true)}
                    >
                        <Image size={12}/>
                    </WiwaButton>
                </div>

                <WiwaSelect value={partFrameEditorState?.frameType || FrameType.HORIZONTAL}
                            onChange={event => partFrameEditorState?.setFrameType(event.currentTarget.value as FrameType)}>
                    <option value={FrameType.HORIZONTAL}>
                        {commonResourceState?.resource?.partEditor.frameType.horizontal}
                    </option>
                    <option value={FrameType.HORIZONTAL_LONG}>
                        {commonResourceState?.resource?.partEditor.frameType.horizontalLong}
                    </option>
                    <option value={FrameType.HORIZONTAL_SHORT}>
                        {commonResourceState?.resource?.partEditor.frameType.horizontalShort}
                    </option>
                </WiwaSelect>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <div
                    className="flex flex-row justify-center items-center p-10 gap-5 border-4 border-black w-full">
                    <EdgeEditor
                        position={EdgePosition.A1}
                        name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.A1)}
                        edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A1)?.edge}
                        setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.A1, data)}
                        deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.A1)}
                    />
                    <BoardValue
                        structure={true}
                        rotate={partFrameEditorState?.frameType === FrameType.HORIZONTAL_SHORT}
                        name={partFrameEditorState?.partEditorState?.getBoardName(BoardPosition.A1)}
                        board={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.A1)?.board}
                        dimensions={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.A1)?.dimensions}
                    >
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.actions.editFrameWidth}
                            className="btn-primary btn-xs join-item"
                            onClick={() => {
                                setSelectedBoard(BoardPosition.A1);
                                setShowWidthDialog(true);
                            }}
                        >
                            <div className="grid grid-cols-1">
                                <ArrowUp size={12}/>
                                <ArrowDown size={12}/>
                            </div>
                        </WiwaButton>
                    </BoardValue>
                    <EdgeEditor
                        position={EdgePosition.A1I}
                        name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.A1I)}
                        edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A1I)?.edge}
                        setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.A1I, data)}
                        deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.A1I)}
                    />
                </div>

                <div className="flex flex-row items-center justify-center w-full">
                    <div
                        className="flex flex-col justify-center items-center p-10 gap-5 border-4 border-black w-1/3 h-full">
                        <EdgeEditor
                            position={EdgePosition.B1}
                            name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.B1)}
                            edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B1)?.edge}
                            setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.B1, data)}
                            deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.B1)}
                        />
                        <BoardValue
                            structure={true}
                            rotate={partFrameEditorState?.frameType === FrameType.HORIZONTAL_LONG}
                            name={partFrameEditorState?.partEditorState?.getBoardName(BoardPosition.B1)}
                            board={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.B1)?.board}
                            dimensions={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.B1)?.dimensions}
                        >
                            <WiwaButton
                                title={commonResourceState?.resource?.partEditor.actions.editFrameWidth}
                                className="btn-primary btn-xs join-item"
                                onClick={() => {
                                    setSelectedBoard(BoardPosition.B1);
                                    setShowWidthDialog(true);
                                }}
                            >
                                <div className="grid grid-cols-1">
                                    <ArrowUp size={12}/>
                                    <ArrowDown size={12}/>
                                </div>
                            </WiwaButton>
                        </BoardValue>
                        <EdgeEditor
                            position={EdgePosition.B1I}
                            name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.B1I)}
                            edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B1I)?.edge}
                            setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.B1I, data)}
                            deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.B1I)}
                        />
                    </div>
                    <div className="w-1/3"></div>
                    <div
                        className="flex flex-col justify-center items-center p-10 gap-5 border-4 border-black w-1/3 h-full">
                        <EdgeEditor
                            position={EdgePosition.B2I}
                            name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.B2I)}
                            edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B2I)?.edge}
                            setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.B2I, data)}
                            deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.B2I)}
                        />
                        <BoardValue
                            structure={true}
                            rotate={partFrameEditorState?.frameType === FrameType.HORIZONTAL_LONG}
                            name={partFrameEditorState?.partEditorState?.getBoardName(BoardPosition.B2)}
                            board={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.B2)?.board}
                            dimensions={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.B2)?.dimensions}
                        >
                            <WiwaButton
                                title={commonResourceState?.resource?.partEditor.actions.editFrameWidth}
                                className="btn-primary btn-xs join-item"
                                onClick={() => {
                                    setSelectedBoard(BoardPosition.B2);
                                    setShowWidthDialog(true);
                                }}
                            >
                                <div className="grid grid-cols-1">
                                    <ArrowUp size={12}/>
                                    <ArrowDown size={12}/>
                                </div>
                            </WiwaButton>
                        </BoardValue>
                        <EdgeEditor
                            position={EdgePosition.B2}
                            name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.B2)}
                            edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B2)?.edge}
                            setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.B2, data)}
                            deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.B2)}
                        />
                    </div>
                </div>

                <div
                    className="flex flex-row justify-center items-center p-10 gap-5 border-4 border-black w-full">
                    <EdgeEditor
                        position={EdgePosition.A2I}
                        name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.A2I)}
                        edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A2I)?.edge}
                        setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.A2I, data)}
                        deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.A2I)}
                    />
                    <BoardValue
                        structure={true}
                        rotate={partFrameEditorState?.frameType === FrameType.HORIZONTAL_SHORT}
                        name={partFrameEditorState?.partEditorState?.getBoardName(BoardPosition.A2)}
                        board={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.A2)?.board}
                        dimensions={partFrameEditorState?.boardData.find(item => item.boardPosition === BoardPosition.A2)?.dimensions}
                    >
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.actions.editFrameWidth}
                            className="btn-primary btn-xs join-item"
                            onClick={() => {
                                setSelectedBoard(BoardPosition.A2);
                                setShowWidthDialog(true);
                            }}
                        >
                            <div className="grid grid-cols-1">
                                <ArrowUp size={12}/>
                                <ArrowDown size={12}/>
                            </div>
                        </WiwaButton>
                    </BoardValue>
                    <EdgeEditor
                        position={EdgePosition.A2}
                        name={partFrameEditorState?.partEditorState?.getEdgeName(EdgePosition.A2)}
                        edge={partFrameEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A2)?.edge}
                        setEdge={(data) => partFrameEditorState?.setEdge(EdgePosition.A2, data)}
                        deleteEdge={() => partFrameEditorState?.deleteEdge(EdgePosition.A2)}
                    />
                </div>
            </div>

            <BoardDimensionsDialog
                data={frameDimensions}
                setData={(data) => {

                    setFrameDimensions(data);
                    // TODO
                }}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />

            <BoardDimensionDialog
                name={selectedBoard ? partFrameEditorState?.partEditorState?.getBoardName(selectedBoard) : undefined}
                setData={(data) => {
                    if (selectedBoard) {
                        partFrameEditorState?.setWidth(selectedBoard, data);
                    } else {
                        partFrameEditorState?.setWidthAll(data);
                    }
                }}
                showDialog={showWidthDialog}
                setShowDialog={setShowWidthDialog}
            />

            <BoardProvider>
                <BoardDialog
                    setData={(data) => partFrameEditorState?.setBoardAll(data)}
                    showDialog={showBoardsDialog}
                    setShowDialog={setShowBoardsDialog}
                />
            </BoardProvider>

            <EdgeProvider>
                <EdgeDialog
                    setData={(data) => partFrameEditorState?.setEdgeAll(data)}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default PartFrameForm;
