import { useContext, useEffect, useState } from 'react';
import { Lock, LogIn, PieChart, RefreshCw, Settings, ShoppingCart, Tool, Unlock, User } from 'react-feather';
import { NavLink } from 'react-router-dom';

import WiwaButton from '../ui/wiwa-button';
import WiwaMenuItem from '../ui/wiwa-menu-item';
import FlagSk from '../ui/icon/flag-sk';
import FlagUs from '../ui/icon/flag-us';
import { getApplicationProperties, getTitle } from '../../api/controller/ui';
import { ApplicationProperties } from '../../api/model/application';
import { AppContext, AuthContext, CommonResourceContext, HealthContext } from '../../context';
import { LOCALE_EN } from '../../context/provider/app';

const Navigation = () => {
    const authState = useContext(AuthContext);

    const [title, setTitle] = useState<string>();

    useEffect(() => {
        getTitle().then(data => setTitle(data.data?.value))
    }, []);

    return (
        <nav className="flex flex-col w-full text-base-content">
            <div className="flex flex-col md:flex-row w-full bg-base-300 py-10 px-2">
                <NavLink
                    className="btn btn-ghost normal-case text-base md:text-xl font-bold"
                    to="/"
                >{title}
                </NavLink>
                <div className="grow"/>
                {authState?.adminAuthority && <AdminNav/>}
                {authState?.managerAuthority && <ManagerNav/>}
                {authState?.employeeAuthority && <EmployeeNav/>}
                {authState?.customerAuthority && <CustomerNav/>}
                <AuthNav/>
                <LocaleSwitch/>
            </div>
            <div className={`flex flex-row w-full p-1 ${authState?.authUser ? 'visible' : 'invisible'}`}>
                {(authState?.adminAuthority || authState?.managerAuthority) &&
                    <NavigationSwitch/>
                }
                <div className="grow"/>
                <UserCard/>
            </div>
            <hr className={`h-px bg-gray-200 border-0 dark:bg-gray-700 ${authState?.authUser ? 'visible' : 'invisible'}`}/>
        </nav>
    )
}

export default Navigation;

const AuthNav = () => {
    const authState = useContext(AuthContext);
    const healthState = useContext(HealthContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [menuDisplay, setMenuDisplay] = useState(true);
    const [displayMenuStyle, setDisplayMenuStyle] = useState('');

    const showMenu = () => {
        setMenuDisplay(!menuDisplay)
        if (menuDisplay) {
            setDisplayMenuStyle('')
        } else {
            setDisplayMenuStyle('none')
        }
    }

    return (
        <div className="dropdown dropdown-end" onClick={showMenu}>
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                title={!authState?.accessExpired ? commonResourceState?.resource?.navigation.authNav.title : commonResourceState?.resource?.navigation.authNav.signIn}
            >
                {!authState?.accessExpired ? <User size="24"/> : <LogIn size="24"/>}
            </label>
            <ul tabIndex={0}
                style={{display: displayMenuStyle}}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44">
                {authState?.accessExpired &&
                    <>
                        <WiwaMenuItem
                            label={commonResourceState?.resource?.navigation.authNav.signIn}
                            to="/auth/sign-in"
                        />
                        {!healthState?.maintenance &&
                            <WiwaMenuItem
                                label={commonResourceState?.resource?.navigation.authNav.signUp}
                                to="/auth/sign-up"
                            />
                        }
                    </>
                }
                {!authState?.accessExpired &&
                    <>
                        {authState?.customerAuthority &&
                            <>
                                <WiwaMenuItem
                                    label={commonResourceState?.resource?.navigation.authNav.changeDetails}
                                    to="/auth/change-details"
                                />
                                <WiwaMenuItem
                                    label={commonResourceState?.resource?.navigation.authNav.changeEmail}
                                    to="/auth/change-email"
                                />
                                <WiwaMenuItem
                                    label={commonResourceState?.resource?.navigation.authNav.changePassword}
                                    to="/auth/change-password"
                                />
                            </>
                        }
                        <WiwaMenuItem
                            label={commonResourceState?.resource?.navigation.authNav.signOut}
                            to="/auth/sign-out"
                        />
                    </>
                }
            </ul>
        </div>
    )
}

const AdminNav = () => {
    const commonResourceState = useContext(CommonResourceContext);

    const [menuDisplay, setMenuDisplay] = useState(true);
    const [displayMenuStyle, setDisplayMenuStyle] = useState('');

    const showMenu = () => {
        setMenuDisplay(!menuDisplay)
        if (menuDisplay) {
            setDisplayMenuStyle('')
        } else {
            setDisplayMenuStyle('none')
        }
    }

    return (
        <div className="dropdown dropdown-end" onClick={showMenu}>
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                title={commonResourceState?.resource?.navigation.adminNav.title}
            >
                <Settings size="24"/>
            </label>
            <ul tabIndex={0}
                style={{display: displayMenuStyle}}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44">
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.applicationImages}
                    to="/admin/application-images"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.baseInfo}
                    to="/admin/base-info"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.companyInfo}
                    to="/admin/company-info"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.mailFormat}
                    to="/admin/mail-format"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.orderFormat}
                    to="/admin/order-format"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.textInfo}
                    to="/admin/text-info"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.units}
                    to="/admin/units"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.adminNav.users}
                    to="/admin/users"
                />
            </ul>
        </div>
    )
}

const ManagerNav = () => {
    const commonResourceState = useContext(CommonResourceContext);

    const [menuDisplay, setMenuDisplay] = useState(true);
    const [displayMenuStyle, setDisplayMenuStyle] = useState('');

    const showMenu = () => {
        setMenuDisplay(!menuDisplay)
        if (menuDisplay) {
            setDisplayMenuStyle('')
        } else {
            setDisplayMenuStyle('none')
        }
    }

    return (
        <div className="dropdown dropdown-end" onClick={showMenu}>
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                title={commonResourceState?.resource?.navigation.managerNav.title}
            >
                <PieChart size="24"/>
            </label>
            <ul tabIndex={0}
                style={{display: displayMenuStyle}}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44">
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.managerNav.codeLists}
                    to="/manager/code-lists/index"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.managerNav.categories}
                    to="/manager/categories"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.managerNav.boards}
                    to="/manager/boards/index"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.managerNav.edges}
                    to="/manager/edges/index"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.managerNav.orderInputs}
                    to="/manager/order-inputs"
                />
                <WiwaMenuItem
                    label={commonResourceState?.resource?.navigation.managerNav.orders}
                    to="/manager/orders/index"
                />
            </ul>
        </div>
    )
}

const EmployeeNav = () => {
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <NavLink
            className="btn btn-ghost btn-circle"
            title={commonResourceState?.resource?.navigation.employeeNav.title}
            to="/employee"
        >
            <Tool size="24"/>
        </NavLink>
    )
}

const CustomerNav = () => {
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <NavLink
            className="btn btn-ghost btn-circle"
            title={commonResourceState?.resource?.navigation.customerNav.title}
            to="/customer"
        >
            <ShoppingCart size="24"/>
        </NavLink>
    )
}

const NavigationSwitch = () => {
    const authState = useContext(AuthContext);
    const healthState = useContext(HealthContext);
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <div className="flex flex-row pl-2 items-center justify-center">
            <WiwaButton
                className="btn-ghost btn-circle"
                title={commonResourceState?.resource?.navigation.maintenanceSwitch}
                onClick={() => healthState?.setMaintenance(!healthState?.maintenance, authState?.authToken?.accessToken)}
            >
                {healthState?.maintenance
                    ? <Lock/>
                    : <Unlock/>
                }
            </WiwaButton>
        </div>
    )
}

const LocaleSwitch = () => {
    const appState = useContext(AppContext);
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <div className="flex flex-row pl-2 items-center justify-center">
            <WiwaButton
                className="btn-ghost btn-circle"
                title={commonResourceState?.resource?.navigation.localeSwitch}
                onClick={() => appState?.switchLocale()}
            >
                {appState?.locale === LOCALE_EN
                    ? <FlagSk/>
                    : <FlagUs/>
                }
            </WiwaButton>
        </div>
    )
}

const UserCard = () => {
    const authState = useContext(AuthContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [applicationProperties, setApplicationProperties] = useState<ApplicationProperties>();
    const [value, setValue] = useState(0);

    useEffect(() => {
        getApplicationProperties().then(data => setApplicationProperties(data.data));
    }, []);

    useEffect(() => {
        if (!authState?.accessExpired && authState?.timeToAccessExpiration) {
            const MAX_TIME = (applicationProperties?.tokenExpiresIn || 0) * 60 * 1000;
            if (authState.timeToAccessExpiration > MAX_TIME) {
                setValue(100);
            } else {
                const result = authState.timeToAccessExpiration / MAX_TIME * 100;
                setValue(result > 1 ? result : 0);
            }
        } else {
            setValue(0);
        }
    }, [applicationProperties?.tokenExpiresIn, authState?.accessExpired, authState?.timeToAccessExpiration]);

    return (
        <div
            className={`flex flex-col gap-1 justify-center items-center px-1 ${authState?.authUser ? 'visible' : 'invisible'}`}>
            <button
                className="btn btn-xs w-16"
                title={commonResourceState?.resource?.navigation.refreshToken}
                disabled={authState?.accessExpired}
                onClick={() => {
                    authState?.refreshAuth();
                }}
            ><RefreshCw size={12}/></button>
            <progress
                className={'progress w-16 ' + (value > 50 ? 'progress-primary' : 'progress-accent')}
                value={value}
                max="100"
            />
        </div>
    );
}
