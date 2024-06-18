import { useEffect, useState } from 'react';

import { UnitId } from '../../api/model/application';
import { useResourceState } from '../../state/resource';

const WiwaUnitId = ({unitId}: { unitId?: UnitId }) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (unitId) {
            setData(resourceState?.getUnit(unitId));
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
