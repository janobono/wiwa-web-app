import { useContext } from 'react';

import { PartBasicEditorContext } from './part-basic-editor-provider';
import PartEditorInfo from '../part-editor-info';

const PartBasicInfo = () => {
    const partBasicEditorState = useContext(PartBasicEditorContext);

    return (
        <PartEditorInfo
            boards={partBasicEditorState?.boardData}
            edges={partBasicEditorState?.edgeData}
            corners={partBasicEditorState?.cornerData}
            errorMessages={partBasicEditorState?.errorMessages}
        />
    )
}

export default PartBasicInfo;
