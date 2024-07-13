import { ReactNode, useContext, useEffect, useState } from 'react';
import { Circle, Octagon, Square } from 'react-feather';

import { PartEditorContext } from '../part-editor-provider';
import { CornerPosition } from '../../../../api/model/application';
import { PartCornerType } from '../../../../api/model/order/part';
import { getEdgeImagePath } from '../../../../api/controller/ui';

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
    const [text, setText] = useState('');
    const [edgeId, setEdgeId] = useState(-1);

    useEffect(() => {
        setType('NONE');
        setText(`${partEditorState?.getCornerName(cornerPosition)}`);
        setEdgeId(-1);

        const data = partEditorState?.cornerData.find(item => item.cornerPosition === cornerPosition);
        if (data) {
            setType(data.type || 'NONE');
            if (data.radius) {
                setText(`${partEditorState?.getCornerName(cornerPosition)} r ${data.radius} ${partEditorState?.lengthSign}`);
            }
            if (data.dimensions) {
                setText(`${partEditorState?.getCornerName(cornerPosition)} ${data.dimensions.x}x${data.dimensions.y} ${partEditorState?.lengthSign}`);
            }
            setEdgeId(data.edge ? data.edge.id : -1);
        }
    }, [cornerPosition, partEditorState?.cornerData]);

    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-row gap-2 items-center justify-center">
                {[CornerPosition.A1B1, CornerPosition.A2B1].includes(cornerPosition) &&
                    <>
                        {edgeId !== -1 &&
                            <img
                                className="flex-none object-scale-down object-center w-16 h-7"
                                src={getEdgeImagePath(edgeId)}
                                alt="Edge image"
                            />
                        }
                        <span className="text-xs">{text}</span>
                    </>
                }
                {type === 'NONE' && <Square size={28}/>}
                {type === PartCornerType.STRAIGHT && <Octagon size={28}/>}
                {type === PartCornerType.ROUNDED && <Circle size={28}/>}
                {[CornerPosition.A1B2, CornerPosition.A2B2].includes(cornerPosition) &&
                    <>
                        <span className="text-xs">{text}</span>
                        {edgeId !== -1 &&
                            <img
                                className="flex-none object-scale-down object-center w-16 h-7"
                                src={getEdgeImagePath(edgeId)}
                                alt="Edge image"
                            />
                        }
                    </>
                }
            </div>
            {
                children
            }
        </div>
    )
}

export default CornerValue;
