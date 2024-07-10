import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight } from 'react-feather';

import { CustomerContext } from '../../component/app/customer/customer-provider';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import { CommonResourceContext } from '../../context';

const OrderDetailPage = () => {
    const navigate = useNavigate();

    const commonResourceState = useContext(CommonResourceContext);
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
                    label: commonResourceState?.resource?.navigation.customerNav.title || '',
                    to: '/customer'
                },
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.customerNav.orderDetail || '',
                    to: '/customer/order-detail'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                {customerState?.editEnabled &&
                    <div className="flex flex-row gap-5 w-full">
                        <div className="join">
                            <WiwaButton
                                className="join-item"
                                title={commonResourceState?.resource?.navigation.customerNav.orderEdit}
                                disabled={customerState?.busy}
                                onClick={() => navigate('/customer/order-edit')}
                            ><ChevronsLeft size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                className="join-item"
                                title={commonResourceState?.resource?.navigation.customerNav.orderComments}
                                disabled={customerState?.busy}
                                onClick={() => navigate('/customer/order-comments')}
                            ><ChevronsRight size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                }
                <iframe
                    className="w-full"
                    height="500"
                    srcDoc={detail}>
                </iframe>
            </div>
        </>
    )
}

export default OrderDetailPage;
