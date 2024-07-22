import { useContext, useEffect, useState } from 'react';

import { CornerData } from '../part-editor-provider';
import { PartCornerType } from '../../../../api/model/order/part';
import { CommonResourceContext } from '../../../../context';
import { UnitId } from '../../../../api/model/application';

const CornerInfo = ({name, data}: { name: string, data: CornerData }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        const cornerEdge = data.edge ? `${data.edge.code} ${data.edge.name}` : '';
        let edgeDimensions = '';
        if (data.type === PartCornerType.ROUNDED) {
            edgeDimensions = data.radius ? `r ${data.radius} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]` : '';
        }
        if (data.type === PartCornerType.STRAIGHT) {
            edgeDimensions = data.dimensions ? `${data.dimensions.x}x${data.dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]` : '';
        }
        setText(`${name}: ${cornerEdge} ${edgeDimensions}`);
    }, [name, data, commonResourceState]);

    return (
        <span>{text}</span>
    )
}

export default CornerInfo;
