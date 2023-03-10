import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ClientResponse } from '../client';
import { getHealthStatus, HealthStatus } from '../client/actuator';

const TIMEOUT = 15000;

export interface ActuatorState {
    up: boolean
}

const actuatorStateContext = createContext<ActuatorState | undefined>(undefined);

const ActuatorStateProvider: React.FC<any> = ({children}) => {
    const firstRun = useRef(true);
    const [up, setUp] = useState(false);
    const [healthResponse, setHealthResponse] = useState<ClientResponse<HealthStatus>>();

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;

            getHealthStatus().then(
                value => {
                    setHealthResponse(value);
                }
            );

            setInterval(async () => {
                setHealthResponse(await getHealthStatus());
            }, TIMEOUT);
        }
    }, []);

    useEffect(() => {
        if (healthResponse && healthResponse.data) {
            setUp(healthResponse.data.status === 'UP');
        } else {
            setUp(false);
        }
    }, [healthResponse]);

    return (
        <actuatorStateContext.Provider
            value={
                {
                    up
                }
            }
        >{children}
        </actuatorStateContext.Provider>
    );
}

export default ActuatorStateProvider;

export const useActuatorState = () => {
    return useContext(actuatorStateContext);
}
