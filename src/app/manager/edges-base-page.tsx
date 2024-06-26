import { createContext, ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Page } from '../../api/model';
import { Edge } from '../../api/model/edge';

const EdgesBasePage = () => {
    return (
        <EdgeProvider>
            <Outlet/>
        </EdgeProvider>
    )
}

export default EdgesBasePage;

export interface EdgeState {
    busy: boolean,
    setBusy: (busy: boolean) => void,
    data?: Page<Edge>,
    setData: (data?: Page<Edge>) => void,
    selected?: Edge,
    setSelected: (edge?: Edge) => void
}

export const EdgeContext = createContext<EdgeState | undefined>(undefined);

const EdgeProvider = ({children}: { children: ReactNode }) => {
    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Edge>>();
    const [selected, setSelected] = useState<Edge>();

    return (
        <EdgeContext.Provider
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
        </EdgeContext.Provider>
    );
}
