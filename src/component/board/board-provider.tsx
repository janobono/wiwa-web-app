import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import * as apiBoard from '../../api/controller/board';
import { CategoryItemChange } from '../../api/model';
import { Board, BoardChange, BoardField, BoardSearchCriteria } from '../../api/model/board';
import { AuthContext, ErrorContext } from '../../context';

export interface BoardState {
    busy: boolean,
    editEnabled: boolean,
    previous: boolean,
    next: boolean,
    page: number,
    setPage: (page: number) => void,
    setCriteria: (criteria?: BoardSearchCriteria) => void,
    data?: Board[],
    selected?: Board,
    setSelected: (selected?: Board) => void,
    getBoards: () => Promise<void>,
    addBoard: (boardChange: BoardChange) => Promise<void>,
    setBoard: (boardChange: BoardChange) => Promise<void>,
    deleteBoard: () => Promise<void>,
    setBoardCategoryItems: (categoryItemChanges: CategoryItemChange[]) => Promise<void>,
    setBoardImage: (file: File) => Promise<void>,
    deleteBoardImage: () => Promise<void>
}

export const BoardContext = createContext<BoardState | undefined>(undefined);

const BoardProvider = ({children}: { children: ReactNode }) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const [busy, setBusy] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [criteria, setCriteria] = useState<BoardSearchCriteria>();
    const [data, setData] = useState<Board[]>();
    const [selected, setSelected] = useState<Board>();

    useEffect(() => {
        setEditEnabled(false);

        if (selected && data) {
            const index = data.findIndex(item => item.id === selected?.id);
            if (index !== -1) {
                setSelected(data[index]);
                setEditEnabled(true);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    useEffect(() => {
        getBoards().then();
    }, [criteria, page]);

    const createData = (): Board[] => {
        if (data) {
            return [...data];
        }
        return [];
    }

    const handleResponse = (response: ClientResponse<Board>) => {
        if (response?.data) {
            const newData = createData();
            const index = newData.findIndex(item => item.id === response.data?.id);
            if (index !== -1) {
                newData[index] = response.data;
            }
            setData(newData);
        }
    }

    const getBoards = async () => {
        setBusy(true);
        try {
            const response = await apiBoard.getBoards(criteria, {
                page,
                size: 10,
                sort: {field: BoardField.id, asc: true}
            }, authState?.authToken?.accessToken);
            setPrevious(!response.data?.first || false);
            setNext(!response.data?.last || false);
            setData(response.data?.content);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const addBoard = async (boardChange: BoardChange) => {
        setBusy(true);
        try {
            const response = await apiBoard.addBoard(boardChange, authState?.authToken?.accessToken);
            if (response.data) {
                const newData = [response.data, ...createData()];
                setData(newData);
                setSelected(response.data);
            }
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setBoard = async (boardChange: BoardChange) => {
        setBusy(true);
        try {
            const response = await apiBoard.setBoard(selected?.id || -1, boardChange, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteBoard = async () => {
        setBusy(true);
        try {
            const response = await apiBoard.deleteBoard(selected?.id || -1, authState?.authToken?.accessToken);
            if (!response.error) {
                const newData = createData();
                const index = newData.findIndex(item => item.id === selected?.id);
                if (index !== -1) {
                    newData.splice(index, 1);
                }
                setData(newData);
                setSelected(undefined);
            }
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setBoardCategoryItems = async (categoryItemChanges: CategoryItemChange[]) => {
        setBusy(true);
        try {
            const response = await apiBoard.setBoardCategoryItems(selected?.id || -1, categoryItemChanges, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const setBoardImage = async (file: File) => {
        setBusy(true);
        try {
            const response = await apiBoard.setBoardImage(selected?.id || -1, file, authState?.authToken?.accessToken);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteBoardImage = async () => {
        setBusy(true);
        try {
            const response = await apiBoard.deleteBoardImage(selected?.id || -1, authState?.authToken?.accessToken);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <BoardContext.Provider
            value={
                {
                    busy,
                    editEnabled,
                    previous,
                    next,
                    page,
                    setPage,
                    setCriteria,
                    data,
                    selected,
                    setSelected,
                    getBoards,
                    addBoard,
                    setBoard,
                    deleteBoard,
                    setBoardCategoryItems,
                    setBoardImage,
                    deleteBoardImage
                }
            }
        >{children}
        </BoardContext.Provider>
    )
}

export default BoardProvider;
