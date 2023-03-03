import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, LogIn, LogOut, Settings, User, UserPlus, Users } from 'react-feather';

import { LOCALE, RESOURCE } from '../../locale';
import { hasManagerAuthority, useAuthState, useConfigState } from '../../state';

import { WiwaButton, WiwaNavButton, WiwaNavLink } from '../ui';
import { FlagSk, FlagUs } from '../ui/icon';

const Navigation: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const configState = useConfigState();
    const authState = useAuthState();

    return (
        <>
            <CookiesConsent/>
            <nav className="w-full">
                <div className="border-t border-gray-400 bg-gray-200">
                    <div className="container px-5 mx-auto">
                        <div className="flex gap-1 items-center">
                            <WiwaNavButton
                                title={t(RESOURCE.ACTION.HOME).toString()}
                                to="/"
                            >
                                <Home size="24"/>
                            </WiwaNavButton>
                            <WiwaButton
                                variant="light"
                                title={t(RESOURCE.ACTION.SWITCH_LOCALE).toString()}
                                onClick={() => configState.setLocale(configState.locale === LOCALE.EN ? LOCALE.SK : LOCALE.EN)}
                            >
                                {configState.locale === LOCALE.EN
                                    ? <FlagSk/>
                                    : <FlagUs/>
                                }
                            </WiwaButton>
                            <div className="flex-grow"/>
                            {hasManagerAuthority(authState?.user) &&
                                <>
                                    <WiwaNavButton
                                        title={t(RESOURCE.ACTION.CONFIG).toString()}
                                        to="/config"
                                    >
                                        <Settings size="24"/>
                                    </WiwaNavButton>

                                    <WiwaNavButton
                                        title={t(RESOURCE.ACTION.USERS).toString()}
                                        to="/users"
                                    >
                                        <Users size="24"/>
                                    </WiwaNavButton>
                                </>
                            }
                            {authState?.user ?
                                <>
                                    <WiwaNavButton
                                        title={t(RESOURCE.ACTION.USER_ACCOUNT).toString()}
                                        to="/auth/user-account"
                                    >
                                        <User size="24"/>
                                    </WiwaNavButton>
                                    <WiwaButton
                                        variant="light"
                                        title={t(RESOURCE.ACTION.SIGN_OUT).toString()}
                                        onClick={() => authState?.signOut()}
                                    >
                                        <LogOut size="24"/>
                                    </WiwaButton>
                                </>
                                :
                                <>
                                    <WiwaNavButton
                                        title={t(RESOURCE.ACTION.SIGN_IN).toString()}
                                        to="/auth/sign-in"
                                    >
                                        <LogIn size="24"/>
                                    </WiwaNavButton>
                                    <WiwaNavButton
                                        title={t(RESOURCE.ACTION.SIGN_UP).toString()}
                                        to="/auth/sign-up"
                                    >
                                        <UserPlus size="24"/>
                                    </WiwaNavButton>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navigation;

const CookiesConsent: React.FC = () => {
    const {t} = useTranslation();
    const configState = useConfigState();

    if (configState.cookiesEnabled) {
        return null;
    }

    return (
        <div className="bg-yellow-400 p-1">
            <div className="flex md:flex-row w-full justify-center items-center">
                <span className="text-xs px-1">
                    <span>{t(RESOURCE.COMPONENT.LAYOUT.NAVIGATION.COOKIES_CONSENT.TEXT)}</span>
                    <span> </span>
                    <WiwaNavLink
                        to="/ui/cookies-info">{t(RESOURCE.COMPONENT.LAYOUT.NAVIGATION.COOKIES_CONSENT.LINK)}</WiwaNavLink>
                </span>
                <WiwaButton
                    size="xs"
                    pill={true}
                    variant="light"
                    onClick={() => configState.setCookiesEnabled(true)}
                >
                    {t(RESOURCE.COMPONENT.LAYOUT.NAVIGATION.COOKIES_CONSENT.ACTION)}
                </WiwaButton>
            </div>
        </div>
    );
}
