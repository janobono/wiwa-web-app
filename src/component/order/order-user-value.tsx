import { useEffect, useState } from 'react';

import { OrderUser } from '../../api/model/order';

const OrderUserValue = ({value}: { value?: OrderUser }) => {

    const [data, setData] = useState('');

    useEffect(() => {
        if (value) {
            setData(
                value.titleBefore ? value.titleBefore + ' ' : ''
                + value.firstName + ' '
                + value.midName ? value.midName + ' ' : ''
                + value.lastName
                + value.titleAfter ? ' ' + value.titleAfter : ''
            );
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

export default OrderUserValue;
