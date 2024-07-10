import { BoardDimension, BoardPosition, CornerPosition } from '../../../api/model/application';
import CornerEditor from './corner/corner-editor.tsx';
import BoardDimensionEditor from './board/board-dimension-editor.tsx';

const PartBasicEditor = () => {
    return (
        <>
            <div className="overflow-auto">
                <div className="grid grid-cols-9 min-w-[900px]">

                    <div className="min-h-8 col-span-3"/>
                    <div className="min-h-8 col-span-3 flex items-center justify-center p-5">
                        <BoardDimensionEditor boardPosition={BoardPosition.TOP} boardDimension={BoardDimension.X}/>
                    </div>
                    <div className="min-h-8 col-span-3"/>

                    <div className="min-h-8 col-span-3 flex items-center justify-end p-5">
                        <CornerEditor cornerPosition={CornerPosition.A1B1}/>
                    </div>
                    <div className="min-h-8 col-span-3 flex items-center justify-center p-5">A1-e</div>
                    <div className="min-h-8 col-span-3 flex items-center justify-start p-5">
                        <CornerEditor cornerPosition={CornerPosition.A1B2}/>
                    </div>

                    <div className="min-h-8 col-span-3 row-span-4 flex items-center justify-end p-5">
                        B1-e
                    </div>
                    <div
                        className="min-h-8 col-span-3 row-span-4 border-4 border-black flex items-center justify-center p-5">
                        BOARD
                    </div>
                    <div className="min-h-8 row-span-4 flex items-center justify-start p-5">
                        B2-e
                    </div>
                    <div className="min-h-8 col-span-2 row-span-4 flex items-center justify-start p-5">
                        <BoardDimensionEditor boardPosition={BoardPosition.TOP} boardDimension={BoardDimension.Y}/>
                    </div>

                    <div className="min-h-8 col-span-3 flex items-center justify-end p-5">
                        <CornerEditor cornerPosition={CornerPosition.A2B1}/>
                    </div>
                    <div className="min-h-8 col-span-3 flex items-center justify-center p-5">
                        A2-e
                    </div>
                    <div className="min-h-8 col-span-3 flex items-center justify-start p-5">
                        <CornerEditor cornerPosition={CornerPosition.A2B2}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartBasicEditor;
