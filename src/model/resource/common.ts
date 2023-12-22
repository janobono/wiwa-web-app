export interface ResourceCommon {
    action: {
        cancel: string,
        ok: string
    },
    baseNavigation: {
        localeSwitch: string,
        refreshToken: string,
        authNav: {
            title: string,
            signIn: string,
            signUp: string,
            changeDetails: string,
            changeEmail: string,
            changePassword: string,
            signOut: string
        }
    },
    captcha: {
        action: string,
        error: string,
        label: string,
        placeholder: string,
        required: string
    },
    confirmAccount: {
        action: string,
        text: string
    },
    cookiesConsent: {
        action: string,
        link: string,
        text: string
    },
    dialogState: {
        cancel: string,
        no: string,
        ok: string,
        yes: string
    },
    disabledAccount: {
        text: string
    },
    error: {
        gdpr: string,
        invalidCaptcha: string,
        invalidCredentials: string,
        unknown: string,
        unsupportedValidationToken: string,
        userIsDisabled: string,
        userEmailIsUsed: string,
        userNotFound: string,
        userUsernameIsUsed: string
    },
    footer: {
        links: {
            title: string,
            contactInfo: string,
            cookiesInfo: string,
            gdprInfo: string,
            businessConditions: string
        },
        contact: {
            title: string
        }
    },
    imageDialog: {
        alt: string,
        ok: string,
        cancel: string
    },
    mdDialog: {
        editor: string,
        preview: string,
        ok: string,
        cancel: string
    },
    navigation: {
        admin: string,
        manager: string,
        employee: string,
        customer: string
    },
    notFound: string,
    pageable: {
        next: string,
        page: string,
        previous: string
    },
    refreshToken: {
        action: string,
        text: string
    },
    quantityType: {
        area: string,
        distance: string,
        monetary: string,
        volume: string,
        temporal: string,
        mass: string,
        pack: string
    }
}
