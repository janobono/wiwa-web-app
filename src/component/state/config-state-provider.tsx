import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ApplicationProperties, HealthStatus } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_HEALTH = CONTEXT_PATH + 'actuator/health';
const PATH_APPLICATION_PROPERTIES = CONTEXT_PATH + 'ui/application-properties';

const ACTUATOR_TIMEOUT = 60000;

export interface ConfigState {
    up: boolean,
    defaultLocale?: string,
    tokenExpiresIn?: number,
    appTitle?: string,
    appDescription?: string
}

const configStateContext = createContext<ConfigState | undefined>(undefined);

const ConfigStateProvider = ({children}: { children: ReactNode }) => {
    const [up, setUp] = useState(false);
    const [defaultLocale, setDefaultLocale] = useState<string>();
    const [tokenExpiresIn, setTokenExpiresIn] = useState<number>();
    const [appTitle, setAppTitle] = useState<string>();
    const [appDescription, setAppDescription] = useState<string>();

    const [actuatorCounter, setActuatorCounter] = useState(0);

    useEffect(() => {
        const fetchHealthStatus = async () => {
            const response = await getData<HealthStatus>(PATH_HEALTH);
            if (response.data) {
                setUp(response.data.status === 'UP');
            } else {
                setUp(false);
            }
        }
        fetchHealthStatus().then();
        const timer = setInterval(() => setActuatorCounter(actuatorCounter + 1), ACTUATOR_TIMEOUT);
        return () => clearTimeout(timer);
    }, [actuatorCounter]);

    useEffect(() => {
        if (up) {
            const fetchApplicationProperties = async () => {
                const response = await getData<ApplicationProperties>(PATH_APPLICATION_PROPERTIES);
                if (response.data) {
                    setDefaultLocale(response.data.defaultLocale);
                    setTokenExpiresIn(response.data.tokenExpiresIn);
                    setAppTitle(response.data.appTitle);
                    setAppDescription(response.data.appDescription);
                } else {
                    throw new Error(response.error?.message);
                }
            }
            fetchApplicationProperties().then();
        }
    }, [up]);

    return (
        <configStateContext.Provider
            value={
                {
                    up,
                    defaultLocale,
                    tokenExpiresIn,
                    appTitle,
                    appDescription
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
