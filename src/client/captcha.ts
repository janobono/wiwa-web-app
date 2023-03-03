import { ClientResponse, getData } from './index';

const PATH_CAPTCHA = '/api/captcha';

export interface Captcha {
    captchaToken: string,
    captchaImage: string
}

export const getCaptcha = async (): Promise<ClientResponse<Captcha>> => {
    return getData<Captcha>(PATH_CAPTCHA);
}
