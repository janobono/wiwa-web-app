import { useContext, useEffect, useState } from 'react';

import { UnitId } from '../../api/model/application';
import { ResourceContext } from '../../context';

const WiwaUnitId = ({unitId}: { unitId?: UnitId }) => {
    const resourceState = useContext(ResourceContext);

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
