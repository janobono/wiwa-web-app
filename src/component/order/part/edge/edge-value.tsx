import { ReactNode, useContext, useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'react-feather';
import { twMerge } from 'tailwind-merge';

import { PartEditorContext } from '../part-editor-provider';
import { getEdgeImagePath } from '../../../../api/controller/ui';
import { EdgePosition } from '../../../../api/model/application';

const EdgeValue = (
    {
        edgePosition,
        children
    }: {
        edgePosition: EdgePosition,
        children?: ReactNode
    }
) => {
    const partEditorState = useContext(PartEditorContext);

    const [row, setRow] = useState(true);

    const [text, setText] = useState<string>();
    const [edgeId, setEdgeId] = useState(-1);

    useEffect(() => {
        setRow([EdgePosition.A1, EdgePosition.A1I, EdgePosition.A1B1, EdgePosition.A1B2, EdgePosition.A2, EdgePosition.A2I, EdgePosition.A2B1, EdgePosition.A2B2].includes(edgePosition));
    }, [edgePosition]);

    useEffect(() => {
        setText(undefined);
        setEdgeId(-1);
        const edge = partEditorState?.edgeData.find(item => item.edgePosition === edgePosition)?.edge;
        if (edge) {
            setText(`${edge.code} ${edge.name}`);
            setEdgeId(edge.id);
        }
    }, [edgePosition, partEditorState?.edgeData]);

    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <div
                className={twMerge(`flex gap-2 items-center ${row ? 'flex-row' : 'flex-col'}`)}
            >
                {row ?
                    [EdgePosition.A1, EdgePosition.A2I].includes(edgePosition) ?
                        <ArrowDown size={28}/>
                        :
                        [EdgePosition.A2, EdgePosition.A1I].includes(edgePosition) ?
                            <ArrowUp size={28}/>
                            :
                            [EdgePosition.A1B1, EdgePosition.A2B1].includes(edgePosition) ?
                                <ArrowRight size={28}/>
                                :
                                <ArrowLeft size={28}/>
                    :
                    [EdgePosition.B2, EdgePosition.B2I, EdgePosition.A1B2, EdgePosition.A2B2].includes(edgePosition) ?
                        <ArrowLeft size={28}/>
                        :
                        <ArrowRight size={28}/>
                }
                {edgeId !== -1 &&
                    <img
                        className={'flex-none object-scale-down object-center w-16 h-7'}
                        src={getEdgeImagePath(edgeId)}
                        alt="Edge image"
                    />
                }
                <span className="text-xs">{text}</span>
            </div>
            {children}
        </div>
    )
}

export default EdgeValue;
