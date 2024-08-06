import { getBoard } from '../../../api/controller/board';
import { getEdge } from '../../../api/controller/edge';
import { Dimensions, WiwaError } from '../../../api/model';
import { BoardPosition, CornerPosition, EdgePosition } from '../../../api/model/application';
import { Board } from '../../../api/model/board';
import { Edge } from '../../../api/model/edge';
import { PartCornerType } from '../../../api/model/order/part';

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

export const loadBoards = async (ids: number[], handleError: (error?: WiwaError) => void, accessToken?: string): Promise<Board[]> => {
    const result: Board[] = [];
    for (const id of ids) {
        if (result.findIndex(item => item.id === id) === -1) {
            const response = await getBoard(id, accessToken);
            handleError(response.error);
            if (response.data) {
                result.push(response.data);
            }
        }
    }
    return result;
}

export const loadEdges = async (ids: number[], handleError: (error?: WiwaError) => void, accessToken?: string): Promise<Edge[]> => {
    const result: Edge[] = [];
    for (const id of ids) {
        if (result.findIndex(item => item.id === id) === -1) {
            const response = await getEdge(id, accessToken);
            handleError(response.error);
            if (response.data) {
                result.push(response.data);
            }
        }
    }
    return result;
}

export const sortBoardData = (data: BoardData[]) => {
    return data.sort((item1, item2) => (item1.boardPosition > item2.boardPosition ? 1 : -1));
}

export const sortEdgeData = (data: EdgeData[]) => {
    return data.sort((item1, item2) => (item1.edgePosition > item2.edgePosition ? 1 : -1));
}

export const sortCornerData = (data: CornerData[]) => {
    return data.sort((item1, item2) => (item1.cornerPosition > item2.cornerPosition ? 1 : -1));
}
