import { NavLink } from 'react-router-dom';
import { PieChart, Settings, ShoppingCart, Tool } from 'react-feather';

import BaseNavigation from './base-navigation';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const Navigation = () => {
    const resourceState = useResourceState();
    const authState = useAuthState();

    return (
        <BaseNavigation>
            <>
                {authState?.adminAuthority &&
                    <NavLink
                        className="btn btn-ghost btn-circle"
                        title={resourceState?.common?.navigation.admin}
                        to="/admin"
                    >
                        <Settings size="24"/>
                    </NavLink>
                }
                {authState?.managerAuthority &&
                    <NavLink
                        className="btn btn-ghost btn-circle"
                        title={resourceState?.common?.navigation.manager}
                        to="/manager"
                    >
                        <PieChart size="24"/>
                    </NavLink>
                }
                {authState?.employeeAuthority &&
                    <NavLink
                        className="btn btn-ghost btn-circle"
                        title={resourceState?.common?.navigation.employee}
                        to="/employee"
                    >
                        <Tool size="24"/>
                    </NavLink>
                }
                {authState?.customerAuthority &&
                    <NavLink
                        className="btn btn-ghost btn-circle"
                        title={resourceState?.common?.navigation.customer}
                        to="/customer"
                    >
                        <ShoppingCart size="24"/>
                    </NavLink>
                }
            </>
        </BaseNavigation>
    )
}

export default Navigation;
