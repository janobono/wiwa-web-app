import { createContext, ReactNode, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Page } from '../../api/model';
import { Board } from '../../api/model/board';

const BoardsBasePage = () => {
    return (
        <BoardStateProvider>
            <Outlet/>
        </BoardStateProvider>
    )
}

export default BoardsBasePage;

export interface BoardState {
    busy: boolean,
    setBusy: (busy: boolean) => void,
    data?: Page<Board>,
    setData: (data?: Page<Board>) => void,
    selected?: Board,
    setSelected: (board?: Board) => void
}

const boardStateContext = createContext<BoardState | undefined>(undefined);

const BoardStateProvider = ({children}: { children: ReactNode }) => {
    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Board>>();
    const [selected, setSelected] = useState<Board>();

    return (
        <boardStateContext.Provider
            value={
                {
                    busy,
                    setBusy,
                    data,
                    setData,
                    selected,
                    setSelected
                }
            }
        >{children}
        </boardStateContext.Provider>
    );
}

export const useBoardState = () => {
    return useContext(boardStateContext);
}
