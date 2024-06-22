import { Outlet } from 'react-router-dom';
import OrderState from '../../state/order-state';

const OrdersBasePage = () => {
    return (
        <OrderState>
            <Outlet/>
        </OrderState>
    )
}

export default OrdersBasePage;
