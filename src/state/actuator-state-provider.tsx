import React, { createContext, useContext, useEffect, useState } from 'react';
import { actuatorClient } from '../client';

const TIMEOUT = 60000;

export interface ActuatorState {
    up: boolean
}

const actuatorStateContext = createContext<ActuatorState | undefined>(undefined);

const ActuatorStateProvider: React.FC<any> = ({children}) => {
    const [up, setUp] = useState(false);
    const [actuatorCounter, setActuatorCounter] = useState(0);

    useEffect(() => {
        actuatorClient.getHealthStatus().then(
            data => {
                if (data.data && data.data.status === 'UP') {
                    setUp(true);
                } else {
                    setUp(false);
                }
            }
        );
        const timer = setInterval(() => setActuatorCounter(actuatorCounter + 1), TIMEOUT);
        return () => clearTimeout(timer);
    }, [actuatorCounter]);

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
