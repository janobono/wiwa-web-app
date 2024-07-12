import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Part, PartCornerType } from '../../../api/model/order/part';
import { Dimensions, Entry } from '../../../api/model';
import {
    BoardDimension,
    BoardPosition,
    CornerPosition,
    EdgePosition,
    ManufactureProperties,
    OrderProperties,
    UnitId
} from '../../../api/model/application';
import { getOrderProperties } from '../../../api/controller/ui';
import { getManufactureProperties } from '../../../api/controller/config';
import { AuthContext, CommonResourceContext, ErrorContext } from '../../../context';
import { Board } from '../../../api/model/board';
import { Edge } from '../../../api/model/edge';

export interface BoardData {
    boardPosition: BoardPosition,
    dimensions?: Dimensions,
    board?: Board
}

export interface EdgeData {
    edgePosition: EdgePosition,
    edge: Edge
}

export interface CornerData {
    cornerPosition: CornerPosition,
    type?: PartCornerType,
    radius?: number,
    dimensions?: Dimensions,
    edge?: Edge
}

export interface PartEditorState {
    part?: Part,
    setPart: (part: Part) => void,
    valid: boolean,
    setValid: (valid: boolean) => void,
    setOrderProperties: (orderProperties?: OrderProperties) => void,
    setManufactureProperties: (manufactureProperties?: ManufactureProperties) => void,
    lengthSign?: string,
    getDimensionName: (boardDimension: BoardDimension) => string,
    getBoardName: (boardPosition: BoardPosition) => string,
    getEdgeName: (edgePosition: EdgePosition) => string,
    getCornerName: (cornerPosition: CornerPosition) => string,
    partType?: string,
    setPartType: (partType?: string) => void,
    boardData: BoardData[],
    setBoard: (boardPosition: BoardPosition, board: Board) => void,
    setBoardDimensions: (boardPosition: BoardPosition, dimensions: Dimensions) => void,
    edgeData: EdgeData[],
    setEdge: (edgePosition: EdgePosition, edge: Edge) => void,
    deleteEdge: (edgePosition: EdgePosition) => void,
    cornerData: CornerData[],
    setCornerRadius: (cornerPosition: CornerPosition, radius: number) => void,
    setCornerDimensions: (cornerPosition: CornerPosition, dimensions: Dimensions) => void,
    setCornerEdge: (cornerPosition: CornerPosition, edge: Edge) => void,
    deleteCorner: (cornerPosition: CornerPosition) => void
}

export const PartEditorContext = createContext<PartEditorState | undefined>(undefined);

const PartEditorProvider = (
    {
        part,
        setPart,
        valid,
        setValid,
        children
    }: {
        part?: Part,
        setPart: (part: Part) => void,
        valid: boolean,
        setValid: (valid: boolean) => void,
        children: ReactNode
    }
) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [orderProperties, setOrderProperties] = useState<OrderProperties>();
    const [manufactureProperties, setManufactureProperties] = useState<ManufactureProperties>();
    const [lengthSign, setLengthSign] = useState<string>();

    const [partType, setPartType] = useState<string>();

    const [boardData, setBoardData] = useState<BoardData[]>([]);
    const [edgeData, setEdgeData] = useState<EdgeData[]>([]);
    const [cornerData, setCornerData] = useState<CornerData[]>([]);

    useEffect(() => {
        getOrderProperties().then(response => {
            if (response.data) {
                setOrderProperties(response.data);
            }
            errorState?.addError(response.error);
        });
        getManufactureProperties(authState?.authToken?.accessToken).then(response => {
            if (response.data) {
                setManufactureProperties(response.data);
            }
            errorState?.addError(response.error);
        });
        setLengthSign(`[${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`);
    }, []);

    useEffect(() => {
        if (part) {
            setPartType(part.type);
            // TODO
        } else {
            setPartType(undefined);
            // TODO
        }
    }, [part]);

    const getEntryValue = (key: string, entries?: Entry[]) => {
        return entries?.find(entry => entry.key === key)?.value || '';
    }

    const getDimensionName = (boardDimension: BoardDimension) => {
        return getEntryValue(boardDimension, orderProperties?.dimensions);
    }

    const getBoardName = (boardPosition: BoardPosition) => {
        return getEntryValue(boardPosition, orderProperties?.boards);
    }

    const getEdgeName = (edgePosition: EdgePosition) => {
        return getEntryValue(edgePosition, orderProperties?.edges);
    }

    const getCornerName = (cornerPosition: CornerPosition) => {
        return getEntryValue(cornerPosition, orderProperties?.corners);
    }

    const setBoard = (boardPosition: BoardPosition, board: Board) => {
        const newData = [...boardData];
        const index = newData.findIndex(item => item.boardPosition === boardPosition);
        if (index !== -1) {
            const data = {...newData[index], board};
            newData.splice(index, 1);
            newData.push(data);
        } else {
            newData.push({boardPosition, board});
        }
        setBoardData(newData);
    }

    const setBoardDimensions = (boardPosition: BoardPosition, dimensions: Dimensions) => {
        const newData = [...boardData];
        const index = newData.findIndex(item => item.boardPosition === boardPosition);
        if (index !== -1) {
            const data = {...newData[index], dimensions};
            newData.splice(index, 1);
            newData.push(data);
        } else {
            newData.push({boardPosition, dimensions});
        }
        setBoardData(newData);
    }

    const setEdge = (edgePosition: EdgePosition, edge: Edge) => {
        const newData = [...edgeData];
        const index = newData.findIndex(item => item.edgePosition === edgePosition);
        if (index !== -1) {
            newData.splice(index, 1);
        }
        newData.push({edgePosition, edge});
        setEdgeData(newData);
    }

    const deleteEdge = (edgePosition: EdgePosition) => {
        const newData = [...edgeData];
        const index = newData.findIndex(item => item.edgePosition === edgePosition);
        if (index !== -1) {
            newData.splice(index, 1);
        }
        setEdgeData(newData);
    }

    const setCornerRadius = (cornerPosition: CornerPosition, radius: number) => {
        const newData = [...cornerData];
        const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
        if (index !== -1) {
            const data = {...newData[index], type: PartCornerType.ROUNDED, radius, dimensions: undefined};
            newData.splice(index, 1);
            newData.push(data);
        } else {
            newData.push({cornerPosition, type: PartCornerType.ROUNDED, radius});
        }
        setCornerData(newData);
    }

    const setCornerDimensions = (cornerPosition: CornerPosition, dimensions: Dimensions) => {
        const newData = [...cornerData];
        const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
        if (index !== -1) {
            const data = {...newData[index], type: PartCornerType.STRAIGHT, dimensions, radius: undefined};
            newData.splice(index, 1);
            newData.push(data);
        } else {
            newData.push({cornerPosition, type: PartCornerType.STRAIGHT, dimensions});
        }
        setCornerData(newData);
    }

    const setCornerEdge = (cornerPosition: CornerPosition, edge: Edge) => {
        const newData = [...cornerData];
        const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
        if (index !== -1) {
            const data = {...newData[index], edge};
            newData.splice(index, 1);
            newData.push(data);
        } else {
            newData.push({cornerPosition, edge});
        }
        setCornerData(newData);
    }

    const deleteCorner = (cornerPosition: CornerPosition) => {
        const newData = [...cornerData];
        const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
        if (index !== -1) {
            newData.splice(index, 1);
        }
        setCornerData(newData);
    }

    return (
        <PartEditorContext.Provider
            value={
                {
                    part,
                    setPart,
                    valid,
                    setValid,
                    setOrderProperties,
                    setManufactureProperties,
                    lengthSign,
                    getDimensionName,
                    getBoardName,
                    getEdgeName,
                    getCornerName,
                    partType,
                    setPartType,
                    boardData,
                    setBoard,
                    setBoardDimensions,
                    edgeData,
                    setEdge,
                    deleteEdge,
                    cornerData,
                    setCornerRadius,
                    setCornerDimensions,
                    setCornerEdge,
                    deleteCorner
                }
            }
        >{children}
        </PartEditorContext.Provider>
    )
}

export default PartEditorProvider;
