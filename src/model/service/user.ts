import type { Authority } from './authority';

export interface User {
    id: number,
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
