import { useContext, useEffect, useState } from 'react';

import { UnitId } from '../../api/model/application';
import { CommonResourceContext } from '../../context';

const WiwaUnitId = ({unitId}: { unitId?: UnitId }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (unitId) {
            setData(commonResourceState?.getUnit(unitId));
        } else {
            setData(undefined);
        }
    }, [commonResourceState?.resource, unitId]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaUnitId;
