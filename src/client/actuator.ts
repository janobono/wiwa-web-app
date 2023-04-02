import { ClientResponse, getData } from './index';
import { HealthStatus } from './model';

const PATH_HEALTH = '/api/actuator/health';

export const getHealthStatus = async (): Promise<ClientResponse<HealthStatus>> => {
    return getData<HealthStatus>(PATH_HEALTH);
}
