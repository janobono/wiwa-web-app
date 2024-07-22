import { useEffect, useState } from 'react';

import { EdgeData } from '../part-editor-provider';

const EdgeInfo = ({name, data}: { name: string, data: EdgeData }) => {
    const [text, setText] = useState<string>();

    useEffect(() => {
        setText(`${name}: ${data.edge.code} ${data.edge.name}`);
    }, [name, data]);

    return (
        <span>{text}</span>
    )
}

export default EdgeInfo;
