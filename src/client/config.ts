import {
    ClientResponse,
    createAuthorization,
    deleteData,
    getData,
    Pageable,
    postData,
    setPageableQueryParams,
    toWiwaError
} from './index';
import { ApplicationImage, ApplicationInfo, CompanyInfo, Page, SingleValueBody } from './model';

const PATH_WORKING_HOURS = '/api/config/working-hours';
const PATH_WELCOME_TEXT = '/api/config/welcome-text';
const PATH_TITLE = '/api/config/title';
const PATH_LOGO = '/api/config/logo';
const PATH_GDPR_INFO = '/api/config/gdpr-info';
const PATH_COOKIES_INFO = '/api/config/cookies-info';
const PATH_COMPANY_INFO = '/api/config/company-info';
const PATH_APPLICATION_INFO = '/api/config/application-info';
const PATH_APPLICATION_IMAGES = '/api/config/application-images';

export const postWorkingHours = async (workingHours: string, token: string): Promise<ClientResponse<SingleValueBody<string>>> => {
    return postData<SingleValueBody<string>>(PATH_WORKING_HOURS, {value: workingHours}, token);
}

export const postWelcomeText = async (welcomeText: string, token: string): Promise<ClientResponse<SingleValueBody<string>>> => {
    return postData<SingleValueBody<string>>(PATH_WELCOME_TEXT, {value: welcomeText}, token);
}

export const postTitle = async (title: string, token: string): Promise<ClientResponse<SingleValueBody<string>>> => {
    return postData<SingleValueBody<string>>(PATH_TITLE, {value: title}, token);
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

export const postGdprInfo = async (gdprInfo: string, token: string): Promise<ClientResponse<SingleValueBody<string>>> => {
    return postData<SingleValueBody<string>>(PATH_GDPR_INFO, {value: gdprInfo}, token);
}

export const postCookiesInfo = async (cookiesInfo: string, token: string): Promise<ClientResponse<SingleValueBody<string>>> => {
    return postData<SingleValueBody<string>>(PATH_COOKIES_INFO, {value: cookiesInfo}, token);
}

export const postCompanyInfo = async (companyInfo: CompanyInfo, token: string): Promise<ClientResponse<CompanyInfo>> => {
    return postData<CompanyInfo>(PATH_COMPANY_INFO, companyInfo, token);
}

export const postApplicationInfo = async (applicationInfo: ApplicationInfo, token: string): Promise<ClientResponse<ApplicationInfo>> => {
    return postData<ApplicationInfo>(PATH_APPLICATION_INFO, applicationInfo, token);
}

export const getApplicationImages = async (token: string, pageQueryParams?: Pageable): Promise<ClientResponse<Page<ApplicationImage>>> => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageQueryParams);
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

export const deleteApplicationImage = async (fileName: string, token: string): Promise<ClientResponse<void>> => {
    return deleteData(PATH_APPLICATION_IMAGES + '/' + fileName, token);
}
