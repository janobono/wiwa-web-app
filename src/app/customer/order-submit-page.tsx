import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsLeft } from 'react-feather';

import { CustomerContext } from '../../component/app/customer/customer-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { CommonResourceContext } from '../../context';

const OrderSubmitPage = () => {
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
                    label: commonResourceState?.resource?.navigation.customerNav.orderSubmit || '',
                    to: '/customer/order-submit'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                {customerState?.editEnabled &&
                    <div className="flex flex-row gap-5 w-full">
                        <WiwaButton
                            className="join-item"
                            title={commonResourceState?.resource?.navigation.customerNav.orderComments}
                            disabled={customerState?.busy}
                            onClick={() => navigate('/customer/order-comments')}
                        ><ChevronsLeft size={18}/>
                        </WiwaButton>
                    </div>
                }
            </div>
        </>
    )
}

export default OrderSubmitPage;
