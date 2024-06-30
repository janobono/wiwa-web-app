import { useContext, useEffect, useState } from 'react';

import WiwaFormCheckBox from '../../../ui/wiwa-form-check-box';
import WiwaValueNumber from '../../../ui/wiwa-value-number';
import { getApplicationProperties } from '../../../../api/controller/ui';
import { PriceForCutting, PriceForCuttingField, UnitId } from '../../../../api/model/application';
import { ResourceContext } from '../../../../context';

const PriceForCuttingTable = ({fields, rows, selected, setSelected}: {
    fields: PriceForCuttingField[],
    rows?: PriceForCutting[],
    selected?: PriceForCutting,
    setSelected: (priceForCuttings?: PriceForCutting) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {rows?.map((row) =>
                <TableRow
                    key={row.thickness}
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

export default PriceForCuttingTable;

const TableHead = ({fields}: { fields: PriceForCuttingField[] }) => {
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
            {fields?.map(field => {
                switch (field) {
                    case PriceForCuttingField.thickness:
                        return (
                            <th key={field}>{`${resourceState?.manager?.priceForCuttingTable.thickness} ${lengthSign}`}</th>
                        );
                    case PriceForCuttingField.price:
                        return (
                            <th key={field}>{`${resourceState?.manager?.priceForCuttingTable.price} ${priceSign}`}</th>
                        );
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: PriceForCuttingField[],
    row: PriceForCutting,
    selected?: PriceForCutting,
    setSelected: (priceForCutting?: PriceForCutting) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case PriceForCuttingField.thickness:
                        return (<td key={field}><WiwaValueNumber value={row.thickness}/></td>);
                    case PriceForCuttingField.price:
                        return (<td key={field}><WiwaValueNumber value={row.price}/></td>);
                }
            })}
            <td>
                <WiwaFormCheckBox
                    value={row.thickness === selected?.thickness}
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
