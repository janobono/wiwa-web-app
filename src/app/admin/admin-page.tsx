import { Outlet } from 'react-router-dom';

import { Authority } from '../../api/model';
import AuthDefender from '../../component/layout/auth-defender';
import Footer from '../../component/layout/footer';
import Navigation from '../../component/layout/navigation';
import AdminResourceProvider from '../../context/provider/resource/admin';

const AdminPage = () => {
    return (
        <AdminResourceProvider>
            <AuthDefender authority={Authority.W_ADMIN}>
                <Navigation/>
                <main className="w-full bg-base text-base-content">
                    <Outlet/>
                </main>
                <Footer/>
            </AuthDefender>
        </AdminResourceProvider>
    )
}

export default AdminPage;
