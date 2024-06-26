import { useContext } from 'react';

import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import WiwaUserAuthorities from '../../ui/wiwa-user-authorities';
import WiwaValue from '../../ui/wiwa-value';
import { User } from '../../../api/model';
import { UserField } from '../../../api/model/user';
import { ResourceContext } from '../../../context';

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
            {fields?.find(item => item === UserField.id) &&
                <th>{resourceState?.admin?.userTable.id}</th>
            }
            {fields?.find(item => item === UserField.username) &&
                <th>{resourceState?.admin?.userTable.username}</th>
            }
            {fields?.find(item => item === UserField.email) &&
                <th>{resourceState?.admin?.userTable.email}</th>
            }
            {fields?.find(item => item === UserField.titleBefore) &&
                <th>{resourceState?.admin?.userTable.titleBefore}</th>
            }
            {fields?.find(item => item === UserField.firstName) &&
                <th>{resourceState?.admin?.userTable.firstName}</th>
            }
            {fields?.find(item => item === UserField.midName) &&
                <th>{resourceState?.admin?.userTable.midName}</th>
            }
            {fields?.find(item => item === UserField.lastName) &&
                <th>{resourceState?.admin?.userTable.lastName}</th>
            }
            {fields?.find(item => item === UserField.titleAfter) &&
                <th>{resourceState?.admin?.userTable.titleAfter}</th>
            }
            {fields?.find(item => item === UserField.authorities) &&
                <th>{resourceState?.admin?.userTable.authorities}</th>
            }
            {fields?.find(item => item === UserField.confirmed) &&
                <th>{resourceState?.admin?.userTable.confirmed}</th>
            }
            {fields?.find(item => item === UserField.enabled) &&
                <th>{resourceState?.admin?.userTable.enabled}</th>
            }
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
            {fields?.find(item => item === UserField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === UserField.username) &&
                <td>{row.username}</td>
            }
            {fields?.find(item => item === UserField.email) &&
                <td>{row.email}</td>
            }
            {fields?.find(item => item === UserField.titleBefore) &&
                <td>{row.titleBefore}</td>
            }
            {fields?.find(item => item === UserField.firstName) &&
                <td>{row.firstName}</td>
            }
            {fields?.find(item => item === UserField.midName) &&
                <td>{row.midName}</td>
            }
            {fields?.find(item => item === UserField.lastName) &&
                <td>{row.lastName}</td>
            }
            {fields?.find(item => item === UserField.titleAfter) &&
                <td>{row.titleAfter}</td>
            }
            {fields?.find(item => item === UserField.authorities) &&
                <td><WiwaUserAuthorities authorities={row.authorities}/></td>
            }
            {fields?.find(item => item === UserField.confirmed) &&
                <td><WiwaValue value={`${row.confirmed}`}/></td>
            }
            {fields?.find(item => item === UserField.enabled) &&
                <td><WiwaValue value={`${row.enabled}`}/></td>
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
