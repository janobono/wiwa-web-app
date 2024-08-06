import { useContext } from 'react';

import { PartEditorContext } from './part-editor-provider';
import BoardInfo from './board/board-info';
import CornerInfo from './corner/corner-info';
import EdgeInfo from './edge/edge-info';
import { CommonResourceContext } from '../../../context';
import { BoardData, CornerData, EdgeData } from './index.ts';

const PartEditorInfo = (
    {
        boards,
        edges,
        corners,
        errorMessages
    }: {
        boards?: BoardData[],
        edges?: EdgeData[],
        corners?: CornerData[],
        errorMessages?: string[]
    }
) => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <>
            <span className="font-bold">{commonResourceState?.resource?.partEditor.info.boards}</span>
            {boards?.map(data =>
                <BoardInfo
                    name={partEditorState?.getBoardName(data.boardPosition)}
                    board={data.board}
                    dimensions={data.dimensions}
                />
            )}

            <span className="font-bold">{commonResourceState?.resource?.partEditor.info.edges}</span>
            {edges?.map(data =>
                <EdgeInfo
                    name={partEditorState?.getEdgeName(data.edgePosition)}
                    edge={data.edge}
                />
            )}

            <span className="font-bold">{commonResourceState?.resource?.partEditor.info.corners}</span>
            {corners?.map(data =>
                <CornerInfo
                    name={partEditorState?.getCornerName(data.cornerPosition)}
                    type={data.type}
                    radius={data.radius}
                    dimensions={data.dimensions}
                    edge={data.edge}
                />
            )}

            <>
                {errorMessages?.map(data => <span className="label-text-alt text-error">{data}</span>)}
            </>
        </>
    )
}

export default PartEditorInfo;
