import { JwtPayload } from 'jwt-decode';

import { ResourceCommon } from './resource/common';
import { User } from '../api/model';
import { UnitId } from '../api/model/application';

export interface AuthToken {
    accessToken: string,
    refreshToken: string
}

export interface AuthUser {
    jwtPayload: JwtPayload,
    user: User
}

export const getUnitIdName = (unitId: UnitId, common?: ResourceCommon) => {
    switch (unitId) {
        case UnitId.MILLIMETER:
            return common?.unitId.millimeter;
        case UnitId.METER:
            return common?.unitId.meter;
        case UnitId.SQUARE_METER:
            return common?.unitId.squareMeter;
        case UnitId.KILOGRAM:
            return common?.unitId.kilogram;
        case UnitId.PIECE:
            return common?.unitId.piece;
    }
}

export const hasAnyAuthority = (authUser: AuthUser | undefined, ...authorities: string[]) => {
    if (authUser?.jwtPayload?.aud && authUser?.jwtPayload?.exp) {
        let hasAuthority;
        if (Array.isArray(authUser.jwtPayload.aud)) {
            hasAuthority = authUser.jwtPayload.aud.some(a => authorities.includes(a));
        } else {
            hasAuthority = authorities.some(a => a === authUser.jwtPayload.aud);
        }
        return hasAuthority && authUser.user.confirmed && authUser.user.enabled && (authUser.jwtPayload.exp || 0) * 1000 - Date.now() > 0;
    }
    return false;
}
