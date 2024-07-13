import { useContext } from 'react';

import { PartEditorContext } from './part-editor-provider';

const PartEditorErrors = () => {
    const partEditorState = useContext(PartEditorContext);

    return (
        <>
            {partEditorState?.errorMessages.map(data => <span className="label-text-alt text-error">{data}</span>)}
        </>
    )
}

export default PartEditorErrors;
