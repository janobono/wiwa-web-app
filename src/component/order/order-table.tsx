import { useContext, useEffect, useState } from 'react';

import OrderPackageTypeValue from './order-package-type-value';
import OrderStatusValue from './order-status-value';
import OrderUserValue from './order-user-value';
import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValueNumber from '../ui/wiwa-value-number';
import WiwaValueDate from '../ui/wiwa-value-date';
import WiwaValueDatetime from '../ui/wiwa-value-datetime';
import { getApplicationProperties } from '../../api/controller/ui';
import { UnitId } from '../../api/model/application';
import { Order, OrderField } from '../../api/model/order';
import { ResourceContext } from '../../context';

const OrderTable = ({fields, rows, selected, setSelected}: {
    fields: OrderField[],
    rows?: Order[],
    selected?: Order,
    setSelected: (order?: Order) => void
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

export default OrderTable;

const TableHead = ({fields}: { fields: OrderField[] }) => {
    const resourceState = useContext(ResourceContext);

    const [weightSign, setWeightSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    useEffect(() => {
        setWeightSign(unitSign(UnitId.KILOGRAM));
        getApplicationProperties().then(data => setPriceSign(`[${data?.data?.currency?.symbol}]`));
    }, [resourceState]);

    const unitSign = (unitId: UnitId) => {
        return `[${resourceState?.getUnit(unitId)}]`;
    }

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case OrderField.id:
                        return (<th key={field}>{resourceState?.common?.orderTable.id}</th>);
                    case OrderField.creator:
                        return (<th key={field}>{resourceState?.common?.orderTable.creator}</th>);
                    case OrderField.created:
                        return (<th key={field}>{resourceState?.common?.orderTable.created}</th>);
                    case OrderField.status:
                        return (<th key={field}>{resourceState?.common?.orderTable.status}</th>);
                    case OrderField.orderNumber:
                        return (<th key={field}>{resourceState?.common?.orderTable.orderNumber}</th>);
                    case OrderField.weight:
                        return (<th key={field}>{`${resourceState?.common?.orderTable.weight} ${weightSign}`}</th>);
                    case OrderField.total:
                        return (<th key={field}>{`${resourceState?.common?.orderTable.total} ${priceSign}`}</th>);
                    case OrderField.vatTotal:
                        return (<th key={field}>{`${resourceState?.common?.orderTable.vatTotal} ${priceSign}`}</th>);
                    case OrderField.deliveryDate:
                        return (<th key={field}>{resourceState?.common?.orderTable.deliveryDate}</th>);
                    case OrderField.packageType:
                        return (<th key={field}>{resourceState?.common?.orderTable.packageType}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: OrderField[],
    row: Order,
    selected?: Order,
    setSelected: (order?: Order) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case OrderField.id:
                        return (<td key={field}>{row.id}</td>);
                    case OrderField.creator:
                        return (<td key={field}><OrderUserValue value={row.creator}/></td>);
                    case OrderField.created:
                        return (<td key={field}><WiwaValueDatetime value={row.created}/></td>);
                    case OrderField.status:
                        return (<td key={field}><OrderStatusValue value={row.status}/></td>);
                    case OrderField.orderNumber:
                        return (<td key={field}><WiwaValueNumber value={row.orderNumber}/></td>);
                    case OrderField.weight:
                        return (<td key={field}><WiwaValueNumber value={row.weight}/></td>);
                    case OrderField.total:
                        return (<td key={field}><WiwaValueNumber value={row.total}/></td>);
                    case OrderField.vatTotal:
                        return (<td key={field}><WiwaValueNumber value={row.vatTotal}/></td>);
                    case OrderField.deliveryDate:
                        return (<td key={field}><WiwaValueDate value={row.deliveryDate}/></td>);
                    case OrderField.packageType:
                        return (<td key={field}><OrderPackageTypeValue value={row.packageType}/></td>);
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
