export interface ResourceAdmin {
    title: string,
    baseInfoTab: string,
    appImagesTab: string,
    appInfoTab: string,
    companyInfoTab: string,
    businessConditionsTab: string,
    cookiesInfoTab: string,
    gdprInfoTab: string,
    workingHoursTab: string,
    usersTab: string,
    appImages: {
        addImage: string,
        deleteImage: string,
        deleteImageQuestionMessage: string,
        deleteImageQuestionTitle: string,
        loadImagesError: string,
        addImageError: string,
        addAppImage: {
            title: string,
            fileLabel: string,
            filePlaceholder: string,
            fileFormat: string,
            fileRequired: string,
            error: string
        }
    },
    applicationInfo: {
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        add: string,
        edit: string,
        delete: string,
        confirm: string,
        deleteItemQuestionTitle: string,
        deleteItemQuestionMessage: string,
        error: string,
        submit: string,
        cancel: string,
        editItemDialog: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string
        }
    },
    baseInfo: {
        logo: {
            title: string,
            fileLabel: string,
            filePlaceholder: string,
            fileFormat: string,
            fileRequired: string,
            error: string
        },
        title: {
            title: string,
            titleLabel: string,
            titlePlaceholder: string,
            titleRequired: string,
            error: string,
            submit: string,
            cancel: string
        },
        welcomeText: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string,
            error: string
        }
    },
    companyInfo: {
        title: string,
        nameLabel: string,
        namePlaceholder: string,
        nameRequired: string,
        streetLabel: string,
        streetPlaceholder: string,
        streetRequired: string,
        cityLabel: string,
        cityPlaceholder: string,
        cityRequired: string,
        zipCodeLabel: string,
        zipCodePlaceholder: string,
        zipCodeRequired: string,
        stateLabel: string,
        statePlaceholder: string,
        stateRequired: string,
        phoneLabel: string,
        phonePlaceholder: string,
        phoneRequired: string,
        mailLabel: string,
        mailPlaceholder: string,
        mailRequired: string,
        mailFormat: string,
        businessIdLabel: string,
        businessIdPlaceholder: string,
        taxIdLabel: string,
        taxIdPlaceholder: string,
        vatRegNoLabel: string,
        vatRegNoPlaceholder: string,
        commercialRegisterInfoLabel: string,
        commercialRegisterInfoPlaceholder: string,
        mapUrlLabel: string,
        mapUrlPlaceholder: string,
        mapUrlRequired: string,
        error: string,
        submit: string,
        cancel: string
    },
    businessConditions: {
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        error: string,
        submit: string,
        cancel: string
    }
    cookiesInfo: {
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        error: string,
        submit: string,
        cancel: string
    },
    gdprInfo: {
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        error: string,
        submit: string,
        cancel: string
    },
    users: {
        searchUser: string,
        searchUserPlaceholder: string,
        previous: string,
        page: string,
        next: string,
        error: string,
        userCard: {
            username: string,
            email: string,
            firstName: string,
            lastName: string,
            deleteUser: {
                title: string,
                message: string,
                error: string
            },
            userAuthorities: {
                title: string,
                authorities: string,
                customer: string,
                employee: string,
                manager: string,
                admin: string,
                submit: string,
                cancel: string,
                error: string
            },
            userEnabled: {
                title: string,
                dialogTitle: string,
                disableQuestion: string,
                enableQuestion: string,
                error: string
            },
            userConfirmed: {
                title: string,
                dialogTitle: string,
                denyQuestion: string,
                confirmQuestion: string,
                error: string
            }
        }
    },
    workingHours: {
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string,
        error: string,
        submit: string,
        cancel: string
    }
}
