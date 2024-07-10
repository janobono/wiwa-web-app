import { useContext } from 'react';

import { OrderField } from '../../api/model/order';
import OrderTable from '../../component/order/order-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { CommonResourceContext } from '../../context';

const OrdersPage = () => {
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.employeeNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.employeeNav.orders || '',
                    to: '/employee'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">

                <div className="overflow-x-auto">
                    <OrderTable
                        fields={Object.values(OrderField)}
                        rows={[]}
                        selected={undefined}
                        setSelected={(selected) => {
                            //TODO
                            console.log(selected);
                        }}
                    />
                </div>

            </div>
        </>
    )
}

export default OrdersPage;
