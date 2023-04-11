import { ClientResponse, getData } from './index';
import { Authority } from './model';

const PATH_AUTHORITIES = '/api/authorities';

export const getAuthorities = async (token: string): Promise<ClientResponse<Authority[]>> => {
    return getData<Authority[]>(PATH_AUTHORITIES, undefined, token);
}
