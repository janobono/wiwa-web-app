import { useResourceState } from '../state/resource-state-provider';
import { ProductStockStatus } from '../../model/service';

const WiwaProductStockStatus = ({stockStatus}: { stockStatus: ProductStockStatus }) => {
    const resourceState = useResourceState();

    const translate = (stockStatus: ProductStockStatus) => {
        switch (stockStatus) {
            case ProductStockStatus.ON_STOCK:
                return resourceState?.common?.productStockStatus.onStock;
            case ProductStockStatus.OUT_OF_STOCK:
                return resourceState?.common?.productStockStatus.outOfStock;
            case ProductStockStatus.TO_ORDER:
                return resourceState?.common?.productStockStatus.toOrder;
            case ProductStockStatus.ON_INQUIRE:
                return resourceState?.common?.productStockStatus.onInquire;
        }
    }

    return (
        <>
            {translate(stockStatus)}
        </>
    )
}

export default WiwaProductStockStatus;
