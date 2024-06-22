import { createContext, ReactNode, useContext, useState } from 'react';

import { Page } from '../../api/model';
import { Order } from '../../api/model/order';

export interface OrderState {
    busy: boolean,
    setBusy: (busy: boolean) => void,
    data?: Page<Order>,
    setData: (data?: Page<Order>) => void,
    selected?: Order,
    setSelected: (order?: Order) => void
}

const orderStateContext = createContext<OrderState | undefined>(undefined);

const OrderStateProvider = ({children}: { children: ReactNode }) => {
    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Order>>();
    const [selected, setSelected] = useState<Order>();

    return (
        <orderStateContext.Provider
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
        </orderStateContext.Provider>
    );
}

export default OrderStateProvider;

export const useOrderState = () => {
    return useContext(orderStateContext);
}
