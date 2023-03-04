import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n, { getLocale, LOCALE, LOCALE_ITEM } from '../locale';

const COOKIES_ENABLED_ITEM = 'COOKIES_ENABLED';

export interface ConfigState {
    cookiesEnabled: boolean,
    setCookiesEnabled: (cookiesEnabled: boolean) => void,
    locales: string[],
    locale: string,
    setLocale: (locale: string) => void
}

const configStateContext = createContext<ConfigState | undefined>(undefined);

const ConfigStateProvider: React.FC<any> = ({children}) => {
    const [cookiesEnabled, setCookiesEnabled] = useState(localStorage.getItem(COOKIES_ENABLED_ITEM) === 'true');
    const [locale, setLocale] = useState(getLocale());

    const setCookiesEnabledToLocalStorage = (cookiesEnabled: boolean) => {
        if (cookiesEnabled) {
            localStorage.setItem(COOKIES_ENABLED_ITEM, cookiesEnabled.toString());
        } else {
            localStorage.clear();
        }
        setCookiesEnabled(cookiesEnabled);
    }

    const setLocaleToLocalStorageAndChangeLanguage = async (locale: string) => {
        if (i18n.language !== locale) {
            await i18n.changeLanguage(locale);
        }
        setLocale(locale);
    }

    useEffect(() => {
        if (cookiesEnabled) {
            localStorage.setItem(LOCALE_ITEM, locale);
        }
    }, [locale, cookiesEnabled])

    return (
        <configStateContext.Provider
            value={
                {
                    cookiesEnabled,
                    setCookiesEnabled: setCookiesEnabledToLocalStorage,
                    locales: [LOCALE.EN, LOCALE.SK],
                    locale,
                    setLocale: setLocaleToLocalStorageAndChangeLanguage
                }
            }
        >{children}
        </configStateContext.Provider>
    );
}

export default ConfigStateProvider;

export const useConfigState = () => {
    return useContext(configStateContext);
}
