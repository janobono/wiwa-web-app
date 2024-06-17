import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValue from '../ui/wiwa-value';
import { useResourceState } from '../../state/resource';
import { CodeListItem, CodeListItemField } from '../../api/model/code-list';

const CodeListItemTable = ({fields, rows, selected, setSelected}: {
    fields: CodeListItemField[],
    rows?: CodeListItem[],
    selected?: CodeListItem,
    setSelected: (codeListItem?: CodeListItem) => void
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

export default CodeListItemTable;

const TableHead = ({fields}: { fields: CodeListItemField[] }) => {
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === CodeListItemField.id) &&
                <th>{resourceState?.common?.codeListItemTable.id}</th>
            }
            {fields?.find(item => item === CodeListItemField.codeListId) &&
                <th>{resourceState?.common?.codeListItemTable.codeListId}</th>
            }
            {fields?.find(item => item === CodeListItemField.sortNum) &&
                <th>{resourceState?.common?.codeListItemTable.sortNum}</th>
            }
            {fields?.find(item => item === CodeListItemField.code) &&
                <th>{resourceState?.common?.codeListItemTable.code}</th>
            }
            {fields?.find(item => item === CodeListItemField.value) &&
                <th>{resourceState?.common?.codeListItemTable.value}</th>
            }
            {fields?.find(item => item === CodeListItemField.leafNode) &&
                <th>{resourceState?.common?.codeListItemTable.leafNode}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: CodeListItemField[],
    row: CodeListItem,
    selected?: CodeListItem,
    setSelected: (codeListItem?: CodeListItem) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.find(item => item === CodeListItemField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === CodeListItemField.codeListId) &&
                <td>{row.codeListId}</td>
            }
            {fields?.find(item => item === CodeListItemField.sortNum) &&
                <td>{row.sortNum + 1}</td>
            }
            {fields?.find(item => item === CodeListItemField.code) &&
                <td>{row.code}</td>
            }
            {fields?.find(item => item === CodeListItemField.value) &&
                <td>{row.value}</td>
            }
            {fields?.find(item => item === CodeListItemField.leafNode) &&
                <td><WiwaValue value={`${row.leafNode}`}/></td>
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
