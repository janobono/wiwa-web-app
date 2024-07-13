import { useContext, useEffect, useState } from 'react';

import { CornerData, PartEditorContext } from '../part-editor-provider';
import { PartCornerType } from '../../../../api/model/order/part';

const CornerInfo = ({cornerData}: { cornerData: CornerData }) => {
    const partEditorState = useContext(PartEditorContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        const cornerEdge = cornerData.edge ? `${cornerData.edge.code} ${cornerData.edge.name}` : '';
        let edgeDimensions = '';
        if (cornerData.type === PartCornerType.ROUNDED) {
            edgeDimensions = cornerData.radius ? `r ${cornerData.radius} ${partEditorState?.lengthSign}` : '';
        }
        if (cornerData.type === PartCornerType.STRAIGHT) {
            edgeDimensions = cornerData.dimensions ? `${cornerData.dimensions.x}x${cornerData.dimensions.y} ${partEditorState?.lengthSign}` : '';
        }
        setText(`${partEditorState?.getCornerName(cornerData.cornerPosition)}: ${cornerEdge} ${edgeDimensions}`);
    }, [cornerData]);

    return (
        <span>{text}</span>
    )
}

export default CornerInfo;
