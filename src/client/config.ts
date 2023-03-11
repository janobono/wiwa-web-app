import { ClientResponse, createAuthorization, postData, toWiwaError } from './index';

const PATH_LOGO = '/api/config/logo';
const PATH_TITLE = '/api/config/title';

export interface TitleData {
    items: TitleDataItem[]
}

export interface TitleDataItem {
    language: string,
    data: string
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

export const postTitle = async (data: TitleData, token: string): Promise<ClientResponse<TitleData>> => {
    return postData<TitleData>(PATH_TITLE, data, token);
}
