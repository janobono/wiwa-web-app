import { createContext, ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Page } from '../../api/model';
import { Board } from '../../api/model/board';

const BoardsBasePage = () => {
    return (
        <BoardProvider>
            <Outlet/>
        </BoardProvider>
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

export const BoardContext = createContext<BoardState | undefined>(undefined);

const BoardProvider = ({children}: { children: ReactNode }) => {
    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Board>>();
    const [selected, setSelected] = useState<Board>();

    return (
        <BoardContext.Provider
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
        </BoardContext.Provider>
    );
}
