import { Authority } from './authority';

export interface UserCard {
    titleBefore?: string,
    firstName: string,
    midName?: string,
    lastName: string,
    titleAfter?: string
}

export interface User extends UserCard {
    id?: string,
    username: string,
    email: string,
    gdpr: boolean,
    confirmed: boolean,
    enabled: boolean,
    authorities: Authority[]
}
