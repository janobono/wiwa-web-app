import { ClientResponse, getData } from './index';
import { Captcha } from './model';

const PATH_CAPTCHA = '/api/captcha';

export const getCaptcha = async (): Promise<ClientResponse<Captcha>> => {
    return getData<Captcha>(PATH_CAPTCHA);
}
