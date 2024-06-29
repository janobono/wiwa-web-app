import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsRight } from 'react-feather';

import { CustomerContext } from './customer-page';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import { ResourceContext } from '../../context';

const OrderEditPage = () => {
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
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                {customerState?.editEnabled &&
                    <div className="flex flex-row gap-5 w-full">
                        <div className="join">
                            <WiwaButton
                                className="join-item"
                                title={resourceState?.common?.pageable.next}
                                disabled={customerState?.busy}
                                onClick={() => navigate('/customer/order-detail')}
                            ><ChevronsRight size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default OrderEditPage;
