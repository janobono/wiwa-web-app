import { ReactNode, useEffect, useState } from 'react';
import { Lock, LogIn, RefreshCw, Unlock, User } from 'react-feather';
import { NavLink } from 'react-router-dom';

import WiwaButton from '../ui/wiwa-button';
import WiwaMenuItem from '../ui/wiwa-menu-item';
import FlagSk from '../ui/icon/flag-sk';
import FlagUs from '../ui/icon/flag-us';
import { getApplicationProperties, getTitle } from '../../api/controller/ui';
import { ApplicationProperties } from '../../api/model/application';
import { LOCALE_EN, useAppState } from '../../state/app';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';
import { useHealthState } from '../../state/health';

const BaseNavigation = ({children}: { children?: ReactNode }) => {
    const authState = useAuthState();

    const [title, setTitle] = useState<string>();

    useEffect(() => {
        getTitle().then(data => setTitle(data.data?.value))
    }, []);

    return (
        <nav className="flex flex-col w-full text-base-content">
            <div className="flex flex-row w-full bg-base-300 py-10 px-2">
                <NavLink
                    className="btn btn-ghost normal-case text-base md:text-xl font-bold"
                    to="/"
                >{title}
                </NavLink>
                <div className="grow"/>
                <AuthNav/>
                <LocaleSwitch/>
            </div>
            <div className={`flex flex-row w-full p-1 ${authState?.authUser ? 'visible' : 'invisible'}`}>
                {(authState?.adminAuthority || authState?.managerAuthority) &&
                    <NavidationSwitch/>
                }
                <div className="grow"/>
                {children}
                <UserCard/>
            </div>
            <hr className={`h-px bg-gray-200 border-0 dark:bg-gray-700 ${authState?.authUser ? 'visible' : 'invisible'}`}/>
        </nav>
    )
}

export default BaseNavigation;

const AuthNav = () => {
    const authState = useAuthState();
    const healthState = useHealthState();
    const resourceState = useResourceState();

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
        <>
            <div className="dropdown dropdown-end" onClick={showMenu}>
                <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle"
                    title={!authState?.accessExpired ? resourceState?.common?.baseNavigation.authNav.title : resourceState?.common?.baseNavigation.authNav.signIn}
                >
                    {!authState?.accessExpired ? <User size="24"/> : <LogIn size="24"/>}
                </label>
                <ul tabIndex={0}
                    style={{display: displayMenuStyle}}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44">
                    {authState?.accessExpired &&
                        <>
                            <WiwaMenuItem
                                label={resourceState?.common?.baseNavigation.authNav.signIn}
                                to="/auth/sign-in"
                            />
                            {!healthState?.maintenance &&
                                <WiwaMenuItem
                                    label={resourceState?.common?.baseNavigation.authNav.signUp}
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
                                        label={resourceState?.common?.baseNavigation.authNav.changeDetails}
                                        to="/auth/change-details"
                                    />
                                    <WiwaMenuItem
                                        label={resourceState?.common?.baseNavigation.authNav.changeEmail}
                                        to="/auth/change-email"
                                    />
                                    <WiwaMenuItem
                                        label={resourceState?.common?.baseNavigation.authNav.changePassword}
                                        to="/auth/change-password"
                                    />
                                </>
                            }
                            <WiwaMenuItem
                                label={resourceState?.common?.baseNavigation.authNav.signOut}
                                to="/auth/sign-out"
                            />
                        </>
                    }
                </ul>
            </div>
        </>
    )
}

const NavidationSwitch = () => {
    const authState = useAuthState();
    const healthState = useHealthState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-row pl-2 items-center justify-center">
            <WiwaButton
                className="btn-ghost btn-circle"
                title={resourceState?.common?.baseNavigation.maintenanceSwitch}
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
    const appState = useAppState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-row pl-2 items-center justify-center">
            <WiwaButton
                className="btn-ghost btn-circle"
                title={resourceState?.common?.baseNavigation.localeSwitch}
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
    const authState = useAuthState();
    const resourceState = useResourceState();

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
                title={resourceState?.common?.baseNavigation.refreshToken}
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
