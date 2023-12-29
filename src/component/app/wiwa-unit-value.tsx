import { useEffect, useState } from 'react';

import { useUnitState } from '../state/unit-provider';
import { UnitId } from '../../model/service';

const WiwaUnitValue = ({unitId}: { unitId?: UnitId }) => {
    const unitState = useUnitState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (unitId) {
            setData(unitState?.getValue(unitId));
        } else {
            setData(undefined);
        }
    }, [unitState?.data, unitId]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaUnitValue;
