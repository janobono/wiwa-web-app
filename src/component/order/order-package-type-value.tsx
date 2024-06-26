import { useContext, useEffect, useState } from 'react';

import { OrderPackageType } from '../../api/model/order';
import { ResourceContext } from '../../context';

const OrderPackageTypeValue = ({value}: { value?: OrderPackageType }) => {
    const resourceState = useContext(ResourceContext);

    const [data, setData] = useState('');

    useEffect(() => {
        if (value) {
            switch (value) {
                case OrderPackageType.NO_PACKAGE:
                    setData(resourceState?.common?.orderPackageType.noPackage || '');
                    break;
                case OrderPackageType.NO_PACKAGE_WITH_REMAINS:
                    setData(resourceState?.common?.orderPackageType.noPackageWithRemains || '');
                    break;
                case OrderPackageType.PACKAGE:
                    setData(resourceState?.common?.orderPackageType.package || '');
                    break;
                case OrderPackageType.PACKAGE_WITH_REMAINS:
                    setData(resourceState?.common?.orderPackageType.packageWithRemains || '');
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
