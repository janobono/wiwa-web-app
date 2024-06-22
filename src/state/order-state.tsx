import { ReactNode } from 'react';
import OrderItemStateProvider from './order-item';
import OrderStateProvider from './order';

const OrderState = ({children}: { children: ReactNode }) => {
    return (
        <OrderStateProvider>
            <OrderItemStateProvider>
                {children}
            </OrderItemStateProvider>
        </OrderStateProvider>
    );
}

export default OrderState;
