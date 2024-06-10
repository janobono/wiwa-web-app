import { CONTEXT_PATH, getData, postData } from '../';
import { User } from '../../model/';
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
} from '../../model/auth';

const PATH = CONTEXT_PATH + 'auth';

export const confirm = (confirmationRequest: ConfirmationRequest) => {
    return postData<AuthenticationResponse>(PATH + '/confirm', confirmationRequest);
}

export const changeEmail = (changeEmailRequest: ChangeEmailRequest, accessToken?: string) => {
    return postData<AuthenticationResponse>(PATH + '/change-email', changeEmailRequest, accessToken);
}

export const changePassword = (changePasswordRequest: ChangePasswordRequest, accessToken?: string) => {
    return postData<AuthenticationResponse>(PATH + '/change-password', changePasswordRequest, accessToken);
}

export const changeUserDetails = (changeUserDetailsRequest: ChangeUserDetailsRequest, accessToken?: string) => {
    return postData<AuthenticationResponse>(PATH + '/change-user-details', changeUserDetailsRequest, accessToken);
}

export const resendConfirmation = (resendConfirmationRequest: ResendConfirmationRequest, accessToken?: string) => {
    return postData<void>(PATH + '/resend-confirmation', resendConfirmationRequest, accessToken);
}

export const resetPassword = (resetPasswordRequest: ResetPasswordRequest) => {
    return postData<void>(PATH + '/reset-password', resetPasswordRequest);
}

export const signIn = (signInRequest: SignInRequest) => {
    return postData<AuthenticationResponse>(PATH + '/sign-in', signInRequest);
}

export const signUp = (signUpRequest: SignUpRequest) => {
    return postData<AuthenticationResponse>(PATH + '/sign-up', signUpRequest);
}

export const refresh = (refreshToken?: string) => {
    return postData<AuthenticationResponse>(PATH + '/refresh', {token: refreshToken});
}

export const getUserDetail = (accessToken?: string) => {
    return getData<User>(PATH + '/user-detail', undefined, accessToken);
}
