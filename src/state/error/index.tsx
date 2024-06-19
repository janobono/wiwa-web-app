import { createContext, ReactNode, useContext, useState } from 'react';

import { WiwaError } from '../../api/model';

export interface ErrorState {
    data: WiwaError[],
    addError: (error?: WiwaError) => void,
    removeError: (index: number) => void
}

const errorStateContext = createContext<ErrorState | undefined>(undefined);

const ErrorStateProvider = ({children}: { children: ReactNode }) => {
    const [data, setData] = useState<WiwaError[]>([]);

    const addError = (error?: WiwaError) => {
        if (error) {
            const newData = [...data];
            newData.push(error);
            setData(newData);
        }
    }

    const removeError = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    }

    return (
        <errorStateContext.Provider
            value={
                {
                    data,
                    addError,
                    removeError
                }
            }
        >{children}
        </errorStateContext.Provider>
    );
}

export default ErrorStateProvider;

export const useErrorState = () => {
    return useContext(errorStateContext);
}
