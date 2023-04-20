import {
    ClientResponse,
    deleteData,
    getData,
    Pageable,
    patchData,
    postData,
    putData,
    setPageableQueryParams,
    setQueryParam,
    WiwaError
} from './index';
import { Authority, Page, SingleValueBody, User, UserCard } from './model';

const PATH_USERS = '/api/users';

export const getUser = async (id: string, token: string): Promise<ClientResponse<User>> => {
    return getData<User>(PATH_USERS + `/${id}`, undefined, token);
}

export const putUser = async (id: string, userCard: UserCard, token: string): Promise<ClientResponse<User>> => {
    return putData<User>(PATH_USERS + `/${id}`, userCard, token);
}

export const deleteUser = async (id: string, token: string): Promise<ClientResponse<void>> => {
    return deleteData(PATH_USERS + `/${id}`, token);
}

export const getUsers = async (token: string, pageable?: Pageable, searchField?: string, username?: string, email?: string): Promise<ClientResponse<Page<User>>> => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageable);
    setQueryParam(queryParams, 'search-field', searchField);
    setQueryParam(queryParams, 'username', username);
    setQueryParam(queryParams, 'email', email);
    return getData<Page<User>>(PATH_USERS, queryParams, token);
}

export const postUser = async (user: User, token: string): Promise<ClientResponse<User>> => {
    return postData<User>(PATH_USERS, user, token);
}

export const patchUserEnable = async (id: string, enable: SingleValueBody<boolean>, token: string): Promise<ClientResponse<User>> => {
    return patchData<User>(PATH_USERS + `/${id}/enable`, enable, token);
}

export const patchUserConfirm = async (id: string, confirm: SingleValueBody<boolean>, token: string): Promise<ClientResponse<User>> => {
    return patchData<User>(PATH_USERS + `/${id}/confirm`, confirm, token);
}

export const patchUserAuthorities = async (id: string, authorities: SingleValueBody<Authority[]>, token: string): Promise<ClientResponse<User>> => {
    return patchData<User>(PATH_USERS + `/${id}/authorities`, authorities, token);
}
