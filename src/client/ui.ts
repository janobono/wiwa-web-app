import { ClientResponse, getData, getText, setLocaleQueryParam } from './index';
import { ApplicationInfo, CompanyInfo } from './model';

const PATH_WORKING_HOURS = '/api/ui/working-hours';
const PATH_WELCOME_TEXT = '/api/ui/welcome-text';
const PATH_TITLE = '/api/ui/title';
const PATH_LOGO = '/api/ui/logo';
const PATH_GDPR_INFO = '/api/ui/gdpr-info';
const PATH_COOKIES_INFO = '/api/ui/cookies-info';
const PATH_COMPANY_INFO = '/api/ui/company-info';
const PATH_APPLICATION_INFO = '/api/ui/application-info';

export const getWorkingHours = async (locale: string): Promise<ClientResponse<string>> => {
    const queryParams = new URLSearchParams();
    setLocaleQueryParam(queryParams, locale);
    return getText(PATH_WORKING_HOURS, queryParams);
}

export const getWelcomeText = async (locale: string): Promise<ClientResponse<string>> => {
    const queryParams = new URLSearchParams();
    setLocaleQueryParam(queryParams, locale);
    return getText(PATH_WELCOME_TEXT, queryParams);
}

export const getTitle = async (locale: string): Promise<ClientResponse<string>> => {
    const queryParams = new URLSearchParams();
    setLocaleQueryParam(queryParams, locale);
    return getText(PATH_TITLE, queryParams);
}

export const getLogoUrl = async (): Promise<ClientResponse<string>> => {
    return {data: PATH_LOGO, error: undefined}
}

export const getGdprInfo = async (locale: string): Promise<ClientResponse<string>> => {
    const queryParams = new URLSearchParams();
    setLocaleQueryParam(queryParams, locale);
    return getText(PATH_GDPR_INFO, queryParams);
}

export const getCookiesInfo = async (locale: string): Promise<ClientResponse<string>> => {
    const queryParams = new URLSearchParams();
    setLocaleQueryParam(queryParams, locale);
    return getText(PATH_COOKIES_INFO, queryParams);
}

export const getCompanyInfo = async (locale: string): Promise<ClientResponse<CompanyInfo>> => {
    const queryParams = new URLSearchParams();
    setLocaleQueryParam(queryParams, locale);
    return getData<CompanyInfo>(PATH_COMPANY_INFO, queryParams);
}

export const getApplicationInfo = async (locale: string): Promise<ClientResponse<ApplicationInfo>> => {
    const queryParams = new URLSearchParams();
    setLocaleQueryParam(queryParams, locale);
    return getData<ApplicationInfo>(PATH_APPLICATION_INFO, queryParams);
}
