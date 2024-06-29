import { ReactNode, useContext, useEffect, useState } from 'react';

import { AppContext, AuthContext } from '../../';
import { AuthToken, AuthUser } from '../../model/auth';
import { ClientResponse } from '../../../api/controller';
import * as authApi from '../../../api/controller/auth';
import { Authority } from '../../../api/model';
import * as authModel from '../../../api/model/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';

export const REFRESH_TIMEOUT = 15000;

const AuthProvider = ({children}: { children: ReactNode }) => {
    const appState = useContext(AppContext);

    const [busy, setBusy] = useState(false);
    const [authToken, setAuthToken] = useState<AuthToken>();
    const [authUser, setAuthUser] = useState<AuthUser>();
    const [accessExpired, setAccessExpired] = useState(true);
    const [timeToAccessExpiration, setTimeToAccessExpiration] = useState(0);
    const [refreshExpired, setRefreshExpired] = useState(true);
    const [adminAuthority, setAdminAuthority] = useState(false);
    const [managerAuthority, setManagerAuthority] = useState(false);
    const [employeeAuthority, setEmployeeAuthority] = useState(false);
    const [customerAuthority, setCustomerAuthority] = useState(false);

    const [refreshCounter, setRefreshCounter] = useState(0);

    useEffect(() => {
        if (appState?.cookiesEnabled) {
            const _accessToken = localStorage.getItem(ACCESS_TOKEN) || undefined;
            const _refreshToken = localStorage.getItem(REFRESH_TOKEN) || undefined;
            if (!isAccessExpired(_accessToken) && !isRefreshExpired(_refreshToken)) {
                if (_accessToken && _refreshToken) {
                    setAuthToken({accessToken: _accessToken, refreshToken: _refreshToken});
                }
            }
        }
    }, [appState?.cookiesEnabled]);

    useEffect(() => {
        const jwtPayload = decodeAccessToken(authToken?.accessToken);
        if (jwtPayload) {
            const fetchUser = async () => {
                const response = await authApi.getUserDetail(authToken?.accessToken);
                if (response.data) {
                    setAuthUser({jwtPayload, user: response.data});
                } else {
                    cleanState();
                }
            }
            fetchUser().then();
        } else {
            setAuthUser(undefined);
        }
        setRefreshExpired(isRefreshExpired(authToken?.refreshToken));
    }, [authToken]);

    useEffect(() => {
        setCustomerAuthority(hasAnyAuthority(authUser, Authority.W_CUSTOMER));
        setEmployeeAuthority(hasAnyAuthority(authUser, Authority.W_EMPLOYEE));
        setManagerAuthority(hasAnyAuthority(authUser, Authority.W_MANAGER));
        setAdminAuthority(hasAnyAuthority(authUser, Authority.W_ADMIN));
        setAccessExpired(isJwtPayloadExpired(authUser?.jwtPayload));
        setTimeToAccessExpiration(getTimeToAccessExpiration(authUser?.jwtPayload));
    }, [authUser]);

    useEffect(() => {
        setAccessExpired(isJwtPayloadExpired(authUser?.jwtPayload));
        setTimeToAccessExpiration(getTimeToAccessExpiration(authUser?.jwtPayload));
        setRefreshExpired(isRefreshExpired(authToken?.refreshToken));

        if (authToken !== undefined && accessExpired) {
            localStorage.removeItem(ACCESS_TOKEN);
        }

        if (authToken !== undefined && refreshExpired) {
            localStorage.removeItem(REFRESH_TOKEN);
        }

        const timer = setInterval(() => setRefreshCounter(refreshCounter + 1), REFRESH_TIMEOUT);
        return () => clearTimeout(timer);
    }, [refreshCounter]);

    const cleanState = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setAuthToken(undefined);
        setAuthUser(undefined);
    }

    const decodeAccessToken = (accessToken?: string): JwtPayload | undefined => {
        let jwtPayload;
        if (accessToken) {
            jwtPayload = jwtDecode<JwtPayload>(accessToken);
            if (isJwtPayloadExpired(jwtPayload)) {
                jwtPayload = undefined;
            }
        }
        return jwtPayload;
    }

    const isAccessExpired = (accessToken?: string) => {
        return isJwtPayloadExpired(decodeAccessToken(accessToken));
    }

    const getTimeToAccessExpiration = (jwtPayload?: JwtPayload) => {
        const result = jwtPayload ? (jwtPayload.exp || 0) * 1000 - Date.now() : 0;
        return result < 0 ? 0 : result;
    }

    const isJwtPayloadExpired = (jwtPayload?: JwtPayload) => {
        return getTimeToAccessExpiration(jwtPayload) <= 0;
    }

    const isRefreshExpired = (refreshToken?: string) => {
        if (refreshToken) {
            const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
            return (decodedRefreshToken.exp || 0) * 1000 - Date.now() <= 0;
        }
        return true;
    }

    const hasAnyAuthority = (authUser: AuthUser | undefined, ...authorities: string[]) => {
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

    const handleAuthenticationResponse = (response: ClientResponse<authModel.AuthenticationResponse>) => {
        if (response.data) {
            if (appState?.cookiesEnabled) {
                localStorage.setItem(ACCESS_TOKEN, response.data.token);
                localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
            }
            setAuthToken({accessToken: response.data.token, refreshToken: response.data.refreshToken});
        } else {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setAuthToken(undefined);
        }
    }

    const refreshAuth = async () => {
        setBusy(true);
        try {
            const response = await authApi.refresh(authToken?.refreshToken);
            handleAuthenticationResponse(response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const signIn = async (signInRequest: authModel.SignInRequest) => {
        setBusy(true);
        try {
            const response = await authApi.signIn(signInRequest);
            handleAuthenticationResponse(response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const signOut = async () => {
        setBusy(true);
        try {
            cleanState();
        } finally {
            setBusy(false);
        }
    }

    const signUp = async (signUpRequest: authModel.SignUpRequest) => {
        setBusy(true);
        try {
            const response = await authApi.signUp(signUpRequest);
            handleAuthenticationResponse(response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const confirm = async (confirmationRequest: authModel.ConfirmationRequest) => {
        setBusy(true);
        try {
            const response = await authApi.confirm(confirmationRequest);
            handleAuthenticationResponse(response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const resendConfirmation = async (resendConfirmationRequest: authModel.ResendConfirmationRequest) => {
        setBusy(true);
        try {
            return await authApi.resendConfirmation(resendConfirmationRequest, authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const resetPassword = async (resetPasswordRequest: authModel.ResetPasswordRequest) => {
        setBusy(true);
        try {
            return await authApi.resetPassword(resetPasswordRequest);
        } finally {
            setBusy(false);
        }
    }

    const changePassword = async (changePasswordRequest: authModel.ChangePasswordRequest) => {
        setBusy(true);
        try {
            const response = await authApi.changePassword(changePasswordRequest, authToken?.accessToken);
            if (response.error === undefined) {
                handleAuthenticationResponse(response);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const changeEmail = async (changeEmailRequest: authModel.ChangeEmailRequest) => {
        setBusy(true);
        try {
            const response = await authApi.changeEmail(changeEmailRequest, authToken?.accessToken);
            if (response.error === undefined) {
                handleAuthenticationResponse(response);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const changeUserDetails = async (changeUserDetailsRequest: authModel.ChangeUserDetailsRequest) => {
        setBusy(true);
        try {
            const response = await authApi.changeUserDetails(changeUserDetailsRequest, authToken?.accessToken);
            if (response.error === undefined) {
                handleAuthenticationResponse(response);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <AuthContext.Provider
            value={
                {
                    busy,
                    authToken,
                    authUser,
                    accessExpired,
                    timeToAccessExpiration,
                    refreshExpired,
                    adminAuthority,
                    managerAuthority,
                    employeeAuthority,
                    customerAuthority,
                    refreshAuth,
                    signIn,
                    signOut,
                    signUp,
                    confirm,
                    resendConfirmation,
                    resetPassword,
                    changePassword,
                    changeEmail,
                    changeUserDetails
                }
            }
        >{children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
