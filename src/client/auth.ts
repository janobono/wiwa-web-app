import { ClientResponse, createAuthorization, postData, toWiwaError } from './index';
import {
    AuthenticationResponse,
    ChangeEmailRequest,
    ChangePasswordRequest,
    ChangeUserDetailsRequest,
    ConfirmationRequest,
    RefreshToken,
    ResendConfirmationRequest,
    ResetPasswordRequest,
    SignInRequest,
    SignUpRequest
} from './model';

const PATH_CONFIRM = '/api/auth/confirm';
const PATH_CHANGE_EMAIL = '/api/auth/change-email';
const PATH_CHANGE_PASSWORD = '/api/auth/change-password';
const PATH_CHANGE_USER_DETAILS = '/api/auth/change-user-details';
const PATH_RESEND_CONFIRMATION = '/api/auth/resend-confirmation';
const PATH_RESET_PASSWORD = '/api/auth/reset-password';
const PATH_SIGN_IN = '/api/auth/sign-in';
const PATH_SIGN_UP = '/api/auth/sign-up';
const PATH_REFRESH = '/api/auth/refresh';

export const confirm = async (confirmationRequest: ConfirmationRequest): Promise<ClientResponse<AuthenticationResponse>> => {
    return postData<AuthenticationResponse>(PATH_CONFIRM, confirmationRequest);
}

export const changeEmail = async (changeEmailRequest: ChangeEmailRequest, token: string): Promise<ClientResponse<AuthenticationResponse>> => {
    return postData<AuthenticationResponse>(PATH_CHANGE_EMAIL, changeEmailRequest, token);
}

export const changePassword = async (changePasswordRequest: ChangePasswordRequest, token: string): Promise<ClientResponse<AuthenticationResponse>> => {
    return postData<AuthenticationResponse>(PATH_CHANGE_PASSWORD, changePasswordRequest, token);
}

export const changeUserDetails = async (changeUserDetailsRequest: ChangeUserDetailsRequest, token: string): Promise<ClientResponse<AuthenticationResponse>> => {
    return postData<AuthenticationResponse>(PATH_CHANGE_USER_DETAILS, changeUserDetailsRequest, token);
}

export const resendConfirmation = async (resendConfirmationRequest: ResendConfirmationRequest, token: string): Promise<ClientResponse<boolean>> => {
    const authorization = createAuthorization(token);
    const response = await fetch(PATH_RESEND_CONFIRMATION, {
        method: 'POST',
        headers: {
            ...authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendConfirmationRequest)
    });
    let error;
    if (!response.ok) {
        error = await toWiwaError(response);
    }
    return {data: response.ok, error};
}

export const resetPassword = async (resetPasswordRequest: ResetPasswordRequest): Promise<ClientResponse<boolean>> => {
    const response = await fetch(PATH_RESET_PASSWORD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetPasswordRequest)
    });
    let error;
    if (!response.ok) {
        error = await toWiwaError(response);
    }
    return {data: response.ok, error};
}

export const signIn = async (signInRequest: SignInRequest): Promise<ClientResponse<AuthenticationResponse>> => {
    return postData<AuthenticationResponse>(PATH_SIGN_IN, signInRequest);
}

export const signUp = async (signUpRequest: SignUpRequest): Promise<ClientResponse<AuthenticationResponse>> => {
    return postData<AuthenticationResponse>(PATH_SIGN_UP, signUpRequest);
}

export const refresh = async (refreshToken: RefreshToken): Promise<ClientResponse<AuthenticationResponse>> => {
    return postData<AuthenticationResponse>(PATH_REFRESH, refreshToken);
}
