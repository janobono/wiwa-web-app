import { ClientResponse, getData } from './index';
import { ApplicationInfo, CompanyInfo, SingleValueBody } from './model';

const PATH_WORKING_HOURS = '/api/ui/working-hours';
const PATH_WELCOME_TEXT = '/api/ui/welcome-text';
const PATH_TITLE = '/api/ui/title';
const PATH_LOGO = '/api/ui/logo';
const PATH_GDPR_INFO = '/api/ui/gdpr-info';
const PATH_DEFAULT_LOCALE = '/api/ui/default-locale';
const PATH_COOKIES_INFO = '/api/ui/cookies-info';
const PATH_COMPANY_INFO = '/api/ui/company-info';
const PATH_APPLICATION_INFO = '/api/ui/application-info';

export const getWorkingHours = async (): Promise<ClientResponse<SingleValueBody<string>>> => {
    return getData(PATH_WORKING_HOURS);
}

export const getWelcomeText = async (): Promise<ClientResponse<SingleValueBody<string>>> => {
    return getData(PATH_WELCOME_TEXT);
}

export const getTitle = async (): Promise<ClientResponse<SingleValueBody<string>>> => {
    return getData(PATH_TITLE);
}

export const getLogoUrl = async (): Promise<ClientResponse<string>> => {
    return {data: PATH_LOGO, error: undefined}
}

export const getGdprInfo = async (): Promise<ClientResponse<SingleValueBody<string>>> => {
    return getData(PATH_GDPR_INFO);
}

export const getDefaultLocale = async (): Promise<ClientResponse<SingleValueBody<string>>> => {
    return getData(PATH_DEFAULT_LOCALE);
}

export const getCookiesInfo = async (): Promise<ClientResponse<SingleValueBody<string>>> => {
    return getData(PATH_COOKIES_INFO);
}

export const getCompanyInfo = async (): Promise<ClientResponse<CompanyInfo>> => {
    return getData<CompanyInfo>(PATH_COMPANY_INFO);
}

export const getApplicationInfo = async (): Promise<ClientResponse<ApplicationInfo>> => {
    return getData<ApplicationInfo>(PATH_APPLICATION_INFO);
}
