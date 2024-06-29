import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ResourceContext } from '../../context';
import { CustomerContext } from './customer-page.tsx';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb.tsx';
import WiwaButton from '../../component/ui/wiwa-button.tsx';
import { ChevronsLeft } from 'react-feather';

const OrderItemEditPage = () => {
    const navigate = useNavigate();

    const resourceState = useContext(ResourceContext);
    const customerState = useContext(CustomerContext);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: resourceState?.common?.navigation.customerNav.title || '',
                    to: '/customer'
                },
                {
                    key: 1,
                    label: resourceState?.common?.navigation.customerNav.orderEdit || '',
                    to: '/customer/order-edit'
                },
                {
                    key: 2,
                    label: resourceState?.common?.navigation.customerNav.orderItemEdit || '',
                    to: '/customer/order-item-edit'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                {customerState?.editEnabled &&
                    <div className="flex flex-row gap-5 w-full">
                        <WiwaButton
                            className="join-item"
                            title={resourceState?.common?.navigation.customerNav.orderEdit}
                            disabled={customerState?.busy}
                            onClick={() => navigate('/customer/order-edit')}
                        ><ChevronsLeft size={18}/>
                        </WiwaButton>
                    </div>
                }
            </div>
        </>
    )
}

export default OrderItemEditPage;
