import { useContext, useEffect, useState } from 'react';

import PartBasicEditor from './part-basic-editor';
import PartDuplicatedBasicEditor from './part-duplicated-basic-editor';
import PartDuplicatedFrameEditor from './part-duplicated-frame-editor';
import PartFrameEditor from './part-frame-editor';
import WiwaSelect from '../../ui/wiwa-select';
import { getManufactureProperties } from '../../../api/controller/config';
import { getOrderProperties } from '../../../api/controller/ui';
import { Entry } from '../../../api/model';
import { ManufactureProperties } from '../../../api/model/application';
import { Part, PartType } from '../../../api/model/order/part';
import { AuthContext, ErrorContext, ResourceContext } from '../../../context';

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
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const [index, setIndex] = useState('NONE');

    const [dimensions, setDimensions] = useState<Entry[]>([]);
    const [boards, setBoards] = useState<Entry[]>([]);
    const [edges, setEdges] = useState<Entry[]>([]);
    const [corners, setCorners] = useState<Entry[]>([]);
    const [manufactureProperties, setManufactureProperties] = useState<ManufactureProperties>();

    useEffect(() => {
        getOrderProperties().then(response => {
            if (response.data) {
                setDimensions(response.data?.dimensions || []);
                setBoards(response.data?.boards || []);
                setEdges(response.data?.edges || []);
                setCorners(response.data?.corners || []);
            }
            errorState?.addError(response.error);
        });
        getManufactureProperties(authState?.authToken?.accessToken).then(response => {
            if (response.data) {
                setManufactureProperties(response.data);
            }
            errorState?.addError(response.error);
        });
    }, []);

    useEffect(() => {
        if (part) {
            setIndex(part.type);
        }
    }, [part]);

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

            {index === PartType.BASIC &&
                <PartBasicEditor
                    part={part}
                    setPart={setPart}
                    valid={valid}
                    setValid={setValid}
                    dimensions={dimensions}
                    boards={boards}
                    edges={edges}
                    corners={corners}
                    manufactureProperties={manufactureProperties}
                />
            }

            {index === PartType.DUPLICATED_BASIC &&
                <PartDuplicatedBasicEditor
                    part={part}
                    setPart={setPart}
                    valid={valid}
                    setValid={setValid}
                    dimensions={dimensions}
                    boards={boards}
                    edges={edges}
                    corners={corners}
                    manufactureProperties={manufactureProperties}
                />
            }

            {index === PartType.DUPLICATED_FRAME &&
                <PartDuplicatedFrameEditor
                    part={part}
                    setPart={setPart}
                    valid={valid}
                    setValid={setValid}
                    dimensions={dimensions}
                    boards={boards}
                    edges={edges}
                    corners={corners}
                    manufactureProperties={manufactureProperties}
                />
            }

            {index === PartType.FRAME &&
                <PartFrameEditor
                    part={part}
                    setPart={setPart}
                    valid={valid}
                    setValid={setValid}
                    dimensions={dimensions}
                    boards={boards}
                    edges={edges}
                    corners={corners}
                    manufactureProperties={manufactureProperties}
                />
            }
        </>
    )
}

export default PartEditor;
