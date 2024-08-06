import { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, Image } from 'react-feather';

import { PartDuplicatedBasicEditorContext } from './part-duplicated-basic-editor-provider';
import PartGrid from '../part-grid';
import BoardDialog from '../board/board-dialog';
import BoardEditor from '../board/board-editor';
import BoardValue from '../board/board-value';
import CornerDialog from '../corner/corner-dialog';
import CornerEditor from '../corner/corner-editor';
import EdgeDialog from '../edge/edge-dialog';
import EdgeEditor from '../edge/edge-editor';
import BoardProvider from '../../../board/board-provider';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { BoardPosition, CornerPosition, EdgePosition } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const PartDuplicatedBasicForm = () => {
    const partDuplicatedBasicEditorState = useContext(PartDuplicatedBasicEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showBottomBoardDialog, setShowBottomBoardDialog] = useState(false);
    const [showBoardsDialog, setShowBoardsDialog] = useState(false);
    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    return (
        <>
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
                    value={partDuplicatedBasicEditorState?.rotate || false}
                    setValue={(value) => partDuplicatedBasicEditorState?.setRotate(value)}>
                    <span className="pr-2">{commonResourceState?.resource?.partEditor.rotate}</span>
                </WiwaFormCheckBox>
            </div>

            <PartGrid
                board={
                    <div className="flex flex-row justify-center items-center gap-2">
                        <BoardEditor
                            structure={!partDuplicatedBasicEditorState?.rotate}
                            rotate={partDuplicatedBasicEditorState?.rotate || false}
                            name={partDuplicatedBasicEditorState?.partEditorState?.getBoardName(BoardPosition.TOP)}
                            board={partDuplicatedBasicEditorState?.boardData.find(item => item.boardPosition === BoardPosition.TOP)?.board}
                            dimensions={partDuplicatedBasicEditorState?.boardData.find(item => item.boardPosition === BoardPosition.TOP)?.dimensions}
                            setBoard={(data) => partDuplicatedBasicEditorState?.setBoard(BoardPosition.TOP, data)}
                            setDimensions={(data) => partDuplicatedBasicEditorState?.setDimensions(data)}
                        />
                        <BoardValue
                            structure={!partDuplicatedBasicEditorState?.rotate}
                            rotate={partDuplicatedBasicEditorState?.rotate || false}
                            name={partDuplicatedBasicEditorState?.partEditorState?.getBoardName(BoardPosition.BOTTOM)}
                            board={partDuplicatedBasicEditorState?.boardData.find(item => item.boardPosition === BoardPosition.BOTTOM)?.board}
                            dimensions={partDuplicatedBasicEditorState?.boardData.find(item => item.boardPosition === BoardPosition.BOTTOM)?.dimensions}
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
                    name={partDuplicatedBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.A1)}
                    edge={partDuplicatedBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A1)?.edge}
                    setEdge={(data) => partDuplicatedBasicEditorState?.setEdge(EdgePosition.A1, data)}
                    deleteEdge={() => partDuplicatedBasicEditorState?.deleteEdge(EdgePosition.A1)}
                />}
                edgeA2={<EdgeEditor
                    position={EdgePosition.A2}
                    name={partDuplicatedBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.A2)}
                    edge={partDuplicatedBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A2)?.edge}
                    setEdge={(data) => partDuplicatedBasicEditorState?.setEdge(EdgePosition.A2, data)}
                    deleteEdge={() => partDuplicatedBasicEditorState?.deleteEdge(EdgePosition.A2)}
                />}
                edgeB1={<EdgeEditor
                    position={EdgePosition.B1}
                    name={partDuplicatedBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.B1)}
                    edge={partDuplicatedBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B1)?.edge}
                    setEdge={(data) => partDuplicatedBasicEditorState?.setEdge(EdgePosition.B1, data)}
                    deleteEdge={() => partDuplicatedBasicEditorState?.deleteEdge(EdgePosition.B1)}
                />}
                edgeB2={<EdgeEditor
                    position={EdgePosition.B2}
                    name={partDuplicatedBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.B2)}
                    edge={partDuplicatedBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B2)?.edge}
                    setEdge={(data) => partDuplicatedBasicEditorState?.setEdge(EdgePosition.B2, data)}
                    deleteEdge={() => partDuplicatedBasicEditorState?.deleteEdge(EdgePosition.B2)}
                />}
                cornerA1B1={<CornerEditor
                    position={CornerPosition.A1B1}
                    name={partDuplicatedBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A1B1)}
                    type={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.type}
                    radius={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.radius}
                    dimensions={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.dimensions}
                    edge={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.edge}
                    setCornerDimensions={(data) => partDuplicatedBasicEditorState?.setCornerDimensions(CornerPosition.A1B1, data)}
                    setCornerEdge={(data) => partDuplicatedBasicEditorState?.setCornerEdge(CornerPosition.A1B1, data)}
                    setCornerRadius={(data) => partDuplicatedBasicEditorState?.setCornerRadius(CornerPosition.A1B1, data)}
                    deleteCorner={() => partDuplicatedBasicEditorState?.deleteCorner(CornerPosition.A1B1)}
                />}
                cornerA1B2={<CornerEditor
                    position={CornerPosition.A1B2}
                    name={partDuplicatedBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A1B2)}
                    type={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.type}
                    radius={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.radius}
                    dimensions={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.dimensions}
                    edge={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.edge}
                    setCornerDimensions={(data) => partDuplicatedBasicEditorState?.setCornerDimensions(CornerPosition.A1B2, data)}
                    setCornerEdge={(data) => partDuplicatedBasicEditorState?.setCornerEdge(CornerPosition.A1B2, data)}
                    setCornerRadius={(data) => partDuplicatedBasicEditorState?.setCornerRadius(CornerPosition.A1B2, data)}
                    deleteCorner={() => partDuplicatedBasicEditorState?.deleteCorner(CornerPosition.A1B2)}
                />}
                cornerA2B1={<CornerEditor
                    position={CornerPosition.A2B1}
                    name={partDuplicatedBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A2B1)}
                    type={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.type}
                    radius={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.radius}
                    dimensions={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.dimensions}
                    edge={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.edge}
                    setCornerDimensions={(data) => partDuplicatedBasicEditorState?.setCornerDimensions(CornerPosition.A2B1, data)}
                    setCornerEdge={(data) => partDuplicatedBasicEditorState?.setCornerEdge(CornerPosition.A2B1, data)}
                    setCornerRadius={(data) => partDuplicatedBasicEditorState?.setCornerRadius(CornerPosition.A2B1, data)}
                    deleteCorner={() => partDuplicatedBasicEditorState?.deleteCorner(CornerPosition.A2B1)}
                />}
                cornerA2B2={<CornerEditor
                    position={CornerPosition.A2B2}
                    name={partDuplicatedBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A2B2)}
                    type={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.type}
                    radius={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.radius}
                    dimensions={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.dimensions}
                    edge={partDuplicatedBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.edge}
                    setCornerDimensions={(data) => partDuplicatedBasicEditorState?.setCornerDimensions(CornerPosition.A2B2, data)}
                    setCornerEdge={(data) => partDuplicatedBasicEditorState?.setCornerEdge(CornerPosition.A2B2, data)}
                    setCornerRadius={(data) => partDuplicatedBasicEditorState?.setCornerRadius(CornerPosition.A2B2, data)}
                    deleteCorner={() => partDuplicatedBasicEditorState?.deleteCorner(CornerPosition.A2B2)}
                />}
            />

            <BoardProvider>
                <BoardDialog
                    name={partDuplicatedBasicEditorState?.partEditorState?.getBoardName(BoardPosition.BOTTOM)}
                    data={partDuplicatedBasicEditorState?.boardData.find(item => item.boardPosition === BoardPosition.BOTTOM)?.board}
                    setData={(data) => {
                        partDuplicatedBasicEditorState?.setBoard(BoardPosition.BOTTOM, data);
                    }}
                    showDialog={showBottomBoardDialog}
                    setShowDialog={setShowBottomBoardDialog}
                />
            </BoardProvider>

            <BoardProvider>
                <BoardDialog
                    setData={(data) => partDuplicatedBasicEditorState?.setBoardAll(data)}
                    showDialog={showBoardsDialog}
                    setShowDialog={setShowBoardsDialog}
                />
            </BoardProvider>

            <CornerDialog
                setDimensionsData={(data) => partDuplicatedBasicEditorState?.setCornerDimensionsAll(data)}
                setRadiusData={(data) => partDuplicatedBasicEditorState?.setCornerRadiusAll(data)}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />

            <EdgeProvider>
                <EdgeDialog
                    setData={(data) => {
                        partDuplicatedBasicEditorState?.setEdgeAll(data);
                        partDuplicatedBasicEditorState?.setCornerEdgeAll(data);
                    }}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default PartDuplicatedBasicForm;
