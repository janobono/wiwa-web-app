import { useContext, useState } from 'react';
import { ResourceContext } from '../../../context';
import WiwaFormInputInteger from '../../ui/wiwa-form-input-integer.tsx';
import { BoardDimension, CornerPosition } from '../../../api/model/application';
import CornerEditor from './corner-editor.tsx';
import { PartCorner } from '../../../api/model/order/part';
import { Edge } from '../../../api/model/edge';
import { Board } from '../../../api/model/board';
import { PartEditorContext } from './part-editor-provider.tsx';

const PartBasicEditor = () => {
    const partEditorState = useContext(PartEditorContext);
    const resourceState = useContext(ResourceContext);

    const [topX, setTopX] = useState<number>();
    const [topXValid, setTopXValid] = useState(false);

    const [topY, setTopY] = useState<number>();
    const [topYValid, setTopYValid] = useState(false);

    const [board, setBoard] = useState<Board>();

    const [A1B1, setA1B1] = useState<PartCorner>();
    const [A1B2, setA1B2] = useState<PartCorner>();
    const [A2B1, setA2B1] = useState<PartCorner>();
    const [A2B2, setA2B2] = useState<PartCorner>();

    const [eA1, setEA1] = useState<Edge>();
    const [eA2, setEA2] = useState<Edge>();
    const [eB1, setEB1] = useState<Edge>();
    const [eB2, setEB2] = useState<Edge>();

    return (
        <>
            <div className="overflow-auto">
                <div className="grid grid-cols-9 min-w-[900px]">

                    <div className="min-h-8 col-span-3"/>
                    <div className="min-h-8 col-span-3 flex items-center justify-center p-5">
                        <WiwaFormInputInteger
                            label={`${partEditorState?.getDimensionName(BoardDimension.X)} ${partEditorState?.lengthSign}`}
                            required={true}
                            placeholder={`${resourceState?.common?.partEditor.valuePlaceholder} ${partEditorState?.getDimensionName(BoardDimension.X)}`}
                            value={topX}
                            setValue={setTopX}
                            setValid={setTopXValid}
                            validate={() => {
                                if (topX === undefined) {
                                    return {
                                        valid: false,
                                        message: `${partEditorState?.getDimensionName(BoardDimension.X)} ${resourceState?.common?.partEditor.valueRequired}`
                                    };
                                }
                                return {valid: true};
                            }}
                        />
                    </div>
                    <div className="min-h-8 col-span-3"/>

                    <div className="min-h-8 col-span-3 flex items-center justify-end p-5">
                        <CornerEditor
                            title={partEditorState?.getCornerName(CornerPosition.A1B1) || ''}
                            cornerPosition={CornerPosition.A1B1}
                            partCorner={A1B1}
                            setPartCorner={setA1B1}
                        />
                    </div>
                    <div className="min-h-8 col-span-3 flex items-center justify-center p-5">A1-e</div>
                    <div className="min-h-8 col-span-3 flex items-center justify-start p-5">
                        <CornerEditor
                            title={partEditorState?.getCornerName(CornerPosition.A1B2) || ''}
                            cornerPosition={CornerPosition.A1B2}
                            partCorner={A1B2}
                            setPartCorner={setA1B2}
                        />
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
                        <WiwaFormInputInteger
                            label={`${partEditorState?.getDimensionName(BoardDimension.Y)} ${partEditorState?.lengthSign}`}
                            required={true}
                            placeholder={`${resourceState?.common?.partEditor.valuePlaceholder} ${partEditorState?.getDimensionName(BoardDimension.Y)}`}
                            value={topY}
                            setValue={setTopY}
                            setValid={setTopYValid}
                            validate={() => {
                                if (topX === undefined) {
                                    return {
                                        valid: false,
                                        message: `${partEditorState?.getDimensionName(BoardDimension.Y)} ${resourceState?.common?.partEditor.valueRequired}`
                                    };
                                }
                                return {valid: true};
                            }}
                        />
                    </div>

                    <div className="min-h-8 col-span-3 flex items-center justify-end p-5">
                        <CornerEditor
                            title={partEditorState?.getCornerName(CornerPosition.A2B1) || ''}
                            cornerPosition={CornerPosition.A2B1}
                            partCorner={A2B1}
                            setPartCorner={setA2B1}
                        />
                    </div>
                    <div className="min-h-8 col-span-3 flex items-center justify-center p-5">
                        A2-e
                    </div>
                    <div className="min-h-8 col-span-3 flex items-center justify-start p-5">
                        <CornerEditor
                            title={partEditorState?.getCornerName(CornerPosition.A2B2) || ''}
                            cornerPosition={CornerPosition.A2B2}
                            partCorner={A2B2}
                            setPartCorner={setA2B2}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartBasicEditor;
