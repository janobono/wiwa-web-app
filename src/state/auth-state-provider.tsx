import React, { createContext, useContext, useEffect, useState } from 'react';
import decode, { JwtPayload } from 'jwt-decode';

import { authClient, ClientResponse, wiwaError } from '../client';
import {
    AuthenticationResponse,
    Authority,
    ChangeEmailRequest,
    ChangePasswordRequest,
    ChangeUserDetailsRequest,
    ConfirmationRequest,
    ResendConfirmationRequest,
    ResetPasswordRequest,
    SignInRequest,
    SignUpRequest
} from '../client/model';

import { useConfigState } from '../state';

const TOKEN = 'TOKEN';

interface AuthUser extends JwtPayload {
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

export interface AuthState {
    token?: string,
    user?: AuthUser,
    confirm: (confirmationRequest: ConfirmationRequest) => Promise<ClientResponse<void>>,
    changeEmail: (changeEmailRequest: ChangeEmailRequest) => Promise<ClientResponse<void>>,
    changePassword: (changePasswordRequest: ChangePasswordRequest) => Promise<ClientResponse<void>>,
    changeUserDetails: (changeUserDetailsRequest: ChangeUserDetailsRequest) => Promise<ClientResponse<void>>,
    resendConfirmation: (resendConfirmationRequest: ResendConfirmationRequest) => Promise<ClientResponse<void>>,
    resetPassword: (resetPasswordRequest: ResetPasswordRequest) => Promise<ClientResponse<void>>,
    signIn: (signInRequest: SignInRequest) => Promise<ClientResponse<void>>,
    signUp: (signUpRequest: SignUpRequest) => Promise<ClientResponse<void>>,
    signOut: () => void
}

const authStateContext = createContext<AuthState | undefined>(undefined);

const AuthStateProvider: React.FC<any> = ({children}) => {
    const configState = useConfigState();

    const [authCounter, setAuthCounter] = useState(0);

    const [authenticationResponse, setAuthenticationResponse] = useState<AuthenticationResponse>();
    const [user, setUser] = useState<AuthUser>();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        let refreshToken = localStorage.getItem(TOKEN);
        if (!refreshToken && authenticationResponse?.refreshToken) {
            refreshToken = authenticationResponse.refreshToken;
        }
        refresh(refreshToken);

        if (token) {
            let timeout = 15000;
            if (user?.exp) {
                const timeToExp = user.exp * 1000 - Date.now();
                if (timeToExp > timeout) {
                    timeout = timeToExp - 1000;
                }
            }
            const timer = setInterval(() => setAuthCounter(authCounter + 1), timeout);
            return () => clearTimeout(timer);
        }
    }, [configState?.cookiesEnabled, token, authCounter]);

    const refresh = (refreshToken: string | null) => {
        if (refreshToken) {
            console.log('auth refresh');
            authClient.refresh({token: refreshToken})
                .then(data => handleAuthenticationResponse(data));
        } else {
            setToken(undefined);
            setUser(undefined);
            setAuthenticationResponse(undefined);
        }
    }

    const confirm = async (confirmationRequest: ConfirmationRequest): Promise<ClientResponse<void>> => {
        const clientResponse = await authClient.confirm(confirmationRequest);
        handleAuthenticationResponse(clientResponse);
        return {data: undefined, error: clientResponse.error};
    }

    const changeEmail = async (changeEmailRequest: ChangeEmailRequest): Promise<ClientResponse<void>> => {
        if (!authenticationResponse) {
            throw new Error('User not authenticated');
        }
        const clientResponse = await authClient.changeEmail(changeEmailRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return {data: undefined, error: clientResponse.error};
    }

    const changePassword = async (changePasswordRequest: ChangePasswordRequest): Promise<ClientResponse<void>> => {
        if (!authenticationResponse) {
            return {data: undefined, error: wiwaError('Unauthenticated access.')};
        }
        const clientResponse = await authClient.changePassword(changePasswordRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return {data: undefined, error: clientResponse.error};
    }

    const changeUserDetails = async (changeUserDetailsRequest: ChangeUserDetailsRequest): Promise<ClientResponse<void>> => {
        if (!authenticationResponse) {
            return {data: undefined, error: wiwaError('Unauthenticated access.')};
        }
        const clientResponse = await authClient.changeUserDetails(changeUserDetailsRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return {data: undefined, error: clientResponse.error};
    }

    const resendConfirmation = async (resendConfirmationRequest: ResendConfirmationRequest): Promise<ClientResponse<void>> => {
        if (!authenticationResponse) {
            return {data: undefined, error: wiwaError('Unauthenticated access.')};
        }
        const clientResponse = await authClient.resendConfirmation(resendConfirmationRequest, authenticationResponse.token);
        return {data: undefined, error: clientResponse.error};
    }

    const resetPassword = async (resetPasswordRequest: ResetPasswordRequest): Promise<ClientResponse<void>> => {
        return authClient.resetPassword(resetPasswordRequest);
    }

    const signIn = async (signInRequest: SignInRequest): Promise<ClientResponse<void>> => {
        const clientResponse = await authClient.signIn(signInRequest);
        handleAuthenticationResponse(clientResponse);
        return {data: undefined, error: clientResponse.error};
    }

    const signUp = async (signUpRequest: SignUpRequest): Promise<ClientResponse<void>> => {
        const clientResponse = await authClient.signUp(signUpRequest);
        handleAuthenticationResponse(clientResponse);
        return {data: undefined, error: clientResponse.error};
    }

    const signOut = () => {
        localStorage.removeItem(TOKEN);
        setToken(undefined);
        setUser(undefined);
        setAuthenticationResponse(undefined);
    }

    const handleAuthenticationResponse = (clientResponse: ClientResponse<AuthenticationResponse>) => {
        if (clientResponse.data) {
            const _authUser = decode<AuthUser>(clientResponse.data.token);
            if (_authUser) {
                if (configState?.cookiesEnabled) {
                    localStorage.setItem(TOKEN, clientResponse.data.refreshToken);
                }
                setToken(clientResponse.data.token);
                setUser(_authUser);
                setAuthenticationResponse(clientResponse.data);
                return;
            }
        }
        setToken(undefined);
        setUser(undefined);
        setAuthenticationResponse(undefined);
    }

    return (
        <authStateContext.Provider
            value={
                {
                    token,
                    user,
                    confirm,
                    changeEmail,
                    changePassword,
                    changeUserDetails,
                    resendConfirmation,
                    resetPassword,
                    signIn,
                    signUp,
                    signOut
                }
            }
        >{children}
        </authStateContext.Provider>
    );
}

export default AuthStateProvider;

export const useAuthState = () => {
    return useContext(authStateContext);
}

const hasAnyAuthority = (user: AuthUser | undefined, ...authorities: string[]) => {
    if (user?.aud && Array.isArray(user.aud)) {
        return user.aud.some(a => authorities.includes(a));
    }
    return false;
};

export const hasAdminAuthority = (user: AuthUser | undefined) => {
    return hasAnyAuthority(user, Authority.W_ADMIN);
};

export const hasManagerAuthority = (user: AuthUser | undefined) => {
    return hasAnyAuthority(user, Authority.W_ADMIN, Authority.W_MANAGER);
};

export const hasEmployeeAuthority = (user: AuthUser | undefined) => {
    return hasAnyAuthority(user, Authority.W_ADMIN, Authority.W_MANAGER, Authority.W_EMPLOYEE);
};

export const hasCustomerAuthority = (user: AuthUser | undefined) => {
    if (user) {
        return hasAnyAuthority(user, Authority.W_ADMIN, Authority.W_MANAGER, Authority.W_EMPLOYEE, Authority.W_CUSTOMER) && user.confirmed;
    }
    return false;
};
