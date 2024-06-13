import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValue from '../ui/wiwa-value';
import { useResourceState } from '../../state/resource';
import { CodeListItem, CodeListItemField } from '../../api/model/code-list';

const CodeListItemTable = ({fields, codeListItems, selected, setSelected}: {
    fields: CodeListItemField[],
    codeListItems?: CodeListItem[],
    selected?: CodeListItem,
    setSelected: (codeListItem?: CodeListItem) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {codeListItems?.map(codeListItem =>
                <TableRow
                    key={codeListItem.id}
                    fields={fields}
                    codeListItem={codeListItem}
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

const TableRow = ({fields, codeListItem, selected, setSelected}: {
    fields: CodeListItemField[],
    codeListItem: CodeListItem,
    selected?: CodeListItem,
    setSelected: (codeListItem?: CodeListItem) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(codeListItem)}
        >
            {fields?.find(item => item === CodeListItemField.id) &&
                <td>{codeListItem.id}</td>
            }
            {fields?.find(item => item === CodeListItemField.codeListId) &&
                <td>{codeListItem.codeListId}</td>
            }
            {fields?.find(item => item === CodeListItemField.sortNum) &&
                <td>{codeListItem.sortNum + 1}</td>
            }
            {fields?.find(item => item === CodeListItemField.code) &&
                <td>{codeListItem.code}</td>
            }
            {fields?.find(item => item === CodeListItemField.value) &&
                <td>{codeListItem.value}</td>
            }
            {fields?.find(item => item === CodeListItemField.leafNode) &&
                <td><WiwaValue value={`${codeListItem.leafNode}`}/></td>
            }
            <td>
                <WiwaFormCheckBox value={codeListItem.id === selected?.id} setValue={(value) => {
                    if (value) {
                        setSelected(codeListItem);
                    }
                }}/>
            </td>
        </tr>
    )
}
