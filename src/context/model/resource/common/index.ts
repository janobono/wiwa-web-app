import { UnitId } from '../../../../api/model/application';

export interface ResourceCommon {
    action: {
        add: string,
        cancel: string,
        categories: string,
        close: string,
        copy: string,
        delete: string,
        edit: string,
        extendedSearch: string,
        image: string,
        items: string,
        ok: string,
        moveUp: string,
        moveDown: string,
        search: string,
        submit: string
    },
    boardCriteria: {
        searchPlaceholder: string,
        codePlaceholder: string,
        namePlaceholder: string,
        boardCodePlaceholder: string,
        structureCodePlaceholder: string,
        orientationPlaceholder: string,
        lengthFromPlaceholder: string,
        lengthToPlaceholder: string,
        widthFromPlaceholder: string,
        widthToPlaceholder: string,
        thicknessFromPlaceholder: string,
        thicknessToPlaceholder: string,
        priceFromPlaceholder: string,
        priceToPlaceholder: string
    },
    boardTable: {
        id: string,
        code: string,
        name: string,
        description: string,
        boardCode: string,
        structureCode: string,
        orientation: string,
        sale: string,
        weight: string,
        length: string,
        width: string,
        thickness: string,
        price: string,
        vatPrice: string,
        codeListItems: string,
        image: string
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
    edgeCriteria: {
        searchPlaceholder: string,
        codePlaceholder: string,
        namePlaceholder: string,
        widthFromPlaceholder: string,
        widthToPlaceholder: string,
        thicknessFromPlaceholder: string,
        thicknessToPlaceholder: string,
        priceFromPlaceholder: string,
        priceToPlaceholder: string
    },
    edgeTable: {
        id: string,
        code: string,
        name: string,
        description: string,
        sale: string,
        weight: string,
        width: string,
        thickness: string,
        price: string,
        vatPrice: string,
        codeListItems: string,
        image: string
    },
    error: {
        title: string,
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
        example: string,
        ok: string,
        cancel: string
    },
    maintenance: string,
    navigation: {
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
        },
        adminNav: {
            title: string,
            applicationImages: string,
            baseInfo: string,
            companyInfo: string,
            textInfo: string,
            mailFormat: string,
            orderFormat: string,
            units: string,
            users: string,
        },
        managerNav: {
            title: string,
            codeLists: string,
            codeListItems: string,
            categories: string,
            boards: string,
            boardCategories: string,
            boardImage: string,
            edges: string,
            edgeCategories: string,
            edgeImage: string,
            orderInputs: string,
            orders: string,
        },
        employeeNav: {
            title: string,
            orders: string
        },
        customerNav: {
            title: string,
            orderComments: string,
            orderDetail: string,
            orderEdit: string,
            orderItemEdit: string,
            orderSubmit: string
        },
    },
    notFound: string,
    orderCommentDialog: {
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string
    },
    orderItemEditor: {
        nameLabel: string,
        namePlaceholder: string,
        nameRequired: string,
        quantityLabel: string,
        quantityPlaceholder: string,
        quantityRequired: string,
        descriptionLabel: string,
        descriptionPlaceholder: string
    },
    orderItemTable: {
        id: string,
        sortNum: string,
        name: string,
        description: string,
        quantity: string
    },
    orderPackageType: {
        noPackage: string,
        noPackageWithRemains: string,
        package: string,
        packageWithRemains: string
    },
    orderStatus: {
        new: string,
        sent: string,
        inProduction: string,
        ready: string,
        finished: string,
        cancelled: string
    },
    orderTable: {
        id: string,
        creator: string,
        created: string,
        status: string,
        orderNumber: string,
        weight: string,
        total: string,
        vatTotal: string,
        deliveryDate: string,
        packageType: string
    },
    orderUserTable: {
        id: string,
        titleBefore: string,
        firstName: string,
        midName: string,
        lastName: string,
        titleAfter: string,
        email: string
    },
    pageable: {
        next: string,
        page: string,
        previous: string
    },
    partEditor: {
        boardDimensionsDialogTitle: string,
        boardMaterialDialogTitle: string,
        cornerDimensions: string,
        cornerEdge: string,
        deleteCornerQuestionTitle: string,
        deleteCornerQuestionMessage: string,
        deleteEdgeQuestionTitle: string,
        deleteEdgeQuestionMessage: string,
        edgeMaterialDialogTitle: string,
        partLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        corner: {
            rounded: string,
            straight: string
        },
        cornerDialog: {
            title: string,
            radiusLabel: string,
            radiusPlaceholder: string,
            radiusRequired: string,
            radiusInvalid: string,
            cornerDimensionsLabel: string,
            cornerDimensionsPlaceholderX: string,
            cornerDimensionsPlaceholderY: string,
            cornerDimensionsRequired: string
        },
        part: {
            basic: string,
            duplicatedBasic: string,
            duplicatedFrame: string,
            frame: string
        }
    },
    refreshToken: {
        action: string,
        text: string
    },
    unitId: {
        millimeter: string,
        meter: string,
        squareMeter: string,
        kilogram: string,
        piece: string
    },
    value: {
        no: string,
        yes: string
    }
}

export interface CommonResourceState {
    resource?: ResourceCommon,
    getUnitIdName: (unitId: UnitId) => string | undefined,
    getUnit: (unitId: UnitId) => string | undefined
}
