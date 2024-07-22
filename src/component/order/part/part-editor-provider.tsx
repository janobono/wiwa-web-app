import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { FrameType, Part, PartCornerType, PartType } from '../../../api/model/order/part';
import { Dimensions, Entry } from '../../../api/model';
import {
    BoardDimension,
    BoardPosition,
    CornerPosition,
    EdgePosition,
    ManufactureProperties,
    OrderProperties
} from '../../../api/model/application';
import { getOrderProperties } from '../../../api/controller/ui';
import { getManufactureProperties } from '../../../api/controller/config';
import { AuthContext, ErrorContext } from '../../../context';
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
    partType: PartType,
    setPartType: (partType: PartType) => void,
    part?: Part,
    setPart: (part: Part) => void,
    valid: boolean,
    setValid: (valid: boolean) => void,
    setOrderProperties: (orderProperties?: OrderProperties) => void,
    setManufactureProperties: (manufactureProperties?: ManufactureProperties) => void,
    getDimensionName: (boardDimension: BoardDimension) => string,
    getBoardName: (boardPosition: BoardPosition) => string,
    getEdgeName: (edgePosition: EdgePosition) => string,
    getCornerName: (cornerPosition: CornerPosition) => string,
    rotate: boolean,
    setRotate: (rotate: boolean) => void,
    frameType: FrameType,
    setFrameType: (frameType: FrameType) => void,
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
    deleteCorner: (cornerPosition: CornerPosition) => void,
    errorMessages: string[]
}

export const PartEditorContext = createContext<PartEditorState | undefined>(undefined);

const PartEditorProvider = (
    {
        partType,
        setPartType,
        part,
        setPart,
        valid,
        setValid,
        children
    }: {
        partType: PartType,
        setPartType: (partType: PartType) => void,
        part?: Part,
        setPart: (part: Part) => void,
        valid: boolean,
        setValid: (valid: boolean) => void,
        children: ReactNode
    }
) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const [orderProperties, setOrderProperties] = useState<OrderProperties>();
    const [manufactureProperties, setManufactureProperties] = useState<ManufactureProperties>();

    const [rotate, setRotate] = useState(false);
    const [frameType, setFrameType] = useState(FrameType.HORIZONTAL);

    const [boardData, setBoardData] = useState<BoardData[]>([]);
    const [edgeData, setEdgeData] = useState<EdgeData[]>([]);
    const [cornerData, setCornerData] = useState<CornerData[]>([]);

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

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
    }, []);

    useEffect(() => {
        if (part?.type) {
            setPartType(part.type);
        }
    }, [part]);

    useEffect(() => {
        setRotate(false);
        setBoardData([]);
        setEdgeData([]);
        setCornerData([]);
        setErrorMessages([]);

        switch (partType) {
            case PartType.BASIC:
                // TODO
                break;
            case PartType.DUPLICATED_BASIC:
                // TODO
                break;
            case PartType.DUPLICATED_FRAME:
                // TODO
                break;
            case PartType.FRAME:
                // TODO
                break;
        }
    }, [partType]);

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
        setBoardData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.boardPosition === boardPosition);
            if (index !== -1) {
                const data = {...newData[index], board};
                newData.splice(index, 1);
                newData.push(data);
            } else {
                newData.push({boardPosition, board});
            }
            return newData.sort((d1, d2) => d1.boardPosition > d2.boardPosition ? 1 : -1);
        });
    }

    const setBoardDimensions = (boardPosition: BoardPosition, dimensions: Dimensions) => {
        setBoardData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.boardPosition === boardPosition);
            if (index !== -1) {
                const data = {...newData[index], dimensions};
                newData.splice(index, 1);
                newData.push(data);
            } else {
                newData.push({boardPosition, dimensions});
            }
            return newData.sort((d1, d2) => d1.boardPosition > d2.boardPosition ? 1 : -1);
        });
    }

    const setEdge = (edgePosition: EdgePosition, edge: Edge) => {
        setEdgeData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.edgePosition === edgePosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            newData.push({edgePosition, edge});
            return newData.sort((d1, d2) => d1.edgePosition > d2.edgePosition ? 1 : -1);
        });
    }

    const deleteEdge = (edgePosition: EdgePosition) => {
        setEdgeData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.edgePosition === edgePosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            return newData;
        });
    }

    const setCornerRadius = (cornerPosition: CornerPosition, radius: number) => {
        setCornerData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                const data = {...newData[index], type: PartCornerType.ROUNDED, radius, dimensions: undefined};
                newData.splice(index, 1);
                newData.push(data);
            } else {
                newData.push({cornerPosition, type: PartCornerType.ROUNDED, radius});
            }
            return newData.sort((d1, d2) => d1.cornerPosition > d2.cornerPosition ? 1 : -1);
        });
    }

    const setCornerDimensions = (cornerPosition: CornerPosition, dimensions: Dimensions) => {
        setCornerData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                const data = {...newData[index], type: PartCornerType.STRAIGHT, dimensions, radius: undefined};
                newData.splice(index, 1);
                newData.push(data);
            } else {
                newData.push({cornerPosition, type: PartCornerType.STRAIGHT, dimensions});
            }
            return newData.sort((d1, d2) => d1.cornerPosition > d2.cornerPosition ? 1 : -1);
        });
    }

    const setCornerEdge = (cornerPosition: CornerPosition, edge: Edge) => {
        setCornerData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                const data = {...newData[index], edge};
                newData.splice(index, 1);
                newData.push(data);
            } else {
                newData.push({cornerPosition, edge});
            }
            return newData.sort((d1, d2) => d1.cornerPosition > d2.cornerPosition ? 1 : -1);
        });
    }

    const deleteCorner = (cornerPosition: CornerPosition) => {
        setCornerData(previousData => {
            const newData = [...previousData];
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            return newData;
        });
    }

    return (
        <PartEditorContext.Provider
            value={
                {
                    partType,
                    setPartType,
                    part,
                    setPart,
                    valid,
                    setValid,
                    setOrderProperties,
                    setManufactureProperties,
                    getDimensionName,
                    getBoardName,
                    getEdgeName,
                    getCornerName,
                    rotate,
                    setRotate,
                    frameType,
                    setFrameType,
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
                    deleteCorner,
                    errorMessages
                }
            }
        >{children}
        </PartEditorContext.Provider>
    )
}

export default PartEditorProvider;
