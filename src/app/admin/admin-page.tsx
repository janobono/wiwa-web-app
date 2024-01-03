import { Outlet } from 'react-router-dom';

import AdminNavigation from './admin-navigation';
import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import BaseNavigation from '../../component/layout/base-navigation';
import ApplicationImageStateProvider from '../../component/state/application-image-state-provider';
import ConfigStateProvider from '../../component/state/config-state-provider';
import UserStateProvider from '../../component/state/user-state-provider.tsx';

const AdminPage = () => {
    return (
        <AccessDefender>
            <BaseNavigation/>
            <AdminNavigation/>
            <main className="w-full bg-base text-base-content">
                <ApplicationImageStateProvider>
                    <ConfigStateProvider>
                        <UserStateProvider>
                            <Outlet/>
                        </UserStateProvider>
                    </ConfigStateProvider>
                </ApplicationImageStateProvider>
            </main>
            <BaseFooter/>
        </AccessDefender>
    )
}

export default AdminPage;
