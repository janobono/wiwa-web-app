import { useEffect, useState } from 'react';

import { OrderUser } from '../../api/model/order';

const OrderUserValue = ({value}: { value?: OrderUser }) => {

    const [data, setData] = useState('');

    useEffect(() => {
        if (value) {
            let result = '';

            if (!isBlank(value.titleBefore)) {
                result += value.titleBefore + ' ';
            }

            result += value.firstName + ' ';

            if (!isBlank(value.midName)) {
                result += value.midName + ' ';
            }

            result += value.lastName;

            if (!isBlank(value.titleAfter)) {
                result += ' ' + value.titleAfter;
            }
            setData(result);
        } else {
            setData('');
        }
    }, [value]);

    const isBlank = (s?: string) => {
        if (s === undefined) {
            return true;
        }
        if (s === null) {
            return true;
        }
        return s.trim().length === 0;
    }

    return (
        <>
            {data}
        </>
    )
}

export default OrderUserValue;
