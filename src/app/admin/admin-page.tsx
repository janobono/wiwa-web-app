import { Outlet } from 'react-router-dom';

import AdminNavigation from './admin-navigation';
import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import BaseNavigation from '../../component/layout/base-navigation';

const AdminPage = () => {
    return (
        <AccessDefender>
            <BaseNavigation/>
            <AdminNavigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <BaseFooter/>
        </AccessDefender>
    )
}

export default AdminPage;
