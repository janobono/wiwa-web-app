import { ReactNode, useEffect, useState } from 'react';

import { HealthContext } from '../../';
import { setMaintenance as apiSetMaintenance } from '../../../api/controller/config';
import { readyz } from '../../../api/controller/health';
import { getMaintenance } from '../../../api/controller/ui';

const ACTUATOR_TIMEOUT = 60000;

const HealthProvider = ({children}: { children: ReactNode }) => {
    const [up, setUp] = useState(false);
    const [maintenance, setMaintenanceValue] = useState(true);
    const [actuatorCounter, setActuatorCounter] = useState(0);

    useEffect(() => {
        const fetchHealthStatus = async () => {
            const response = await readyz();
            if (response.data) {
                setUp(response.data.status === 'OK');
            } else {
                setUp(false);
            }
        }
        fetchHealthStatus().then();

        const fetchMaintenance = async () => {
            const response = await getMaintenance();
            if (response.data) {
                setMaintenanceValue(response.data.value);
            }
        }
        fetchMaintenance().then();

        const timer = setInterval(() => setActuatorCounter(actuatorCounter + 1), ACTUATOR_TIMEOUT);
        return () => clearTimeout(timer);
    }, [actuatorCounter]);

    const setMaintenance = async (maintenance: boolean, token?: string) => {
        const response = await apiSetMaintenance(maintenance, token);
        if (response.data) {
            setMaintenanceValue(response.data?.value)
        }
    }

    return (
        <HealthContext.Provider
            value={
                {
                    up,
                    maintenance,
                    setMaintenance
                }
            }
        >{children}
        </HealthContext.Provider>
    );
}

export default HealthProvider;
