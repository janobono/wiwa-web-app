import { useEffect, useState } from 'react';

import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValue from '../ui/wiwa-value';
import WiwaValueNumber from '../ui/wiwa-value-number';
import { getApplicationProperties, getBoardImagePath } from '../../api/controller/ui';
import { UnitId } from '../../api/model/application';
import { Board, BoardField } from '../../api/model/board';
import { getUnitIdName } from '../../model';
import { useResourceState } from '../../state/resource';

const BoardTable = ({fields, rows, selected, setSelected}: {
    fields: BoardField[],
    rows?: Board[],
    selected?: Board,
    setSelected: (board?: Board) => void
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

export default BoardTable;

const TableHead = ({fields}: { fields: BoardField[] }) => {
    const resourceState = useResourceState();

    const [saleSign, setSaleSign] = useState<string>();
    const [weightSign, setWeightSign] = useState<string>();
    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    useEffect(() => {
        setSaleSign(unitSign(UnitId.PIECE));
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
            {fields?.find(item => item === BoardField.id) &&
                <th>{resourceState?.common?.boardTable.id}</th>
            }
            {fields?.find(item => item === BoardField.code) &&
                <th>{resourceState?.common?.boardTable.code}</th>
            }
            {fields?.find(item => item === BoardField.name) &&
                <th>{resourceState?.common?.boardTable.name}</th>
            }
            {fields?.find(item => item === BoardField.description) &&
                <th>{resourceState?.common?.boardTable.description}</th>
            }
            {fields?.find(item => item === BoardField.boardCode) &&
                <th>{resourceState?.common?.boardTable.boardCode}</th>
            }
            {fields?.find(item => item === BoardField.structureCode) &&
                <th>{resourceState?.common?.boardTable.structureCode}</th>
            }
            {fields?.find(item => item === BoardField.orientation) &&
                <th>{resourceState?.common?.boardTable.orientation}</th>
            }
            {fields?.find(item => item === BoardField.sale) &&
                <th>{`${resourceState?.common?.boardTable.sale} ${saleSign}`}</th>
            }
            {fields?.find(item => item === BoardField.weight) &&
                <th>{`${resourceState?.common?.boardTable.weight} ${weightSign}`}</th>
            }
            {fields?.find(item => item === BoardField.length) &&
                <th>{`${resourceState?.common?.boardTable.length} ${lengthSign}`}</th>
            }
            {fields?.find(item => item === BoardField.width) &&
                <th>{`${resourceState?.common?.boardTable.width} ${lengthSign}`}</th>
            }
            {fields?.find(item => item === BoardField.thickness) &&
                <th>{`${resourceState?.common?.boardTable.thickness} ${lengthSign}`}</th>
            }
            {fields?.find(item => item === BoardField.price) &&
                <th>{`${resourceState?.common?.boardTable.price} ${priceSign}`}</th>
            }
            {fields?.find(item => item === BoardField.vatPrice) &&
                <th>{`${resourceState?.common?.boardTable.vatPrice} ${priceSign}`}</th>
            }
            {fields?.find(item => item === BoardField.codeListItems) &&
                <th>{resourceState?.common?.boardTable.codeListItems}</th>
            }
            {fields?.find(item => item === BoardField.image) &&
                <th>{resourceState?.common?.boardTable.image}</th>
            }
            <th></th>
        </tr>
        </thead>
    )
}

const TableRow = ({fields, row, selected, setSelected}: {
    fields: BoardField[],
    row: Board,
    selected?: Board,
    setSelected: (board?: Board) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(row)}
        >
            {fields?.find(item => item === BoardField.id) &&
                <td>{row.id}</td>
            }
            {fields?.find(item => item === BoardField.code) &&
                <td>{row.code}</td>
            }
            {fields?.find(item => item === BoardField.name) &&
                <td>{row.name}</td>
            }
            {fields?.find(item => item === BoardField.description) &&
                <td>{row.description}</td>
            }
            {fields?.find(item => item === BoardField.boardCode) &&
                <td>{row.boardCode}</td>
            }
            {fields?.find(item => item === BoardField.structureCode) &&
                <td>{row.structureCode}</td>
            }
            {fields?.find(item => item === BoardField.orientation) &&
                <td><WiwaValue value={`${row.orientation}`}/></td>
            }
            {fields?.find(item => item === BoardField.sale) &&
                <td><WiwaValueNumber value={row.sale}/></td>
            }
            {fields?.find(item => item === BoardField.weight) &&
                <td><WiwaValueNumber value={row.weight}/></td>
            }
            {fields?.find(item => item === BoardField.length) &&
                <td><WiwaValueNumber value={row.length}/></td>
            }
            {fields?.find(item => item === BoardField.width) &&
                <td><WiwaValueNumber value={row.width}/></td>
            }
            {fields?.find(item => item === BoardField.thickness) &&
                <td><WiwaValueNumber value={row.thickness}/></td>
            }
            {fields?.find(item => item === BoardField.price) &&
                <td><WiwaValueNumber value={row.price}/></td>
            }
            {fields?.find(item => item === BoardField.vatPrice) &&
                <td><WiwaValueNumber value={row.vatPrice}/></td>
            }
            {fields?.find(item => item === BoardField.codeListItems) &&
                <td>
                    {row.categoryItems?.map(categoryItem =>
                        <WiwaValue
                            key={categoryItem.id}
                            value={`${categoryItem.code}:${categoryItem.name}`}
                        />
                    )}
                </td>
            }
            {fields?.find(item => item === BoardField.image) &&
                <td>
                    <img
                        className="flex-none w-24 h-24 object-scale-down object-center"
                        src={getBoardImagePath(row.id)}
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
