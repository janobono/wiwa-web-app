import { useEffect, useState } from 'react';

import OrderPackageTypeValue from './order-package-type-value';
import OrderStatusValue from './order-status-value';
import OrderUserValue from './order-user-value';
import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValueNumber from '../ui/wiwa-value-number';
import WiwaValueDate from '../ui/wiwa-value-date';
import { getApplicationProperties } from '../../api/controller/ui';
import { UnitId } from '../../api/model/application';
import { Order, OrderField } from '../../api/model/order';
import { useResourceState } from '../../state/resource';

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
    const resourceState = useResourceState();

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
            {fields?.find(item => item === OrderField.id) &&
                <th>{resourceState?.common?.orderTable.id}</th>
            }
            {fields?.find(item => item === OrderField.orderNumber) &&
                <th>{resourceState?.common?.orderTable.orderNumber}</th>
            }
            {fields?.find(item => item === OrderField.creator) &&
                <th>{resourceState?.common?.orderTable.creator}</th>
            }
            {fields?.find(item => item === OrderField.created) &&
                <th>{resourceState?.common?.orderTable.created}</th>
            }
            {fields?.find(item => item === OrderField.status) &&
                <th>{resourceState?.common?.orderTable.status}</th>
            }
            {fields?.find(item => item === OrderField.weight) &&
                <th>{`${resourceState?.common?.orderTable.weight} ${weightSign}`}</th>
            }
            {fields?.find(item => item === OrderField.total) &&
                <th>{`${resourceState?.common?.orderTable.total} ${priceSign}`}</th>
            }
            {fields?.find(item => item === OrderField.vatTotal) &&
                <th>{`${resourceState?.common?.orderTable.vatTotal} ${priceSign}`}</th>
            }
            {fields?.find(item => item === OrderField.deliveryDate) &&
                <th>{resourceState?.common?.orderTable.deliveryDate}</th>
            }
            {fields?.find(item => item === OrderField.packageType) &&
                <th>{resourceState?.common?.orderTable.packageType}</th>
            }
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
            {fields?.find(item => item === OrderField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === OrderField.orderNumber) &&
                <td><WiwaValueNumber value={row.orderNumber}/></td>
            }
            {fields?.find(item => item === OrderField.creator) &&
                <td><OrderUserValue value={row.creator}/></td>
            }
            {fields?.find(item => item === OrderField.created) &&
                <td><WiwaValueDate value={row.created}/></td>
            }
            {fields?.find(item => item === OrderField.status) &&
                <td><OrderStatusValue value={row.status}/></td>
            }
            {fields?.find(item => item === OrderField.weight) &&
                <td><WiwaValueNumber value={row.weight}/></td>
            }
            {fields?.find(item => item === OrderField.total) &&
                <td><WiwaValueNumber value={row.total}/></td>
            }
            {fields?.find(item => item === OrderField.vatTotal) &&
                <td><WiwaValueNumber value={row.vatTotal}/></td>
            }
            {fields?.find(item => item === OrderField.deliveryDate) &&
                <td><WiwaValueDate value={row.deliveryDate}/></td>
            }
            {fields?.find(item => item === OrderField.packageType) &&
                <td><OrderPackageTypeValue value={row.packageType}/></td>
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
