import WiwaMenuItem from '../../component/ui/wiwa-menu-item';
import { useResourceState } from '../../state/resource';

const ManagerNavigation = () => {
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col w-full px-5">
            <div className="text-lg md:text-xl font-bold text-center pt-1">
                {resourceState?.manager?.title}
            </div>
            <ul className="menu menu-vertical md:menu-horizontal">
                <WiwaMenuItem label={resourceState?.manager?.codeListsTab} to="/manager/code-lists/index"/>
                <WiwaMenuItem label={resourceState?.manager?.boardsTab} to="/manager/boards"/>
                <WiwaMenuItem label={resourceState?.manager?.edgesTab} to="/manager/edges"/>
                <WiwaMenuItem label={resourceState?.manager?.orderInputsTab} to="/manager/order-inputs"/>
                <WiwaMenuItem label={resourceState?.manager?.ordersTab} to="/manager/orders/index"/>
            </ul>
        </div>
    )
}

export default ManagerNavigation;
