import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import decode, { JwtPayload } from 'jwt-decode';
import { authClient, ClientResponse, WiwaError } from '../client';
import { useConfigState } from '../state';

const TIMEOUT = 15000;

const TOKEN = 'TOKEN';

const W_ADMIN = 'w-admin';
const W_MANAGER = 'w-manager';
const W_EMPLOYEE = 'w-employee';
const W_CUSTOMER = 'w-customer';

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
    user: AuthUser | undefined,
    token: string | undefined,
    confirm: (confirmationRequest: authClient.ConfirmationRequest) => Promise<WiwaError | undefined>,
    changeEmail: (changeEmailRequest: authClient.ChangeEmailRequest) => Promise<WiwaError | undefined>,
    changePassword: (changePasswordRequest: authClient.ChangePasswordRequest) => Promise<WiwaError | undefined>,
    changeUserDetails: (changeUserDetailsRequest: authClient.ChangeUserDetailsRequest) => Promise<WiwaError | undefined>,
    resendConfirmation: (resendConfirmationRequest: authClient.ResendConfirmationRequest) => Promise<WiwaError | undefined>,
    resetPassword: (resetPasswordRequest: authClient.ResetPasswordRequest) => Promise<WiwaError | undefined>,
    signIn: (signInRequest: authClient.SignInRequest) => Promise<WiwaError | undefined>,
    signUp: (signUpRequest: authClient.SignUpRequest) => Promise<WiwaError | undefined>,
    refresh: () => Promise<WiwaError | undefined>,
    signOut: () => void
}

const authStateContext = createContext<AuthState | undefined>(undefined);

const AuthStateProvider: React.FC<any> = ({children}) => {
    const configState = useConfigState();

    const firstRun = useRef(true);
    const [authenticationResponse, setAuthenticationResponse] = useState<authClient.AuthenticationResponse>();
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

    const confirm = async (confirmationRequest: authClient.ConfirmationRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.confirm(confirmationRequest);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const changeEmail = async (changeEmailRequest: authClient.ChangeEmailRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.changeEmail(changeEmailRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const changePassword = async (changePasswordRequest: authClient.ChangePasswordRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.changePassword(changePasswordRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const changeUserDetails = async (changeUserDetailsRequest: authClient.ChangeUserDetailsRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.changeUserDetails(changeUserDetailsRequest, authenticationResponse.token);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const resendConfirmation = async (resendConfirmationRequest: authClient.ResendConfirmationRequest): Promise<WiwaError | undefined> => {
        if (!authenticationResponse) {
            return undefined;
        }
        const clientResponse = await authClient.resendConfirmation(resendConfirmationRequest, authenticationResponse.token);
        return clientResponse.error;
    }

    const resetPassword = async (resetPasswordRequest: authClient.ResetPasswordRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.resetPassword(resetPasswordRequest);
        return clientResponse.error;
    }

    const signIn = async (signInRequest: authClient.SignInRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.signIn(signInRequest);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const signUp = async (signUpRequest: authClient.SignUpRequest): Promise<WiwaError | undefined> => {
        const clientResponse = await authClient.signUp(signUpRequest);
        handleAuthenticationResponse(clientResponse);
        return clientResponse.error;
    }

    const refresh = async () => {
        return await refreshToken(localStorage.getItem(TOKEN));
    }

    const signOut = () => {
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

    const handleAuthenticationResponse = (clientResponse: ClientResponse<authClient.AuthenticationResponse>) => {
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
    return hasAnyAuthority(user, W_ADMIN);
};

export const hasManagerAuthority = (user: AuthUser | undefined) => {
    return hasAnyAuthority(user, W_ADMIN, W_MANAGER);
};

export const hasEmployeeAuthority = (user: AuthUser | undefined) => {
    return hasAnyAuthority(user, W_ADMIN, W_MANAGER, W_EMPLOYEE);
};

export const hasCustomerAuthority = (user: AuthUser | undefined) => {
    if (user) {
        return hasAnyAuthority(user, W_ADMIN, W_MANAGER, W_EMPLOYEE, W_CUSTOMER) && user.confirmed;
    }
    return false;
};
