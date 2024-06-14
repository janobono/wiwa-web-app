import WiwaFormCheckBox from '../ui/wiwa-form-check-box';
import { Board, BoardField } from '../../api/model/board';
import { useResourceState } from '../../state/resource';
import { UnitId } from '../../api/model/application';
import { getUnitIdName } from '../../model';
import { useEffect, useState } from 'react';
import { getApplicationProperties, getBoardImagePath } from '../../api/controller/ui';
import WiwaValue from '../ui/wiwa-value.tsx';
import WiwaValueNumber from '../ui/wiwa-value-number.tsx';

const BoardTable = ({fields, boards, selected, setSelected}: {
    fields: BoardField[],
    boards?: Board[],
    selected?: Board,
    setSelected: (board?: Board) => void
}) => {
    return (
        <table className="table table-zebra">
            <TableHead fields={fields}/>
            <tbody>
            {boards?.map(board =>
                <TableRow
                    key={board.id}
                    fields={fields}
                    board={board}
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

    const [pieceSign, setPieceSign] = useState<string>();
    const [weightSign, setWeightSign] = useState<string>();
    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    useEffect(() => {
        setPieceSign(unitSign(UnitId.PIECE));
        setWeightSign(unitSign(UnitId.KILOGRAM));
        setLengthSign(unitSign(UnitId.MILLIMETER));
        setPriceSign(unitSign(UnitId.PIECE));
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
                <th>{`${resourceState?.common?.boardTable.sale} ${pieceSign}`}</th>
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

const TableRow = ({fields, board, selected, setSelected}: {
    fields: BoardField[],
    board: Board,
    selected?: Board,
    setSelected: (board?: Board) => void
}) => {
    return (
        <tr
            className="hover"
            onClick={() => setSelected(board)}
        >
            {fields?.find(item => item === BoardField.id) &&
                <td>{board.id}</td>
            }
            {fields?.find(item => item === BoardField.code) &&
                <td>{board.code}</td>
            }
            {fields?.find(item => item === BoardField.name) &&
                <td>{board.name}</td>
            }
            {fields?.find(item => item === BoardField.description) &&
                <td>{board.description}</td>
            }
            {fields?.find(item => item === BoardField.boardCode) &&
                <td>{board.boardCode}</td>
            }
            {fields?.find(item => item === BoardField.structureCode) &&
                <td>{board.structureCode}</td>
            }
            {fields?.find(item => item === BoardField.orientation) &&
                <td><WiwaValue value={`${board.orientation}`}/></td>
            }
            {fields?.find(item => item === BoardField.sale) &&
                <td><WiwaValueNumber value={board.sale}/></td>
            }
            {fields?.find(item => item === BoardField.weight) &&
                <td><WiwaValueNumber value={board.weight}/></td>
            }
            {fields?.find(item => item === BoardField.length) &&
                <td><WiwaValueNumber value={board.length}/></td>
            }
            {fields?.find(item => item === BoardField.width) &&
                <td><WiwaValueNumber value={board.width}/></td>
            }
            {fields?.find(item => item === BoardField.thickness) &&
                <td><WiwaValueNumber value={board.thickness}/></td>
            }
            {fields?.find(item => item === BoardField.price) &&
                <td><WiwaValueNumber value={board.price}/></td>
            }
            {fields?.find(item => item === BoardField.vatPrice) &&
                <td><WiwaValueNumber value={board.vatPrice}/></td>
            }
            {fields?.find(item => item === BoardField.codeListItems) &&
                <td>
                    {board.categoryItems?.map(categoryItem =>
                        <WiwaValue
                            key={categoryItem.id}
                            value={`${categoryItem.code} ${categoryItem.name}`}
                        />
                    )}
                </td>
            }
            {fields?.find(item => item === BoardField.image) &&
                <td>
                    <img
                        className="flex-none w-24 h-24 object-scale-down object-center"
                        src={getBoardImagePath(board.id)}
                        alt="Logo"
                    />
                </td>
            }
            <td>
                <WiwaFormCheckBox value={board.id === selected?.id} setValue={(value) => {
                    if (value) {
                        setSelected(board);
                    }
                }}/>
            </td>
        </tr>
    )
}
