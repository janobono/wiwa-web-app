import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useConfigState } from './config-state-provider';

const COOKIES_ENABLED = 'cookies-enabled';
const LOCALE = 'locale';
export const LOCALE_EN = 'en_US';
export const LOCALE_SK = 'sk_SK';

export interface AppState {
    enableCookies: () => void,
    switchLocale: () => void,
    cookiesEnabled?: boolean,
    locale?: string,
}

const appStateContext = createContext<AppState | undefined>(undefined);

const AppStateProvider = ({children}: { children: ReactNode }) => {
    const configState = useConfigState();

    const [cookiesEnabled, setCookiesEnabled] = useState<boolean>();
    const [locale, setLocale] = useState<string>();

    useEffect(() => {
        if (configState?.up) {
            setCookiesEnabled(localStorage.getItem(COOKIES_ENABLED) === 'true');
        }
    }, [configState?.up]);

    useEffect(() => {
        if (configState?.defaultLocale) {
            if (locale === undefined) {
                setLocale(localStorage.getItem(LOCALE) || configState?.defaultLocale);
            }
        }
    }, [configState?.defaultLocale]);

    const enableCookies = () => {
        localStorage.setItem(COOKIES_ENABLED, 'true');
        if (locale) {
            localStorage.setItem(LOCALE, locale);
        }
        setCookiesEnabled(true);
    }

    const switchLocale = () => {
        const newLocale = locale === LOCALE_EN ? LOCALE_SK : LOCALE_EN;
        if (cookiesEnabled) {
            localStorage.setItem(LOCALE, newLocale);
        }
        setLocale(newLocale);
    }

    return (
        <appStateContext.Provider
            value={
                {
                    enableCookies,
                    switchLocale,
                    cookiesEnabled,
                    locale
                }
            }
        >{children}
        </appStateContext.Provider>
    )
}

export default AppStateProvider;

export const useAppState = () => {
    return useContext(appStateContext);
}
