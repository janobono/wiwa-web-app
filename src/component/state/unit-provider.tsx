import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { Unit, UnitId, WiwaError } from '../../model/service';
import { CONTEXT_PATH, getData, postData } from '../../data';
import { useConfigState } from './config-state-provider.tsx';

const PATH_CONFIG_UNITS = CONTEXT_PATH + 'config/units';
const PATH_UI_UNITS = CONTEXT_PATH + 'ui/units';

export interface UnitState {
    busy: boolean,
    data?: Unit[],
    setData: (data: Unit[]) => Promise<WiwaError | undefined>
    getValue: (id: UnitId) => string | undefined
}

const unitStateContext = createContext<UnitState | undefined>(undefined);

const UnitStateProvider = ({children}: { children: ReactNode }) => {
    const configState = useConfigState();
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Unit[]>();

    const fetchData = async () => {
        setBusy(true);
        try {
            const response = await getData<Unit[]>(PATH_UI_UNITS);
            console.log(response);
            if (response.data) {
                setData(response.data);
            }
        } finally {
            setBusy(false);
        }
    }

    useEffect(() => {
        if (configState?.up) {
            fetchData().then();
        } else {
            setData(undefined);
        }
    }, [configState?.up]);

    const postUnits = async (data: Unit[]) => {
        setBusy(true);
        try {
            const response = await postData<Unit[]>(
                PATH_CONFIG_UNITS,
                data,
                authState?.accessToken || ''
            );
            if (response.error) {
                return response.error;
            }
        } finally {
            fetchData().then();
        }
    }

    const getValue = (id: UnitId) => {
        return data?.find(unit => unit.id === id)?.value;
    }

    return (
        <unitStateContext.Provider
            value={
                {
                    busy,
                    data,
                    setData: postUnits,
                    getValue
                }
            }
        >{children}
        </unitStateContext.Provider>
    );
}

export default UnitStateProvider;

export const useUnitState = () => {
    return useContext(unitStateContext);
}
