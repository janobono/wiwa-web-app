export interface AuthenticationResponse {
    token: string,
    type: string,
    refreshToken: string
}

export interface ChangeEmailRequest {
    email: string,
    password: string,
    captchaText: string,
    captchaToken: string
}

export interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
    captchaText: string,
    captchaToken: string
}

export interface ChangeUserDetailsRequest {
    titleBefore?: string,
    firstName: string,
    midName?: string,
    lastName: string,
    titleAfter?: string,
    gdpr: boolean,
    captchaText: string,
    captchaToken: string
}

export interface ConfirmationRequest {
    token: string
}

export interface RefreshToken {
    token: string
}

export interface ResendConfirmationRequest {
    captchaText: string,
    captchaToken: string
}

export interface ResetPasswordRequest {
    email: string,
    captchaText: string,
    captchaToken: string
}

export interface SignInRequest {
    username: string,
    password: string
}

export interface SignUpRequest {
    username: string,
    password: string,
    titleBefore?: string,
    firstName: string,
    midName?: string,
    lastName: string,
    titleAfter?: string,
    email: string,
    gdpr: boolean,
    captchaText: string,
    captchaToken: string
}
