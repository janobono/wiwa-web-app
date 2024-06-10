import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const COOKIES_ENABLED = 'cookies-enabled';
const LOCALE = 'locale';
export const LOCALE_EN = 'en_US';
export const LOCALE_SK = 'sk_SK';

export interface AppState {
    cookiesEnabled?: boolean,
    locale?: string,
    enableCookies: () => void,
    switchLocale: () => void,
    setDefaultLocale: (locale: string) => void
}

const appStateContext = createContext<AppState | undefined>(undefined);

const AppStateProvider = ({children}: { children: ReactNode }) => {
    const [cookiesEnabled, setCookiesEnabled] = useState<boolean>();
    const [defaultLocale, setDefaultLocale] = useState<string>();
    const [locale, setLocale] = useState<string>();

    useEffect(() => {
        setCookiesEnabled(localStorage.getItem(COOKIES_ENABLED) === 'true');
    }, []);

    useEffect(() => {
        if (locale === undefined) {
            setLocale(localStorage.getItem(LOCALE) || defaultLocale || LOCALE_EN);
        }
    }, [defaultLocale, locale]);

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
                    cookiesEnabled,
                    locale,
                    enableCookies,
                    switchLocale,
                    setDefaultLocale
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
