import { ReactNode, useContext, useEffect, useState } from 'react';
import { Circle, Octagon } from 'react-feather';
import { CornerPosition, UnitId } from '../../../../api/model/application';
import { PartCornerType } from '../../../../api/model/order/part';
import { getEdgeImagePath } from '../../../../api/controller/ui';
import { CommonResourceContext } from '../../../../context';
import { Dimensions } from '../../../../api/model';
import { Edge } from '../../../../api/model/edge';

const CornerValue = (
    {
        position,
        name,
        type,
        radius,
        dimensions,
        edge,
        children
    }: {
        position: CornerPosition,
        name?: string,
        type?: PartCornerType,
        radius?: number,
        dimensions?: Dimensions,
        edge?: Edge,
        children?: ReactNode
    }
) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [text, setText] = useState('');
    const [edgeId, setEdgeId] = useState(-1);

    useEffect(() => {
        setText(name || '');
        setEdgeId(-1);

        if (type) {
            if (radius) {
                setText(`${name} r ${radius} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
            }
            if (dimensions) {
                setText(`${name} ${dimensions.x}x${dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
            }
            setEdgeId(edge ? edge.id : -1);
        }
    }, [name, type, radius, dimensions, edge]);

    return (
        <div className="flex flex-col items-center justify-center tooltip tooltip-secondary gap-1" data-tip={text}>
            {[CornerPosition.A1B1, CornerPosition.A1B2].includes(position) &&
                <>
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
                    {type === PartCornerType.STRAIGHT && <Octagon size={28}/>}
                    {type === PartCornerType.ROUNDED && <Circle size={28}/>}
                </>
            }
        </div>
    )
}

export default CornerValue;
