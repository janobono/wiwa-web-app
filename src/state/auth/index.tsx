import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import {
    changeEmail as apiChangeEmail,
    changePassword as apiChangePassword,
    changeUserDetails as apiChangeUserDetails,
    confirm as apiConfirm,
    getUserDetail as apiGetUserDetail,
    refresh as apiRefresh,
    resendConfirmation as apiResendConfirmation,
    resetPassword as apiResetPassword,
    signIn as apiSignIn,
    signUp as apiSignUp
} from '../../api/controller/auth';
import { Authority } from '../../api/model';
import {
    AuthenticationResponse,
    ChangeEmailRequest,
    ChangePasswordRequest,
    ChangeUserDetailsRequest,
    ConfirmationRequest,
    ResendConfirmationRequest,
    ResetPasswordRequest,
    SignInRequest,
    SignUpRequest
} from '../../api/model/auth';
import { useAppState } from '../app';
import {
    decodeAccessToken,
    getTimeToAccessExpiration,
    isAccessExpired,
    isJwtPayloadExpired,
    isRefreshExpired
} from '../../auth';
import { AuthToken, AuthUser, hasAnyAuthority } from '../../model';

const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';

export const REFRESH_TIMEOUT = 15000;

export interface AuthState {
    busy: boolean,
    authToken?: AuthToken,
    authUser?: AuthUser,
    accessExpired: boolean,
    timeToAccessExpiration: number,
    refreshExpired: boolean,
    adminAuthority: boolean,
    managerAuthority: boolean,
    employeeAuthority: boolean,
    customerAuthority: boolean,
    refreshAuth: () => Promise<ClientResponse<AuthenticationResponse>>,
    signIn: (signInRequest: SignInRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    signOut: () => Promise<void>,
    signUp: (signUpRequest: SignUpRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    confirm: (confirmationRequest: ConfirmationRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    resendConfirmation: (resendConfirmationRequest: ResendConfirmationRequest) => Promise<ClientResponse<void>>,
    resetPassword: (resetPasswordRequest: ResetPasswordRequest) => Promise<ClientResponse<void>>,
    changePassword: (changePasswordRequest: ChangePasswordRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    changeEmail: (changeEmailRequest: ChangeEmailRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    changeUserDetails: (changeUserDetailsRequest: ChangeUserDetailsRequest) => Promise<ClientResponse<AuthenticationResponse>>
}

const authStateContext = createContext<AuthState | undefined>(undefined);

const AuthStateProvider = ({children}: { children: ReactNode }) => {
    const appState = useAppState();

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

    const cleanState = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setAuthToken(undefined);
        setAuthUser(undefined);
    }

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
                const response = await apiGetUserDetail(authToken?.accessToken);
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
        setCustomerAuthority(hasAnyAuthority(authUser, Authority.W_ADMIN, Authority.W_MANAGER, Authority.W_EMPLOYEE, Authority.W_CUSTOMER));
        setEmployeeAuthority(hasAnyAuthority(authUser, Authority.W_ADMIN, Authority.W_MANAGER, Authority.W_EMPLOYEE));
        setManagerAuthority(hasAnyAuthority(authUser, Authority.W_ADMIN, Authority.W_MANAGER));
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

    const handleAuthenticationResponse = (response: ClientResponse<AuthenticationResponse>) => {
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
            const response = await apiRefresh(authToken?.refreshToken);
            handleAuthenticationResponse(response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const signIn = async (signInRequest: SignInRequest) => {
        setBusy(true);
        try {
            const response = await apiSignIn(signInRequest);
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

    const signUp = async (signUpRequest: SignUpRequest) => {
        setBusy(true);
        try {
            const response = await apiSignUp(signUpRequest);
            handleAuthenticationResponse(response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const confirm = async (confirmationRequest: ConfirmationRequest) => {
        setBusy(true);
        try {
            const response = await apiConfirm(confirmationRequest);
            handleAuthenticationResponse(response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const resendConfirmation = async (resendConfirmationRequest: ResendConfirmationRequest) => {
        setBusy(true);
        try {
            return await apiResendConfirmation(resendConfirmationRequest, authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const resetPassword = async (resetPasswordRequest: ResetPasswordRequest) => {
        setBusy(true);
        try {
            return await apiResetPassword(resetPasswordRequest);
        } finally {
            setBusy(false);
        }
    }

    const changePassword = async (changePasswordRequest: ChangePasswordRequest) => {
        setBusy(true);
        try {
            const response = await apiChangePassword(changePasswordRequest, authToken?.accessToken);
            if (response.error === undefined) {
                handleAuthenticationResponse(response);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const changeEmail = async (changeEmailRequest: ChangeEmailRequest) => {
        setBusy(true);
        try {
            const response = await apiChangeEmail(changeEmailRequest, authToken?.accessToken);
            if (response.error === undefined) {
                handleAuthenticationResponse(response);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const changeUserDetails = async (changeUserDetailsRequest: ChangeUserDetailsRequest) => {
        setBusy(true);
        try {
            const response = await apiChangeUserDetails(changeUserDetailsRequest, authToken?.accessToken);
            if (response.error === undefined) {
                handleAuthenticationResponse(response);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <authStateContext.Provider
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
        </authStateContext.Provider>
    )
}

export default AuthStateProvider;

export const useAuthState = () => {
    return useContext(authStateContext);
}
