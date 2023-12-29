import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaMenuItem from '../../component/ui/wiwa-menu-item';

const ManagerNavigation = () => {
    const resourceState = useResourceState();

    return (
        <div className="flex flex-col w-full px-5">
            <div className="text-lg md:text-xl font-bold text-center pt-1">
                {resourceState?.manager?.title}
            </div>
            <ul className="menu menu-vertical md:menu-horizontal">
                <WiwaMenuItem label={resourceState?.manager?.codeListsTab} to="/manager/code-lists"/>
                <WiwaMenuItem label={resourceState?.manager?.productsTab} to="/manager/products"/>
            </ul>
        </div>
    )
}

export default ManagerNavigation;
