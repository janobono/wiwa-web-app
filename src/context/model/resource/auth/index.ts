export interface ResourceAuth {
    changeDetails: {
        title: string,
        titleBeforeLabel: string,
        titleBeforePlaceholder: string,
        firstNameLabel: string,
        firstNamePlaceholder: string,
        firstNameRequired: string,
        midNameLabel: string,
        midNamePlaceholder: string,
        lastNameLabel: string,
        lastNamePlaceholder: string,
        lastNameRequired: string,
        titleAfterLabel: string,
        titleAfterPlaceholder: string,
        gdprLabel: string
    },
    changeEmail: {
        title: string,
        emailLabel: string,
        emailPlaceholder: string,
        emailRequired: string,
        emailFormat: string,
        passwordLabel: string,
        passwordPlaceholder: string,
        passwordRequired: string
    },
    changePassword: {
        title: string,
        oldPasswordLabel: string,
        oldPasswordPlaceholder: string,
        oldPasswordRequired: string,
        passwordLabel: string,
        passwordPlaceholder: string,
        passwordRequired: string,
        passwordConfirmationLabel: string,
        passwordConfirmationPlaceholder: string,
        passwordConfirmationRequired: string,
        passwordConfirmationNotEquals: string
    },
    resendConfirmation: {
        title: string,
        message: string
    },
    resetPassword: {
        title: string,
        emailLabel: string,
        emailPlaceholder: string,
        emailRequired: string,
        emailFormat: string,
        message: string
    },
    signIn: {
        title: string,
        subtitle: string,
        subtitleLink: string,
        usernameLabel: string,
        usernamePlaceholder: string,
        usernameRequired: string,
        passwordLabel: string,
        passwordPlaceholder: string,
        passwordRequired: string,
        forgottenPasswordLink: string
    },
    signUp: {
        title: string,
        subtitle: string,
        subtitleLink: string,
        usernameLabel: string,
        usernamePlaceholder: string,
        usernameRequired: string,
        passwordLabel: string,
        passwordPlaceholder: string,
        passwordRequired: string,
        passwordConfirmationLabel: string,
        passwordConfirmationPlaceholder: string,
        passwordConfirmationRequired: string,
        passwordConfirmationNotEquals: string,
        emailLabel: string,
        emailPlaceholder: string,
        emailRequired: string,
        emailFormat: string,
        titleBeforeLabel: string,
        titleBeforePlaceholder: string,
        firstNameLabel: string,
        firstNamePlaceholder: string,
        firstNameRequired: string,
        midNameLabel: string,
        midNamePlaceholder: string,
        lastNameLabel: string,
        lastNamePlaceholder: string,
        lastNameRequired: string,
        titleAfterLabel: string,
        titleAfterPlaceholder: string,
        gdprLabel: string
    }
}

export interface AuthResourceState {
    resource?: ResourceAuth
}
