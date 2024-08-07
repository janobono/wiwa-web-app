import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { Unit, UnitField } from '../../../../api/model/application';
import { AdminResourceContext, CommonResourceContext } from '../../../../context';

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
    const adminResourceState = useContext(AdminResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case UnitField.id:
                        return (<th key={field}>{adminResourceState?.resource?.unitTable.id}</th>);
                    case UnitField.value:
                        return (<th key={field}>{adminResourceState?.resource?.unitTable.value}</th>);
                }
            })}
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
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case UnitField.id:
                        return (<td key={field}>{commonResourceState?.getUnitIdName(row.id)}</td>);
                    case UnitField.value:
                        return (<td key={field}>{row.value}</td>);
                }
            })}
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
