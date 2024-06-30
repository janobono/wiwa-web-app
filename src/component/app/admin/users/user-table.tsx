import { useContext } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import WiwaUserAuthorities from '../../../ui/wiwa-user-authorities';
import WiwaValue from '../../../ui/wiwa-value';
import { User } from '../../../../api/model';
import { UserField } from '../../../../api/model/user';
import { ResourceContext } from '../../../../context';

const UserTable = ({fields, rows, selected, setSelected}: {
    fields: UserField[],
    rows?: User[],
    selected?: User,
    setSelected: (user?: User) => void
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

export default UserTable;

const TableHead = ({fields}: { fields: UserField[] }) => {
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case UserField.id:
                        return (<th key={field}>{resourceState?.admin?.userTable.id}</th>);
                    case UserField.username:
                        return (<th key={field}>{resourceState?.admin?.userTable.username}</th>);
                    case UserField.email:
                        return (<th key={field}>{resourceState?.admin?.userTable.email}</th>);
                    case UserField.titleBefore:
                        return (<th key={field}>{resourceState?.admin?.userTable.titleBefore}</th>);
                    case UserField.firstName:
                        return (<th key={field}>{resourceState?.admin?.userTable.firstName}</th>);
                    case UserField.midName:
                        return (<th key={field}>{resourceState?.admin?.userTable.midName}</th>);
                    case UserField.lastName:
                        return (<th key={field}>{resourceState?.admin?.userTable.lastName}</th>);
                    case UserField.titleAfter:
                        return (<th key={field}>{resourceState?.admin?.userTable.titleAfter}</th>);
                    case UserField.authorities:
                        return (<th key={field}>{resourceState?.admin?.userTable.authorities}</th>);
                    case UserField.confirmed:
                        return (<th key={field}>{resourceState?.admin?.userTable.confirmed}</th>);
                    case UserField.enabled:
                        return (<th key={field}>{resourceState?.admin?.userTable.enabled}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: UserField[],
    row: User,
    selected?: User,
    setSelected: (user?: User) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case UserField.id:
                        return (<td key={field}>{row.id}</td>);
                    case UserField.username:
                        return (<td key={field}>{row.username}</td>);
                    case UserField.email:
                        return (<td key={field}>{row.email}</td>);
                    case UserField.titleBefore:
                        return (<td key={field}>{row.titleBefore}</td>);
                    case UserField.firstName:
                        return (<td key={field}>{row.firstName}</td>);
                    case UserField.midName:
                        return (<td key={field}>{row.midName}</td>);
                    case UserField.lastName:
                        return (<td key={field}>{row.lastName}</td>);
                    case UserField.titleAfter:
                        return (<td key={field}>{row.titleAfter}</td>);
                    case UserField.authorities:
                        return (<td key={field}><WiwaUserAuthorities authorities={row.authorities}/></td>);
                    case UserField.confirmed:
                        return (<td key={field}><WiwaValue value={`${row.confirmed}`}/></td>);
                    case UserField.enabled:
                        return (<td key={field}><WiwaValue value={`${row.enabled}`}/></td>);
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
