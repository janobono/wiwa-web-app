import {
    addPageQueryParams,
    ApplicationInfo,
    ClientResponse,
    CompanyInfo,
    createAuthorization,
    getData,
    LocaleData,
    Page,
    PageQueryParams,
    postData,
    toWiwaError
} from './index';

const PATH_LOGO = '/api/config/logo';
const PATH_TITLE = '/api/config/title';
const PATH_WELCOME_TEXT = '/api/config/welcome-text';
const PATH_APPLICATION_INFO = '/api/config/application-info';
const PATH_COMPANY_INFO = '/api/config/company-info';
const PATH_COOKIES_INFO = '/api/config/cookies-info';
const PATH_GDPR_INFO = '/api/config/gdpr-info';
const PATH_WORKING_HOURS = '/api/config/working-hours';
const PATH_APPLICATION_IMAGES = '/api/config/application-images';

export interface ApplicationImage {
    fileName: string,
    thumbnail: string
}

export const postLogo = async (logo: File, token: string): Promise<ClientResponse<void>> => {
    const authorization = createAuthorization(token);

    const formData = new FormData();
    formData.append('file', logo);

    const response = await fetch(PATH_LOGO, {
        method: 'POST',
        body: formData,
        headers: {
            ...authorization
        },
    });

    let error;
    if (!response.ok) {
        error = await toWiwaError(response);
    }
    return {data: undefined, error};
}

export const postTitle = async (data: LocaleData<string>, token: string): Promise<ClientResponse<LocaleData<string>>> => {
    return postData<LocaleData<string>>(PATH_TITLE, data, token);
}

export const postWelcomeText = async (welcomeText: LocaleData<string>, token: string): Promise<ClientResponse<LocaleData<string>>> => {
    return postData<LocaleData<string>>(PATH_WELCOME_TEXT, welcomeText, token);
}

export const postApplicationInfo = async (applicationInfo: LocaleData<ApplicationInfo>, token: string): Promise<ClientResponse<LocaleData<ApplicationInfo>>> => {
    return postData<LocaleData<ApplicationInfo>>(PATH_APPLICATION_INFO, applicationInfo, token);
}

export const postCompanyInfo = async (companyInfo: LocaleData<CompanyInfo>, token: string): Promise<ClientResponse<LocaleData<CompanyInfo>>> => {
    return postData<LocaleData<CompanyInfo>>(PATH_COMPANY_INFO, companyInfo, token);
}

export const postCookiesInfo = async (cookiesInfo: LocaleData<string>, token: string): Promise<ClientResponse<LocaleData<string>>> => {
    return postData<LocaleData<string>>(PATH_COOKIES_INFO, cookiesInfo, token);
}

export const postGdprInfo = async (gdprInfo: LocaleData<string>, token: string): Promise<ClientResponse<LocaleData<string>>> => {
    return postData<LocaleData<string>>(PATH_GDPR_INFO, gdprInfo, token);
}

export const postWorkingHours = async (workingHours: LocaleData<string>, token: string): Promise<ClientResponse<LocaleData<string>>> => {
    return postData<LocaleData<string>>(PATH_WORKING_HOURS, workingHours, token);
}

export const getApplicationImages = async (token: string, pageQueryParams?: PageQueryParams): Promise<ClientResponse<Page<ApplicationImage>>> => {
    const queryParams = new URLSearchParams();
    addPageQueryParams(queryParams, pageQueryParams);
    return getData(PATH_APPLICATION_IMAGES, queryParams, token);
}

export const postApplicationImage = async (file: File, token: string): Promise<ClientResponse<ApplicationImage>> => {
    const authorization = createAuthorization(token);

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(PATH_APPLICATION_IMAGES, {
        method: 'POST',
        body: formData,
        headers: {
            ...authorization
        },
    });

    let resultData, error;
    if (response.ok) {
        resultData = await response.json() as ApplicationImage;
    } else {
        error = await toWiwaError(response);
    }
    return {data: resultData, error};
}
