import type { JwtPayload } from 'jwt-decode';

export interface AuthUser extends JwtPayload {
    id: string,
    titleBefore: string,
    firstName: string,
    midName: string,
    lastName: string,
    titleAfter: string,
    email: string,
    gdpr: boolean,
    confirmed: boolean,
    enabled: boolean
}
