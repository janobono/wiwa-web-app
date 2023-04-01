export * as actuatorClient from './actuator';
export * as authClient from './auth';
export * as captchaClient from './captcha';
export * as configClient from './config';
export * as uiClient from './ui';

export const APP_IMAGES_PATH_PREFIX = '/api/ui/application-images/';

export enum WiwaErrorCode {
    UNKNOWN = 'UNKNOWN',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    APPLICATION_IMAGE_NOT_SUPPORTED = 'APPLICATION_IMAGE_NOT_SUPPORTED',
    APPLICATION_PROPERTY_NOT_FOUND = 'APPLICATION_PROPERTY_NOT_FOUND',
    AUTHORITY_NOT_FOUND = 'AUTHORITY_NOT_FOUND',
    GDPR = 'GDPR',
    INVALID_CAPTCHA = 'INVALID_CAPTCHA',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    UNSUPPORTED_VALIDATION_TOKEN = 'UNSUPPORTED_VALIDATION_TOKEN',
    USER_EMAIL_IS_USED = 'USER_EMAIL_IS_USED',
    USER_IS_DISABLED = 'USER_IS_DISABLED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_USERNAME_IS_USED = 'USER_USERNAME_IS_USED'
}

export interface WiwaError {
    code: WiwaErrorCode,
    message: string,
    timestamp: string
}

export const toWiwaError = async (response: Response): Promise<WiwaError> => {
    const result = {code: WiwaErrorCode.UNKNOWN, message: 'Unknown exception', timestamp: ''};
    try {
        const data = await response.json();
        if (data && 'code' in data && 'message' in data && 'timestamp' in data) {
            const {code, message, timestamp} = data;
            result.code = WiwaErrorCode[code as keyof typeof WiwaErrorCode];
            result.message = message;
            result.timestamp = timestamp;
        }
    } catch (error) {
        console.log(error);
    }
    return result;
}

export interface ClientResponse<T> {
    data: T | undefined,
    error: WiwaError | undefined
}

export const createQueryParams = (locale: string): URLSearchParams => {
    const queryParams = new URLSearchParams();
    queryParams.set('locale', locale);
    return queryParams;
}

export interface PageQueryParams {
    page: number,
    size: number,
    sort?: {
        field: string,
        asc: boolean
    }
}

export const addPageQueryParams = (queryParams: URLSearchParams, pageQueryParams?: PageQueryParams) => {
    if (pageQueryParams) {
        queryParams.set('page', `${pageQueryParams.page}`);
        queryParams.set('size', `${pageQueryParams.size}`);
        if (pageQueryParams.sort) {
            queryParams.set('sort', `${pageQueryParams.sort.field},${pageQueryParams.sort.asc ? 'ASC' : 'DESC'}`);
        }
    }
}

export const createAuthorization = (token?: string): {} => {
    if (token) {
        return {
            'Authorization': `Bearer ${token}`
        };
    } else {
        return {};
    }
}

export const getText = async (path: string, queryParams?: URLSearchParams, token?: string): Promise<ClientResponse<string>> => {
    const authorization = createAuthorization(token);
    const response = await fetch(path + (queryParams ? '?' + queryParams.toString() : ''), {
        method: 'GET',
        headers: {
            ...authorization,
            'Content-Type': 'application/json'
        }
    });

    let data, error;
    if (response.ok) {
        data = await response.text();
    } else {
        error = await toWiwaError(response);
    }
    return {data, error};
}

export const getData = async <T>(path: string, queryParams?: URLSearchParams, token?: string): Promise<ClientResponse<T>> => {
    const authorization = createAuthorization(token);
    const response = await fetch(path + (queryParams ? '?' + queryParams.toString() : ''), {
        method: 'GET',
        headers: {
            ...authorization,
            'Content-Type': 'application/json'
        }
    });

    let data, error;
    if (response.ok) {
        data = await response.json() as T;
    } else {
        error = await toWiwaError(response);
    }
    return {data, error};
}

export const postData = async <T>(path: string, data: any, token?: string): Promise<ClientResponse<T>> => {
    const authorization = createAuthorization(token);
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            ...authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let resultData, error;
    if (response.ok) {
        resultData = await response.json() as T;
    } else {
        error = await toWiwaError(response);
    }
    return {data: resultData, error};
}

export const deleteData = async (path: string, token?: string): Promise<WiwaError | undefined> => {
    const authorization = createAuthorization(token);
    const response = await fetch(path, {
        method: 'DELETE',
        headers: {
            ...authorization
        }
    });

    let error;
    if (!response.ok) {
        error = await toWiwaError(response);
    }
    return error;
}

export interface LocaleData<T> {
    items: LocaleDataItem<T>[]
}

export interface LocaleDataItem<T> {
    language: string,
    data: T
}

export interface ApplicationInfo {
    items: ApplicationInfoItem[]
}

export interface ApplicationInfoItem {
    title: string,
    text: string,
    imageFileName: string
}

export interface CompanyInfo {
    name: string,
    street: string,
    city: string,
    zipCode: string,
    state: string,
    phone: string,
    mail: string,
    businessId: string,
    taxId: string,
    vatRegNo: string,
    commercialRegisterInfo: string,
    mapUrl: string
}

export interface Page<T> {
    totalPages: number,
    totalElements: number,
    size: number,
    content: T[],
    number: number,
    last: boolean,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}
