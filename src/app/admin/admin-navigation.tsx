import WiwaMenuItem from '../../component/ui/wiwa-menu-item';
import { useResourceState } from '../../state/resource';

const AdminNavigation = () => {
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col w-full px-5">
            <div className="text-lg md:text-xl font-bold text-center pt-1">
                {resourceState?.admin?.title}
            </div>
            <ul className="menu menu-vertical md:menu-horizontal">
                <WiwaMenuItem label={resourceState?.admin?.applicationImagesTab} to="/admin/application-images"/>
                <WiwaMenuItem label={resourceState?.admin?.baseInfoTab} to="/admin/base-info"/>
                <WiwaMenuItem label={resourceState?.admin?.companyInfoTab} to="/admin/company-info"/>
                <WiwaMenuItem label={resourceState?.admin?.mailFormatTab} to="/admin/mail-format"/>
                <WiwaMenuItem label={resourceState?.admin?.orderFormatTab} to="/admin/order-format"/>
                <WiwaMenuItem label={resourceState?.admin?.textInfoTab} to="/admin/text-info"/>
                <WiwaMenuItem label={resourceState?.admin?.unitsTab} to="/admin/units"/>
                <WiwaMenuItem label={resourceState?.admin?.usersTab} to="/admin/users"/>
            </ul>
        </div>
    )
}

export default AdminNavigation;
