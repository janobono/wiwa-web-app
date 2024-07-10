import { Outlet } from 'react-router-dom';

import { Authority } from '../../api/model';
import AuthDefender from '../../component/layout/auth-defender';
import Footer from '../../component/layout/footer';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import Navigation from '../../component/layout/navigation';
import EmployeeResourceProvider from '../../context/provider/resource/employee';

const EmployeePage = () => {
    return (
        <EmployeeResourceProvider>
            <MaintenanceDefender>
                <AuthDefender authority={Authority.W_EMPLOYEE}>
                    <Navigation/>
                    <main className="w-full bg-base text-base-content">
                        <Outlet/>
                    </main>
                    <Footer/>
                </AuthDefender>
            </MaintenanceDefender>
        </EmployeeResourceProvider>
    )
}

export default EmployeePage;
