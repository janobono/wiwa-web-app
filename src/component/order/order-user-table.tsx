import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import { OrderUser, OrderUserField } from '../../api/model/order';
import { useResourceState } from '../../state/resource';

const OrderUserTable = ({fields, rows, selected, setSelected}: {
    fields: OrderUserField[],
    rows?: OrderUser[],
    selected?: OrderUser,
    setSelected: (orderUser?: OrderUser) => void
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

export default OrderUserTable;

const TableHead = ({fields}: { fields: OrderUserField[] }) => {
    const resourceState = useResourceState();

    return (
        <thead>
        <tr>
            {fields?.find(item => item === OrderUserField.id) &&
                <th>{resourceState?.common?.orderUserTable.id}</th>
            }
            {fields?.find(item => item === OrderUserField.titleBefore) &&
                <th>{resourceState?.common?.orderUserTable.titleBefore}</th>
            }
            {fields?.find(item => item === OrderUserField.firstName) &&
                <th>{resourceState?.common?.orderUserTable.firstName}</th>
            }
            {fields?.find(item => item === OrderUserField.midName) &&
                <th>{resourceState?.common?.orderUserTable.midName}</th>
            }
            {fields?.find(item => item === OrderUserField.lastName) &&
                <th>{resourceState?.common?.orderUserTable.lastName}</th>
            }
            {fields?.find(item => item === OrderUserField.titleAfter) &&
                <th>{resourceState?.common?.orderUserTable.titleAfter}</th>
            }
            {fields?.find(item => item === OrderUserField.email) &&
                <th>{resourceState?.common?.orderUserTable.email}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: OrderUserField[],
    row: OrderUser,
    selected?: OrderUser,
    setSelected: (orderUser?: OrderUser) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.find(item => item === OrderUserField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === OrderUserField.titleBefore) &&
                <td>{row.titleBefore}</td>
            }
            {fields?.find(item => item === OrderUserField.firstName) &&
                <td>{row.firstName}</td>
            }
            {fields?.find(item => item === OrderUserField.midName) &&
                <td>{row.midName}</td>
            }
            {fields?.find(item => item === OrderUserField.lastName) &&
                <td>{row.lastName}</td>
            }
            {fields?.find(item => item === OrderUserField.titleAfter) &&
                <td>{row.titleAfter}</td>
            }
            {fields?.find(item => item === OrderUserField.email) &&
                <td>{row.email}</td>
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
