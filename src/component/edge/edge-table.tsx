import { useEffect, useState } from 'react';

import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValue from '../ui/wiwa-value';
import WiwaValueNumber from '../ui/wiwa-value-number';
import { getApplicationProperties, getEdgeImagePath } from '../../api/controller/ui';
import { UnitId } from '../../api/model/application';
import { Edge, EdgeField } from '../../api/model/edge';
import { getUnitIdName } from '../../model';
import { useResourceState } from '../../state/resource';

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
    const resourceState = useResourceState();

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
        return `[${getUnitIdName(unitId, resourceState?.common)}]`;
    }

    return (
        <thead>
        <tr>
            {fields?.find(item => item === EdgeField.id) &&
                <th>{resourceState?.common?.edgeTable.id}</th>
            }
            {fields?.find(item => item === EdgeField.code) &&
                <th>{resourceState?.common?.edgeTable.code}</th>
            }
            {fields?.find(item => item === EdgeField.name) &&
                <th>{resourceState?.common?.edgeTable.name}</th>
            }
            {fields?.find(item => item === EdgeField.description) &&
                <th>{resourceState?.common?.edgeTable.description}</th>
            }
            {fields?.find(item => item === EdgeField.sale) &&
                <th>{`${resourceState?.common?.edgeTable.sale} ${saleSign}`}</th>
            }
            {fields?.find(item => item === EdgeField.weight) &&
                <th>{`${resourceState?.common?.edgeTable.weight} ${weightSign}`}</th>
            }
            {fields?.find(item => item === EdgeField.width) &&
                <th>{`${resourceState?.common?.edgeTable.width} ${lengthSign}`}</th>
            }
            {fields?.find(item => item === EdgeField.thickness) &&
                <th>{`${resourceState?.common?.edgeTable.thickness} ${lengthSign}`}</th>
            }
            {fields?.find(item => item === EdgeField.price) &&
                <th>{`${resourceState?.common?.edgeTable.price} ${priceSign}`}</th>
            }
            {fields?.find(item => item === EdgeField.vatPrice) &&
                <th>{`${resourceState?.common?.edgeTable.vatPrice} ${priceSign}`}</th>
            }
            {fields?.find(item => item === EdgeField.codeListItems) &&
                <th>{resourceState?.common?.edgeTable.codeListItems}</th>
            }
            {fields?.find(item => item === EdgeField.image) &&
                <th>{resourceState?.common?.edgeTable.image}</th>
            }
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
            {fields?.find(item => item === EdgeField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === EdgeField.code) &&
                <td>{row.code}</td>
            }
            {fields?.find(item => item === EdgeField.name) &&
                <td>{row.name}</td>
            }
            {fields?.find(item => item === EdgeField.description) &&
                <td>{row.description}</td>
            }
            {fields?.find(item => item === EdgeField.sale) &&
                <td><WiwaValueNumber value={row.sale}/></td>
            }
            {fields?.find(item => item === EdgeField.weight) &&
                <td><WiwaValueNumber value={row.weight}/></td>
            }
            {fields?.find(item => item === EdgeField.width) &&
                <td><WiwaValueNumber value={row.width}/></td>
            }
            {fields?.find(item => item === EdgeField.thickness) &&
                <td><WiwaValueNumber value={row.thickness}/></td>
            }
            {fields?.find(item => item === EdgeField.price) &&
                <td><WiwaValueNumber value={row.price}/></td>
            }
            {fields?.find(item => item === EdgeField.vatPrice) &&
                <td><WiwaValueNumber value={row.vatPrice}/></td>
            }
            {fields?.find(item => item === EdgeField.codeListItems) &&
                <td>
                    {row.categoryItems?.map(categoryItem =>
                        <WiwaValue
                            key={categoryItem.id}
                            value={`${categoryItem.code}:${categoryItem.name}`}
                        />
                    )}
                </td>
            }
            {fields?.find(item => item === EdgeField.image) &&
                <td>
                    <img
                        className="flex-none w-24 h-24 object-scale-down object-center"
                        src={getEdgeImagePath(row.id)}
                        alt="Logo"
                    />
                </td>
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
