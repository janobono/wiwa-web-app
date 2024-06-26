import { JwtPayload } from 'jwt-decode';

import { ClientResponse } from '../../../api/controller';
import { User } from '../../../api/model';
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
} from '../../../api/model/auth';

export interface AuthToken {
    accessToken: string,
    refreshToken: string
}

export interface AuthUser {
    jwtPayload: JwtPayload,
    user: User
}

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
