import { useContext, useEffect, useState } from 'react';

import { EdgeData, PartEditorContext } from '../part-editor-provider';

const EdgeInfo = ({edgeData}: { edgeData: EdgeData }) => {
    const partEditorState = useContext(PartEditorContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        setText(`${partEditorState?.getEdgeName(edgeData.edgePosition)}: ${edgeData.edge.code} ${edgeData.edge.name}`);
    }, [edgeData]);

    return (
        <span>{text}</span>
    )
}

export default EdgeInfo;
