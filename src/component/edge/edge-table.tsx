import { useContext, useEffect, useState } from 'react';

import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValue from '../ui/wiwa-value';
import WiwaValueNumber from '../ui/wiwa-value-number';
import { getApplicationProperties, getEdgeImagePath } from '../../api/controller/ui';
import { UnitId } from '../../api/model/application';
import { Edge, EdgeField } from '../../api/model/edge';
import { ResourceContext } from '../../context';

const EdgeTable = ({fields, rows, selected, setSelected}: {
    fields: EdgeField[],
    rows?: Edge[],
    selected?: Edge,
    setSelected: (edge?: Edge) => void
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

export default EdgeTable;

const TableHead = ({fields}: { fields: EdgeField[] }) => {
    const resourceState = useContext(ResourceContext);

    const [saleSign, setSaleSign] = useState<string>();
    const [weightSign, setWeightSign] = useState<string>();
    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    useEffect(() => {
        setSaleSign(unitSign(UnitId.METER));
        setWeightSign(unitSign(UnitId.KILOGRAM));
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
                    case EdgeField.id:
                        return (<th key={field}>{resourceState?.common?.edgeTable.id}</th>);
                    case EdgeField.code:
                        return (<th key={field}>{resourceState?.common?.edgeTable.code}</th>);
                    case EdgeField.name:
                        return (<th key={field}>{resourceState?.common?.edgeTable.name}</th>);
                    case EdgeField.description:
                        return (<th key={field}>{resourceState?.common?.edgeTable.description}</th>);
                    case EdgeField.sale:
                        return (<th key={field}>{`${resourceState?.common?.edgeTable.sale} ${saleSign}`}</th>);
                    case EdgeField.weight:
                        return (<th key={field}>{`${resourceState?.common?.edgeTable.weight} ${weightSign}`}</th>);
                    case EdgeField.width:
                        return (<th key={field}>{`${resourceState?.common?.edgeTable.width} ${lengthSign}`}</th>);
                    case EdgeField.thickness:
                        return (<th key={field}>{`${resourceState?.common?.edgeTable.thickness} ${lengthSign}`}</th>);
                    case EdgeField.price:
                        return (<th key={field}>{`${resourceState?.common?.edgeTable.price} ${priceSign}`}</th>);
                    case EdgeField.vatPrice:
                        return (<th key={field}>{`${resourceState?.common?.edgeTable.vatPrice} ${priceSign}`}</th>);
                    case EdgeField.codeListItems:
                        return (<th key={field}>{resourceState?.common?.edgeTable.codeListItems}</th>);
                    case EdgeField.image:
                        return (<th key={field}>{resourceState?.common?.edgeTable.image}</th>);
                }
            })}
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: EdgeField[],
    row: Edge,
    selected?: Edge,
    setSelected: (edge?: Edge) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.map(field => {
                switch (field) {
                    case EdgeField.id:
                        return (<td key={field}>{row.id}</td>);
                    case EdgeField.code:
                        return (<td key={field}>{row.code}</td>);
                    case EdgeField.name:
                        return (<td key={field}>{row.name}</td>);
                    case EdgeField.description:
                        return (<td key={field}>{row.description}</td>);
                    case EdgeField.sale:
                        return (<td key={field}><WiwaValueNumber value={row.sale}/></td>);
                    case EdgeField.weight:
                        return (<td key={field}><WiwaValueNumber value={row.weight}/></td>);
                    case EdgeField.width:
                        return (<td key={field}><WiwaValueNumber value={row.width}/></td>);
                    case EdgeField.thickness:
                        return (<td key={field}><WiwaValueNumber value={row.thickness}/></td>);
                    case EdgeField.price:
                        return (<td key={field}><WiwaValueNumber value={row.price}/></td>);
                    case EdgeField.vatPrice:
                        return (<td key={field}><WiwaValueNumber value={row.vatPrice}/></td>);
                    case EdgeField.codeListItems:
                        return (
                            <td key={field}>
                                {row.categoryItems?.map(categoryItem =>
                                    <WiwaValue
                                        key={categoryItem.id}
                                        value={`${categoryItem.code}:${categoryItem.name}`}
                                    />
                                )}
                            </td>
                        );
                    case EdgeField.image:
                        return (
                            <td key={field}>
                                <img
                                    className="flex-none w-24 h-24 object-scale-down object-center"
                                    src={getEdgeImagePath(row.id)}
                                    alt="Logo"
                                />
                            </td>
                        );
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
