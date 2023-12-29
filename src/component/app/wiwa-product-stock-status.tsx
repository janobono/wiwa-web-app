import { useEffect, useState } from 'react';

import { useResourceState } from '../state/resource-state-provider';
import { ProductStockStatus } from '../../model/service';

const WiwaProductStockStatus = ({stockStatus}: { stockStatus?: ProductStockStatus }) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (stockStatus) {
            switch (stockStatus) {
                case ProductStockStatus.ON_STOCK:
                    setData(resourceState?.common?.productStockStatus.onStock);
                    break;
                case ProductStockStatus.OUT_OF_STOCK:
                    setData(resourceState?.common?.productStockStatus.outOfStock);
                    break;
                case ProductStockStatus.TO_ORDER:
                    setData(resourceState?.common?.productStockStatus.toOrder);
                    break;
                case ProductStockStatus.ON_INQUIRE:
                    setData(resourceState?.common?.productStockStatus.onInquire);
                    break;
            }
        } else {
            setData(undefined);
        }
    }, [resourceState?.common, stockStatus]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaProductStockStatus;
