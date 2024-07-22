import { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, Image } from 'react-feather';

import PartEditorInfo from './part-editor-info';
import { PartEditorContext } from './part-editor-provider';
import PartGrid from './part-grid';
import BoardDialog from './board/board-dialog';
import BoardEditor from './board/board-editor';
import BoardValue from './board/board-value';
import CornerDialog from './corner/corner-dialog';
import CornerEditor from './corner/corner-editor';
import EdgeEditor from './edge/edge-editor';
import EdgeDialog from './edge/edge-dialog';
import BoardProvider from '../../board/board-provider';
import EdgeProvider from '../../edge/edge-provider';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { BoardPosition, CornerPosition, EdgePosition } from '../../../api/model/application';
import { CommonResourceContext } from '../../../context';

const PartDuplicatedBasicEditor = () => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showBottomBoardDialog, setShowBottomBoardDialog] = useState(false);
    const [showBoardsDialog, setShowBoardsDialog] = useState(false);
    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-5 w-full overflow-auto">
                <div className="flex flex-row gap-5 min-w-[800px] w-full">
                    <div className="flex flex-col items-start justify-center w-full gap-5">
                        <div className="flex flex-row items-center w-full gap-5">
                            <div className="join pr-5">
                                <WiwaButton
                                    title={commonResourceState?.resource?.partEditor.actions.editAllBoards}
                                    className="btn-primary join-item"
                                    onClick={() => setShowBoardsDialog(true)}
                                >
                                    <Image size={12}/>
                                </WiwaButton>
                                <WiwaButton
                                    title={commonResourceState?.resource?.partEditor.actions.editAllCornerDimensions}
                                    className="btn-secondary join-item"
                                    onClick={() => setShowDimensionsDialog(true)}
                                >
                                    <div className="grid grid-cols-2">
                                        <ArrowLeft size={12}/>
                                        <ArrowRight size={12}/>
                                    </div>
                                </WiwaButton>
                                <WiwaButton
                                    title={commonResourceState?.resource?.partEditor.actions.editAllEdges}
                                    className="btn-secondary join-item"
                                    onClick={() => setShowEdgeDialog(true)}
                                >
                                    <Image size={12}/>
                                </WiwaButton>
                            </div>
                            <WiwaFormCheckBox
                                className="join-item flex flex-row gap-2"
                                value={partEditorState?.rotate || false}
                                setValue={(value) => partEditorState?.setRotate(value)}>
                                <span className="pr-2">{commonResourceState?.resource?.partEditor.rotate}</span>
                            </WiwaFormCheckBox>
                        </div>

                        <PartGrid
                            board={
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <BoardEditor
                                        structure={!partEditorState?.rotate}
                                        rotate={partEditorState?.rotate || false}
                                        position={BoardPosition.TOP}
                                        name={partEditorState?.getBoardName(BoardPosition.TOP)}
                                        data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.TOP)}
                                        setBoard={(position, data) => partEditorState?.setBoard(position, data)}
                                        setDimensions={(position, data) => {
                                            partEditorState?.setBoardDimensions(position, data);
                                            partEditorState?.setBoardDimensions(BoardPosition.BOTTOM, data);
                                        }}
                                    />
                                    <BoardValue
                                        structure={!partEditorState?.rotate}
                                        rotate={partEditorState?.rotate || false}
                                        name={partEditorState?.getBoardName(BoardPosition.BOTTOM)}
                                        data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.BOTTOM)}
                                    >
                                        <WiwaButton
                                            title={commonResourceState?.resource?.partEditor.actions.editBoard}
                                            className="btn-primary btn-xs join-item"
                                            onClick={() => setShowBottomBoardDialog(true)}
                                        >
                                            <Image size={12}/>
                                        </WiwaButton>
                                    </BoardValue>
                                </div>
                            }
                            edgeA1={<EdgeEditor
                                position={EdgePosition.A1}
                                name={partEditorState?.getEdgeName(EdgePosition.A1)}
                                data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A1)}
                                setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                            />}
                            edgeA2={<EdgeEditor
                                position={EdgePosition.A2}
                                name={partEditorState?.getEdgeName(EdgePosition.A2)}
                                data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A2)}
                                setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                            />}
                            edgeB1={<EdgeEditor
                                position={EdgePosition.B1}
                                name={partEditorState?.getEdgeName(EdgePosition.B1)}
                                data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B1)}
                                setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                            />}
                            edgeB2={<EdgeEditor
                                position={EdgePosition.B2}
                                name={partEditorState?.getEdgeName(EdgePosition.B2)}
                                data={partEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B2)}
                                setEdge={(position, data) => partEditorState?.setEdge(position, data)}
                                deleteEdge={(position) => partEditorState?.deleteEdge(position)}
                            />}
                            cornerA1B1={<CornerEditor
                                position={CornerPosition.A1B1}
                                name={partEditorState?.getCornerName(CornerPosition.A1B1)}
                                data={partEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)}
                                setCornerDimensions={(position, data) => partEditorState?.setCornerDimensions(position, data)}
                                setCornerEdge={(position, data) => partEditorState?.setCornerEdge(position, data)}
                                setCornerRadius={(position, data) => partEditorState?.setCornerRadius(position, data)}
                                deleteCorner={(position) => partEditorState?.deleteCorner(position)}
                            />}
                            cornerA1B2={<CornerEditor
                                position={CornerPosition.A1B2}
                                name={partEditorState?.getCornerName(CornerPosition.A1B2)}
                                data={partEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)}
                                setCornerDimensions={(position, data) => partEditorState?.setCornerDimensions(position, data)}
                                setCornerEdge={(position, data) => partEditorState?.setCornerEdge(position, data)}
                                setCornerRadius={(position, data) => partEditorState?.setCornerRadius(position, data)}
                                deleteCorner={(position) => partEditorState?.deleteCorner(position)}
                            />}
                            cornerA2B1={<CornerEditor
                                position={CornerPosition.A2B1}
                                name={partEditorState?.getCornerName(CornerPosition.A2B1)}
                                data={partEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)}
                                setCornerDimensions={(position, data) => partEditorState?.setCornerDimensions(position, data)}
                                setCornerEdge={(position, data) => partEditorState?.setCornerEdge(position, data)}
                                setCornerRadius={(position, data) => partEditorState?.setCornerRadius(position, data)}
                                deleteCorner={(position) => partEditorState?.deleteCorner(position)}
                            />}
                            cornerA2B2={<CornerEditor
                                position={CornerPosition.A2B2}
                                name={partEditorState?.getCornerName(CornerPosition.A2B2)}
                                data={partEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)}
                                setCornerDimensions={(position, data) => partEditorState?.setCornerDimensions(position, data)}
                                setCornerEdge={(position, data) => partEditorState?.setCornerEdge(position, data)}
                                setCornerRadius={(position, data) => partEditorState?.setCornerRadius(position, data)}
                                deleteCorner={(position) => partEditorState?.deleteCorner(position)}
                            />}
                        />
                    </div>
                    <div className="flex flex-col border w-full">
                        <PartEditorInfo/>
                    </div>
                </div>
            </div>

            <BoardProvider>
                <BoardDialog
                    name={partEditorState?.getBoardName(BoardPosition.BOTTOM)}
                    data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.BOTTOM)?.board}
                    setData={(data) => {
                        partEditorState?.setBoard(BoardPosition.BOTTOM, data);
                    }}
                    showDialog={showBottomBoardDialog}
                    setShowDialog={setShowBottomBoardDialog}
                />
            </BoardProvider>

            <BoardProvider>
                <BoardDialog
                    setData={(data) => {
                        partEditorState?.setBoard(BoardPosition.TOP, data);
                        partEditorState?.setBoard(BoardPosition.BOTTOM, data);
                    }}
                    showDialog={showBoardsDialog}
                    setShowDialog={setShowBoardsDialog}
                />
            </BoardProvider>

            <CornerDialog
                setDimensionsData={(data) => {
                    partEditorState?.setCornerDimensions(CornerPosition.A1B1, data);
                    partEditorState?.setCornerDimensions(CornerPosition.A1B2, data);
                    partEditorState?.setCornerDimensions(CornerPosition.A2B1, data);
                    partEditorState?.setCornerDimensions(CornerPosition.A2B2, data);
                }}
                setRadiusData={(data) => {
                    partEditorState?.setCornerRadius(CornerPosition.A1B1, data);
                    partEditorState?.setCornerRadius(CornerPosition.A1B2, data);
                    partEditorState?.setCornerRadius(CornerPosition.A2B1, data);
                    partEditorState?.setCornerRadius(CornerPosition.A2B2, data);
                }}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />

            <EdgeProvider>
                <EdgeDialog
                    setData={(data) => {
                        partEditorState?.setEdge(EdgePosition.A1, data);
                        partEditorState?.setEdge(EdgePosition.A2, data);
                        partEditorState?.setEdge(EdgePosition.B1, data);
                        partEditorState?.setEdge(EdgePosition.B2, data);

                        partEditorState?.cornerData.forEach(item => partEditorState?.setCornerEdge(item.cornerPosition, data));
                    }}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default PartDuplicatedBasicEditor;
