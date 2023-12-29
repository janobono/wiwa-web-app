import { useEffect, useState } from 'react';

import { useResourceState } from '../state/resource-state-provider';
import { ProductAttributeKey } from '../../model/service';

const WiwaProductAttributeKey = ({attributeKey}: { attributeKey: ProductAttributeKey }) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (attributeKey) {
            switch (attributeKey) {
                case ProductAttributeKey.BOARD_CODE:
                    setData(resourceState?.common?.productAttributeKey.boardCode);
                    break;
                case ProductAttributeKey.STRUCTURE_CODE:
                    setData(resourceState?.common?.productAttributeKey.structureCode);
                    break;
                case ProductAttributeKey.ORIENTATION:
                    setData(resourceState?.common?.productAttributeKey.orientation);
                    break;
            }
        } else {
            setData(undefined);
        }
    }, [resourceState?.common, attributeKey]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaProductAttributeKey;
