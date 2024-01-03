import { Outlet } from 'react-router-dom';

import ManagerNavigation from './manager-navigation';
import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import BaseNavigation from '../../component/layout/base-navigation';
import CodeListProvider from '../../component/state/code-list-provider';
import CodeListItemProvider from '../../component/state/code-list-item-provider';
import ProductStateProvider from '../../component/state/product-state-provider';

const AdminPage = () => {
    return (
        <AccessDefender>
            <BaseNavigation/>
            <ManagerNavigation/>
            <main className="w-full bg-base text-base-content">
                <CodeListProvider>
                    <CodeListItemProvider>
                        <ProductStateProvider>
                            <Outlet/>
                        </ProductStateProvider>
                    </CodeListItemProvider>
                </CodeListProvider>
            </main>
            <BaseFooter/>
        </AccessDefender>
    )
}

export default AdminPage;
