import { CONTEXT_PATH, getData } from '../';
import { HealthStatus } from '../../model';

export const livez = () => {
    return getData<HealthStatus>(CONTEXT_PATH + '/livez');
}

export const readyz = () => {
    return getData<HealthStatus>(CONTEXT_PATH + '/readyz');
}
