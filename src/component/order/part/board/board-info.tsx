import { useContext, useEffect, useState } from 'react';

import { Dimensions } from '../../../../api/model';
import { UnitId } from '../../../../api/model/application';
import { Board } from '../../../../api/model/board';
import { CommonResourceContext } from '../../../../context';

const BoardInfo = ({name, board, dimensions}: { name?: string, board?: Board, dimensions?: Dimensions }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        const boardText = board ? `${board.code} ${board.name}` : '';
        const boardDimensions = dimensions ? `${dimensions.x}x${dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]` : '';
        setText(`${name}: ${boardText} ${boardDimensions}`);
    }, [name, board, dimensions]);

    return (
        <span>{text}</span>
    )
}

export default BoardInfo;
