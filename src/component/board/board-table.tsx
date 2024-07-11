import { useContext, useEffect, useState } from 'react';

import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import WiwaValue from '../ui/wiwa-value';
import WiwaValueNumber from '../ui/wiwa-value-number';
import { getApplicationProperties, getBoardImagePath } from '../../api/controller/ui';
import { UnitId } from '../../api/model/application';
import { Board, BoardField } from '../../api/model/board';
import { CommonResourceContext } from '../../context';

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
    const commonResourceState = useContext(CommonResourceContext);

    const [saleSign, setSaleSign] = useState<string>();
    const [weightSign, setWeightSign] = useState<string>();
    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    useEffect(() => {
        setSaleSign(unitSign(UnitId.PIECE));
        setWeightSign(unitSign(UnitId.KILOGRAM));
        setLengthSign(unitSign(UnitId.MILLIMETER));
        getApplicationProperties().then(data => setPriceSign(`[${data?.data?.currency?.symbol}]`));
    }, [commonResourceState]);

    const unitSign = (unitId: UnitId) => {
        return `[${commonResourceState?.getUnit(unitId)}]`;
    }

    return (
        <thead>
        <tr>
            {fields?.map(field => {
                switch (field) {
                    case BoardField.id:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.id}</th>);
                    case BoardField.code:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.code}</th>);
                    case BoardField.name:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.name}</th>);
                    case BoardField.description:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.description}</th>);
                    case BoardField.boardCode:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.boardCode}</th>);
                    case BoardField.structureCode:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.structureCode}</th>);
                    case BoardField.orientation:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.orientation}</th>);
                    case BoardField.sale:
                        return (<th key={field}>{`${commonResourceState?.resource?.boardTable.sale} ${saleSign}`}</th>);
                    case BoardField.weight:
                        return (
                            <th key={field}>{`${commonResourceState?.resource?.boardTable.weight} ${weightSign}`}</th>);
                    case BoardField.length:
                        return (
                            <th key={field}>{`${commonResourceState?.resource?.boardTable.length} ${lengthSign}`}</th>);
                    case BoardField.width:
                        return (
                            <th key={field}>{`${commonResourceState?.resource?.boardTable.width} ${lengthSign}`}</th>);
                    case BoardField.thickness:
                        return (
                            <th key={field}>{`${commonResourceState?.resource?.boardTable.thickness} ${lengthSign}`}</th>);
                    case BoardField.price:
                        return (
                            <th key={field}>{`${commonResourceState?.resource?.boardTable.price} ${priceSign}`}</th>);
                    case BoardField.vatPrice:
                        return (
                            <th key={field}>{`${commonResourceState?.resource?.boardTable.vatPrice} ${priceSign}`}</th>);
                    case BoardField.codeListItems:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.codeListItems}</th>);
                    case BoardField.image:
                        return (<th key={field}>{commonResourceState?.resource?.boardTable.image}</th>);
                }
            })}
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
            {fields?.map(field => {
                switch (field) {
                    case BoardField.id:
                        return (<td key={field}>{row.id}</td>);
                    case BoardField.code:
                        return (<td key={field}>{row.code}</td>);
                    case BoardField.name:
                        return (<td key={field}>{row.name}</td>);
                    case BoardField.description:
                        return (<td key={field}>{row.description}</td>);
                    case BoardField.boardCode:
                        return (<td key={field}>{row.boardCode}</td>);
                    case BoardField.structureCode:
                        return (<td key={field}>{row.structureCode}</td>);
                    case BoardField.orientation:
                        return (<td key={field}><WiwaValue value={`${row.orientation}`}/></td>);
                    case BoardField.sale:
                        return (<td key={field}><WiwaValueNumber value={row.sale}/></td>);
                    case BoardField.weight:
                        return (<td key={field}><WiwaValueNumber value={row.weight}/></td>);
                    case BoardField.length:
                        return (<td key={field}><WiwaValueNumber value={row.length}/></td>);
                    case BoardField.width:
                        return (<td key={field}><WiwaValueNumber value={row.width}/></td>);
                    case BoardField.thickness:
                        return (<td key={field}><WiwaValueNumber value={row.thickness}/></td>);
                    case BoardField.price:
                        return (<td key={field}><WiwaValueNumber value={row.price}/></td>);
                    case BoardField.vatPrice:
                        return (<td key={field}><WiwaValueNumber value={row.vatPrice}/></td>);
                    case BoardField.codeListItems:
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
                    case BoardField.image:
                        return (
                            <td key={field}>
                                <img
                                    className="flex-none w-24 h-24 object-scale-down object-center"
                                    src={getBoardImagePath(row.id)}
                                    alt="Board image"
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
