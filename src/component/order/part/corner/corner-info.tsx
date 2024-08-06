import { useContext, useEffect, useState } from 'react';

import { Dimensions } from '../../../../api/model';
import { UnitId } from '../../../../api/model/application';
import { Edge } from '../../../../api/model/edge';
import { PartCornerType } from '../../../../api/model/order/part';
import { CommonResourceContext } from '../../../../context';

const CornerInfo = (
    {
        name,
        type,
        radius,
        dimensions,
        edge
    }: {
        name?: string,
        type?: PartCornerType,
        radius?: number,
        dimensions?: Dimensions,
        edge?: Edge
    }
) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        const cornerEdge = edge ? `${edge.code} ${edge.name}` : '';
        let edgeDimensions = '';
        if (type === PartCornerType.ROUNDED) {
            edgeDimensions = radius ? `r ${radius} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]` : '';
        }
        if (type === PartCornerType.STRAIGHT) {
            edgeDimensions = dimensions ? `${dimensions.x}x${dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]` : '';
        }
        setText(`${name}: ${cornerEdge} ${edgeDimensions}`);
    }, [name, type, radius, dimensions, edge, commonResourceState]);

    return (
        <span>{text}</span>
    )
}

export default CornerInfo;
