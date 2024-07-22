import { useContext, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Image } from 'react-feather';

import PartEditorInfo from './part-editor-info';
import { PartEditorContext } from './part-editor-provider';
import BoardDialog from './board/board-dialog';
import EdgeDialog from './edge/edge-dialog';
import BoardProvider from '../../board/board-provider';
import EdgeProvider from '../../edge/edge-provider';
import WiwaButton from '../../ui/wiwa-button';
import { BoardPosition, EdgePosition } from '../../../api/model/application';
import { CommonResourceContext } from '../../../context';
import BoardValue from './board/board-value.tsx';
import EdgeEditor from './edge/edge-editor.tsx';
import { Dimensions } from '../../../api/model';
import WiwaSelect from '../../ui/wiwa-select.tsx';
import { FrameType } from '../../../api/model/order/part';
import BoardDimensionsDialog from './board/board-dimensions-dialog.tsx';
import BoardDimensionDialog from './board/board-dimension-value.tsx';

const PartFrameEditor = () => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [selectedBoard, setSelectedBoard] = useState<BoardPosition>();

    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showWidthDialog, setShowWidthDialog] = useState(false);
    const [showBoardsDialog, setShowBoardsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    const [frameDimensions, setFrameDimensions] = useState<Dimensions>();

    return (
        <>
            <div className="flex flex-col gap-5 w-full overflow-auto">
                <div className="flex flex-row gap-5 min-w-[800px] w-full">
                    <div className="flex flex-col items-start justify-center w-full gap-5">
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

                            <WiwaSelect value={partEditorState?.frameType || FrameType.HORIZONTAL}
                                        onChange={event => partEditorState?.setFrameType(event.currentTarget.value as FrameType)}>
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
                                    name={partEditorState?.getEdgeName(EdgePosition.A1)}
                                    data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A1)}
                                    setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                    deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                />
                                <BoardValue
                                    structure={true}
                                    rotate={partEditorState?.frameType === FrameType.HORIZONTAL_SHORT}
                                    name={partEditorState?.getBoardName(BoardPosition.A1)}
                                    data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.A1)}
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
                                    name={partEditorState?.getEdgeName(EdgePosition.A1I)}
                                    data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A1I)}
                                    setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                    deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                />
                            </div>

                            <div className="flex flex-row items-center justify-center w-full">
                                <div
                                    className="flex flex-col justify-center items-center p-10 gap-5 border-4 border-black w-1/3 h-full">
                                    <EdgeEditor
                                        position={EdgePosition.B1}
                                        name={partEditorState?.getEdgeName(EdgePosition.B1)}
                                        data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B1)}
                                        setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                        deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                    />
                                    <BoardValue
                                        structure={true}
                                        rotate={partEditorState?.frameType === FrameType.HORIZONTAL_LONG}
                                        name={partEditorState?.getBoardName(BoardPosition.B1)}
                                        data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.B1)}
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
                                        name={partEditorState?.getEdgeName(EdgePosition.B1I)}
                                        data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B1I)}
                                        setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                        deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                    />
                                </div>
                                <div className="w-1/3"></div>
                                <div
                                    className="flex flex-col justify-center items-center p-10 gap-5 border-4 border-black w-1/3 h-full">
                                    <EdgeEditor
                                        position={EdgePosition.B2I}
                                        name={partEditorState?.getEdgeName(EdgePosition.B2I)}
                                        data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B2I)}
                                        setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                        deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                    />
                                    <BoardValue
                                        structure={true}
                                        rotate={partEditorState?.frameType === FrameType.HORIZONTAL_LONG}
                                        name={partEditorState?.getBoardName(BoardPosition.B2)}
                                        data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.B2)}
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
                                        name={partEditorState?.getEdgeName(EdgePosition.B2)}
                                        data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B2)}
                                        setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                        deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                    />
                                </div>
                            </div>

                            <div
                                className="flex flex-row justify-center items-center p-10 gap-5 border-4 border-black w-full">
                                <EdgeEditor
                                    position={EdgePosition.A2I}
                                    name={partEditorState?.getEdgeName(EdgePosition.A2I)}
                                    data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A2I)}
                                    setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                    deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                />
                                <BoardValue
                                    structure={true}
                                    rotate={partEditorState?.frameType === FrameType.HORIZONTAL_SHORT}
                                    name={partEditorState?.getBoardName(BoardPosition.A2)}
                                    data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.A1)}
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
                                    name={partEditorState?.getEdgeName(EdgePosition.A2)}
                                    data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A2)}
                                    setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                    deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border w-full">
                        <PartEditorInfo/>
                    </div>
                </div>
            </div>

            <BoardDimensionDialog
                name={selectedBoard ? partEditorState?.getBoardName(selectedBoard) : undefined}
                setData={(data) => {
                    // TODO
                }}
                showDialog={showWidthDialog}
                setShowDialog={setShowWidthDialog}
            />

            <BoardDimensionsDialog
                data={frameDimensions}
                setData={setFrameDimensions}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />

            <BoardProvider>
                <BoardDialog
                    setData={(data) => {
                        partEditorState?.setBoard(BoardPosition.A1, data);
                        partEditorState?.setBoard(BoardPosition.A2, data);
                        partEditorState?.setBoard(BoardPosition.B1, data);
                        partEditorState?.setBoard(BoardPosition.B2, data);
                    }}
                    showDialog={showBoardsDialog}
                    setShowDialog={setShowBoardsDialog}
                />
            </BoardProvider>

            <EdgeProvider>
                <EdgeDialog
                    setData={(data) => {
                        partEditorState?.setEdge(EdgePosition.A1, data);
                        partEditorState?.setEdge(EdgePosition.A1I, data);
                        partEditorState?.setEdge(EdgePosition.A2, data);
                        partEditorState?.setEdge(EdgePosition.A2I, data);
                        partEditorState?.setEdge(EdgePosition.B1, data);
                        partEditorState?.setEdge(EdgePosition.B1I, data);
                        partEditorState?.setEdge(EdgePosition.B2, data);
                        partEditorState?.setEdge(EdgePosition.B2I, data);
                    }}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default PartFrameEditor;
