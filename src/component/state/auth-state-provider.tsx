import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAppState } from './app-state-provider';
import { AuthUser } from '../../model/jwt';
import {
    AuthenticationResponse,
    Authority,
    ChangeEmailRequest,
    ChangePasswordRequest,
    ChangeUserDetailsRequest,
    ConfirmationRequest,
    ResetPasswordRequest,
    SignInRequest,
    SignUpRequest
} from '../../model/service';
import {
    decodeUser,
    getTimeToAccessExpiration,
    hasAnyAuthority,
    isAccessExpired,
    isRefreshExpired,
    isUserAccessExpired
} from '../../auth';
import { ClientResponse, CONTEXT_PATH, postData, postDataVoidResponse } from '../../data';

const PATH_REFRESH = CONTEXT_PATH + 'auth/refresh';
const PATH_SIGN_IN = CONTEXT_PATH + 'auth/sign-in';
const PATH_SIGN_UP = CONTEXT_PATH + 'auth/sign-up';
const PATH_CONFIRM = CONTEXT_PATH + 'auth/confirm';
const PATH_RESET_PASSWORD = CONTEXT_PATH + 'auth/reset-password';
const PATH_CHANGE_PASSWORD = CONTEXT_PATH + 'auth/change-password';
const PATH_CHANGE_EMAIL = CONTEXT_PATH + 'auth/change-email';
const PATH_CHANGE_USER_DETAILS = CONTEXT_PATH + 'auth/change-user-details';

const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';

export const REFRESH_TIMEOUT = 15000;

export interface AuthState {
    refreshAuth: () => void,
    signIn: (signInRequest: SignInRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    signOut: () => void,
    signUp: (signUpRequest: SignUpRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    confirm: (confirmationRequest: ConfirmationRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    resetPassword: (resetPasswordRequest: ResetPasswordRequest) => Promise<ClientResponse<void>>,
    changePassword: (changePasswordRequest: ChangePasswordRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    changeEmail: (changeEmailRequest: ChangeEmailRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    changeUserDetails: (changeUserDetailsRequest: ChangeUserDetailsRequest) => Promise<ClientResponse<AuthenticationResponse>>,
    accessToken?: string,
    refreshToken?: string,
    user?: AuthUser,
    accessExpired: boolean,
    timeToAccessExpiration: number,
    refreshExpired: boolean,
    adminAuthority: boolean,
    managerAuthority: boolean,
    employeeAuthority: boolean,
    customerAuthority: boolean
}

const authStateContext = createContext<AuthState | undefined>(undefined);

const AuthStateProvider = ({children}: { children: ReactNode }) => {
    const appState = useAppState();

    const [refreshToken, setRefreshToken] = useState<string>();
    const [accessToken, setAccessToken] = useState<string>();
    const [user, setUser] = useState<AuthUser>();

    const [refreshCounter, setRefreshCounter] = useState(0);
    const [accessExpired, setAccessExpired] = useState(true);
    const [timeToAccessExpiration, setTimeToAccessExpiration] = useState(0);
    const [refreshExpired, setRefreshExpired] = useState(true);

    const [customerAuthority, setCustomerAuthority] = useState(false);
    const [employeeAuthority, setEmployeeAuthority] = useState(false);
    const [managerAuthority, setManagerAuthority] = useState(false);
    const [adminAuthority, setAdminAuthority] = useState(false);

    useEffect(() => {
        if (appState?.cookiesEnabled) {
            const _accessToken = localStorage.getItem(ACCESS_TOKEN) || undefined;
            if (!isAccessExpired(_accessToken)) {
                setAccessToken(_accessToken);
            }

            const _refreshToken = localStorage.getItem(REFRESH_TOKEN) || undefined;
            if (!isRefreshExpired(_refreshToken)) {
                setRefreshToken(_refreshToken);
            }
        }
    }, [appState?.cookiesEnabled]);

    useEffect(() => {
        setUser(decodeUser(accessToken));
    }, [accessToken]);

    useEffect(() => {
        setRefreshExpired(isRefreshExpired(refreshToken));
    }, [refreshToken]);

    useEffect(() => {
        setCustomerAuthority(hasAnyAuthority(user, Authority.W_ADMIN, Authority.W_MANAGER, Authority.W_EMPLOYEE, Authority.W_CUSTOMER));
        setEmployeeAuthority(hasAnyAuthority(user, Authority.W_ADMIN, Authority.W_MANAGER, Authority.W_EMPLOYEE));
        setManagerAuthority(hasAnyAuthority(user, Authority.W_ADMIN, Authority.W_MANAGER));
        setAdminAuthority(hasAnyAuthority(user, Authority.W_ADMIN));
        setAccessExpired(isUserAccessExpired(user));
        setTimeToAccessExpiration(getTimeToAccessExpiration(user));
    }, [user]);

    useEffect(() => {
        setAccessExpired(isUserAccessExpired(user));
        setTimeToAccessExpiration(getTimeToAccessExpiration(user));
        setRefreshExpired(isRefreshExpired(refreshToken));

        if (accessToken !== undefined && accessExpired) {
            localStorage.removeItem(ACCESS_TOKEN);
            setAccessToken(undefined);
        }

        if (refreshToken !== undefined && refreshExpired) {
            localStorage.removeItem(REFRESH_TOKEN);
            setRefreshToken(undefined);
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
            setAccessToken(response.data.token);
            setRefreshToken(response.data.refreshToken);
        } else {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setAccessToken(undefined);
            setRefreshToken(undefined);
        }
    }

    const refreshAuth = async () => {
        const response = await postData<AuthenticationResponse>(
            PATH_REFRESH, {token: refreshToken});
        handleAuthenticationResponse(response);
    }

    const signIn = async (signInRequest: SignInRequest) => {
        const response = await postData<AuthenticationResponse>(
            PATH_SIGN_IN, signInRequest);
        handleAuthenticationResponse(response);
        return response;
    }

    const signOut = async () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setAccessToken(undefined);
        setRefreshToken(undefined);
    }

    const signUp = async (signUpRequest: SignUpRequest) => {
        const response = await postData<AuthenticationResponse>(
            PATH_SIGN_UP, signUpRequest);
        handleAuthenticationResponse(response);
        return response;
    }

    const confirm = async (confirmationRequest: ConfirmationRequest) => {
        const response = await postData<AuthenticationResponse>(
            PATH_CONFIRM, confirmationRequest);
        handleAuthenticationResponse(response);
        return response;
    }

    const resetPassword = async (resetPasswordRequest: ResetPasswordRequest) => {
        return postDataVoidResponse(PATH_RESET_PASSWORD, resetPasswordRequest);
    }

    const changePassword = async (changePasswordRequest: ChangePasswordRequest) => {
        const response = await postData<AuthenticationResponse>(
            PATH_CHANGE_PASSWORD, changePasswordRequest, accessToken);
        if (response.error === undefined) {
            handleAuthenticationResponse(response);
        }
        return response;
    }

    const changeEmail = async (changeEmailRequest: ChangeEmailRequest) => {
        const response = await postData<AuthenticationResponse>(
            PATH_CHANGE_EMAIL, changeEmailRequest, accessToken);
        if (response.error === undefined) {
            handleAuthenticationResponse(response);
        }
        return response;
    }

    const changeUserDetails = async (changeUserDetailsRequest: ChangeUserDetailsRequest) => {
        const response = await postData<AuthenticationResponse>(
            PATH_CHANGE_USER_DETAILS, changeUserDetailsRequest, accessToken);
        if (response.error === undefined) {
            handleAuthenticationResponse(response);
        }
        return response;
    }

    return (
        <authStateContext.Provider
            value={
                {
                    refreshAuth,
                    signIn,
                    signOut,
                    signUp,
                    confirm,
                    resetPassword,
                    changePassword,
                    changeEmail,
                    changeUserDetails,
                    accessToken,
                    refreshToken,
                    user,
                    accessExpired,
                    timeToAccessExpiration,
                    refreshExpired,
                    adminAuthority,
                    managerAuthority,
                    employeeAuthority,
                    customerAuthority
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
