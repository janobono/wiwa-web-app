import { ClientResponse, createQueryParams, getData, getText } from './index';
import { ApplicationInfo, CompanyInfo } from './model';

const PATH_LOGO = '/api/ui/logo';
const PATH_TITLE = '/api/ui/title';
const PATH_WELCOME_TEXT = '/api/ui/welcome-text';
const PATH_APPLICATION_INFO = '/api/ui/application-info';
const PATH_COMPANY_INFO = '/api/ui/company-info';
const PATH_COOKIES_INFO = '/api/ui/cookies-info';
const PATH_GDPR_INFO = '/api/ui/gdpr-info';
const PATH_WORKING_HOURS = '/api/ui/working-hours';

export const getLogoUrl = async (): Promise<ClientResponse<string>> => {
    return {data: PATH_LOGO, error: undefined}
}

export const getTitle = async (locale: string): Promise<ClientResponse<string>> => {
    return getText(PATH_TITLE, createQueryParams(locale));
}

export const getWelcomeText = async (locale: string): Promise<ClientResponse<string>> => {
    return getText(PATH_WELCOME_TEXT, createQueryParams(locale));
}

export const getApplicationInfo = async (locale: string): Promise<ClientResponse<ApplicationInfo>> => {
    return getData<ApplicationInfo>(PATH_APPLICATION_INFO, createQueryParams(locale));
}

export const getCompanyInfo = async (locale: string): Promise<ClientResponse<CompanyInfo>> => {
    return getData<CompanyInfo>(PATH_COMPANY_INFO, createQueryParams(locale));
}

export const getCookiesInfo = async (locale: string): Promise<ClientResponse<string>> => {
    return getText(PATH_COOKIES_INFO, createQueryParams(locale));
}

export const getGdprInfo = async (locale: string): Promise<ClientResponse<string>> => {
    return getText(PATH_GDPR_INFO, createQueryParams(locale));
}

export const getWorkingHours = async (locale: string): Promise<ClientResponse<string>> => {
    return getText(PATH_WORKING_HOURS, createQueryParams(locale));
}
