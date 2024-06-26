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
            {fields?.find(item => item === FreeDayField.name) &&
                <th>{resourceState?.manager?.freeDayTable.name}</th>
            }
            {fields?.find(item => item === FreeDayField.day) &&
                <th>{resourceState?.manager?.freeDayTable.day}</th>
            }
            {fields?.find(item => item === FreeDayField.month) &&
                <th>{resourceState?.manager?.freeDayTable.month}</th>
            }
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
            {fields?.find(item => item === FreeDayField.name) &&
                <td>{row.name}</td>
            }
            {fields?.find(item => item === FreeDayField.day) &&
                <td>{row.day}</td>
            }
            {fields?.find(item => item === FreeDayField.month) &&
                <td>{row.month}</td>
            }
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
