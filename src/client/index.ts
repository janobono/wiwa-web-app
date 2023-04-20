export * as actuatorClient from './actuator';
export * as authClient from './auth';
export * as captchaClient from './captcha';
export * as configClient from './config';
export * as uiClient from './ui';
export * as userClient from './user';

export const APP_IMAGES_PATH_PREFIX = '/api/ui/application-images/';

export interface WiwaError {
    code: WiwaErrorCode,
    message: string,
    timestamp: string
}

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

export interface ClientResponse<T> {
    data: T | undefined,
    error: WiwaError | undefined
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

export interface Pageable {
    page: number,
    size: number,
    sort?: {
        field: string,
        asc: boolean
    }
}

export const setQueryParam = (queryParams: URLSearchParams, name: string, value?: any) => {
    if (value) {
        queryParams.set(name, `${value}`);
    }
}

export const setLocaleQueryParam = (queryParams: URLSearchParams, locale: string) => {
    setQueryParam(queryParams, 'locale', locale);
}

export const setPageableQueryParams = (queryParams: URLSearchParams, pageable?: Pageable) => {
    if (pageable) {
        setQueryParam(queryParams, 'page', pageable.page);
        setQueryParam(queryParams, 'size', pageable.size);
        if (pageable.sort) {
            setQueryParam(queryParams, 'sort', `${pageable.sort.field},${pageable.sort.asc ? 'ASC' : 'DESC'}`);
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

export const putData = async <T>(path: string, data: any, token?: string): Promise<ClientResponse<T>> => {
    const authorization = createAuthorization(token);
    const response = await fetch(path, {
        method: 'PUT',
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

export const patchData = async <T>(path: string, data: any, token?: string): Promise<ClientResponse<T>> => {
    const authorization = createAuthorization(token);
    const response = await fetch(path, {
        method: 'PATCH',
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

export const deleteData = async (path: string, token?: string): Promise<ClientResponse<void>> => {
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
    return {data: undefined, error};
}
