import { useContext, useEffect, useState } from 'react';

import { BoardData, PartEditorContext } from '../part-editor-provider';

const BoardInfo = ({boardData}: { boardData: BoardData }) => {
    const partEditorState = useContext(PartEditorContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        const boardText = boardData.board ? `${boardData.board.code} ${boardData.board.name}` : '';
        const boardDimensions = boardData.dimensions ? `${boardData.dimensions.x}x${boardData.dimensions.y} ${partEditorState?.lengthSign}` : '';
        setText(`${partEditorState?.getBoardName(boardData.boardPosition)}: ${boardText} ${boardDimensions}`);
    }, [boardData]);

    return (
        <span>{text}</span>
    )
}

export default BoardInfo;
