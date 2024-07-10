import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { CategoryItem, CategoryItemField } from '../../../../api/model';
import { ManagerResourceContext } from '../../../../context';

const CategoryItemTable = ({fields, rows, selected, setSelected}: {
    fields: CategoryItemField[],
    rows?: CategoryItem[],
    selected?: CategoryItem,
    setSelected: (categoryItem?: CategoryItem) => void
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

export default CategoryItemTable;

const TableHead = ({fields}: { fields: CategoryItemField[] }) => {
    const managerResourceState = useContext(ManagerResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case CategoryItemField.id:
                        return (<th key={field}>{managerResourceState?.resource?.categoryItemTable.id}</th>);
                    case CategoryItemField.code:
                        return (<th key={field}>{managerResourceState?.resource?.categoryItemTable.code}</th>);
                    case CategoryItemField.name:
                        return (<th key={field}>{managerResourceState?.resource?.categoryItemTable.name}</th>);
                    case CategoryItemField.category:
                        return (<th key={field}>{managerResourceState?.resource?.categoryItemTable.category}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: CategoryItemField[],
    row: CategoryItem,
    selected?: CategoryItem,
    setSelected: (categoryItem?: CategoryItem) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case CategoryItemField.id:
                        return (<td key={field}>{row.id}</td>);
                    case CategoryItemField.code:
                        return (<td key={field}>{row.code}</td>);
                    case CategoryItemField.name:
                        return (<td key={field}>{row.name}</td>);
                    case CategoryItemField.category:
                        return (<td key={field}>{`${row.category.code}:${row.category.name}`}</td>);
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
