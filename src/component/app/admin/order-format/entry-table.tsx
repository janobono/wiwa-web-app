import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { Entry, EntryField } from '../../../../api/model';
import { AdminResourceContext } from '../../../../context';

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
    const adminResourceState = useContext(AdminResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case EntryField.key:
                        return (<th key={field}>{adminResourceState?.resource?.entryTable.key}</th>);
                    case EntryField.value:
                        return (<th key={field}>{adminResourceState?.resource?.entryTable.value}</th>);
                }
            })}
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
            {fields?.map(field => {
                switch (field) {
                    case EntryField.key:
                        return (<td key={field}>{row.key}</td>);
                    case EntryField.value:
                        return (<td key={field}>{row.value}</td>);
                }
            })}
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
