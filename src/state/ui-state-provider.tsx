import React, { createContext, useContext, useEffect, useState } from 'react';
import { uiClient } from '../client';
import { useActuatorState } from './actuator-state-provider';
import { useConfigState } from './config-state-provider';

export interface UiState {
    logoUrl: string | undefined,
    title: string | undefined,
    welcomeText: string | undefined,
    applicationInfo: uiClient.ApplicationInfo | undefined,
    companyInfo: uiClient.CompanyInfo | undefined,
    cookiesInfo: string | undefined,
    gdprInfo: string | undefined,
    workingHours: string | undefined
}

const uiStateContext = createContext<UiState>({
    logoUrl: undefined,
    title: undefined,
    welcomeText: undefined,
    applicationInfo: undefined,
    companyInfo: undefined,
    cookiesInfo: undefined,
    gdprInfo: undefined,
    workingHours: undefined
});

const UiStateProvider: React.FC<any> = ({children}) => {
    const actuatorState = useActuatorState();
    const configState = useConfigState();

    const [logoUrl, setLogoUrl] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [welcomeText, setWelcomeText] = useState<string>();
    const [applicationInfo, setApplicationInfo] = useState<uiClient.ApplicationInfo>();
    const [companyInfo, setCompanyInfo] = useState<uiClient.CompanyInfo>();
    const [cookiesInfo, setCookiesInfo] = useState<string>();
    const [gdprInfo, setGdprInfo] = useState<string>();
    const [workingHours, setWorkingHours] = useState<string>();

    useEffect(() => {
        if (actuatorState.up) {
            uiClient.getLogoUrl().then(value => setLogoUrl(value.data));
        } else {
            setLogoUrl(undefined);
        }
    }, [actuatorState.up]);

    useEffect(() => {
        if (actuatorState.up) {
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
    }, [actuatorState.up, configState.locale]);

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
                    workingHours
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
