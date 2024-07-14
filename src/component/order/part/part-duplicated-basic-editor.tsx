import { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, Image } from 'react-feather';

import BoardDialog from './board-dialog';
import CornerDialog from './corner-dialog';
import EdgeDialog from './edge-dialog';
import PartEditorErrors from './part-editor-errors';
import PartEditorInfo from './part-editor-info';
import { PartEditorContext } from './part-editor-provider';
import BoardDimensionEditor from './board/board-dimension-editor';
import BoardMaterialEditor from './board/board-material-editor';
import CornerEditor from './corner/corner-editor';
import EdgeEditor from './edge/edge-editor';
import BoardProvider from '../../board/board-provider';
import EdgeProvider from '../../edge/edge-provider';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { BoardDimension, BoardPosition, CornerPosition, EdgePosition } from '../../../api/model/application';
import { CommonResourceContext } from '../../../context';

const PartDuplicatedBasicEditor = () => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showBoardDialog, setShowBoardDialog] = useState(false);
    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    return (
        <>
            <div className="overflow-auto">
                <div className="grid grid-cols-4 min-w-max border">
                    <div className="flex flex-row items-end justify-end p-5">
                        <CornerEditor cornerPosition={CornerPosition.A1B1}/>
                    </div>

                    <div className="flex flex-row justify-center p-5">
                        <div className="flex flex-col items-center gap-5">
                            <BoardDimensionEditor boardPosition={BoardPosition.TOP}
                                                  shadowBoardPositions={[BoardPosition.BOTTOM]}
                                                  boardDimension={BoardDimension.X}/>
                            <EdgeEditor edgePosition={EdgePosition.A1}/>
                        </div>
                    </div>

                    <div className="flex flex-row items-end justify-start p-5">
                        <CornerEditor cornerPosition={CornerPosition.A1B2}/>
                    </div>

                    <div className="row-span-3 flex flex-col items-start justify-start p-5">
                        <PartEditorInfo/>
                    </div>

                    <div className="flex flex-row justify-end items-center p-5">
                        <EdgeEditor edgePosition={EdgePosition.B1}/>
                    </div>

                    <div className="flex flex-row justify-center items-center p-5 border-4 border-black">
                        <div className="flex flex-row gap-5 items-center justify-center">
                            <BoardMaterialEditor boardPosition={BoardPosition.TOP} rotate={false}/>
                            <BoardMaterialEditor boardPosition={BoardPosition.BOTTOM} rotate={false}/>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start p-5">
                        <div className="flex flex-row gap-5 items-center justify-center">
                            <EdgeEditor edgePosition={EdgePosition.B2}/>
                            <BoardDimensionEditor boardPosition={BoardPosition.TOP} boardDimension={BoardDimension.Y}/>
                        </div>
                    </div>

                    <div className="flex flex-row items-start justify-end p-5">
                        <CornerEditor cornerPosition={CornerPosition.A2B1}/>
                    </div>

                    <div className="flex flex-row justify-center items-start p-5">
                        <EdgeEditor edgePosition={EdgePosition.A2}/>
                    </div>

                    <div className="flex flex-row items-start justify-start p-5">
                        <CornerEditor cornerPosition={CornerPosition.A2B2}/>
                    </div>

                    <div className="col-span-4 flex flex-col items-start justify-start p-5">
                        <div className="join">
                            <WiwaFormCheckBox
                                className="join-item flex flex-row gap-2"
                                value={partEditorState?.rotate || false}
                                setValue={(value) => partEditorState?.setRotate(value)}>
                                <span className="pr-2">{commonResourceState?.resource?.partEditor.rotate}</span>
                            </WiwaFormCheckBox>
                            <WiwaButton
                                title={commonResourceState?.resource?.partEditor.actions.editAllBoards}
                                className="btn-primary btn-xs join-item"
                                onClick={() => setShowBoardDialog(true)}
                            >
                                <Image size={12}/>
                            </WiwaButton>
                            <WiwaButton
                                title={commonResourceState?.resource?.partEditor.actions.editAllCornerDimensions}
                                className="btn-secondary btn-xs join-item"
                                onClick={() => setShowDimensionsDialog(true)}
                            >
                                <div className="grid grid-cols-2">
                                    <ArrowLeft size={12}/>
                                    <ArrowRight size={12}/>
                                </div>
                            </WiwaButton>
                            <WiwaButton
                                title={commonResourceState?.resource?.partEditor.actions.editAllEdges}
                                className="btn-secondary btn-xs join-item"
                                onClick={() => setShowEdgeDialog(true)}
                            >
                                <Image size={12}/>
                            </WiwaButton>
                        </div>
                    </div>

                    <div className="col-span-4 flex flex-col items-start justify-start p-5 border">
                        <PartEditorErrors/>
                    </div>
                </div>
            </div>

            <BoardProvider>
                <BoardDialog
                    setData={(data) => partEditorState?.setBoard([BoardPosition.TOP, BoardPosition.BOTTOM], data)}
                    showDialog={showBoardDialog}
                    setShowDialog={setShowBoardDialog}
                />
            </BoardProvider>

            <CornerDialog
                setDimensionsData={(data) => partEditorState?.setCornerDimensions([CornerPosition.A1B1, CornerPosition.A1B2, CornerPosition.A2B1, CornerPosition.A2B2], data)}
                setRadiusData={(data) => partEditorState?.setCornerRadius([CornerPosition.A1B1, CornerPosition.A1B2, CornerPosition.A2B1, CornerPosition.A2B2], data)}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />

            <EdgeProvider>
                <EdgeDialog
                    setData={(data) => {
                        partEditorState?.setEdge([EdgePosition.A1, EdgePosition.A2, EdgePosition.B1, EdgePosition.B2], data);

                        const cornerPositions = partEditorState?.cornerData.map(item => item.cornerPosition) || [];
                        if (cornerPositions.length > 0) {
                            partEditorState?.setCornerEdge(cornerPositions, data);
                        }
                    }}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default PartDuplicatedBasicEditor;
