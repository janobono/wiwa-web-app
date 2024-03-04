import { createContext, ReactNode, useContext, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { useUiState } from './ui-state-provider';
import {
    ApplicationImage,
    ApplicationProperties,
    CompanyInfo,
    SingleValueBody,
    Unit
} from '../../model/service';
import { ClientResponse, CONTEXT_PATH, postData, postFile } from '../../data';

const PATH_CONFIG = CONTEXT_PATH + 'config/';

export interface ConfigState {
    busy: boolean,
    setApplicationInfo: (applicationInfo: string[]) => Promise<ClientResponse<string[]>>,
    setApplicationProperties: (applicationProperties: ApplicationProperties) => Promise<ClientResponse<ApplicationProperties>>,
    setBusinessConditions: (businessConditions: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    setCompanyInfo: (companyInfo: CompanyInfo) => Promise<ClientResponse<CompanyInfo>>,
    setCookiesInfo: (cookiesInfo: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    setGdprInfo: (gdprInfo: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    setLogo: (file: File) => Promise<ClientResponse<ApplicationImage>>
    setTitle: (title: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    setUnits: (units: Unit[]) => Promise<ClientResponse<Unit[]>>,
    setWelcomeText: (welcomeText: string) => Promise<ClientResponse<SingleValueBody<string>>>,
    setWorkingHours: (workingHours: string) => Promise<ClientResponse<SingleValueBody<string>>>
}

const configStateContext = createContext<ConfigState | undefined>(undefined);

const ConfigStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();
    const uiState = useUiState();

    const [busy, setBusy] = useState(false);

    const setApplicationInfo = async (applicationInfo: string[]) => {
        setBusy(true);
        try {
            const response = await postData<string[]>(
                PATH_CONFIG + 'application-info',
                applicationInfo,
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setApplicationInfo(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setApplicationProperties = async (applicationProperties: ApplicationProperties) => {
        setBusy(true);
        try {
            const response = await postData<ApplicationProperties>(
                PATH_CONFIG + 'application-properties',
                applicationProperties,
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setApplicationProperties(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setBusinessConditions = async (businessConditions: string) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<string>>(
                PATH_CONFIG + 'business-conditions',
                {value: businessConditions},
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setBusinessConditions(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setCompanyInfo = async (companyInfo: CompanyInfo) => {
        setBusy(true);
        try {
            const response = await postData<CompanyInfo>(
                PATH_CONFIG + 'company-info',
                companyInfo,
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setCompanyInfo(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setCookiesInfo = async (cookiesInfo: string) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<string>>(
                PATH_CONFIG + 'cookies-info',
                {value: cookiesInfo},
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setCookiesInfo(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setGdprInfo = async (gdprInfo: string) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<string>>(
                PATH_CONFIG + 'gdpr-info',
                {value: gdprInfo},
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setGdprInfo(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setLogo = async (file: File) => {
        setBusy(true);
        try {
            return await postFile<ApplicationImage>(
                PATH_CONFIG + 'logo',
                file,
                authState?.accessToken || ''
            );
        } finally {
            setBusy(false);
        }
    }

    const setTitle = async (title: string) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<string>>(
                PATH_CONFIG + 'title',
                {value: title},
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setTitle(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setUnits = async (units: Unit[]) => {
        setBusy(true);
        try {
            const response = await postData<Unit[]>(
                PATH_CONFIG + 'units',
                units,
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setUnits(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setWelcomeText = async (welcomeText: string) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<string>>(
                PATH_CONFIG + 'welcome-text',
                {value: welcomeText},
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setWelcomeText(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setWorkingHours = async (workingHours: string) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<string>>(
                PATH_CONFIG + 'working-hours',
                {value: workingHours},
                authState?.accessToken
            );
            if (response.data) {
                uiState?.setWorkingHours(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <configStateContext.Provider
            value={
                {
                    busy,
                    setApplicationInfo,
                    setApplicationProperties,
                    setBusinessConditions,
                    setCompanyInfo,
                    setCookiesInfo,
                    setGdprInfo,
                    setLogo,
                    setTitle,
                    setUnits,
                    setWelcomeText,
                    setWorkingHours
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
