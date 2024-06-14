import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { Unit, UnitField } from '../../../api/model/application';
import { useResourceState } from '../../../state/resource';

const UnitTable = ({fields, units, selected, setSelected}: {
    fields: UnitField[],
    units?: Unit[],
    selected?: Unit,
    setSelected: (unit?: Unit) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {units?.map(unit =>
                <TableRow
                    key={unit.id}
                    fields={fields}
                    unit={unit}
                    selected={selected}
                    setSelected={setSelected}
                />)
            }
            </tbody>
        </table>
    )
}

export default UnitTable;

const TableHead = ({fields}: { fields: UnitField[] }) => {
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === UnitField.id) &&
                <th>{resourceState?.common?.unitTable.id}</th>
            }
            {fields?.find(item => item === UnitField.value) &&
                <th>{resourceState?.common?.unitTable.value}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, unit, selected, setSelected}: {
    fields: UnitField[],
    unit: Unit,
    selected?: Unit,
    setSelected: (unit?: Unit) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(unit)}
        >
            {fields?.find(item => item === UnitField.id) &&
                <td>{unit.id}</td>
            }
            {fields?.find(item => item === UnitField.value) &&
                <td>{unit.value}</td>
            }
            <td>
                <WiwaFormCheckBox value={unit.id === selected?.id} setValue={(value) => {
                    if (value) {
                        setSelected(unit);
                    }
                }}/>
            </td>
        </tr>
    )
}
