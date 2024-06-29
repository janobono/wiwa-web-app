import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight } from 'react-feather';

import { CustomerContext } from './customer-page';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import { ResourceContext } from '../../context';

const OrderDetailPage = () => {
    const navigate = useNavigate();

    const resourceState = useContext(ResourceContext);
    const customerState = useContext(CustomerContext);

    const [detail, setDetail] = useState('');

    useEffect(() => {
        customerState?.getHtml().then(data => setDetail(data));
    }, [customerState?.selected]);

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
                    label: resourceState?.common?.navigation.customerNav.orderDetail || '',
                    to: '/customer/order-detail'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                {customerState?.editEnabled &&
                    <div className="flex flex-row gap-5 w-full">
                        <div className="join">
                            <WiwaButton
                                className="join-item"
                                title={resourceState?.common?.pageable.previous}
                                disabled={customerState?.busy}
                                onClick={() => navigate('/customer/order-edit')}
                            ><ChevronsLeft size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                className="join-item"
                                title={resourceState?.common?.pageable.next}
                                disabled={customerState?.busy}
                                onClick={() => navigate('/customer/order-comments')}
                            ><ChevronsRight size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                }

                <div dangerouslySetInnerHTML={{__html: detail}}/>
            </div>
        </>
    )
}

export default OrderDetailPage;
