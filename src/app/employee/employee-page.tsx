import { Outlet } from 'react-router-dom';

import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import Navigation from '../../component/layout/navigation';
import OrderState from '../../state/order-state';

const EmployeePage = () => {
    return (
        <AccessDefender>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <OrderState>
                    <Outlet/>
                </OrderState>
            </main>
            <BaseFooter/>
        </AccessDefender>
    )
}

export default EmployeePage;
