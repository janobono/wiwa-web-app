import { useContext } from 'react';

import PartEditorProvider, { PartEditorContext } from './part-editor-provider';
import PartBasicEditor from './part-basic/part-basic-editor';
import PartDuplicatedBasicEditor from './part-duplicated-basic/part-duplicated-basic-editor';
import PartDuplicatedFrameEditor from './part-duplicated-frame/part-duplicated-frame-editor';
import PartFrameEditor from './part-frame/part-frame-editor';
import { Part, PartType } from '../../../api/model/order/part';

const PartEditor = (
    {
        partType,
        setPartType,
        part,
        setPart,
        valid,
        setValid
    }: {
        partType: PartType,
        setPartType: (partType: PartType) => void,
        part?: Part,
        setPart: (part: Part) => void,
        valid: boolean,
        setValid: (valid: boolean) => void
    }
) => {
    return (
        <PartEditorProvider
            partType={partType}
            setPartType={setPartType}
            part={part}
            setPart={setPart}
            valid={valid}
            setValid={setValid}
        >
            <PartEditorForm/>
        </PartEditorProvider>
    )
}

export default PartEditor;

const PartEditorForm = () => {
    const partEditorState = useContext(PartEditorContext)

    return (
        <>
            {partEditorState?.partType === PartType.BASIC && <PartBasicEditor/>}
            {partEditorState?.partType === PartType.DUPLICATED_BASIC && <PartDuplicatedBasicEditor/>}
            {partEditorState?.partType === PartType.DUPLICATED_FRAME && <PartDuplicatedFrameEditor/>}
            {partEditorState?.partType === PartType.FRAME && <PartFrameEditor/>}
        </>
    )
}
