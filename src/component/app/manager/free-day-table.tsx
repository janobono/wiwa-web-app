import { useContext } from 'react';

import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { FreeDay, FreeDayField } from '../../../api/model/application';
import { ResourceContext } from '../../../context';

const FreeDayTable = ({fields, rows, selected, setSelected}: {
    fields: FreeDayField[],
    rows?: FreeDay[],
    selected?: FreeDay,
    setSelected: (freeDays?: FreeDay) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {rows?.map((row, index) =>
                <TableRow
                    key={index}
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

export default FreeDayTable;

const TableHead = ({fields}: { fields: FreeDayField[] }) => {
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case FreeDayField.name:
                        return (<th key={field}>{resourceState?.manager?.freeDayTable.name}</th>);
                    case FreeDayField.day:
                        return (<th key={field}>{resourceState?.manager?.freeDayTable.day}</th>);
                    case FreeDayField.month:
                        return (<th key={field}>{resourceState?.manager?.freeDayTable.month}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: FreeDayField[],
    row: FreeDay,
    selected?: FreeDay,
    setSelected: (freeDay?: FreeDay) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case FreeDayField.name:
                        return (<td key={field}>{row.name}</td>);
                    case FreeDayField.day:
                        return (<td key={field}>{row.day}</td>);
                    case FreeDayField.month:
                        return (<td key={field}>{row.month}</td>);
                }
            })}
            <td>
                <WiwaFormCheckBox
                    value={row.day === selected?.day && row.month === selected?.month}
                    setValue={(value) => {
                        if (value) {
                            setSelected(row);
                        }
                    }}
                />
            </td>
        </tr>
    )
}
