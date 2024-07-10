import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { CodeList, CodeListField } from '../../../../api/model/code-list';
import { ManagerResourceContext } from '../../../../context';

const CodeListTable = ({fields, rows, selected, setSelected}: {
    fields: CodeListField[],
    rows?: CodeList[],
    selected?: CodeList,
    setSelected: (codeList?: CodeList) => void
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

export default CodeListTable;

const TableHead = ({fields}: { fields: CodeListField[] }) => {
    const managerResourceState = useContext(ManagerResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case CodeListField.id:
                        return (<th key={field}>{managerResourceState?.resource?.codeListTable.id}</th>);
                    case CodeListField.code:
                        return (<th key={field}>{managerResourceState?.resource?.codeListTable.code}</th>);
                    case CodeListField.name:
                        return (<th key={field}>{managerResourceState?.resource?.codeListTable.name}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: CodeListField[],
    row: CodeList,
    selected?: CodeList,
    setSelected: (codeList?: CodeList) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case CodeListField.id:
                        return (<td key={field}>{row.id}</td>);
                    case CodeListField.code:
                        return (<td key={field}>{row.code}</td>);
                    case CodeListField.name:
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
