import { Part } from '../../../api/model/order/part';
import { Entry } from '../../../api/model';
import { ManufactureProperties } from '../../../api/model/application';

const PartDuplicatedBasicEditor = (
    {
        part,
        setPart,
        valid,
        setValid,
        dimensions,
        boards,
        edges,
        corners,
        manufactureProperties
    }: {
        part?: Part,
        setPart: (part: Part) => void,
        valid: boolean,
        setValid: (valid: boolean) => void,
        dimensions: Entry[],
        boards: Entry[],
        edges: Entry[],
        corners: Entry[],
        manufactureProperties?: ManufactureProperties
    }
) => {
    return (
        <>DUPLICATED BASIC</>
    )
}

export default PartDuplicatedBasicEditor;
