import { useContext } from 'react';

import { PartEditorContext } from './part-editor-provider';
import BoardInfo from './board/board-info';
import CornerInfo from './corner/corner-info';
import EdgeInfo from './edge/edge-info';
import { CommonResourceContext } from '../../../context';

const PartEditorInfo = () => {
    const partEditorState = useContext(PartEditorContext);
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <>
            {(partEditorState?.boardData.length || 0) > 0 &&
                <span className="font-bold">{commonResourceState?.resource?.partEditor.info.boards}</span>}
            {partEditorState?.boardData.map(data =>
                <BoardInfo name={partEditorState?.getBoardName(data.boardPosition)} data={data}/>)
            }

            {(partEditorState?.edgeData.length || 0) > 0 &&
                <span className="font-bold">{commonResourceState?.resource?.partEditor.info.edges}</span>}
            {partEditorState?.edgeData.map(data =>
                <EdgeInfo name={partEditorState?.getEdgeName(data.edgePosition)} data={data}/>)
            }

            {(partEditorState?.cornerData.length || 0) > 0 &&
                <span className="font-bold">{commonResourceState?.resource?.partEditor.info.corners}</span>}
            {partEditorState?.cornerData.map(data =>
                <CornerInfo name={partEditorState?.getCornerName(data.cornerPosition)} data={data}/>)
            }

            <>
                {partEditorState?.errorMessages.map(data => <span className="label-text-alt text-error">{data}</span>)}
            </>
        </>
    )
}

export default PartEditorInfo;
