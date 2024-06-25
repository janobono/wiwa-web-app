import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { useResourceState } from '../../state/resource';
import { useOrderState } from '../../state/order';
import { Order, OrderField } from '../../api/model/order';
import OrderTable from '../../component/order/order-table.tsx';

const OrdersPage = () => {
    const orderState = useOrderState();
    const resourceState = useResourceState();

    const setSelected = (selected?: Order) => {
        orderState?.setSelected(selected)
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.employeeNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.employeeNav.orders || '',
                    to: '/employee'
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
