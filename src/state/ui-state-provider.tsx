import React, { createContext, useContext, useEffect, useState } from 'react';

import { ClientResponse, configClient, uiClient } from '../client';
import { ApplicationImage, ApplicationInfo, CompanyInfo, LocaleData } from '../client/model';

import { useActuatorState } from './actuator-state-provider';
import { useConfigState } from './config-state-provider';
import { useAuthState } from './auth-state-provider';
import { toLanguage } from '../locale';

export interface UiState {
    logoUrl?: string,
    title?: string,
    welcomeText?: string,
    applicationInfo?: ApplicationInfo,
    companyInfo?: CompanyInfo,
    cookiesInfo?: string,
    gdprInfo?: string,
    workingHours?: string,
    changeLogo: (logo: File) => Promise<ClientResponse<void> | undefined>,
    changeTitle: (title: LocaleData<string>) => Promise<ClientResponse<LocaleData<string>> | undefined>,
    changeWelcomeText: (welcomeText: LocaleData<string>) => Promise<ClientResponse<LocaleData<string>> | undefined>,
    changeApplicationInfo: (applicationInfo: LocaleData<ApplicationInfo>) => Promise<ClientResponse<LocaleData<ApplicationInfo>> | undefined>,
    changeCompanyInfo: (companyInfo: LocaleData<CompanyInfo>) => Promise<ClientResponse<LocaleData<CompanyInfo>> | undefined>,
    changeCookiesInfo: (cookiesInfo: LocaleData<string>) => Promise<ClientResponse<LocaleData<string>> | undefined>,
    changeGdprInfo: (workingHours: LocaleData<string>) => Promise<ClientResponse<LocaleData<string>> | undefined>,
    changeWorkingHours: (workingHours: LocaleData<string>) => Promise<ClientResponse<LocaleData<string>> | undefined>,
    addApplicationImage: (applicationImage: File) => Promise<ClientResponse<ApplicationImage> | undefined>,
    getApplicationImages: () => Promise<ClientResponse<ApplicationImage[]> | undefined>
    deleteApplicationImage: (fileName: string) => Promise<ClientResponse<void> | undefined>,
}

const uiStateContext = createContext<UiState | undefined>(undefined);

const UiStateProvider: React.FC<any> = ({children}) => {
    const actuatorState = useActuatorState();
    const configState = useConfigState();
    const authState = useAuthState();

    const [logoUrl, setLogoUrl] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [welcomeText, setWelcomeText] = useState<string>();
    const [applicationInfo, setApplicationInfo] = useState<ApplicationInfo>();
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();
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

    const changeLogo = async (logo: File): Promise<ClientResponse<void> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postLogo(logo, token);
        if (actuatorState?.up && configState?.locale && result.error === undefined) {
            setLogoUrl(undefined);
            uiClient.getLogoUrl().then(value => setLogoUrl(value.data));
        }
        return result;
    }

    const changeTitle = async (title: LocaleData<string>): Promise<ClientResponse<LocaleData<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postTitle(title, token);
        if (actuatorState?.up && configState?.locale && result.data) {
            const item = result.data.items.find(item => item.language === toLanguage(configState.locale));
            if (item) {
                setTitle(item.data);
            }
        }
        return result;
    }

    const changeWelcomeText = async (welcomeText: LocaleData<string>): Promise<ClientResponse<LocaleData<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postWelcomeText(welcomeText, token);
        if (actuatorState?.up && configState?.locale && result.data) {
            const item = result.data.items.find(item => item.language === toLanguage(configState.locale));
            if (item) {
                setWelcomeText(item.data);
            }
        }
        return result;
    }

    const changeApplicationInfo = async (applicationInfo: LocaleData<ApplicationInfo>): Promise<ClientResponse<LocaleData<ApplicationInfo>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postApplicationInfo(applicationInfo, token);
        if (actuatorState?.up && configState?.locale && result.data) {
            const item = result.data.items.find(item => item.language === toLanguage(configState.locale));
            if (item) {
                setApplicationInfo(item.data);
            }
        }
        return result;
    }

    const changeCompanyInfo = async (companyInfo: LocaleData<CompanyInfo>): Promise<ClientResponse<LocaleData<CompanyInfo>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postCompanyInfo(companyInfo, token);
        if (actuatorState?.up && configState?.locale && result.data) {
            const item = result.data.items.find(item => item.language === toLanguage(configState.locale));
            if (item) {
                setCompanyInfo(item.data);
            }
        }
        return result;
    }

    const changeCookiesInfo = async (cookiesInfo: LocaleData<string>): Promise<ClientResponse<LocaleData<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postCookiesInfo(cookiesInfo, token);
        if (actuatorState?.up && configState?.locale && result.data) {
            const item = result.data.items.find(item => item.language === toLanguage(configState.locale));
            if (item) {
                setCookiesInfo(item.data);
            }
        }
        return result;
    }

    const changeGdprInfo = async (gdprInfo: LocaleData<string>): Promise<ClientResponse<LocaleData<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postGdprInfo(gdprInfo, token);
        if (actuatorState?.up && configState?.locale && result.data) {
            const item = result.data.items.find(item => item.language === toLanguage(configState.locale));
            if (item) {
                setGdprInfo(item.data);
            }
        }
        return result;
    }

    const changeWorkingHours = async (workingHours: LocaleData<string>): Promise<ClientResponse<LocaleData<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postWorkingHours(workingHours, token);
        if (actuatorState?.up && configState?.locale && result.data) {
            const item = result.data.items.find(item => item.language === toLanguage(configState.locale));
            if (item) {
                setWorkingHours(item.data);
            }
        }
        return result;
    }

    const addApplicationImage = async (applicationImage: File): Promise<ClientResponse<ApplicationImage> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        return await configClient.postApplicationImage(applicationImage, token);
    }

    const getApplicationImages = async (): Promise<ClientResponse<ApplicationImage[]> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const clientResponse = await configClient.getApplicationImages(token);
        if (clientResponse.data) {
            return {data: clientResponse.data.content, error: clientResponse.error}
        }
        return undefined;
    }

    const deleteApplicationImage = async (fileName: string): Promise<ClientResponse<void> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        return configClient?.deleteApplicationImage(fileName, token);
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
                    changeTitle,
                    changeWelcomeText,
                    changeApplicationInfo,
                    changeCompanyInfo,
                    changeCookiesInfo,
                    changeGdprInfo,
                    changeWorkingHours,
                    addApplicationImage,
                    getApplicationImages,
                    deleteApplicationImage
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
