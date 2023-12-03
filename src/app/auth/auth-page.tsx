import { Outlet } from 'react-router-dom';

import BaseFooter from '../../component/layout/base-footer';
import BaseNavigation from '../../component/layout/base-navigation';

const AuthPage = () => {
    return (
        <>
            <BaseNavigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <BaseFooter/>
        </>
    )
}

export default AuthPage;
