import React, { createContext, useContext, useEffect, useState } from 'react';
import { configClient, uiClient, WiwaError } from '../client';
import { useActuatorState } from './actuator-state-provider';
import { useConfigState } from './config-state-provider';
import { useAuthState } from './auth-state-provider';

export interface UiState {
    logoUrl: string | undefined,
    title: string | undefined,
    welcomeText: string | undefined,
    applicationInfo: uiClient.ApplicationInfo | undefined,
    companyInfo: uiClient.CompanyInfo | undefined,
    cookiesInfo: string | undefined,
    gdprInfo: string | undefined,
    workingHours: string | undefined,
    changeLogo: (logo: File) => Promise<WiwaError | undefined>,
    changeTitle: (title: configClient.TitleData) => Promise<WiwaError | undefined>
}

const uiStateContext = createContext<UiState | undefined>(undefined);

const UiStateProvider: React.FC<any> = ({children}) => {
    const actuatorState = useActuatorState();
    const configState = useConfigState();
    const authState = useAuthState();

    const [logoUrl, setLogoUrl] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [welcomeText, setWelcomeText] = useState<string>();
    const [applicationInfo, setApplicationInfo] = useState<uiClient.ApplicationInfo>();
    const [companyInfo, setCompanyInfo] = useState<uiClient.CompanyInfo>();
    const [cookiesInfo, setCookiesInfo] = useState<string>();
    const [gdprInfo, setGdprInfo] = useState<string>();
    const [workingHours, setWorkingHours] = useState<string>();

    useEffect(() => {
        if (actuatorState?.up) {
            uiClient.getLogoUrl().then(value => setLogoUrl(value.data));
        } else {
            setLogoUrl(undefined);
        }
    }, [actuatorState?.up]);

    useEffect(() => {
        if (actuatorState?.up && configState?.locale) {
            uiClient.getTitle(configState.locale).then(value => setTitle(value.data));
            uiClient.getWelcomeText(configState.locale).then(value => setWelcomeText(value.data));
            uiClient.getApplicationInfo(configState.locale).then(value => setApplicationInfo(value.data));
            uiClient.getCompanyInfo(configState.locale).then(value => setCompanyInfo(value.data));
            uiClient.getCookiesInfo(configState.locale).then(value => setCookiesInfo(value.data));
            uiClient.getGdprInfo(configState.locale).then(value => setGdprInfo(value.data));
            uiClient.getWorkingHours(configState.locale).then(value => setWorkingHours(value.data));
        } else {
            setTitle(undefined);
            setWelcomeText(undefined);
            setApplicationInfo(undefined);
            setCompanyInfo(undefined);
            setCookiesInfo(undefined);
            setGdprInfo(undefined);
            setWorkingHours(undefined);
        }
    }, [actuatorState?.up, configState?.locale]);

    const changeLogo = async (logo: File): Promise<WiwaError | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        setLogoUrl(undefined);
        try {
            const clientResponse = await configClient.postLogo(logo, token);
            return clientResponse.error;
        } finally {
            uiClient.getLogoUrl().then(value => setLogoUrl(value.data));
        }
    }

    const changeTitle = async (title: configClient.TitleData): Promise<WiwaError | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        setTitle(undefined);
        try {
            const clientResponse = await configClient.postTitle(title, token);
            return clientResponse.error;
        } finally {
            if (actuatorState?.up && configState?.locale) {
                uiClient.getTitle(configState.locale).then(value => setTitle(value.data));
            }
        }
    }

    return (
        <uiStateContext.Provider
            value={
                {
                    logoUrl,
                    title,
                    welcomeText,
                    applicationInfo,
                    companyInfo,
                    cookiesInfo,
                    gdprInfo,
                    workingHours,
                    changeLogo,
                    changeTitle
                }
            }
        >{children}
        </uiStateContext.Provider>
    );
}

export default UiStateProvider;

export const useUiState = () => {
    return useContext(uiStateContext);
}
