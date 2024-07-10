import { useContext, useEffect, useState } from 'react';

import { OrderPackageType } from '../../api/model/order';
import { CommonResourceContext } from '../../context';

const OrderPackageTypeValue = ({value}: { value?: OrderPackageType }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [data, setData] = useState('');

    useEffect(() => {
        if (value) {
            switch (value) {
                case OrderPackageType.NO_PACKAGE:
                    setData(commonResourceState?.resource?.orderPackageType.noPackage || '');
                    break;
                case OrderPackageType.NO_PACKAGE_WITH_REMAINS:
                    setData(commonResourceState?.resource?.orderPackageType.noPackageWithRemains || '');
                    break;
                case OrderPackageType.PACKAGE:
                    setData(commonResourceState?.resource?.orderPackageType.package || '');
                    break;
                case OrderPackageType.PACKAGE_WITH_REMAINS:
                    setData(commonResourceState?.resource?.orderPackageType.packageWithRemains || '');
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

export default OrderPackageTypeValue;
