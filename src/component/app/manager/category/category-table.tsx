import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { Category, CategoryField } from '../../../../api/model';
import { ResourceContext } from '../../../../context';

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
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.find(item => item === CategoryField.id) &&
                <th>{resourceState?.manager?.categoryTable.id}</th>
            }
            {fields?.find(item => item === CategoryField.code) &&
                <th>{resourceState?.manager?.categoryTable.code}</th>
            }
            {fields?.find(item => item === CategoryField.name) &&
                <th>{resourceState?.manager?.categoryTable.name}</th>
            }
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
            {fields?.find(item => item === CategoryField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === CategoryField.code) &&
                <td>{row.code}</td>
            }
            {fields?.find(item => item === CategoryField.name) &&
                <td>{row.name}</td>
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
