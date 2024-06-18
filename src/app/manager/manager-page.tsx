import { Outlet } from 'react-router-dom';
import AccessDefender from '../../component/layout/access-defender';
import BaseFooter from '../../component/layout/base-footer';
import Navigation from '../../component/layout/navigation';

const AdminPage = () => {
    return (
        <AccessDefender>
            <Navigation/>
            <main className="w-full bg-base text-base-content">
                <Outlet/>
            </main>
            <BaseFooter/>
        </AccessDefender>
    )
}

export default AdminPage;
