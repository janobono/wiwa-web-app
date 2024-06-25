import { createContext, ReactNode, useContext, useState } from 'react';

import { Page } from '../../api/model';
import { Order } from '../../api/model/order';

export interface OrderState {
    data?: Page<Order>,
    setData: (data?: Page<Order>) => void,
    selected?: Order,
    setSelected: (order?: Order) => void
}

const orderStateContext = createContext<OrderState | undefined>(undefined);

const OrderStateProvider = ({children}: { children: ReactNode }) => {
    const [data, setData] = useState<Page<Order>>();
    const [selected, setSelected] = useState<Order>();

    return (
        <orderStateContext.Provider
            value={
                {
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
