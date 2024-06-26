import { useContext } from 'react';

import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { Unit, UnitField } from '../../../api/model/application';
import { ResourceContext } from '../../../context';

const UnitTable = ({fields, rows, selected, setSelected}: {
    fields: UnitField[],
    rows?: Unit[],
    selected?: Unit,
    setSelected: (unit?: Unit) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {rows?.map(row =>
                <TableRow
                    key={row.id}
                    fields={fields}
                    row={row}
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
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.find(item => item === UnitField.id) &&
                <th>{resourceState?.admin?.unitTable.id}</th>
            }
            {fields?.find(item => item === UnitField.value) &&
                <th>{resourceState?.admin?.unitTable.value}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: UnitField[],
    row: Unit,
    selected?: Unit,
    setSelected: (unit?: Unit) => void
}) => {
    const resourceState = useContext(ResourceContext);

    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.find(item => item === UnitField.id) &&
                <td>{resourceState?.getUnitIdName(row.id)}</td>
            }
            {fields?.find(item => item === UnitField.value) &&
                <td>{row.value}</td>
            }
            <td>
                <WiwaFormCheckBox value={row.id === selected?.id} setValue={(value) => {
                    if (value) {
                        setSelected(row);
                    }
                }}/>
            </td>
        </tr>
    )
}
