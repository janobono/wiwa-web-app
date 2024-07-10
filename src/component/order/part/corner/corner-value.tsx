import { ReactNode, useContext, useEffect, useState } from 'react';
import { Circle, Octagon, Square } from 'react-feather';

import { PartEditorContext } from '../part-editor-provider';
import { PartCornerType } from '../../../../api/model/order/part';
import { CornerPosition } from '../../../../api/model/application';

const CornerValue = (
    {
        size,
        cornerPosition,
        children
    }: {
        size: number,
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
        <div className="flex flex-row gap-2 items-center">
            {(cornerPosition === CornerPosition.A1B1 || cornerPosition === CornerPosition.A2B1) &&
                <>
                    {children}
                    <span className="text-xs">{partEditorState?.getCornerName(cornerPosition)}</span>
                </>
            }
            {type === 'NONE' && <Square size={size}/>}
            {type === PartCornerType.STRAIGHT && <Octagon size={size}/>}
            {type === PartCornerType.ROUNDED && <Circle size={size}/>}
            {(cornerPosition === CornerPosition.A1B2 || cornerPosition === CornerPosition.A2B2) &&
                <>
                    <span className="text-xs">{partEditorState?.getCornerName(cornerPosition)}</span>
                    {children}
                </>
            }
        </div>
    )
}

export default CornerValue;
