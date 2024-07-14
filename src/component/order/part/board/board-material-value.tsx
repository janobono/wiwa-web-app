import { ReactNode, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { PartEditorContext } from '../part-editor-provider';
import { getBoardImagePath } from '../../../../api/controller/ui';
import { BoardPosition } from '../../../../api/model/application';

const BoardMaterialValue = (
    {
        rotate,
        boardPosition,
        children
    }: {
        rotate: boolean,
        boardPosition: BoardPosition,
        children?: ReactNode
    }
) => {
    const partEditorState = useContext(PartEditorContext);

    const [text, setText] = useState<string>();
    const [boardId, setBoardId] = useState(-1);

    useEffect(() => {
        setText(partEditorState?.getBoardName(boardPosition));
        setBoardId(-1);
        const board = partEditorState?.boardData.find(item => item.boardPosition === boardPosition)?.board;
        if (board) {
            setText(`${partEditorState?.getBoardName(boardPosition)} ${board.code} ${board.name}`);
            setBoardId(board.id);
        }
    }, [boardPosition, partEditorState?.boardData]);

    return (
        <div className="flex flex-col gap-2 items-center">
            <img
                className={twMerge(`flex-none w-24 h-24 object-scale-down object-center ${rotate ? 'rotate-90' : ''}`)}
                src={getBoardImagePath(boardId)}
                alt="Board image"
            />
            <span className="text-xs">{text}</span>
            {children}
        </div>
    )
}

export default BoardMaterialValue;
