import { useContext } from 'react';

import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import OrderTable from '../../../component/order/order-table';
import { Order, OrderField } from '../../../api/model/order';
import { ResourceContext } from '../../../context';

const OrdersPage = () => {
    const resourceState = useContext(ResourceContext);

    const setSelected = (selected?: Order) => {

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
                        rows={[]}
                        selected={undefined}
                        setSelected={setSelected}
                    />
                </div>

            </div>
        </>
    )
}

export default OrdersPage;
