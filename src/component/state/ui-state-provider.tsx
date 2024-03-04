import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAppState } from './app-state-provider';
import { useHealthState } from './health-state-provider';
import { ApplicationProperties, CompanyInfo, SingleValueBody, Unit } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_UI = CONTEXT_PATH + 'ui/';

export interface UiState {
    applicationInfo?: string[],
    setApplicationInfo: (applicationInfo?: string[]) => void,
    applicationProperties?: ApplicationProperties,
    setApplicationProperties: (applicationProperties?: ApplicationProperties) => void,
    businessConditions?: string,
    setBusinessConditions: (businessConditions?: string) => void,
    companyInfo?: CompanyInfo,
    setCompanyInfo: (companyInfo?: CompanyInfo) => void,
    cookiesInfo?: string,
    setCookiesInfo: (cookiesInfo?: string) => void,
    gdprInfo?: string,
    setGdprInfo: (gdprInfo?: string) => void,
    logoUrl?: string,
    title?: string,
    setTitle: (title?: string) => void,
    units?: Unit[],
    setUnits: (units?: Unit[]) => void,
    welcomeText?: string,
    setWelcomeText: (welcomeText?: string) => void,
    workingHours?: string,
    setWorkingHours: (workingHours?: string) => void,
    getApplicationImageUrl: (fileName: string) => string,
    getProductImageUrl: (id: number, fileName: string) => string
}

const uiStateContext = createContext<UiState | undefined>(undefined);

const UiStateProvider = ({children}: { children: ReactNode }) => {
    const healthState = useHealthState();
    const appState = useAppState();

    const [applicationInfo, setApplicationInfo] = useState<string[]>();
    const [applicationProperties, setApplicationProperties] = useState<ApplicationProperties>();
    const [businessConditions, setBusinessConditions] = useState<string>();
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();
    const [cookiesInfo, setCookiesInfo] = useState<string>();
    const [gdprInfo, setGdprInfo] = useState<string>();
    const [logoUrl, setLogoUrl] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [units, setUnits] = useState<Unit[]>();
    const [welcomeText, setWelcomeText] = useState<string>();
    const [workingHours, setWorkingHours] = useState<string>();

    useEffect(() => {
        if (healthState?.up) {
            const fetchApplicationInfo = async () => {
                const response = await getData<string[]>(PATH_UI + 'application-info');
                if (response.data) {
                    setApplicationInfo(response.data);
                }
            }
            fetchApplicationInfo().then();

            const fetchApplicationProperties = async () => {
                const response = await getData<ApplicationProperties>(PATH_UI + 'application-properties');
                if (response.data) {
                    setApplicationProperties(response.data);
                }
            }
            fetchApplicationProperties().then();

            const fetchBusinessConditions = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI + 'business-conditions');
                if (response.data) {
                    setBusinessConditions(response.data.value);
                }
            }
            fetchBusinessConditions().then();

            const fetchCompanyInfo = async () => {
                const response = await getData<CompanyInfo>(PATH_UI + 'company-info');
                if (response.data) {
                    setCompanyInfo(response.data);
                }
            }
            fetchCompanyInfo().then();

            const fetchCookiesInfo = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI + 'cookies-info');
                if (response.data) {
                    setCookiesInfo(response.data.value);
                }
            }
            fetchCookiesInfo().then();

            const fetchGdprInfo = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI + 'gdpr-info');
                if (response.data) {
                    setGdprInfo(response.data.value);
                }
            }
            fetchGdprInfo().then();

            setLogoUrl(PATH_UI + 'logo');

            const fetchTitle = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI + 'title');
                if (response.data) {
                    setTitle(response.data.value);
                }
            }
            fetchTitle().then();

            const fetchUnits = async () => {
                const response = await getData<Unit[]>(PATH_UI + 'units');
                if (response.data) {
                    setUnits(response.data);
                }
            }
            fetchUnits().then();

            const fetchWelcomeText = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI + 'welcome-text');
                if (response.data) {
                    setWelcomeText(response.data.value);
                }
            }
            fetchWelcomeText().then();

            const fetchWorkingHours = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI + 'working-hours');
                if (response.data) {
                    setWorkingHours(response.data.value);
                }
            }
            fetchWorkingHours().then();
        }
    }, [healthState?.up]);

    useEffect(() => {
        if (applicationProperties) {
            appState?.setDefaultLocale(applicationProperties.defaultLocale);
        }
    }, [appState, applicationProperties]);

    const getApplicationImageUrl = (fileName: string) => {
        return CONTEXT_PATH + 'ui/application-images' + fileName;
    }

    const getProductImageUrl = (id: number, fileName: string) => {
        return CONTEXT_PATH + 'ui/product-images/' + id + '/' + fileName;
    }

    return (
        <uiStateContext.Provider
            value={
                {
                    applicationInfo,
                    setApplicationInfo,
                    applicationProperties,
                    setApplicationProperties,
                    businessConditions,
                    setBusinessConditions,
                    companyInfo,
                    setCompanyInfo,
                    cookiesInfo,
                    setCookiesInfo,
                    gdprInfo,
                    setGdprInfo,
                    logoUrl,
                    title,
                    setTitle,
                    units,
                    setUnits,
                    welcomeText,
                    setWelcomeText,
                    workingHours,
                    setWorkingHours,
                    getApplicationImageUrl,
                    getProductImageUrl
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
