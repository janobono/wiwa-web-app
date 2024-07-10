import { Outlet } from 'react-router-dom';

import Footer from '../../component/layout/footer';
import Navigation from '../../component/layout/navigation';
import AuthResourceProvider from '../../context/provider/resource/auth';

const AuthPage = () => {
    return (
        <AuthResourceProvider>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <Footer/>
        </AuthResourceProvider>
    )
}

export default AuthPage;
