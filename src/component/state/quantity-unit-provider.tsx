import { createContext, ReactNode, useContext, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { QuantityUnit, WiwaError } from '../../model/service';
import { CONTEXT_PATH, deleteData, getData, postData, putData } from '../../data';

const PATH_QUANTITY_UNITS = CONTEXT_PATH + 'quantity-units';

export interface QuantityUnitState {
    busy: boolean,
    fetchData: () => Promise<WiwaError | undefined>,
    data: QuantityUnit[],
    addQuantityUnit: (quantityUnit: QuantityUnit) => Promise<WiwaError | undefined>,
    setQuantityUnit: (quantityUnit: QuantityUnit) => Promise<WiwaError | undefined>,
    deleteQuantityUnit: (unitId: string) => Promise<WiwaError | undefined>,
}

const quantityUnitContext = createContext<QuantityUnitState | undefined>(undefined);

const QuantityUnitProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<QuantityUnit[]>([]);

    const fetchData = async () => {
        setData([]);
        setBusy(true);
        try {
            if (authState && authState.accessToken) {
                const response = await getData<QuantityUnit[]>(
                    PATH_QUANTITY_UNITS,
                    undefined,
                    authState.accessToken
                );
                if (response.error) {
                    return response.error;
                } else if (response.data) {
                    setData(response.data);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    const addQuantityUnit = async (quantityUnit: QuantityUnit) => {
        setBusy(true);
        try {
            const response = await postData<QuantityUnit>(
                PATH_QUANTITY_UNITS,
                quantityUnit,
                authState?.accessToken || ''
            );
            if (response.error) {
                return response.error;
            } else if (response.data) {
                const newData = [response.data, ...data];
                setData(newData);
            }
        } finally {
            setBusy(false);
        }
    }

    const setQuantityUnit = async (quantityUnit: QuantityUnit) => {
        setBusy(true);
        try {
            const response = await putData<QuantityUnit>(
                PATH_QUANTITY_UNITS,
                quantityUnit,
                authState?.accessToken || ''
            );
            if (response.error) {
                return response.error;
            } else if (response.data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === quantityUnit.id);
                if (index !== -1) {
                    newData[index] = response.data;
                    setData(newData);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    const deleteQuantityUnit = async (id: string) => {
        setBusy(true);
        try {
            const response = await deleteData(
                PATH_QUANTITY_UNITS + '/' + id,
                authState?.accessToken || ''
            )
            if (response.error) {
                return response.error;
            } else {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.splice(index, 1);
                    setData(newData);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <quantityUnitContext.Provider
            value={
                {
                    busy,
                    fetchData,
                    data,
                    addQuantityUnit,
                    setQuantityUnit,
                    deleteQuantityUnit
                }
            }
        >{children}
        </quantityUnitContext.Provider>
    )
}

export default QuantityUnitProvider;

export const useQuantityUnitState = () => {
    return useContext(quantityUnitContext);
}
