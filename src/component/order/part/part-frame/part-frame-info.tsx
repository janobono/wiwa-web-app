import { useContext } from 'react';

import { PartFrameEditorContext } from './part-frame-editor-provider';
import PartEditorInfo from '../part-editor-info';

const PartFrameInfo = () => {
    const partFrameEditorState = useContext(PartFrameEditorContext);

    return (
        <PartEditorInfo
            boards={partFrameEditorState?.boardData}
            edges={partFrameEditorState?.edgeData}
            errorMessages={partFrameEditorState?.errorMessages}
        />
    )
}

export default PartFrameInfo;
