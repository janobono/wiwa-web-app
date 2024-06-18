import { Outlet } from 'react-router-dom';

import BaseFooter from '../../component/layout/base-footer';
import Navigation from '../../component/layout/navigation';

const UiPage = () => {
    return (
        <>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <BaseFooter/>
        </>
    )
}

export default UiPage;
