import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Part, PartCorner } from '../../../api/model/order/part';
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

export interface BoardDimensionsData {
    boardPosition: BoardPosition,
    dimensions: Dimensions
}

export interface BoardMaterialData {
    boardPosition: BoardPosition,
    board: Board
}

export interface EdgeMaterialData {
    edgePosition: EdgePosition,
    edge: Edge
}

export interface PartCornerData {
    cornerPosition: CornerPosition,
    partCorner: PartCorner
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
    boardDimensionsData: BoardDimensionsData[],
    setBoardDimensions: (boardPosition: BoardPosition, dimensions?: Dimensions) => void,
    boardMaterialData: BoardMaterialData[],
    setBoardMaterial: (boardPosition: BoardPosition, board?: Board) => void,
    edgeMaterialData: EdgeMaterialData[],
    setEdgeMaterial: (edgePosition: EdgePosition, edge?: Edge) => void,
    cornerData: PartCornerData[],
    setPartCorner: (cornerPosition: CornerPosition, partCorner?: PartCorner) => void
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

    const [boardDimensionsData, setBoardDimensionsData] = useState<BoardDimensionsData[]>([]);
    const [boardMaterialData, setBoardMaterialData] = useState<BoardMaterialData[]>([]);
    const [edgeMaterialData, setEdgeMaterialData] = useState<EdgeMaterialData[]>([]);
    const [cornerData, setCornerData] = useState<PartCornerData[]>([]);

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

    const setBoardDimensions = (boardPosition: BoardPosition, dimensions?: Dimensions) => {
        const newData = [...boardDimensionsData];
        const index = newData.findIndex(item => item.boardPosition === boardPosition);
        if (index !== -1) {
            newData.splice(index, 1);
        }
        if (dimensions) {
            newData.push({boardPosition, dimensions});
        }
        setBoardDimensionsData(newData);
    }

    const setBoardMaterial = (boardPosition: BoardPosition, board?: Board) => {
        const newData = [...boardMaterialData];
        const index = newData.findIndex(item => item.boardPosition === boardPosition);
        if (index !== -1) {
            newData.splice(index, 1);
        }
        if (board) {
            newData.push({boardPosition, board});
        }
        setBoardMaterialData(newData);
    }

    const setEdgeMaterial = (edgePosition: EdgePosition, edge?: Edge) => {
        const newData = [...edgeMaterialData];
        const index = newData.findIndex(item => item.edgePosition === edgePosition);
        if (index !== -1) {
            newData.splice(index, 1);
        }
        if (edge) {
            newData.push({edgePosition, edge});
        }
        setEdgeMaterialData(newData);
    }

    const setPartCorner = (cornerPosition: CornerPosition, partCorner?: PartCorner) => {
        const newData = [...cornerData];
        const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
        if (index !== -1) {
            newData.splice(index, 1);
        }
        if (partCorner) {
            newData.push({cornerPosition, partCorner});
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
                    boardDimensionsData,
                    setBoardDimensions,
                    boardMaterialData,
                    setBoardMaterial,
                    edgeMaterialData,
                    setEdgeMaterial,
                    cornerData,
                    setPartCorner
                }
            }
        >{children}
        </PartEditorContext.Provider>
    )
}

export default PartEditorProvider;
