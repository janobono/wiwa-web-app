import { useContext, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Image } from 'react-feather';

import PartEditorInfo from '../part-editor-info';
import { PartEditorContext } from '../part-editor-provider';
import PartGrid from '../part-grid';
import BoardEditor from '../board/board-editor';
import CornerDialog from '../corner/corner-dialog';
import CornerEditor from '../corner/corner-editor';
import EdgeEditor from '../edge/edge-editor';
import EdgeDialog from '../edge/edge-dialog';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { BoardPosition, CornerPosition, EdgePosition } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';
import { twMerge } from 'tailwind-merge';
import WiwaSelect from '../../../ui/wiwa-select.tsx';
import { FrameType } from '../../../../api/model/order/part';
import BoardValue from '../board/board-value.tsx';

const PartDuplicatedFrameEditor = () => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    const [tab, setTab] = useState(0);

    return (
        <>
            <div className="flex flex-col gap-5 w-full overflow-auto">
                <div className="flex flex-row gap-5 min-w-[800px] w-full">
                    <div className="flex flex-col items-start justify-center w-full gap-5">
                        <div role="tablist" className="tabs tabs-bordered">
                            <div role="tab"
                                 className={twMerge(`tab ${tab === 0 ? 'tab-active' : ''}`)}
                                 onClick={() => setTab(0)}>Top
                            </div>
                            <div role="tab"
                                 className={twMerge(`tab ${tab === 1 ? 'tab-active' : ''}`)}
                                 onClick={() => setTab(1)}>Bottom
                            </div>
                        </div>
                        {tab === 0 ?
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
                                        value={partEditorState?.rotate || false}
                                        setValue={(value) => partEditorState?.setRotate(value)}>
                                        <span className="pr-2">{commonResourceState?.resource?.partEditor.rotate}</span>
                                    </WiwaFormCheckBox>
                                </div>
                                <PartGrid
                                    board={<BoardEditor
                                        structure={!partEditorState?.rotate}
                                        rotate={partEditorState?.rotate || false}
                                        position={BoardPosition.TOP}
                                        name={partEditorState?.getBoardName(BoardPosition.TOP)}
                                        data={partEditorState?.boardData.find(item => item.boardPosition === BoardPosition.TOP)}
                                        setBoard={(position, data) => partEditorState?.setBoard(position, data)}
                                        setDimensions={(position, data) => partEditorState?.setBoardDimensions(position, data)}
                                    />}
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
                            </>
                            :
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
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className="flex flex-col border w-full">
                        <PartEditorInfo/>
                    </div>
                </div>
            </div>

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

export default PartDuplicatedFrameEditor;
