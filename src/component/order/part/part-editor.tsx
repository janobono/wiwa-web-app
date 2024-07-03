import { useContext, useEffect, useState } from 'react';

import PartBasicEditor from './part-basic-editor';
import PartEditorProvider, { PartEditorContext } from './part-editor-provider';
import PartDuplicatedBasicEditor from './part-duplicated-basic-editor';
import PartDuplicatedFrameEditor from './part-duplicated-frame-editor';
import PartFrameEditor from './part-frame-editor';
import WiwaSelect from '../../ui/wiwa-select';
import { Part, PartType } from '../../../api/model/order/part';
import { ResourceContext } from '../../../context';

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
    const resourceState = useContext(ResourceContext);

    const [index, setIndex] = useState('NONE');

    useEffect(() => {
        if (partEditorState?.part) {
            setIndex(partEditorState?.part.type);
        }
    }, [partEditorState?.part]);

    return (
        <>
            <WiwaSelect
                defaultValue="NONE"
                onChange={event => setIndex(event.currentTarget.value)}
            >
                <option disabled value="NONE">{resourceState?.common?.partEditor.option.select}</option>
                <option value={PartType.BASIC}>{resourceState?.common?.partEditor.option.basic}</option>
                <option
                    value={PartType.DUPLICATED_BASIC}>{resourceState?.common?.partEditor.option.duplicatedBasic}</option>
                <option
                    value={PartType.DUPLICATED_FRAME}>{resourceState?.common?.partEditor.option.duplicatedFrame}</option>
                <option value={PartType.FRAME}>{resourceState?.common?.partEditor.option.frame}</option>
            </WiwaSelect>
            {index === PartType.BASIC && <PartBasicEditor/>}
            {index === PartType.DUPLICATED_BASIC && <PartDuplicatedBasicEditor/>}
            {index === PartType.DUPLICATED_FRAME && <PartDuplicatedFrameEditor/>}
            {index === PartType.FRAME && <PartFrameEditor/>}
        </>
    )
}
