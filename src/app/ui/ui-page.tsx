import { Outlet } from 'react-router-dom';

import Footer from '../../component/layout/footer';
import Navigation from '../../component/layout/navigation';

const UiPage = () => {
    return (
        <>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default UiPage;
