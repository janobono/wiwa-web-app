import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { Category, CategoryField } from '../../../../api/model';
import { ManagerResourceContext } from '../../../../context';

const CategoryTable = ({fields, rows, selected, setSelected}: {
    fields: CategoryField[],
    rows?: Category[],
    selected?: Category,
    setSelected: (category?: Category) => void
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

export default CategoryTable;

const TableHead = ({fields}: { fields: CategoryField[] }) => {
    const managerResourceState = useContext(ManagerResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case CategoryField.id:
                        return (<th key={field}>{managerResourceState?.resource?.categoryTable.id}</th>);
                    case CategoryField.code:
                        return (<th key={field}>{managerResourceState?.resource?.categoryTable.code}</th>);
                    case CategoryField.name:
                        return (<th key={field}>{managerResourceState?.resource?.categoryTable.name}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: CategoryField[],
    row: Category,
    selected?: Category,
    setSelected: (category?: Category) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields.map(field => {
                switch (field) {
                    case CategoryField.id:
                        return (<td key={field}>{row.id}</td>);
                    case CategoryField.code:
                        return (<td key={field}>{row.code}</td>);
                    case CategoryField.name:
                        return (<td key={field}>{row.name}</td>);
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
