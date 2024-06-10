import { useEffect, useState } from 'react';

import { UnitId } from '../../api/model/application';
import { getUnitIdName } from '../../model';
import { useResourceState } from '../../state/resource';

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
