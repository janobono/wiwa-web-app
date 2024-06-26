import { useContext } from 'react';

import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { Entry, EntryField } from '../../../api/model';
import { ResourceContext } from '../../../context';

const EntryTable = ({fields, rows, selected, setSelected}: {
    fields: EntryField[],
    rows?: Entry[],
    selected?: Entry,
    setSelected: (entry?: Entry) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {rows?.map(row =>
                <TableRow
                    key={row.key}
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

export default EntryTable;

const TableHead = ({fields}: { fields: EntryField[] }) => {
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.find(item => item === EntryField.key) &&
                <th>{resourceState?.admin?.entryTable.key}</th>
            }
            {fields?.find(item => item === EntryField.value) &&
                <th>{resourceState?.admin?.entryTable.value}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: EntryField[],
    row: Entry,
    selected?: Entry,
    setSelected: (entry?: Entry) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.find(item => item === EntryField.key) &&
                <td>{row.key}</td>
            }
            {fields?.find(item => item === EntryField.value) &&
                <td>{row.value}</td>
            }
            <td>
                <WiwaFormCheckBox value={row.key === selected?.key} setValue={(value) => {
                    if (value) {
                        setSelected(row);
                    }
                }}/>
            </td>
        </tr>
    )
}
