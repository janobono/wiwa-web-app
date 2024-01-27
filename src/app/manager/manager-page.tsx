import { Outlet } from 'react-router-dom';

import ManagerNavigation from './manager-navigation';
import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import BaseNavigation from '../../component/layout/base-navigation';

const AdminPage = () => {
    return (
        <AccessDefender>
            <BaseNavigation/>
            <ManagerNavigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <BaseFooter/>
        </AccessDefender>
    )
}

export default AdminPage;
