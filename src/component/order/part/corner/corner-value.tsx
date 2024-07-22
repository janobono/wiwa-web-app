import { ReactNode, useContext, useEffect, useState } from 'react';
import { Circle, Octagon, Square } from 'react-feather';

import { CornerData } from '../part-editor-provider';
import { CornerPosition, UnitId } from '../../../../api/model/application';
import { PartCornerType } from '../../../../api/model/order/part';
import { getEdgeImagePath } from '../../../../api/controller/ui';
import { CommonResourceContext } from '../../../../context';

const CornerValue = (
    {
        position,
        name,
        data,
        children
    }: {
        position: CornerPosition,
        name?: string,
        data?: CornerData,
        children?: ReactNode
    }
) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [type, setType] = useState('NONE');
    const [text, setText] = useState('');
    const [edgeId, setEdgeId] = useState(-1);

    useEffect(() => {
        setType('NONE');
        setText(name || '');
        setEdgeId(-1);

        if (data) {
            setType(data.type || 'NONE');
            if (data.radius) {
                setText(`${name} r ${data.radius} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
            }
            if (data.dimensions) {
                setText(`${name} ${data.dimensions.x}x${data.dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
            }
            setEdgeId(data.edge ? data.edge.id : -1);
        }
    }, [name, data]);

    return (
        <div className="flex flex-col items-center justify-center tooltip tooltip-secondary gap-1" data-tip={text}>
            {[CornerPosition.A1B1, CornerPosition.A1B2].includes(position) &&
                <>
                    {type === 'NONE' && <Square size={28}/>}
                    {type === PartCornerType.STRAIGHT && <Octagon size={28}/>}
                    {type === PartCornerType.ROUNDED && <Circle size={28}/>}
                </>
            }
            {edgeId !== -1 &&
                <img
                    className="flex-none object-scale-down object-center w-16 h-7"
                    src={getEdgeImagePath(edgeId)}
                    alt="Edge image"
                />
            }
            {children}
            {[CornerPosition.A2B1, CornerPosition.A2B2].includes(position) &&
                <>
                    {type === 'NONE' && <Square size={28}/>}
                    {type === PartCornerType.STRAIGHT && <Octagon size={28}/>}
                    {type === PartCornerType.ROUNDED && <Circle size={28}/>}
                </>
            }
        </div>
    )
}

export default CornerValue;
