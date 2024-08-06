import { ReactNode, useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'react-feather';

import { getEdgeImagePath } from '../../../../api/controller/ui';
import { EdgePosition } from '../../../../api/model/application';
import { Edge } from '../../../../api/model/edge';

const EdgeValue = (
    {
        position,
        name,
        edge,
        children
    }: {
        position: EdgePosition,
        name?: string,
        edge?: Edge,
        children?: ReactNode
    }
) => {
    const [text, setText] = useState<string>();
    const [edgeId, setEdgeId] = useState(-1);

    useEffect(() => {
        setText(name);
        setEdgeId(-1);
        if (edge) {
            setText(`${name} ${edge.code} ${edge.name}`);
            setEdgeId(edge.id);
        }
    }, [name, edge]);

    return (
        <div className="flex flex-col items-center justify-center tooltip tooltip-secondary gap-1" data-tip={text}>
            {[EdgePosition.A1, EdgePosition.A2I].includes(position) && <ArrowUp size={28}/>}
            {[EdgePosition.B1, EdgePosition.B2I, EdgePosition.A1B1, EdgePosition.A2B1].includes(position) &&
                <ArrowLeft size={28}/>}
            {[EdgePosition.B2, EdgePosition.B1I, EdgePosition.A1B2, EdgePosition.A2B2].includes(position) &&
                <ArrowRight size={28}/>}
            {edgeId !== -1 &&
                <img
                    className={'flex-none object-scale-down object-center w-16 h-7'}
                    src={getEdgeImagePath(edgeId)}
                    alt="Edge image"
                />
            }
            {children}
            {[EdgePosition.A2, EdgePosition.A1I].includes(position) && <ArrowDown size={28}/>}
        </div>
    )
}

export default EdgeValue;
