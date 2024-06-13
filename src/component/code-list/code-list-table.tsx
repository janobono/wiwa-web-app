import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import { CodeList, CodeListField } from '../../api/model/code-list';
import { useResourceState } from '../../state/resource';

const CodeListTable = ({fields, codeLists, selected, setSelected}: {
    fields: CodeListField[],
    codeLists?: CodeList[],
    selected?: CodeList,
    setSelected: (codeList?: CodeList) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {codeLists?.map(codeList =>
                <TableRow
                    key={codeList.id}
                    fields={fields}
                    codeList={codeList}
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
                <th>{resourceState?.common?.codeListTable.id}</th>
            }
            {fields?.find(item => item === CodeListField.code) &&
                <th>{resourceState?.common?.codeListTable.code}</th>
            }
            {fields?.find(item => item === CodeListField.name) &&
                <th>{resourceState?.common?.codeListTable.name}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, codeList, selected, setSelected}: {
    fields: CodeListField[],
    codeList: CodeList,
    selected?: CodeList,
    setSelected: (codeList?: CodeList) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(codeList)}
        >
            {fields?.find(item => item === CodeListField.id) &&
                <td>{codeList.id}</td>
            }
            {fields?.find(item => item === CodeListField.code) &&
                <td>{codeList.code}</td>
            }
            {fields?.find(item => item === CodeListField.name) &&
                <td>{codeList.name}</td>
            }
            <td>
                <WiwaFormCheckBox value={codeList.id === selected?.id} setValue={(value) => {
                    if (value) {
                        setSelected(codeList);
                    }
                }}/>
            </td>
        </tr>
    )
}
