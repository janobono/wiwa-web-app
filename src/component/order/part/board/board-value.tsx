import { ReactNode, useContext, useEffect, useState } from 'react';
import { ChevronsRight, ChevronsUp } from 'react-feather';

import { BoardData } from '../part-editor-provider';
import { getBoardImagePath } from '../../../../api/controller/ui';
import { UnitId } from '../../../../api/model/application';
import { CommonResourceContext } from '../../../../context';

const BoardValue = (
    {
        structure,
        rotate,
        name,
        data,
        children
    }: {
        structure: boolean,
        rotate: boolean,
        name?: string,
        data?: BoardData,
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

        if (data?.board) {
            setBoardInfo(`${name} ${data.board.code} ${data.board.name}`);
            setBoardId(data.board.id);
        }

        if (data?.dimensions) {
            setDimensionsInfo(`${data.dimensions.x}x${data.dimensions.y} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
        }
    }, [name, data]);

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
            <img
                className={'flex-none object-scale-down object-center h-14 w-28'}
                src={getBoardImagePath(boardId)}
                alt="Board image"
            />
            {children}
        </div>
    )
}

export default BoardValue;
