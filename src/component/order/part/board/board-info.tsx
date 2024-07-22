import { useContext, useEffect, useState } from 'react';

import { BoardData } from '../part-editor-provider';
import { UnitId } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const BoardInfo = ({name, data}: { name: string, data: BoardData }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        const boardText = data.board ? `${data.board.code} ${data.board.name}` : '';
        const boardDimensions = data.dimensions ? `${data.dimensions.x}x${data.dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]` : '';
        setText(`${name}: ${boardText} ${boardDimensions}`);
    }, [name, data]);

    return (
        <span>{text}</span>
    )
}

export default BoardInfo;
