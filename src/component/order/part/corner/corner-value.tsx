import { ReactNode, useContext, useEffect, useState } from 'react';
import { Circle, Octagon, Square } from 'react-feather';

import { PartEditorContext } from '../part-editor-provider';
import { PartCornerType } from '../../../../api/model/order/part';
import { CornerPosition } from '../../../../api/model/application';

const CornerValue = (
    {
        cornerPosition,
        children
    }: {
        cornerPosition: CornerPosition,
        children?: ReactNode
    }
) => {
    const partEditorState = useContext(PartEditorContext);

    const [type, setType] = useState('NONE');

    useEffect(() => {
        setType(partEditorState?.cornerData.find(item => item.cornerPosition === cornerPosition)?.partCorner.type || 'NONE');
    }, [cornerPosition, partEditorState?.cornerData]);

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-row gap-2 items-center">
                {[CornerPosition.A1B1, CornerPosition.A2B1].includes(cornerPosition) &&
                    <span className="text-xs">{partEditorState?.getCornerName(cornerPosition)}</span>
                }
                {type === 'NONE' && <Square size={28}/>}
                {type === PartCornerType.STRAIGHT && <Octagon size={28}/>}
                {type === PartCornerType.ROUNDED && <Circle size={28}/>}
                {[CornerPosition.A1B2, CornerPosition.A2B2].includes(cornerPosition) &&
                    <span className="text-xs">{partEditorState?.getCornerName(cornerPosition)}</span>
                }
            </div>
            {children}
        </div>
    )
}

export default CornerValue;
