import { Outlet } from 'react-router-dom';

import { Authority } from '../../api/model';
import AuthDefender from '../../component/layout/auth-defender';
import BaseFooter from '../../component/layout/base-footer';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import Navigation from '../../component/layout/navigation';

const EmployeePage = () => {
    return (
        <MaintenanceDefender>
            <AuthDefender authority={Authority.W_EMPLOYEE}>
                <Navigation/>
                <main className="w-full bg-base text-base-content">
                    <Outlet/>
                </main>
                <BaseFooter/>
            </AuthDefender>
        </MaintenanceDefender>
    )
}

export default EmployeePage;
