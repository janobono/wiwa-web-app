import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import WiwaValue from '../../../ui/wiwa-value';
import { CodeListItem, CodeListItemField } from '../../../../api/model/code-list';
import { ResourceContext } from '../../../../context';

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
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case CodeListItemField.id:
                        return (<th key={field}>{resourceState?.manager?.codeListItemTable.id}</th>);
                    case CodeListItemField.codeListId:
                        return (<th key={field}>{resourceState?.manager?.codeListItemTable.codeListId}</th>);
                    case CodeListItemField.sortNum:
                        return (<th key={field}>{resourceState?.manager?.codeListItemTable.sortNum}</th>);
                    case CodeListItemField.code:
                        return (<th key={field}>{resourceState?.manager?.codeListItemTable.code}</th>);
                    case CodeListItemField.value:
                        return (<th key={field}>{resourceState?.manager?.codeListItemTable.value}</th>);
                    case CodeListItemField.leafNode:
                        return (<th key={field}>{resourceState?.manager?.codeListItemTable.leafNode}</th>);
                }
            })}
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
            {fields?.map(field => {
                switch (field) {
                    case CodeListItemField.id:
                        return (<td key={field}>{row.id}</td>);
                    case CodeListItemField.codeListId:
                        return (<td key={field}>{row.codeListId}</td>);
                    case CodeListItemField.sortNum:
                        return (<td key={field}>{row.sortNum + 1}</td>);
                    case CodeListItemField.code:
                        return (<td key={field}>{row.code}</td>);
                    case CodeListItemField.value:
                        return (<td key={field}>{row.value}</td>);
                    case CodeListItemField.leafNode:
                        return (<td key={field}><WiwaValue value={`${row.leafNode}`}/></td>);
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
