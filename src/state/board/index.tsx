import { createContext, ReactNode, useContext, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import {
    addBoard as apiAddBoard,
    deleteBoard as apiDeleteBoard,
    deleteBoardImage as apiDeleteBoardImage,
    getBoard as apiGetBoard,
    getBoards as apiGetBoards,
    setBoard as apiSetBoard,
    setBoardCategoryItems as apiSetBoardCategoryItems,
    setBoardImage as apiSetBoardImage
} from '../../api/controller/board';
import { Page, Pageable } from '../../api/model';
import { Board, BoardCategoryItemChange, BoardChange, BoardSearchCriteria } from '../../api/model/board';
import { useAuthState } from '../auth';

export interface BoardState {
    busy: boolean,
    data?: Page<Board>,
    getBoards: (criteria?: BoardSearchCriteria, pageable?: Pageable) => Promise<ClientResponse<Page<Board>>>,
    getBoard: (id: number) => Promise<ClientResponse<Board>>,
    addBoard: (boardChange: BoardChange) => Promise<ClientResponse<Board>>,
    setBoard: (id: number, boardChange: BoardChange) => Promise<ClientResponse<Board>>,
    deleteBoard: (id: number) => Promise<ClientResponse<void>>,
    setBoardImage: (id: number, file: File) => Promise<ClientResponse<void>>,
    deleteBoardImage: (id: number) => Promise<ClientResponse<void>>,
    setBoardCategoryItems: (id: number, boardCategoryItems: BoardCategoryItemChange[]) => Promise<ClientResponse<Board>>
}

const boardStateContext = createContext<BoardState | undefined>(undefined);

const BoardStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Board>>();

    const handleResponse = (id: number, response: ClientResponse<Board>) => {
        if (response.data) {
            if (data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content[index] = response.data;
                    setData(newData);
                }
            }
        }
    }

    const getBoards = async (criteria?: BoardSearchCriteria, pageable?: Pageable) => {
        setBusy(true);
        try {
            return await apiGetBoards(criteria, pageable, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const getBoard = async (id: number) => {
        setBusy(true);
        try {
            return await apiGetBoard(id, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const addBoard = async (boardChange: BoardChange) => {
        setBusy(true);
        try {
            const response = await apiAddBoard(boardChange, authState?.authToken?.accessToken);
            if (response.data) {
                if (data) {
                    const newData = {...data};
                    newData.content = [response.data, ...data.content];
                    setData(newData);
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setBoard = async (id: number, boardChange: BoardChange) => {
        setBusy(true);
        try {
            const response = await apiSetBoard(id, boardChange, authState?.authToken?.accessToken);
            handleResponse(id, response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const deleteBoard = async (id: number) => {
        setBusy(true);
        try {
            const response = await apiDeleteBoard(id, authState?.authToken?.accessToken);
            if (response.error === undefined && data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content.splice(index, 1);
                    setData(newData);
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setBoardImage = async (id: number, file: File) => {
        setBusy(true);
        try {
            return await apiSetBoardImage(id, file, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const deleteBoardImage = async (id: number) => {
        setBusy(true);
        try {
            return await apiDeleteBoardImage(id, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const setBoardCategoryItems = async (id: number, boardCategoryItems: BoardCategoryItemChange[]) => {
        setBusy(true);
        try {
            const response = await apiSetBoardCategoryItems(id, boardCategoryItems, authState?.authToken?.accessToken);
            handleResponse(id, response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <boardStateContext.Provider
            value={
                {
                    busy,
                    data,
                    getBoards,
                    getBoard,
                    addBoard,
                    setBoard,
                    deleteBoard,
                    setBoardImage,
                    deleteBoardImage,
                    setBoardCategoryItems
                }
            }
        >{children}
        </boardStateContext.Provider>
    );
}

export default BoardStateProvider;

export const useBoardState = () => {
    return useContext(boardStateContext);
}
