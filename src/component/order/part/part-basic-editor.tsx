import { BoardDimension, BoardPosition, CornerPosition, EdgePosition } from '../../../api/model/application';
import CornerEditor from './corner/corner-editor.tsx';
import BoardDimensionEditor from './board/board-dimension-editor.tsx';
import BoardMaterialEditor from './board/board-material-editor.tsx';
import EdgeMaterialEditor from './edge/edge-material-editor.tsx';

const PartBasicEditor = () => {
    return (
        <>
            <div className="overflow-auto">
                <div className="grid grid-cols-3 min-w-max">
                    <div className="flex flex-row items-end justify-end p-5 border">
                        <div className="flex flex-row gap-5">
                            <EdgeMaterialEditor edgePosition={EdgePosition.A1B1}/>
                            <CornerEditor cornerPosition={CornerPosition.A1B1}/>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center p-5 border">
                        <div className="flex flex-col items-center gap-5">
                            <BoardDimensionEditor boardPosition={BoardPosition.TOP} boardDimension={BoardDimension.X}/>
                            <EdgeMaterialEditor edgePosition={EdgePosition.A1}/>
                        </div>
                    </div>

                    <div className="flex flex-row items-end justify-start p-5 border">
                        <div className="flex flex-row gap-5">
                            <CornerEditor cornerPosition={CornerPosition.A1B2}/>
                            <EdgeMaterialEditor edgePosition={EdgePosition.A1B2}/>
                        </div>
                    </div>

                    <div className="flex flex-row justify-end items-center p-5 border">
                        <EdgeMaterialEditor edgePosition={EdgePosition.B1}/>
                    </div>

                    <div className="flex flex-row justify-center items-center p-5 border-4 border-black">
                        <BoardMaterialEditor boardPosition={BoardPosition.TOP} rotate={false}/>
                    </div>

                    <div className="flex flex-row items-center justify-start p-5 border">
                        <div className="flex flex-row gap-5 items-center justify-center">
                            <EdgeMaterialEditor edgePosition={EdgePosition.B2}/>
                            <BoardDimensionEditor boardPosition={BoardPosition.TOP} boardDimension={BoardDimension.Y}/>
                        </div>
                    </div>

                    <div className="flex flex-row items-start justify-end p-5 border">
                        <div className="flex flex-row gap-5">
                            <EdgeMaterialEditor edgePosition={EdgePosition.A2B1}/>
                            <CornerEditor cornerPosition={CornerPosition.A2B1}/>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center items-start p-5 border">
                        <EdgeMaterialEditor edgePosition={EdgePosition.A2}/>
                    </div>

                    <div className="flex flex-row items-start justify-start p-5 border">
                        <div className="flex flex-row gap-5">
                            <CornerEditor cornerPosition={CornerPosition.A2B2}/>
                            <EdgeMaterialEditor edgePosition={EdgePosition.A2B2}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartBasicEditor;
