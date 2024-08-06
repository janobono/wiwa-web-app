import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { BoardData, EdgeData, loadBoards, loadEdges, sortBoardData, sortEdgeData } from '..';
import { PartEditorContext, PartEditorState } from '../part-editor-provider';
import { Dimensions } from '../../../../api/model';
import { BoardPosition, EdgePosition } from '../../../../api/model/application';
import { Board } from '../../../../api/model/board';
import { Edge } from '../../../../api/model/edge';
import { FrameType, PartFrame, PartType } from '../../../../api/model/order/part';
import { AuthContext, ErrorContext } from '../../../../context';

export interface PartFrameEditorState {
    partEditorState?: PartEditorState,
    frameType: FrameType,
    setFrameType: (frameType: FrameType) => void,
    dimensions?: Dimensions,
    setDimensions: (dimensions: Dimensions) => void,
    boardData: BoardData[],
    setBoard: (boardPosition: BoardPosition, board: Board) => void,
    setBoardAll: (board: Board) => void,
    setWidth: (boardPosition: BoardPosition, width: number) => void,
    setWidthAll: (width: number) => void,
    edgeData: EdgeData[],
    setEdge: (edgePosition: EdgePosition, edge: Edge) => void,
    setEdgeAll: (edge: Edge) => void,
    deleteEdge: (edgePosition: EdgePosition) => void,
    errorMessages: string[]
}

export const PartFrameEditorContext = createContext<PartFrameEditorState | undefined>(undefined);

const PartFrameEditorProvider = ({children}: { children: ReactNode }) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const partEditorState = useContext(PartEditorContext);
    const [frameType, setFrameType] = useState(FrameType.HORIZONTAL);
    const [dimensions, setDimensions] = useState<Dimensions>();
    const [boardData, setBoardData] = useState<BoardData[]>([]);
    const [edgeData, setEdgeData] = useState<EdgeData[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        setFrameType(FrameType.HORIZONTAL);
        setDimensions(undefined);
        setBoardData([]);
        setEdgeData([]);
        setErrorMessages([]);

        if (partEditorState?.partType === PartType.FRAME && partEditorState?.part !== undefined) {
            const partFrame = partEditorState?.part as PartFrame;

            setFrameType(partFrame.frameType);
            setDimensions(partFrame.dimensionsTOP);

            loadBoards(
                [partFrame.boardIdA1, partFrame.boardIdA2, partFrame.boardIdB1, partFrame.boardIdB2],
                (error?) => errorState?.addError(error),
                authState?.authToken?.accessToken
            ).then((data) => {
                setLoadedBoard(BoardPosition.A1, data, partFrame.boardIdA1, partFrame.dimensionsA1);
                setLoadedBoard(BoardPosition.A2, data, partFrame.boardIdA2, partFrame.dimensionsA2);
                setLoadedBoard(BoardPosition.B1, data, partFrame.boardIdB1, partFrame.dimensionsB1);
                setLoadedBoard(BoardPosition.B2, data, partFrame.boardIdB2, partFrame.dimensionsB2);
            });

            loadEdges(
                [
                    partFrame.edgeIdA1,
                    partFrame.edgeIdA1I,
                    partFrame.edgeIdA2,
                    partFrame.edgeIdA2I,
                    partFrame.edgeIdB1,
                    partFrame.edgeIdB1I,
                    partFrame.edgeIdB2,
                    partFrame.edgeIdB2I
                ].filter(item => item !== undefined) as number[],
                (error?) => errorState?.addError(error),
                authState?.authToken?.accessToken
            ).then((data) => {
                setLoadedEdge(EdgePosition.A1, data, partFrame.edgeIdA1);
                setLoadedEdge(EdgePosition.A1I, data, partFrame.edgeIdA1I);
                setLoadedEdge(EdgePosition.A2, data, partFrame.edgeIdA2);
                setLoadedEdge(EdgePosition.A2I, data, partFrame.edgeIdA2I);
                setLoadedEdge(EdgePosition.B1, data, partFrame.edgeIdB1);
                setLoadedEdge(EdgePosition.B1I, data, partFrame.edgeIdB1I);
                setLoadedEdge(EdgePosition.B2, data, partFrame.edgeIdB2);
                setLoadedEdge(EdgePosition.B2I, data, partFrame.edgeIdB2I);
            });
        }
    }, [partEditorState?.partType, partEditorState?.part]);

    const setLoadedBoard = (boardPosition: BoardPosition, data: Board[], id?: number, dimensions?: Dimensions) => {
        if (id) {
            const board = data.find(item => item.id === id);
            if (board) {
                setBoard(boardPosition, board);
            }
        }
        if (dimensions) {
            setBoardDimensions(boardPosition, dimensions);
        }
    }

    const setLoadedEdge = (edgePosition: EdgePosition, data: Edge[], id?: number) => {
        if (id) {
            const edge = data.find(item => item.id === id);
            if (edge) {
                setEdge(edgePosition, edge);
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
        setBoard(BoardPosition.A1, board);
        setBoard(BoardPosition.A2, board);
        setBoard(BoardPosition.B1, board);
        setBoard(BoardPosition.B2, board);
    }

    const setBoardDimensions = (boardPosition: BoardPosition, dimensions: Dimensions) => {
        setBoardData((previous) => {
            const newData = [...previous];
            const board = newData.find(item => item.boardPosition === boardPosition)?.board;
            const index = newData.findIndex(item => item.boardPosition === boardPosition);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            newData.push({boardPosition, dimensions, board});
            return sortBoardData(newData);
        });
    }

    const setWidth = (boardPosition: BoardPosition, width: number) => {
        const dimensions = boardData.find(item => item.boardPosition === boardPosition)?.dimensions;
        let newDimensions;
        if (dimensions) {
            newDimensions = {...dimensions};
        } else {
            newDimensions = {x: 0, y: 0};
        }

        switch (boardPosition) {
            case BoardPosition.A1:
            case BoardPosition.A2:
                newDimensions.y = width;
                break;
            case BoardPosition.B1:
            case BoardPosition.B2:
                newDimensions.x = width;
                break;
        }

        setBoardDimensions(boardPosition, newDimensions)
    }

    const setWidthAll = (width: number) => {
        setWidth(BoardPosition.A1, width);
        setWidth(BoardPosition.A2, width);
        setWidth(BoardPosition.B1, width);
        setWidth(BoardPosition.B2, width);
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
        setEdge(EdgePosition.A1I, edge);
        setEdge(EdgePosition.A2, edge);
        setEdge(EdgePosition.A2I, edge);
        setEdge(EdgePosition.B1, edge);
        setEdge(EdgePosition.B1I, edge);
        setEdge(EdgePosition.B2, edge);
        setEdge(EdgePosition.B2I, edge);
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

    return (
        <PartFrameEditorContext.Provider
            value={
                {
                    partEditorState,
                    frameType,
                    setFrameType,
                    dimensions,
                    setDimensions,
                    boardData,
                    setBoard,
                    setBoardAll,
                    setWidth,
                    setWidthAll,
                    edgeData,
                    setEdge,
                    setEdgeAll,
                    deleteEdge,
                    errorMessages
                }
            }
        >{children}
        </PartFrameEditorContext.Provider>
    )
}

export default PartFrameEditorProvider;
