import { useContext } from 'react';

import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import { OrderUser, OrderUserField } from '../../api/model/order';
import { ResourceContext } from '../../context';

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
    const resourceState = useContext(ResourceContext);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case OrderUserField.id:
                        return (<th key={field}>{resourceState?.common?.orderUserTable.id}</th>);
                    case OrderUserField.titleBefore:
                        return (<th key={field}>{resourceState?.common?.orderUserTable.titleBefore}</th>);
                    case OrderUserField.firstName:
                        return (<th key={field}>{resourceState?.common?.orderUserTable.firstName}</th>);
                    case OrderUserField.midName:
                        return (<th key={field}>{resourceState?.common?.orderUserTable.midName}</th>);
                    case OrderUserField.lastName:
                        return (<th key={field}>{resourceState?.common?.orderUserTable.lastName}</th>);
                    case OrderUserField.titleAfter:
                        return (<th key={field}>{resourceState?.common?.orderUserTable.titleAfter}</th>);
                    case OrderUserField.email:
                        return (<th key={field}>{resourceState?.common?.orderUserTable.email}</th>);
                }
            })}
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
            {fields?.map(field => {
                switch (field) {
                    case OrderUserField.id:
                        return (<td key={field}>{row.id}</td>);
                    case OrderUserField.titleBefore:
                        return (<td key={field}>{row.titleBefore}</td>);
                    case OrderUserField.firstName:
                        return (<td key={field}>{row.firstName}</td>);
                    case OrderUserField.midName:
                        return (<td key={field}>{row.midName}</td>);
                    case OrderUserField.lastName:
                        return (<td key={field}>{row.lastName}</td>);
                    case OrderUserField.titleAfter:
                        return (<td key={field}>{row.titleAfter}</td>);
                    case OrderUserField.email:
                        return (<td key={field}>{row.email}</td>);
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
