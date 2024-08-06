import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import {
    BoardData,
    CornerData,
    EdgeData,
    loadBoards,
    loadEdges,
    sortBoardData,
    sortCornerData,
    sortEdgeData
} from '..';
import { PartEditorContext, PartEditorState } from '../part-editor-provider';
import { Dimensions } from '../../../../api/model';
import { BoardPosition, CornerPosition, EdgePosition } from '../../../../api/model/application';
import { Board } from '../../../../api/model/board';
import { Edge } from '../../../../api/model/edge';
import { PartCorner, PartCornerType, PartDuplicatedBasic, PartType } from '../../../../api/model/order/part';
import { AuthContext, ErrorContext } from '../../../../context';

export interface PartDuplicatedBasicEditorState {
    partEditorState?: PartEditorState,
    rotate: boolean,
    setRotate: (rotate: boolean) => void,
    boardData: BoardData[],
    setBoard: (boardPosition: BoardPosition, board: Board) => void,
    setBoardAll: (board: Board) => void,
    setDimensions: (dimensions: Dimensions) => void,
    edgeData: EdgeData[],
    setEdge: (edgePosition: EdgePosition, edge: Edge) => void,
    setEdgeAll: (edge: Edge) => void,
    deleteEdge: (edgePosition: EdgePosition) => void,
    cornerData: CornerData[],
    setCornerRadius: (cornerPosition: CornerPosition, radius: number) => void,
    setCornerDimensions: (cornerPosition: CornerPosition, dimensions: Dimensions) => void,
    setCornerEdge: (cornerPosition: CornerPosition, edge: Edge) => void,
    setCornerRadiusAll: (radius: number) => void,
    setCornerDimensionsAll: (dimensions: Dimensions) => void,
    setCornerEdgeAll: (edge: Edge) => void,
    deleteCorner: (cornerPosition: CornerPosition) => void,
    errorMessages: string[]
}

export const PartDuplicatedBasicEditorContext = createContext<PartDuplicatedBasicEditorState | undefined>(undefined);

const PartDuplicatedBasicEditorProvider = ({children}: { children: ReactNode }) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const partEditorState = useContext(PartEditorContext);
    const [rotate, setRotate] = useState(false);
    const [boardData, setBoardData] = useState<BoardData[]>([]);
    const [edgeData, setEdgeData] = useState<EdgeData[]>([]);
    const [cornerData, setCornerData] = useState<CornerData[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        setRotate(false);
        setBoardData([]);
        setEdgeData([]);
        setCornerData([]);
        setErrorMessages([]);

        if (partEditorState?.partType === PartType.DUPLICATED_BASIC && partEditorState?.part !== undefined) {
            const partDuplicatedBasic = partEditorState?.part as PartDuplicatedBasic;

            setRotate(partDuplicatedBasic.rotate);
            setDimensions(partDuplicatedBasic.dimensionsTOP);

            loadBoards(
                [partDuplicatedBasic.boardId, partDuplicatedBasic.boardIdBottom],
                (error?) => errorState?.addError(error),
                authState?.authToken?.accessToken
            ).then((data) => {
                let board = data.find(item => item.id === partDuplicatedBasic.boardId);
                if (board) {
                    setBoard(BoardPosition.TOP, board);
                }
                board = data.find(item => item.id === partDuplicatedBasic.boardIdBottom);
                if (board) {
                    setBoard(BoardPosition.BOTTOM, board);
                }
            });

            loadEdges(
                [
                    partDuplicatedBasic.edgeIdA1,
                    partDuplicatedBasic.edgeIdA2,
                    partDuplicatedBasic.edgeIdB1,
                    partDuplicatedBasic.edgeIdB2,
                    partDuplicatedBasic?.cornerA1B1?.edgeId,
                    partDuplicatedBasic?.cornerA1B2?.edgeId,
                    partDuplicatedBasic?.cornerA2B1?.edgeId,
                    partDuplicatedBasic?.cornerA2B2?.edgeId
                ].filter(item => item !== undefined) as number[],
                (error?) => errorState?.addError(error),
                authState?.authToken?.accessToken
            ).then((data) => {
                setLoadedEdge(EdgePosition.A1, data, partDuplicatedBasic.edgeIdA1);
                setLoadedEdge(EdgePosition.A2, data, partDuplicatedBasic.edgeIdA2);
                setLoadedEdge(EdgePosition.B1, data, partDuplicatedBasic.edgeIdB1);
                setLoadedEdge(EdgePosition.B2, data, partDuplicatedBasic.edgeIdB2);

                setLoadedCorner(CornerPosition.A1B1, data, partDuplicatedBasic.cornerA1B1);
                setLoadedCorner(CornerPosition.A1B2, data, partDuplicatedBasic.cornerA1B2);
                setLoadedCorner(CornerPosition.A2B1, data, partDuplicatedBasic.cornerA2B1);
                setLoadedCorner(CornerPosition.A2B2, data, partDuplicatedBasic.cornerA2B2);
            });
        }
    }, [partEditorState?.partType, partEditorState?.part]);

    const setLoadedEdge = (edgePosition: EdgePosition, data: Edge[], id?: number) => {
        if (id) {
            const edge = data.find(item => item.id === id);
            if (edge) {
                setEdge(edgePosition, edge);
            }
        }
    }

    const setLoadedCorner = (cornerPosition: CornerPosition, data: Edge[], partCorner?: PartCorner) => {
        if (partCorner) {
            if (partCorner.radius) {
                setCornerRadius(cornerPosition, partCorner.radius);
            }

            if (partCorner.dimensions) {
                setCornerDimensions(cornerPosition, partCorner.dimensions);
            }

            if (partCorner.edgeId) {
                const edge = data.find(item => item.id === partCorner.edgeId);
                if (edge) {
                    setCornerEdge(cornerPosition, edge);
                }
            }
        }
    }

    const setBoard = (boardPosition: BoardPosition, board: Board) => {
        setBoardData((previous) => {
            const newData = [...previous];
            const dimensions = newData.find(item => item.boardPosition === boardPosition)?.dimensions;
            const index = newData.findIndex(item => item.boardPosition === boardPosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            newData.push({boardPosition, dimensions, board});
            return sortBoardData(newData);
        });
    }

    const setBoardAll = (board: Board) => {
        setBoard(BoardPosition.TOP, board);
        setBoard(BoardPosition.BOTTOM, board);
    }

    const setDimensions = (dimensions: Dimensions) => {
        setBoardData((previous) => {
            const newData = [...previous];
            newData.forEach(item => item.dimensions = dimensions);
            let index = boardData.findIndex(item => item.boardPosition === BoardPosition.TOP);
            if (index === -1) {
                newData.push({boardPosition: BoardPosition.TOP, dimensions});
            }
            index = boardData.findIndex(item => item.boardPosition === BoardPosition.BOTTOM);
            if (index === -1) {
                newData.push({boardPosition: BoardPosition.BOTTOM, dimensions});
            }
            return sortBoardData(newData);
        });
    }

    const setEdge = (edgePosition: EdgePosition, edge: Edge) => {
        setEdgeData((previous) => {
            const newData = [...previous];
            const index = newData.findIndex(item => item.edgePosition === edgePosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            newData.push({edgePosition, edge});
            return sortEdgeData(newData);
        });
    }

    const setEdgeAll = (edge: Edge) => {
        setEdge(EdgePosition.A1, edge);
        setEdge(EdgePosition.A2, edge);
        setEdge(EdgePosition.B1, edge);
        setEdge(EdgePosition.B2, edge);
    }

    const deleteEdge = (edgePosition: EdgePosition) => {
        setEdgeData((previous) => {
            const newData = [...previous];
            const index = newData.findIndex(item => item.edgePosition === edgePosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            return sortEdgeData(newData);
        });
    }

    const setCornerRadius = (cornerPosition: CornerPosition, radius: number) => {
        const type = PartCornerType.ROUNDED;
        setCornerData((previous) => {
            const newData = [...previous];
            const edge = newData.find(item => item.cornerPosition === cornerPosition)?.edge;
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            newData.push({cornerPosition, type, radius, edge});
            return sortCornerData(newData);
        });
    }

    const setCornerDimensions = (cornerPosition: CornerPosition, dimensions: Dimensions) => {
        const type = PartCornerType.STRAIGHT;
        setCornerData((previous) => {
            const newData = [...previous];
            const edge = newData.find(item => item.cornerPosition === cornerPosition)?.edge;
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            newData.push({cornerPosition, type, dimensions, edge});
            return sortCornerData(newData);
        });
    }

    const setCornerEdge = (cornerPosition: CornerPosition, edge: Edge) => {
        setCornerData((previous) => {
            const newData = [...previous];
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                newData[index].edge = edge;
            }
            return sortCornerData(newData);
        });
    }

    const setCornerRadiusAll = (radius: number) => {
        setCornerRadius(CornerPosition.A1B1, radius);
        setCornerRadius(CornerPosition.A1B2, radius);
        setCornerRadius(CornerPosition.A2B1, radius);
        setCornerRadius(CornerPosition.A2B2, radius);
    }

    const setCornerDimensionsAll = (dimensions: Dimensions) => {
        setCornerDimensions(CornerPosition.A1B1, dimensions);
        setCornerDimensions(CornerPosition.A1B2, dimensions);
        setCornerDimensions(CornerPosition.A2B1, dimensions);
        setCornerDimensions(CornerPosition.A2B2, dimensions);
    }

    const setCornerEdgeAll = (edge: Edge) => {
        setCornerEdge(CornerPosition.A1B1, edge);
        setCornerEdge(CornerPosition.A1B2, edge);
        setCornerEdge(CornerPosition.A2B1, edge);
        setCornerEdge(CornerPosition.A2B2, edge);
    }

    const deleteCorner = (cornerPosition: CornerPosition) => {
        setCornerData((previous) => {
            const newData = [...previous];
            const index = newData.findIndex(item => item.cornerPosition === cornerPosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            return sortCornerData(newData);
        });
    }

    return (
        <PartDuplicatedBasicEditorContext.Provider
            value={
                {
                    partEditorState,
                    rotate,
                    setRotate,
                    boardData,
                    setBoard,
                    setBoardAll,
                    setDimensions,
                    edgeData,
                    setEdge,
                    setEdgeAll,
                    deleteEdge,
                    cornerData,
                    setCornerRadius,
                    setCornerDimensions,
                    setCornerEdge,
                    setCornerRadiusAll,
                    setCornerDimensionsAll,
                    setCornerEdgeAll,
                    deleteCorner,
                    errorMessages
                }
            }
        >{children}
        </PartDuplicatedBasicEditorContext.Provider>
    )
}

export default PartDuplicatedBasicEditorProvider;
