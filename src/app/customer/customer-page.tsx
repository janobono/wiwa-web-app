import { Outlet } from 'react-router-dom';

import { Authority } from '../../api/model';
import CustomerProvider from '../../component/app/customer/customer-provider';
import AuthDefender from '../../component/layout/auth-defender';
import Footer from '../../component/layout/footer';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import Navigation from '../../component/layout/navigation';
import CustomerResourceProvider from '../../context/provider/resource/customer';

const CustomerPage = () => {
    return (
        <CustomerResourceProvider>
            <MaintenanceDefender>
                <AuthDefender authority={Authority.W_CUSTOMER}>
                    <Navigation/>
                    <main className="w-full bg-base text-base-content">
                        <CustomerProvider>
                            <Outlet/>
                        </CustomerProvider>
                    </main>
                    <Footer/>
                </AuthDefender>
            </MaintenanceDefender>
        </CustomerResourceProvider>
    )
}

export default CustomerPage;
