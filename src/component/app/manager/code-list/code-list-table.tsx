import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { CodeList, CodeListField } from '../../../../api/model/code-list';
import { useResourceState } from '../../../../state/resource';

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
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === CodeListField.id) &&
                <th>{resourceState?.manager?.codeListTable.id}</th>
            }
            {fields?.find(item => item === CodeListField.code) &&
                <th>{resourceState?.manager?.codeListTable.code}</th>
            }
            {fields?.find(item => item === CodeListField.name) &&
                <th>{resourceState?.manager?.codeListTable.name}</th>
            }
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
            {fields?.find(item => item === CodeListField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === CodeListField.code) &&
                <td>{row.code}</td>
            }
            {fields?.find(item => item === CodeListField.name) &&
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
