import {
    CONTEXT_PATH,
    deleteData,
    getData,
    patchData,
    postData,
    putData,
    setPageableQueryParams,
    setQueryParam
} from '../';
import { Authority, Page, Pageable, User } from '../../model';
import { UserCreate, UserField, UserProfile, UserSearchCriteria } from '../../model/user';


const PATH = CONTEXT_PATH + 'users';

export const getUsers = (criteria?: UserSearchCriteria, pageable?: Pageable<UserField>, accessToken?: string) => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageable);
    if (criteria) {
        if (criteria.searchField) {
            setQueryParam(queryParams, 'searchField', criteria.searchField);
        }
        if (criteria.username) {
            setQueryParam(queryParams, 'username', criteria.username);
        }
        if (criteria.email) {
            setQueryParam(queryParams, 'email', criteria.email);
        }
    }
    return getData<Page<User>>(PATH, queryParams, accessToken);
}

export const getUser = (id: number, accessToken?: string) => {
    return getData<User>(PATH + '/' + id, undefined, accessToken);
}

export const addUser = (userCreate: UserCreate, accessToken?: string) => {
    return postData<User>(PATH, userCreate, accessToken);
}

export const setUser = (id: number, userProfile: UserProfile, accessToken?: string) => {
    return putData<User>(PATH + '/' + id, userProfile, accessToken);
}

export const setAuthorities = (id: number, authorities: Authority[], accessToken?: string) => {
    return patchData<User>(PATH + '/' + id + '/authorities', authorities, accessToken);
}

export const setConfirmed = (id: number, confirmed: boolean, accessToken?: string) => {
    return patchData<User>(PATH + '/' + id + '/confirm', {value: confirmed}, accessToken);
}

export const setEnabled = (id: number, enabled: boolean, accessToken?: string) => {
    return patchData<User>(PATH + '/' + id + '/enable', {value: enabled}, accessToken);
}

export const deleteUser = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id, accessToken);
}
