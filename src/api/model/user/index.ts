import { Authority } from '../';

export interface UserCreate {
    username: string,
    titleBefore?: string,
    firstName: string,
    midName?: string,
    lastName: string,
    titleAfter?: string
    email: string,
    gdpr: boolean,
    confirmed: boolean,
    enabled: boolean,
    authorities: Authority[]
}

export interface UserProfile {
    titleBefore?: string,
    firstName: string,
    midName?: string,
    lastName: string,
    titleAfter?: string
}

export interface UserSearchCriteria {
    searchField?: string,
    username?: string,
    email?: string
}
