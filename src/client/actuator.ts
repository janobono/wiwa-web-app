import { ClientResponse, getData } from './index';

const PATH_HEALTH = '/api/actuator/health';

export interface HealthStatus {
    status: string
}

export const getHealthStatus = async (): Promise<ClientResponse<HealthStatus>> => {
    return getData<HealthStatus>(PATH_HEALTH);
};
