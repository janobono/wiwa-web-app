import { ReactNode, useContext, useEffect, useState } from 'react';
import { ChevronsRight, ChevronsUp } from 'react-feather';

import { getBoardImagePath } from '../../../../api/controller/ui';
import { Dimensions } from '../../../../api/model';
import { UnitId } from '../../../../api/model/application';
import { Board } from '../../../../api/model/board';
import { CommonResourceContext } from '../../../../context';

const BoardValue = (
    {
        structure,
        rotate,
        name,
        board,
        dimensions,
        children
    }: {
        structure: boolean,
        rotate: boolean,
        name?: string,
        board?: Board,
        dimensions?: Dimensions,
        children?: ReactNode
    }
) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [boardInfo, setBoardInfo] = useState<string>();
    const [dimensionsInfo, setDimensionsInfo] = useState<string>();
    const [boardId, setBoardId] = useState(-1);

    useEffect(() => {
        setBoardInfo(name);
        setDimensionsInfo(`[${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
        setBoardId(-1);

        if (board) {
            setBoardInfo(`${name} ${board.code} ${board.name}`);
            setBoardId(board.id);
        }

        if (dimensions) {
            setDimensionsInfo(`${dimensions.x}x${dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
        }
    }, [name, board, dimensions]);

    return (
        <div className="flex flex-col items-center tooltip tooltip-primary gap-1"
             data-tip={`${boardInfo} ${dimensionsInfo}`}>
            <div className="w-7 h-7" title={commonResourceState?.resource?.partEditor.boardOrientation}>
                {structure &&
                    <>
                        {
                            rotate ?
                                <ChevronsUp size={28}/>
                                :
                                <ChevronsRight size={28}/>
                        }
                    </>
                }
            </div>
            {boardId !== -1 &&
                <img
                    className={'flex-none object-scale-down object-center h-14 w-28'}
                    src={getBoardImagePath(boardId)}
                    alt="Board image"
                />
            }
            {children}
        </div>
    )
}

export default BoardValue;
