import { ClientResponse, createAuthorization, postData, toWiwaError } from './index';

const PATH_LOGO = '/api/config/logo';
const PATH_TITLE = '/api/config/title';
const PATH_WELCOME_TEXT = '/api/config/welcome-text';

export interface LocaleData<T> {
    items: LocaleDataItem<T>[]
}

export interface LocaleDataItem<T> {
    language: string,
    data: T
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
