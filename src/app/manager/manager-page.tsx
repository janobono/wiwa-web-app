import { Outlet } from 'react-router-dom';

import ManagerNavigation from './manager-navigation';
import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import BaseNavigation from '../../component/layout/base-navigation';
import CodeListProvider from '../../component/state/code-list-provider.tsx';
import CodeListItemProvider from '../../component/state/code-list-item-provider.tsx';

const AdminPage = () => {
    return (
        <AccessDefender>
            <CodeListProvider>
                <CodeListItemProvider>
                    <BaseNavigation/>
                    <ManagerNavigation/>
                    <main className="w-full bg-base text-base-content">
                        <Outlet/>
                    </main>
                    <BaseFooter/>
                </CodeListItemProvider>
            </CodeListProvider>
        </AccessDefender>
    )
}

export default AdminPage;
