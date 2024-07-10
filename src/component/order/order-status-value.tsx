import { useContext, useEffect, useState } from 'react';

import { OrderStatus } from '../../api/model/order';
import { CommonResourceContext } from '../../context';

const OrderStatusValue = ({value}: { value?: OrderStatus }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [data, setData] = useState('');

    useEffect(() => {
        if (value) {
            switch (value) {
                case OrderStatus.NEW:
                    setData(commonResourceState?.resource?.orderStatus.new || '');
                    break;
                case OrderStatus.SENT:
                    setData(commonResourceState?.resource?.orderStatus.sent || '');
                    break;
                case OrderStatus.IN_PRODUCTION:
                    setData(commonResourceState?.resource?.orderStatus.inProduction || '');
                    break;
                case OrderStatus.READY:
                    setData(commonResourceState?.resource?.orderStatus.ready || '');
                    break;
                case OrderStatus.FINISHED:
                    setData(commonResourceState?.resource?.orderStatus.finished || '');
                    break;
                case OrderStatus.CANCELLED:
                    setData(commonResourceState?.resource?.orderStatus.cancelled || '');
                    break;
            }
        } else {
            setData('');
        }
    }, [value]);

    return (
        <>
            {data}
        </>
    )
}

export default OrderStatusValue;
