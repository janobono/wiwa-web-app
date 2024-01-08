import { FormEvent, useEffect, useState } from 'react';

import { useResourceState } from '../state/resource-state-provider';
import WiwaSelect from '../ui/wiwa-select';
import { getUnitIdName, Unit, UnitId } from '../../model/service';
import { useUiState } from '../state/ui-state-provider.tsx';

const WiwaSelectQuantityUnit = (
    {
        placeholder,
        value,
        setValue,
        unitIds,
    }: {
        placeholder?: string
        value?: string,
        setValue: (value: string) => void,
        unitIds?: UnitId[]
    }) => {
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [data, setData] = useState<Unit[]>();

    useEffect(() => {
        setData([]);
        if (unitIds) {
            const newData: Unit[] = [];
            unitIds.forEach(unitId => {
                const unit = uiState?.units?.find(unit => unitId === unit.id);
                if (unit) {
                    newData.push(unit);
                }
            });
            setData(newData);
        } else {
            setData(uiState?.units);
        }
    }, [uiState, unitIds]);

    const quantityUnitChangeHandler = (event: FormEvent<HTMLSelectElement>) => {
        setValue(event.currentTarget.value);
    }

    return (
        <WiwaSelect
            onChange={event => quantityUnitChangeHandler(event)}
        >
            {placeholder && <option disabled selected={value === undefined}>{placeholder}</option>}
            {data?.map(unit =>
                <option
                    key={unit.id}
                    selected={unit.id.toString() === value}
                    value={unit.id}>{getUnitIdName(unit.id, resourceState?.common)} [{unit.value}]</option>
            )}
        </WiwaSelect>
    )
}

export default WiwaSelectQuantityUnit;
