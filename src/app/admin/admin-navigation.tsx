import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaMenuItem from '../../component/ui/wiwa-menu-item';

const AdminNavigation = () => {
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col w-full px-5">
            <div className="text-lg md:text-xl font-bold text-center pt-1">
                {resourceState?.admin?.title}
            </div>
            <ul className="menu menu-vertical md:menu-horizontal">
                <WiwaMenuItem label={resourceState?.admin?.appImagesTab} to="/admin/app-images"/>
                <WiwaMenuItem label={resourceState?.admin?.appInfoTab} to="/admin/app-info"/>
                <WiwaMenuItem label={resourceState?.admin?.baseInfoTab} to="/admin/base-info"/>
                <WiwaMenuItem label={resourceState?.admin?.businessConditionsTab} to="/admin/business-conditions"/>
                <WiwaMenuItem label={resourceState?.admin?.companyInfoTab} to="/admin/company-info"/>
                <WiwaMenuItem label={resourceState?.admin?.cookiesInfoTab} to="/admin/cookies-info"/>
                <WiwaMenuItem label={resourceState?.admin?.gdprInfoTab} to="/admin/gdpr-info"/>
                <WiwaMenuItem label={resourceState?.admin?.usersTab} to="/admin/users"/>
                <WiwaMenuItem label={resourceState?.admin?.workingHoursTab} to="/admin/working-hours"/>
                <WiwaMenuItem label={resourceState?.admin?.unitsTab} to="/admin/units"/>
            </ul>
        </div>
    )
}

export default AdminNavigation;
