export interface ResourceCommon {
    action: {
        add: string,
        cancel: string,
        copy: string,
        delete: string,
        edit: string,
        items: string,
        ok: string,
        moveUp: string,
        moveDown: string,
        search: string,
        submit: string
    },
    baseNavigation: {
        maintenanceSwitch: string,
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
    codeListTable: {
        id: string,
        code: string,
        name: string
    },
    codeListItemTable: {
        id: string,
        codeListId: string,
        sortNum: string,
        code: string,
        value: string,
        leafNode: string
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
            businessConditions: string,
            orderInfo: string
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
    maintenance: string,
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
    productAttributeKey: {
        boardCode: string,
        structureCode: string,
        orientation: string
    },
    productStockStatus: {
        onStock: string,
        outOfStock: string,
        toOrder: string,
        onInquire: string
    },
    productQuantityKey: {
        sale: string,
        weight: string,
        netWeight: string,
        length: string,
        width: string,
        thickness: string
    },
    selectCodeListDialog: {
        title: string,
        searchTitle: string,
        searchPlaceholder: string,
        id: string,
        code: string,
        name: string,
        error: string
    },
    selectCodeListItemDialog: {
        title: string,
        codeListPlaceholder: string
    },
    unitId: {
        millimeter: string,
        meter: string,
        squareMeter: string,
        kilogram: string,
        piece: string
    },
    userTable: {
        id: string,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        authorities: string,
        confirmed: string,
        enabled: string
    },
    value: {
        no: string,
        yes: string
    }
}
