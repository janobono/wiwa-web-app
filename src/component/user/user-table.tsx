import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaUserAuthorities from '../ui/wiwa-user-authorities';
import WiwaValue from '../ui/wiwa-value';
import { User } from '../../api/model';
import { UserField } from '../../api/model/user';
import { useResourceState } from '../../state/resource';

const UserTable = ({fields, users, selected, setSelected}: {
    fields: UserField[],
    users?: User[],
    selected?: User,
    setSelected: (user?: User) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {users?.map(user =>
                <TableRow
                    key={user.id}
                    fields={fields}
                    user={user}
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
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === UserField.id) &&
                <th>{resourceState?.common?.userTable.id}</th>
            }
            {fields?.find(item => item === UserField.username) &&
                <th>{resourceState?.common?.userTable.username}</th>
            }
            {fields?.find(item => item === UserField.email) &&
                <th>{resourceState?.common?.userTable.email}</th>
            }
            {fields?.find(item => item === UserField.titleBefore) &&
                <th>{resourceState?.common?.userTable.titleBefore}</th>
            }
            {fields?.find(item => item === UserField.firstName) &&
                <th>{resourceState?.common?.userTable.firstName}</th>
            }
            {fields?.find(item => item === UserField.midName) &&
                <th>{resourceState?.common?.userTable.midName}</th>
            }
            {fields?.find(item => item === UserField.lastName) &&
                <th>{resourceState?.common?.userTable.lastName}</th>
            }
            {fields?.find(item => item === UserField.titleAfter) &&
                <th>{resourceState?.common?.userTable.titleAfter}</th>
            }
            {fields?.find(item => item === UserField.authorities) &&
                <th>{resourceState?.common?.userTable.authorities}</th>
            }
            {fields?.find(item => item === UserField.confirmed) &&
                <th>{resourceState?.common?.userTable.confirmed}</th>
            }
            {fields?.find(item => item === UserField.enabled) &&
                <th>{resourceState?.common?.userTable.enabled}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, user, selected, setSelected}: {
    fields: UserField[],
    user: User,
    selected?: User,
    setSelected: (user?: User) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(user)}
        >
            {fields?.find(item => item === UserField.id) &&
                <td>{user.id}</td>
            }
            {fields?.find(item => item === UserField.username) &&
                <td>{user.username}</td>
            }
            {fields?.find(item => item === UserField.email) &&
                <td>{user.email}</td>
            }
            {fields?.find(item => item === UserField.titleBefore) &&
                <td>{user.titleBefore}</td>
            }
            {fields?.find(item => item === UserField.firstName) &&
                <td>{user.firstName}</td>
            }
            {fields?.find(item => item === UserField.midName) &&
                <td>{user.midName}</td>
            }
            {fields?.find(item => item === UserField.lastName) &&
                <td>{user.lastName}</td>
            }
            {fields?.find(item => item === UserField.titleAfter) &&
                <td>{user.titleAfter}</td>
            }
            {fields?.find(item => item === UserField.authorities) &&
                <td><WiwaUserAuthorities authorities={user.authorities}/></td>
            }
            {fields?.find(item => item === UserField.confirmed) &&
                <td><WiwaValue value={`${user.confirmed}`}/></td>
            }
            {fields?.find(item => item === UserField.enabled) &&
                <td><WiwaValue value={`${user.enabled}`}/></td>
            }
            <td>
                <WiwaFormCheckBox value={user.id === selected?.id} setValue={(value) => {
                    if (value) {
                        setSelected(user);
                    }
                }}/>
            </td>
        </tr>
    )
}
