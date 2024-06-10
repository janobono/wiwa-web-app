import { jwtDecode, JwtPayload } from 'jwt-decode';

export const decodeAccessToken = (accessToken?: string): JwtPayload | undefined => {
    let jwtPayload;
    if (accessToken) {
        jwtPayload = jwtDecode<JwtPayload>(accessToken);
        if (isJwtPayloadExpired(jwtPayload)) {
            jwtPayload = undefined;
        }
    }
    return jwtPayload;
}

export const isAccessExpired = (accessToken?: string) => {
    return isJwtPayloadExpired(decodeAccessToken(accessToken));
}

export const getTimeToAccessExpiration = (jwtPayload?: JwtPayload) => {
    const result = jwtPayload ? (jwtPayload.exp || 0) * 1000 - Date.now() : 0;
    return result < 0 ? 0 : result;
}

export const isJwtPayloadExpired = (jwtPayload?: JwtPayload) => {
    return getTimeToAccessExpiration(jwtPayload) <= 0;
}

export const isRefreshExpired = (refreshToken?: string) => {
    if (refreshToken) {
        const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
        return (decodedRefreshToken.exp || 0) * 1000 - Date.now() <= 0;
    }
    return true;
}
