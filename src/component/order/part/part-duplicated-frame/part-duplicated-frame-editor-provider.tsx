import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { BoardData, EdgeData, loadBoards, loadEdges, sortBoardData, sortEdgeData } from '..';
import { PartEditorContext, PartEditorState } from '../part-editor-provider';
import { Dimensions } from '../../../../api/model';
import { BoardPosition, EdgePosition } from '../../../../api/model/application';
import { Board } from '../../../../api/model/board';
import { Edge } from '../../../../api/model/edge';
import { FrameType, PartDuplicatedFrame, PartType } from '../../../../api/model/order/part';
import { AuthContext, ErrorContext } from '../../../../context';

export interface PartDuplicatedFrameEditorState {
    partEditorState?: PartEditorState,
    rotate: boolean,
    setRotate: (rotate: boolean) => void,
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

export const PartDuplicatedFrameEditorContext = createContext<PartDuplicatedFrameEditorState | undefined>(undefined);

const PartDuplicatedFrameEditorProvider = ({children}: { children: ReactNode }) => {
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
            const partDuplicatedFrame = partEditorState?.part as PartDuplicatedFrame;

            setFrameType(partDuplicatedFrame.frameType);
            setDimensions(partDuplicatedFrame.dimensionsTOP);

            loadBoards(
                [partDuplicatedFrame.boardIdA1, partDuplicatedFrame.boardIdA2, partDuplicatedFrame.boardIdB1, partDuplicatedFrame.boardIdB2],
                (error?) => errorState?.addError(error),
                authState?.authToken?.accessToken
            ).then((data) => {
                setLoadedBoard(BoardPosition.A1, data, partDuplicatedFrame.boardIdA1, partDuplicatedFrame.dimensionsA1);
                setLoadedBoard(BoardPosition.A2, data, partDuplicatedFrame.boardIdA2, partDuplicatedFrame.dimensionsA2);
                setLoadedBoard(BoardPosition.B1, data, partDuplicatedFrame.boardIdB1, partDuplicatedFrame.dimensionsB1);
                setLoadedBoard(BoardPosition.B2, data, partDuplicatedFrame.boardIdB2, partDuplicatedFrame.dimensionsB2);
            });

            loadEdges(
                [
                    partDuplicatedFrame.edgeIdA1,
                    partDuplicatedFrame.edgeIdA1I,
                    partDuplicatedFrame.edgeIdA2,
                    partDuplicatedFrame.edgeIdA2I,
                    partDuplicatedFrame.edgeIdB1,
                    partDuplicatedFrame.edgeIdB1I,
                    partDuplicatedFrame.edgeIdB2,
                    partDuplicatedFrame.edgeIdB2I
                ].filter(item => item !== undefined) as number[],
                (error?) => errorState?.addError(error),
                authState?.authToken?.accessToken
            ).then((data) => {
                setLoadedEdge(EdgePosition.A1, data, partDuplicatedFrame.edgeIdA1);
                setLoadedEdge(EdgePosition.A1I, data, partDuplicatedFrame.edgeIdA1I);
                setLoadedEdge(EdgePosition.A2, data, partDuplicatedFrame.edgeIdA2);
                setLoadedEdge(EdgePosition.A2I, data, partDuplicatedFrame.edgeIdA2I);
                setLoadedEdge(EdgePosition.B1, data, partDuplicatedFrame.edgeIdB1);
                setLoadedEdge(EdgePosition.B1I, data, partDuplicatedFrame.edgeIdB1I);
                setLoadedEdge(EdgePosition.B2, data, partDuplicatedFrame.edgeIdB2);
                setLoadedEdge(EdgePosition.B2I, data, partDuplicatedFrame.edgeIdB2I);
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
        <PartDuplicatedFrameEditorContext.Provider
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
        </PartDuplicatedFrameEditorContext.Provider>
    )
}

export default PartDuplicatedFrameEditorProvider;
