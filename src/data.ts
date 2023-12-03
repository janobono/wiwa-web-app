import { Pageable, WiwaError, WiwaErrorCode } from './model/service';

export const CONTEXT_PATH = '/api/'
export const PATH_LOGO = CONTEXT_PATH + 'ui/logo';

export const wiwaError = (message: string): WiwaError => {
    return {code: WiwaErrorCode.UNKNOWN, message, timestamp: ''}
}

export interface ClientResponse<T> {
    data: T | undefined,
    error: WiwaError | undefined
}

export const toWiwaError = async (response: Response): Promise<WiwaError> => {
    const result = wiwaError('Unknown exception');
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

export const setQueryParam = (queryParams: URLSearchParams, name: string, value?: any) => {
    if (value) {
        queryParams.set(name, `${value}`);
    }
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

export const createAuthorization = (token?: string): any => {
    if (token) {
        return {
            'Authorization': `Bearer ${token}`
        };
    } else {
        return {};
    }
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

export const postDataVoidResponse = async (path: string, data: any, token?: string): Promise<ClientResponse<void>> => {
    const authorization = createAuthorization(token);
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            ...authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let error;
    if (!response.ok) {
        error = await toWiwaError(response);
    }
    return {data: undefined, error};
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
        headers: authorization
    });

    let error;
    if (!response.ok) {
        error = await toWiwaError(response);
    }
    return {data: undefined, error};
}

export const postFile = async <T>(path: string, file: File, token: string): Promise<ClientResponse<T>> => {
    const authorization = createAuthorization(token);

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(path, {
        method: 'POST',
        body: formData,
        headers: {
            ...authorization
        },
    });

    let resultData, error;
    if (response.ok) {
        resultData = await response.json() as T;
    } else {
        error = await toWiwaError(response);
    }
    return {data: resultData, error};
}

export const postFileVoidResponse = async (path: string, file: File, token: string): Promise<ClientResponse<void>> => {
    const authorization = createAuthorization(token);

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(path, {
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
