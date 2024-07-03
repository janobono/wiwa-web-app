import WiwaButton from '../../ui/wiwa-button.tsx';
import CornerValue from './corner-value.tsx';
import { PartCorner } from '../../../api/model/order/part';
import { CornerPosition } from '../../../api/model/application';

const CornerEditor = (
    {
        title,
        cornerPosition,
        partCorner,
        setPartCorner
    }: {
        title: string,
        cornerPosition: CornerPosition,
        partCorner?: PartCorner,
        setPartCorner: (partCorner?: PartCorner) => void
    }
) => {
    return (
        <>
            <WiwaButton
                title={title}
            >
                <CornerValue partCorner={partCorner}/>
            </WiwaButton>
        </>
    )
}

export default CornerEditor;
