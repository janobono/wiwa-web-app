import { useContext } from 'react';

import { Order, OrderField } from '../../api/model/order';
import OrderTable from '../../component/order/order-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { ResourceContext } from '../../context';

const OrdersPage = () => {
    const resourceState = useContext(ResourceContext);

    const setSelected = (selected?: Order) => {

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
