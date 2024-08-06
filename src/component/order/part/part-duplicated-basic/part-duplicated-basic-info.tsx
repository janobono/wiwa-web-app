import { useContext } from 'react';

import { PartDuplicatedBasicEditorContext } from './part-duplicated-basic-editor-provider';
import PartEditorInfo from '../part-editor-info';

const PartDuplicatedBasicInfo = () => {
    const partDuplicatedBasicEditorState = useContext(PartDuplicatedBasicEditorContext);

    return (
        <PartEditorInfo
            boards={partDuplicatedBasicEditorState?.boardData}
            edges={partDuplicatedBasicEditorState?.edgeData}
            corners={partDuplicatedBasicEditorState?.cornerData}
            errorMessages={partDuplicatedBasicEditorState?.errorMessages}
        />
    )
}

export default PartDuplicatedBasicInfo;
