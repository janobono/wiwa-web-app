import { useEffect, useState } from 'react';

import { useResourceState } from '../state/resource-state-provider';
import { getUnitIdName, UnitId } from '../../model/service';

const WiwaUnitId = ({unitId}: { unitId?: UnitId }) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (unitId) {
            setData(getUnitIdName(unitId, resourceState?.common));
        } else {
            setData(undefined);
        }
    }, [resourceState?.common, unitId]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaUnitId;
