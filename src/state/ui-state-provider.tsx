import React, { createContext, useContext, useEffect, useState } from 'react';

import { ClientResponse, configClient, uiClient } from '../client';
import { ApplicationImage, ApplicationInfo, CompanyInfo, SingleValueBody } from '../client/model';

import { useActuatorState } from './actuator-state-provider';
import { useAuthState } from './auth-state-provider';

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
    changeTitle: (title: string) => Promise<ClientResponse<SingleValueBody<string>> | undefined>,
    changeWelcomeText: (welcomeText: string) => Promise<ClientResponse<SingleValueBody<string>> | undefined>,
    changeApplicationInfo: (applicationInfo: ApplicationInfo) => Promise<ClientResponse<ApplicationInfo> | undefined>,
    changeCompanyInfo: (companyInfo: CompanyInfo) => Promise<ClientResponse<CompanyInfo> | undefined>,
    changeCookiesInfo: (cookiesInfo: string) => Promise<ClientResponse<SingleValueBody<string>> | undefined>,
    changeGdprInfo: (workingHours: string) => Promise<ClientResponse<SingleValueBody<string>> | undefined>,
    changeWorkingHours: (workingHours: string) => Promise<ClientResponse<SingleValueBody<string>> | undefined>,
    addApplicationImage: (applicationImage: File) => Promise<ClientResponse<ApplicationImage> | undefined>,
    getApplicationImages: () => Promise<ClientResponse<ApplicationImage[]> | undefined>
    deleteApplicationImage: (fileName: string) => Promise<ClientResponse<void> | undefined>,
}

const uiStateContext = createContext<UiState | undefined>(undefined);

const UiStateProvider: React.FC<any> = ({children}) => {
    const actuatorState = useActuatorState();
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
        if (actuatorState?.up) {
            uiClient.getTitle().then(response => setTitle(response.data?.value));
            uiClient.getWelcomeText().then(response => setWelcomeText(response.data?.value));
            uiClient.getApplicationInfo().then(response => setApplicationInfo(response.data));
            uiClient.getCompanyInfo().then(response => setCompanyInfo(response.data));
            uiClient.getCookiesInfo().then(response => setCookiesInfo(response.data?.value));
            uiClient.getGdprInfo().then(response => setGdprInfo(response.data?.value));
            uiClient.getWorkingHours().then(response => setWorkingHours(response.data?.value));
        } else {
            setTitle(undefined);
            setWelcomeText(undefined);
            setApplicationInfo(undefined);
            setCompanyInfo(undefined);
            setCookiesInfo(undefined);
            setGdprInfo(undefined);
            setWorkingHours(undefined);
        }
    }, [actuatorState?.up]);

    const changeLogo = async (logo: File): Promise<ClientResponse<void> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postLogo(logo, token);
        if (actuatorState?.up && result.error === undefined) {
            setLogoUrl(undefined);
            uiClient.getLogoUrl().then(value => setLogoUrl(value.data));
        }
        return result;
    }

    const changeTitle = async (title: string): Promise<ClientResponse<SingleValueBody<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postTitle(title, token);
        if (actuatorState?.up && result.data) {
            setTitle(result.data.value);
        }
        return result;
    }

    const changeWelcomeText = async (welcomeText: string): Promise<ClientResponse<SingleValueBody<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postWelcomeText(welcomeText, token);
        if (actuatorState?.up && result.data) {
            setWelcomeText(result.data.value);
        }
        return result;
    }

    const changeApplicationInfo = async (applicationInfo: ApplicationInfo): Promise<ClientResponse<ApplicationInfo> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postApplicationInfo(applicationInfo, token);
        if (actuatorState?.up && result.data) {
            setApplicationInfo(result.data);
        }
        return result;
    }

    const changeCompanyInfo = async (companyInfo: CompanyInfo): Promise<ClientResponse<CompanyInfo> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postCompanyInfo(companyInfo, token);
        if (actuatorState?.up && result.data) {
            setCompanyInfo(result.data);
        }
        return result;
    }

    const changeCookiesInfo = async (cookiesInfo: string): Promise<ClientResponse<SingleValueBody<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postCookiesInfo(cookiesInfo, token);
        if (actuatorState?.up && result.data) {
            setCookiesInfo(result.data.value);
        }
        return result;
    }

    const changeGdprInfo = async (gdprInfo: string): Promise<ClientResponse<SingleValueBody<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postGdprInfo(gdprInfo, token);
        if (actuatorState?.up && result.data) {
            setGdprInfo(result.data.value);
        }
        return result;
    }

    const changeWorkingHours = async (workingHours: string): Promise<ClientResponse<SingleValueBody<string>> | undefined> => {
        const token = authState?.token;
        if (!token) {
            return undefined;
        }
        const result = await configClient.postWorkingHours(workingHours, token);
        if (actuatorState?.up && result.data) {
            setWorkingHours(result.data.value);
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
