import { useEffect, useState } from 'react';

import { useUiState } from '../state/ui-state-provider';
import { UnitId } from '../../model/service';

const WiwaUnitValue = ({unitId}: { unitId?: UnitId }) => {
    const uiState = useUiState();

    const [data, setData] = useState<string>();

    useEffect(() => {
        if (unitId) {
            setData(uiState?.units?.find(unit => unit.id === unitId)?.value || '');
        } else {
            setData(undefined);
        }
    }, [uiState?.units, unitId]);

    return (
        <>
            {data}
        </>
    )
}

export default WiwaUnitValue;
