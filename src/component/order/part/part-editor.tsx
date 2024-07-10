import { useContext, useEffect, useState } from 'react';

import PartBasicEditor from './part-basic-editor';
import PartEditorProvider, { PartEditorContext } from './part-editor-provider';
import PartDuplicatedBasicEditor from './part-duplicated-basic-editor';
import PartDuplicatedFrameEditor from './part-duplicated-frame-editor';
import PartFrameEditor from './part-frame-editor';
import WiwaSelect from '../../ui/wiwa-select';
import { Part, PartType } from '../../../api/model/order/part';
import { CommonResourceContext } from '../../../context';

const PartEditor = (
    {
        part,
        setPart,
        valid,
        setValid
    }: {
        part?: Part,
        setPart: (part: Part) => void,
        valid: boolean,
        setValid: (valid: boolean) => void
    }
) => {
    return (
        <PartEditorProvider
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
    const commonResourceState = useContext(CommonResourceContext);

    const [index, setIndex] = useState('NONE');

    useEffect(() => {
        const partType = partEditorState?.partType;
        if (partType) {
            setIndex(partType);
        } else {
            setIndex('NONE');
        }
    }, [partEditorState?.partType]);

    return (
        <>
            <WiwaSelect
                value={index}
                onChange={event => partEditorState?.setPartType(event.currentTarget.value)}
            >
                <option value="NONE" disabled>{commonResourceState?.resource?.partEditor.partLabel}</option>
                <option value={PartType.BASIC}>
                    {commonResourceState?.resource?.partEditor.part.basic}
                </option>
                <option value={PartType.DUPLICATED_BASIC}>
                    {commonResourceState?.resource?.partEditor.part.duplicatedBasic}
                </option>
                <option value={PartType.DUPLICATED_FRAME}>
                    {commonResourceState?.resource?.partEditor.part.duplicatedFrame}
                </option>
                <option value={PartType.FRAME}>
                    {commonResourceState?.resource?.partEditor.part.frame}
                </option>
            </WiwaSelect>
            {index === PartType.BASIC && <PartBasicEditor/>}
            {index === PartType.DUPLICATED_BASIC && <PartDuplicatedBasicEditor/>}
            {index === PartType.DUPLICATED_FRAME && <PartDuplicatedFrameEditor/>}
            {index === PartType.FRAME && <PartFrameEditor/>}
        </>
    )
}
