import { Circle, Octagon, Square } from 'react-feather';

import { PartCorner, PartCornerType } from '../../../api/model/order/part';

const CornerValue = ({partCorner}: { partCorner?: PartCorner }) => {
    return (
        <>
            {partCorner === undefined && <Square size={18}/>}
            {partCorner?.type === PartCornerType.STRAIGHT && <Octagon size={18}/>}
            {partCorner?.type === PartCornerType.ROUNDED && <Circle size={18}/>}
        </>
    )
}

export default CornerValue;
