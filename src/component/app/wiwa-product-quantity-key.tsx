import { useEffect, useState } from 'react';

import { useResourceState } from '../state/resource-state-provider';
import { ProductQuantityKey } from '../../model/service';

const WiwaProductQuantityKey = ({quantityKey}: { quantityKey?: ProductQuantityKey }) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (quantityKey) {
            switch (quantityKey) {
                case ProductQuantityKey.SALE:
                    setData(resourceState?.common?.productQuantityKey.sale);
                    break;
                case ProductQuantityKey.WEIGHT:
                    setData(resourceState?.common?.productQuantityKey.weight);
                    break;
                case ProductQuantityKey.NET_WEIGHT:
                    setData(resourceState?.common?.productQuantityKey.netWeight);
                    break;
                case ProductQuantityKey.LENGTH:
                    setData(resourceState?.common?.productQuantityKey.length);
                    break;
                case ProductQuantityKey.WIDTH:
                    setData(resourceState?.common?.productQuantityKey.width);
                    break;
                case ProductQuantityKey.THICKNESS:
                    setData(resourceState?.common?.productQuantityKey.thickness);
                    break;
            }
        } else {
            setData(undefined);
        }
    }, [resourceState?.common, quantityKey]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaProductQuantityKey;
