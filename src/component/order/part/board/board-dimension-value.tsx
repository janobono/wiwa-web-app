import { ReactNode, useContext, useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'react-feather';
import { twMerge } from 'tailwind-merge';

import { PartEditorContext } from '../part-editor-provider';
import { BoardDimension, BoardPosition, UnitId } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const BoardDimensionValue = (
    {
        boardPosition,
        boardDimension,
        children
    }: {
        boardPosition: BoardPosition,
        boardDimension: BoardDimension,
        children?: ReactNode
    }
) => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [text, setText] = useState<string>();

    useEffect(() => {
        let value = '';
        const dimensions = partEditorState?.boardData.find(item => item.boardPosition === boardPosition)?.dimensions;
        if (dimensions) {
            if (boardDimension === BoardDimension.X) {
                value = `${dimensions.x}`;
            } else {
                value = `${dimensions.y}`;
            }
        }
        setText(`${partEditorState?.getDimensionName(boardDimension)} ${value} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
    }, [boardPosition, boardDimension, partEditorState?.boardData]);

    return (
        <div
            className={twMerge(`flex gap-2 items-center ${boardDimension === BoardDimension.X ? 'flex-row' : 'flex-col'}`)}>
            {boardDimension === BoardDimension.X ?
                <ArrowLeft size={28}/>
                :
                <ArrowUp size={28}/>
            }
            <div className="flex flex-col gap-2 items-center">
                <span className="text-xs">{text}</span>
                {children}
            </div>
            {boardDimension === BoardDimension.X ?
                <ArrowRight size={28}/>
                :
                <ArrowDown size={28}/>
            }
        </div>
    )
}

export default BoardDimensionValue;
