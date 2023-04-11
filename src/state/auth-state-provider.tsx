import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import decode, { JwtPayload } from 'jwt-decode';

import { authClient, ClientResponse, WiwaError } from '../client';
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

const TIMEOUT = 15000;

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
    user?: AuthUser,
    token?: string,
    confirm: (confirmationRequest: ConfirmationRequest) => Promise<WiwaError | undefined>,
    changeEmail: (changeEmailRequest: ChangeEmailRequest) => Promise<WiwaError | undefined>,
    changePassword: (changePasswordRequest: ChangePasswordRequest) => Promise<WiwaError | undefined>,
    changeUserDetails: (changeUserDetailsRequest: ChangeUserDetailsRequest) => Promise<WiwaError | undefined>,
    resendConfirmation: (resendConfirmationRequest: ResendConfirmationRequest) => Promise<WiwaError | undefined>,
    resetPassword: (resetPasswordRequest: ResetPasswordRequest) => Promise<WiwaError | undefined>,
    signIn: (signInRequest: SignInRequest) => Promise<WiwaError | undefined>,
    signUp: (signUpRequest: SignUpRequest) => Promise<WiwaError | undefined>,
    refresh: () => Promise<WiwaError | undefined>,
    signOut: () => Promise<void>
}

const authStateContext = createContext<AuthState | undefined>(undefined);

const AuthStateProvider: React.FC<any> = ({children}) => {
    const configState = useConfigState();

    const firstRun = useRef(true);
    const [authenticationResponse, setAuthenticationResponse] = useState<AuthenticationResponse>();
    const [user, setUser] = useState<AuthUser>();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            setInterval(async () => {
                if (user?.exp) {
                    if (Date.now() - TIMEOUT > user.exp * 1000) {
                        refresh();
                    }
                }
            }, TIMEOUT);
        }
        refresh();
    }, [configState?.cookiesEnabled]);

    useEffect(() => {
        setToken(authenticationResponse?.token);
    }, [authenticationResponse]);

    const confirm = async (confirmationRequest: ConfirmationRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.confirm(confirmationRequest);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const changeEmail = async (changeEmailRequest: ChangeEmailRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.changeEmail(changeEmailRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const changePassword = async (changePasswordRequest: ChangePasswordRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.changePassword(changePasswordRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const changeUserDetails = async (changeUserDetailsRequest: ChangeUserDetailsRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.changeUserDetails(changeUserDetailsRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const resendConfirmation = async (resendConfirmationRequest: ResendConfirmationRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.resendConfirmation(resendConfirmationRequest, authenticationResponse.token);
        return clientResponse.error;
    }

    const resetPassword = async (resetPasswordRequest: ResetPasswordRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.resetPassword(resetPasswordRequest);
        return clientResponse.error;
    }

    const signIn = async (signInRequest: SignInRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.signIn(signInRequest);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const signUp = async (signUpRequest: SignUpRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.signUp(signUpRequest);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const refresh = async () => {
        return await refreshToken(localStorage.getItem(TOKEN));
    }

    const signOut = async () => {
        localStorage.removeItem(TOKEN);
        setAuthenticationResponse(undefined);
        setUser(undefined);
    }

    const refreshToken = async (refreshToken: string | null): Promise<WiwaError | undefined> => {
        if (refreshToken) {
            const clientResponse = await authClient.refresh({token: refreshToken});
            handleAuthenticationResponse(clientResponse);
            return clientResponse.error;
        }
        return undefined;
    }

    const handleAuthenticationResponse = (clientResponse: ClientResponse<AuthenticationResponse>) => {
        if (clientResponse.data) {
            const _authUser = decode<AuthUser>(clientResponse.data.token);
            if (_authUser) {
                if (configState?.cookiesEnabled) {
                    localStorage.setItem(TOKEN, clientResponse.data.refreshToken);
                }
                setAuthenticationResponse(clientResponse.data);
                setUser(_authUser);
                return;
            }
        }
    }

    return (
        <authStateContext.Provider
            value={
                {
                    user,
                    token,
                    confirm,
                    changeEmail,
                    changePassword,
                    changeUserDetails,
                    resendConfirmation,
                    resetPassword,
                    signIn,
                    signUp,
                    refresh,
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
