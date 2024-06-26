import { useContext, useEffect, useState } from 'react';

import { OrderStatus } from '../../api/model/order';
import { ResourceContext } from '../../context';

const OrderStatusValue = ({value}: { value?: OrderStatus }) => {
    const resourceState = useContext(ResourceContext);

    const [data, setData] = useState('');

    useEffect(() => {
        if (value) {
            switch (value) {
                case OrderStatus.NEW:
                    setData(resourceState?.common?.orderStatus.new || '');
                    break;
                case OrderStatus.SENT:
                    setData(resourceState?.common?.orderStatus.sent || '');
                    break;
                case OrderStatus.IN_PRODUCTION:
                    setData(resourceState?.common?.orderStatus.inProduction || '');
                    break;
                case OrderStatus.READY:
                    setData(resourceState?.common?.orderStatus.ready || '');
                    break;
                case OrderStatus.FINISHED:
                    setData(resourceState?.common?.orderStatus.finished || '');
                    break;
                case OrderStatus.CANCELLED:
                    setData(resourceState?.common?.orderStatus.cancelled || '');
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
