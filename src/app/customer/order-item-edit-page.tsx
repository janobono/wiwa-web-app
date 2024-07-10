import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomerContext } from '../../component/app/customer/customer-provider';
import OrderItemEditor from '../../component/order/order-item-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { CommonResourceContext } from '../../context';

const OrderItemEditPage = () => {
    const navigate = useNavigate();

    const commonResourceState = useContext(CommonResourceContext);
    const customerState = useContext(CustomerContext);


    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: commonResourceState?.resource?.navigation.customerNav.title || '',
                    to: '/customer'
                },
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.customerNav.orderEdit || '',
                    to: '/customer/order-edit'
                },
                {
                    key: 2,
                    label: commonResourceState?.resource?.navigation.customerNav.orderItemEdit || '',
                    to: '/customer/order-item-edit'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <OrderItemEditor
                    disabled={customerState?.busy || !customerState?.editEnabled}
                    orderItem={customerState?.editItemMode ? customerState?.selectedItem : undefined}
                    setOrderItemChange={(orderItemChange) => {
                        if (customerState?.editItemMode) {
                            customerState?.setItem(orderItemChange);
                        } else {
                            customerState?.addItem(orderItemChange);
                        }
                        navigate('/customer/order-edit');
                    }}
                />
            </div>
        </>
    )
}

export default OrderItemEditPage;
