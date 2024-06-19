import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import { ApplicationImageInfo, ApplicationImageInfoField } from '../../../api/model/application';
import { useResourceState } from '../../../state/resource';

const ApplicationImageInfoTable = ({fields, rows, selected, setSelected}: {
    fields: ApplicationImageInfoField[],
    rows?: ApplicationImageInfo[],
    selected?: ApplicationImageInfo,
    setSelected: (applicationImageInfo?: ApplicationImageInfo) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {rows?.map(row =>
                <TableRow
                    key={row.fileName}
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

export default ApplicationImageInfoTable;

const TableHead = ({fields}: { fields: ApplicationImageInfoField[] }) => {
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === ApplicationImageInfoField.fileName) &&
                <th>{resourceState?.admin?.applicationImageInfoTable.fileName}</th>
            }
            {fields?.find(item => item === ApplicationImageInfoField.thumbnail) &&
                <th>{resourceState?.admin?.applicationImageInfoTable.thumbnail}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: ApplicationImageInfoField[],
    row: ApplicationImageInfo,
    selected?: ApplicationImageInfo,
    setSelected: (applicationImageInfo?: ApplicationImageInfo) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.find(item => item === ApplicationImageInfoField.fileName) &&
                <td>{row.fileName}</td>
            }
            {fields?.find(item => item === ApplicationImageInfoField.thumbnail) &&
                <td>
                    <img
                        className="flex-none w-48 h-48 object-scale-down object-center"
                        src={row.thumbnail}
                        alt={row.fileName}
                    />
                </td>
            }
            <td>
                <WiwaFormCheckBox value={row.fileName === selected?.fileName} setValue={(value) => {
                    if (value) {
                        setSelected(row);
                    }
                }}/>
            </td>
        </tr>
    )
}
