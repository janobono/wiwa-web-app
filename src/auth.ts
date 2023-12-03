import { jwtDecode, JwtPayload } from 'jwt-decode';

import { AuthUser } from './model/jwt';
import { Authority } from './model/service';

export const hasAnyAuthority = (user: AuthUser | undefined, ...authorities: string[]) => {
    if (user?.aud) {
        let hasAuthority;
        if (Array.isArray(user.aud)) {
            hasAuthority = user.aud.some(a => authorities.includes(a));
        } else {
            hasAuthority = authorities.some(a => a === user.aud);
        }
        return hasAuthority && user.confirmed && user.enabled && (user.exp || 0) * 1000 - Date.now() > 0;
    }
    return false;
}

export const containsAuthority = (authorities: Authority[], authority: Authority) => {
    return authorities.some(a => a === authority);
};

export const decodeUser = (accessToken?: string): AuthUser | undefined => {
    let user;
    if (accessToken) {
        user = jwtDecode<AuthUser>(accessToken);
        if (isUserAccessExpired(user)) {
            user = undefined;
        }
    }
    return user;
}

export const getTimeToAccessExpiration = (user?: AuthUser) => {
    const result = user ? (user.exp || 0) * 1000 - Date.now() : 0;
    return result < 0 ? 0 : result;
}

export const isUserAccessExpired = (user?: AuthUser) => {
    return getTimeToAccessExpiration(user) <= 0;
}

export const isAccessExpired = (accessToken?: string) => {
    return isUserAccessExpired(decodeUser(accessToken));
}

export const isRefreshExpired = (refreshToken?: string) => {
    if (refreshToken) {
        const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
        return (decodedRefreshToken.exp || 0) * 1000 - Date.now() <= 0;
    }
    return true;
}
