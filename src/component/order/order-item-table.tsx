import { useContext, useEffect, useState } from 'react';

import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import { OrderItem, OrderItemField } from '../../api/model/order';
import { CommonResourceContext } from '../../context';
import { UnitId } from '../../api/model/application';

const OrderItemTable = ({fields, rows, selected, setSelected}: {
    fields: OrderItemField[],
    rows?: OrderItem[],
    selected?: OrderItem,
    setSelected: (orderItem?: OrderItem) => void
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

export default OrderItemTable;

const TableHead = ({fields}: { fields: OrderItemField[] }) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [quantitySign, setQuantitySign] = useState<string>();

    useEffect(() => {
        setQuantitySign(`[${commonResourceState?.getUnit(UnitId.PIECE)}]`);
    }, [commonResourceState]);

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case OrderItemField.id:
                        return (<th key={field}>{commonResourceState?.resource?.orderItemTable.id}</th>);
                    case OrderItemField.sortNum:
                        return (<th key={field}>{commonResourceState?.resource?.orderItemTable.sortNum}</th>);
                    case OrderItemField.name:
                        return (<th key={field}>{commonResourceState?.resource?.orderItemTable.name}</th>);
                    case OrderItemField.description:
                        return (<th key={field}>{commonResourceState?.resource?.orderItemTable.description}</th>);
                    case OrderItemField.quantity:
                        return (
                            <th key={field}>{`${commonResourceState?.resource?.orderItemTable.quantity} ${quantitySign}`}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: OrderItemField[],
    row: OrderItem,
    selected?: OrderItem,
    setSelected: (orderItem?: OrderItem) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case OrderItemField.id:
                        return (<td key={field}>{row.id}</td>);
                    case OrderItemField.sortNum:
                        return (<td key={field}>{row.sortNum}</td>);
                    case OrderItemField.name:
                        return (<td key={field}>{row.name}</td>);
                    case OrderItemField.description:
                        return (<td key={field}>{row.description}</td>);
                    case OrderItemField.quantity:
                        return (<td key={field}>{row.quantity}</td>);
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
