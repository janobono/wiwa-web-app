import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { HealthStatus } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_HEALTH = CONTEXT_PATH + 'actuator/health';
const ACTUATOR_TIMEOUT = 60000;

export interface HealthState {
    up: boolean
}

const healthStateContext = createContext<HealthState | undefined>(undefined);

const HealthStateProvider = ({children}: { children: ReactNode }) => {
    const [up, setUp] = useState(false);
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

    return (
        <healthStateContext.Provider
            value={
                {
                    up
                }
            }
        >{children}
        </healthStateContext.Provider>
    );
}

export default HealthStateProvider;

export const useHealthState = () => {
    return useContext(healthStateContext);
}
