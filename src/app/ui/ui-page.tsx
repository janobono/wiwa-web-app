import { Outlet } from 'react-router-dom';

import Footer from '../../component/layout/footer';
import Navigation from '../../component/layout/navigation';
import UiResourceProvider from '../../context/provider/resource/ui';

const UiPage = () => {
    return (
        <UiResourceProvider>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <Footer/>
        </UiResourceProvider>
    )
}

export default UiPage;
