import { Part } from '../../api/model/order/part';

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
        <>
        </>
    )
}

export default PartEditor;
