import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { OrderItem } from '../../api/model/order';
import { useOrderState } from '../order';

export interface OrderItemState {
    busy: boolean,
    setBusy: (busy: boolean) => void,
    data?: OrderItem[],
    setData: (data?: OrderItem[]) => void,
    selected?: OrderItem,
    setSelected: (orderItem?: OrderItem) => void
}

const orderItemStateContext = createContext<OrderItemState | undefined>(undefined);

const OrderItemStateProvider = ({children}: { children: ReactNode }) => {
    const orderState = useOrderState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<OrderItem[]>();
    const [selected, setSelected] = useState<OrderItem>();

    useEffect(() => {
        if (orderState?.selected) {
            const newData = [...orderState.selected.items];
            setData(newData);
            if (selected) {
                const index = newData.findIndex(item => item.id === selected.id);
                if (index !== -1) {
                    setSelected(newData[index]);
                } else {
                    setSelected(undefined);
                }
            }
        } else {
            setData(undefined);
            setSelected(undefined);
        }
    }, [orderState?.selected, selected]);

    return (
        <orderItemStateContext.Provider
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
        </orderItemStateContext.Provider>
    );
}

export default OrderItemStateProvider;

export const useOrderItemState = () => {
    return useContext(orderItemStateContext);
}
