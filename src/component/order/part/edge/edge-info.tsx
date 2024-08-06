import { useEffect, useState } from 'react';

import { Edge } from '../../../../api/model/edge';

const EdgeInfo = ({name, edge}: { name?: string, edge?: Edge }) => {
    const [text, setText] = useState<string>();

    useEffect(() => {
        if (edge) {
            setText(`${name}: ${edge.code} ${edge.name}`);
        }
    }, [name, edge]);

    return (
        <span>{text}</span>
    )
}

export default EdgeInfo;
