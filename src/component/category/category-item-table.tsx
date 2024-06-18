import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import { CategoryItem, CategoryItemField } from '../../api/model';
import { useResourceState } from '../../state/resource';

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
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === CategoryItemField.id) &&
                <th>{resourceState?.common?.categoryItemTable.id}</th>
            }
            {fields?.find(item => item === CategoryItemField.code) &&
                <th>{resourceState?.common?.categoryItemTable.code}</th>
            }
            {fields?.find(item => item === CategoryItemField.name) &&
                <th>{resourceState?.common?.categoryItemTable.name}</th>
            }
            {fields?.find(item => item === CategoryItemField.category) &&
                <th>{resourceState?.common?.categoryItemTable.category}</th>
            }
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
            {fields?.find(item => item === CategoryItemField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === CategoryItemField.code) &&
                <td>{row.code}</td>
            }
            {fields?.find(item => item === CategoryItemField.name) &&
                <td>{row.name}</td>
            }
            {fields?.find(item => item === CategoryItemField.category) &&
                <td>{`${row.category.code}:${row.category.name}`}</td>
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
