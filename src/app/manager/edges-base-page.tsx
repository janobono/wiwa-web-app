import { createContext, ReactNode, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Page } from '../../api/model';
import { Edge } from '../../api/model/edge';

const EdgesBasePage = () => {
    return (
        <EdgeStateProvider>
            <Outlet/>
        </EdgeStateProvider>
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

const edgeStateContext = createContext<EdgeState | undefined>(undefined);

const EdgeStateProvider = ({children}: { children: ReactNode }) => {
    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Edge>>();
    const [selected, setSelected] = useState<Edge>();

    return (
        <edgeStateContext.Provider
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
        </edgeStateContext.Provider>
    );
}

export const useEdgeState = () => {
    return useContext(edgeStateContext);
}
