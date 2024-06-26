import { useContext, useEffect, useState } from 'react';

import WiwaFormCheckBox from '../../ui/wiwa-form-check-box';
import WiwaValueNumber from '../../ui/wiwa-value-number';
import { getApplicationProperties } from '../../../api/controller/ui';
import { PriceForGluingEdge, PriceForGluingEdgeField, UnitId } from '../../../api/model/application';
import { ResourceContext } from '../../../context';

const PriceForGluingEdgeTable = ({fields, rows, selected, setSelected}: {
    fields: PriceForGluingEdgeField[],
    rows?: PriceForGluingEdge[],
    selected?: PriceForGluingEdge,
    setSelected: (priceForGluingEdges?: PriceForGluingEdge) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {rows?.map((row, index) =>
                <TableRow
                    key={index}
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

export default PriceForGluingEdgeTable;

const TableHead = ({fields}: { fields: PriceForGluingEdgeField[] }) => {
    const resourceState = useContext(ResourceContext);

    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    useEffect(() => {
        setLengthSign(unitSign(UnitId.MILLIMETER));
        getApplicationProperties().then(data => setPriceSign(`[${data?.data?.currency?.symbol}]`));
    }, [resourceState]);

    const unitSign = (unitId: UnitId) => {
        return `[${resourceState?.getUnit(unitId)}]`;
    }

    return (
        <thead>
        <tr>
            {fields?.find(item => item === PriceForGluingEdgeField.width) &&
                <th>{`${resourceState?.manager?.priceForGluingEdgeTable.width} ${lengthSign}`}</th>
            }
            {fields?.find(item => item === PriceForGluingEdgeField.price) &&
                <th>{`${resourceState?.manager?.priceForGluingEdgeTable.price} ${priceSign}`}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: PriceForGluingEdgeField[],
    row: PriceForGluingEdge,
    selected?: PriceForGluingEdge,
    setSelected: (priceForGluingEdge?: PriceForGluingEdge) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.find(item => item === PriceForGluingEdgeField.width) &&
                <td><WiwaValueNumber value={row.width}/></td>
            }
            {fields?.find(item => item === PriceForGluingEdgeField.price) &&
                <td><WiwaValueNumber value={row.price}/></td>
            }
            <td>
                <WiwaFormCheckBox
                    value={row.width === selected?.width}
                    setValue={(value) => {
                        if (value) {
                            setSelected(row);
                        }
                    }}
                />
            </td>
        </tr>
    )
}
