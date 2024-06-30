import { Outlet } from 'react-router-dom';

import { Authority } from '../../api/model';
import CustomerProvider from '../../component/app/customer/customer-provider';
import AuthDefender from '../../component/layout/auth-defender';
import BaseFooter from '../../component/layout/base-footer';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import Navigation from '../../component/layout/navigation';

const CustomerPage = () => {
    return (
        <MaintenanceDefender>
            <AuthDefender authority={Authority.W_CUSTOMER}>
                <Navigation/>
                <main className="w-full bg-base text-base-content">
                    <CustomerProvider>
                        <Outlet/>
                    </CustomerProvider>
                </main>
                <BaseFooter/>
            </AuthDefender>
        </MaintenanceDefender>
    )
}

export default CustomerPage;
