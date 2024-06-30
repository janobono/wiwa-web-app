import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import { ApplicationImageInfo, ApplicationImageInfoField } from '../../../../api/model/application';
import { ResourceContext } from '../../../../context';

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
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case ApplicationImageInfoField.fileName:
                        return <th key={field}>{resourceState?.admin?.applicationImageInfoTable.fileName}</th>;
                    case ApplicationImageInfoField.thumbnail:
                        return <th key={field}>{resourceState?.admin?.applicationImageInfoTable.thumbnail}</th>;
                }
            })}
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
            {fields?.map(field => {
                switch (field) {
                    case ApplicationImageInfoField.fileName:
                        return (<td key={field}>{row.fileName}</td>);
                    case ApplicationImageInfoField.thumbnail:
                        return (
                            <td key={field}>
                                <img
                                    className="flex-none w-48 h-48 object-scale-down object-center"
                                    src={row.thumbnail}
                                    alt={row.fileName}
                                />
                            </td>
                        );
                }
            })}
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
