import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import { useResourceState } from '../../../state/resource';
import OrderTable from '../../../component/order/order-table.tsx';
import { Order, OrderField } from '../../../api/model/order';
import { useOrderState } from '../../../state/order';

const OrdersPage = () => {
    const orderState = useOrderState();
    const resourceState = useResourceState();

    const setSelected = (selected?: Order) => {
        orderState?.setSelected(selected)
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.managerNav.orders || '',
                    to: '/manager/orders'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">

                <div className="overflow-x-auto">
                    <OrderTable
                        fields={Object.values(OrderField)}
                        rows={orderState?.data?.content}
                        selected={orderState?.selected}
                        setSelected={setSelected}
                    />
                </div>

            </div>
        </>
    )
}

export default OrdersPage;
