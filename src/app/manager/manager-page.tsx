import { Outlet } from 'react-router-dom';

import { Authority } from '../../api/model';
import AuthDefender from '../../component/layout/auth-defender';
import Footer from '../../component/layout/footer';
import Navigation from '../../component/layout/navigation';
import ManagerResourceProvider from '../../context/provider/resource/manager';

const AdminPage = () => {
    return (
        <ManagerResourceProvider>
            <AuthDefender authority={Authority.W_MANAGER}>
                <Navigation/>
                <main className="w-full bg-base text-base-content">
                    <Outlet/>
                </main>
                <Footer/>
            </AuthDefender>
        </ManagerResourceProvider>
    )
}

export default AdminPage;
