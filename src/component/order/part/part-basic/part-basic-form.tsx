import { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, Image } from 'react-feather';

import { PartBasicEditorContext } from './part-basic-editor-provider';
import PartGrid from '../part-grid';
import BoardEditor from '../board/board-editor';
import CornerDialog from '../corner/corner-dialog';
import CornerEditor from '../corner/corner-editor';
import EdgeDialog from '../edge/edge-dialog';
import EdgeEditor from '../edge/edge-editor';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { BoardPosition, CornerPosition, EdgePosition } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const PartBasicForm = () => {
    const partBasicEditorState = useContext(PartBasicEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center w-full gap-5">
                <div className="join pr-5">
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
                    className="flex flex-row gap-2"
                    value={partBasicEditorState?.rotate || false}
                    setValue={(value) => partBasicEditorState?.setRotate(value)}>
                    <span className="pr-2">{commonResourceState?.resource?.partEditor.rotate}</span>
                </WiwaFormCheckBox>
            </div>
            <PartGrid
                board={<BoardEditor
                    structure={!partBasicEditorState?.rotate}
                    rotate={partBasicEditorState?.rotate || false}
                    name={partBasicEditorState?.partEditorState?.getBoardName(BoardPosition.TOP)}
                    board={partBasicEditorState?.boardData?.board}
                    dimensions={partBasicEditorState?.boardData?.dimensions}
                    setBoard={(data) => partBasicEditorState?.setBoard(data)}
                    setDimensions={(data) => partBasicEditorState?.setDimensions(data)}
                />}
                edgeA1={<EdgeEditor
                    position={EdgePosition.A1}
                    name={partBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.A1)}
                    edge={partBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A1)?.edge}
                    setEdge={(data) => partBasicEditorState?.setEdge(EdgePosition.A1, data)}
                    deleteEdge={() => partBasicEditorState?.deleteEdge(EdgePosition.A1)}
                />}
                edgeA2={<EdgeEditor
                    position={EdgePosition.A2}
                    name={partBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.A2)}
                    edge={partBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.A2)?.edge}
                    setEdge={(data) => partBasicEditorState?.setEdge(EdgePosition.A2, data)}
                    deleteEdge={() => partBasicEditorState?.deleteEdge(EdgePosition.A2)}
                />}
                edgeB1={<EdgeEditor
                    position={EdgePosition.B1}
                    name={partBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.B1)}
                    edge={partBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B1)?.edge}
                    setEdge={(data) => partBasicEditorState?.setEdge(EdgePosition.B1, data)}
                    deleteEdge={() => partBasicEditorState?.deleteEdge(EdgePosition.B1)}
                />}
                edgeB2={<EdgeEditor
                    position={EdgePosition.B2}
                    name={partBasicEditorState?.partEditorState?.getEdgeName(EdgePosition.B2)}
                    edge={partBasicEditorState?.edgeData.find(item => item.edgePosition === EdgePosition.B2)?.edge}
                    setEdge={(data) => partBasicEditorState?.setEdge(EdgePosition.B2, data)}
                    deleteEdge={() => partBasicEditorState?.deleteEdge(EdgePosition.B2)}
                />}
                cornerA1B1={<CornerEditor
                    position={CornerPosition.A1B1}
                    name={partBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A1B1)}
                    type={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.type}
                    radius={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.radius}
                    dimensions={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.dimensions}
                    edge={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B1)?.edge}
                    setCornerDimensions={(data) => partBasicEditorState?.setCornerDimensions(CornerPosition.A1B1, data)}
                    setCornerEdge={(data) => partBasicEditorState?.setCornerEdge(CornerPosition.A1B1, data)}
                    setCornerRadius={(data) => partBasicEditorState?.setCornerRadius(CornerPosition.A1B1, data)}
                    deleteCorner={() => partBasicEditorState?.deleteCorner(CornerPosition.A1B1)}
                />}
                cornerA1B2={<CornerEditor
                    position={CornerPosition.A1B2}
                    name={partBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A1B2)}
                    type={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.type}
                    radius={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.radius}
                    dimensions={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.dimensions}
                    edge={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A1B2)?.edge}
                    setCornerDimensions={(data) => partBasicEditorState?.setCornerDimensions(CornerPosition.A1B2, data)}
                    setCornerEdge={(data) => partBasicEditorState?.setCornerEdge(CornerPosition.A1B2, data)}
                    setCornerRadius={(data) => partBasicEditorState?.setCornerRadius(CornerPosition.A1B2, data)}
                    deleteCorner={() => partBasicEditorState?.deleteCorner(CornerPosition.A1B2)}
                />}
                cornerA2B1={<CornerEditor
                    position={CornerPosition.A2B1}
                    name={partBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A2B1)}
                    type={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.type}
                    radius={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.radius}
                    dimensions={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.dimensions}
                    edge={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B1)?.edge}
                    setCornerDimensions={(data) => partBasicEditorState?.setCornerDimensions(CornerPosition.A2B1, data)}
                    setCornerEdge={(data) => partBasicEditorState?.setCornerEdge(CornerPosition.A2B1, data)}
                    setCornerRadius={(data) => partBasicEditorState?.setCornerRadius(CornerPosition.A2B1, data)}
                    deleteCorner={() => partBasicEditorState?.deleteCorner(CornerPosition.A2B1)}
                />}
                cornerA2B2={<CornerEditor
                    position={CornerPosition.A2B2}
                    name={partBasicEditorState?.partEditorState?.getCornerName(CornerPosition.A2B2)}
                    type={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.type}
                    radius={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.radius}
                    dimensions={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.dimensions}
                    edge={partBasicEditorState?.cornerData.find(item => item.cornerPosition === CornerPosition.A2B2)?.edge}
                    setCornerDimensions={(data) => partBasicEditorState?.setCornerDimensions(CornerPosition.A2B2, data)}
                    setCornerEdge={(data) => partBasicEditorState?.setCornerEdge(CornerPosition.A2B2, data)}
                    setCornerRadius={(data) => partBasicEditorState?.setCornerRadius(CornerPosition.A2B2, data)}
                    deleteCorner={() => partBasicEditorState?.deleteCorner(CornerPosition.A2B2)}
                />}
            />

            <CornerDialog
                setDimensionsData={(data) => partBasicEditorState?.setCornerDimensionsAll(data)}
                setRadiusData={(data) => partBasicEditorState?.setCornerRadiusAll(data)}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />

            <EdgeProvider>
                <EdgeDialog
                    setData={(data) => {
                        partBasicEditorState?.setEdgeAll(data);
                        partBasicEditorState?.setCornerEdgeAll(data);
                    }}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default PartBasicForm;
