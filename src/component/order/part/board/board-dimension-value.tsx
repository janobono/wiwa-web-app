import { ReactNode, useContext, useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'react-feather';

import { PartEditorContext } from '../part-editor-provider';
import { BoardDimension, BoardPosition, UnitId } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const BoardDimensionValue = (
    {
        size,
        boardPosition,
        boardDimension,
        children
    }: {
        size: number,
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
        const dimensions = partEditorState?.boardDimensionsData.find(item => item.boardPosition === boardPosition)?.dimensions;
        if (dimensions) {
            if (boardDimension === BoardDimension.X) {
                value = `${dimensions.x}`;
            } else {
                value = `${dimensions.y}`;
            }
        }
        setText(`${partEditorState?.getDimensionName(boardDimension)} ${value} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
    }, [boardPosition, boardDimension, partEditorState?.boardDimensionsData]);

    return (
        <>
            {boardDimension === BoardDimension.X &&
                <HorizontalDimension size={size} text={text}>
                    {children}
                </HorizontalDimension>
            }
            {boardDimension === BoardDimension.Y &&
                <VerticalDimension size={size} text={text}>
                    {children}
                </VerticalDimension>
            }
        </>
    )
}

export default BoardDimensionValue;

const HorizontalDimension = (
    {
        size,
        text,
        children
    }: {
        size: number,
        text?: string,
        children?: ReactNode
    }
) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <ArrowLeft size={size}/>
            <span className="text-xs">{text}</span>
            {children}
            <ArrowRight size={size}/>
        </div>
    )
}

const VerticalDimension = (
    {
        size,
        text,
        children
    }: {
        size: number,
        text?: string,
        children?: ReactNode
    }
) => {
    return (
        <div className="flex flex-col gap-2 items-center align-middle">
            <ArrowUp size={size}/>
            <div className="flex flex-row gap-2 items-center">
                <span className="text-xs">{text}</span>
                {children}
            </div>
            <ArrowDown size={size}/>
        </div>
    )
}
