export interface ResourceAdmin {
    applicationImageInfoTable: {
        fileName: string,
        thumbnail: string
    },
    applicationImages: {
        deleteImageQuestionMessage: string,
        deleteImageQuestionTitle: string,
        addAppImage: {
            title: string,
            fileLabel: string,
            filePlaceholder: string,
            fileFormat: string,
            fileRequired: string
        }
    },
    baseInfo: {
        logo: {
            title: string,
            fileLabel: string,
            filePlaceholder: string,
            fileFormat: string,
            fileRequired: string
        },
        title: {
            title: string,
            titleLabel: string,
            titlePlaceholder: string,
            titleRequired: string
        },
        welcomeText: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string
        },
        applicationInfo: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string,
            deleteItemQuestionTitle: string,
            deleteItemQuestionMessage: string
            editItemDialog: {
                title: string,
                valueLabel: string,
                valuePlaceholder: string,
                valueRequired: string
            }
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
        mapUrlRequired: string
    },
    mailFormat: {
        option: {
            select: string,
            signUpMail: string,
            resetPasswordMail: string,
            orderCommentMail: string,
            orderSendMail: string,
            orderStatusMail: string
        },
        signUp: {
            subjectLabel: string,
            subjectPlaceholder: string,
            subjectRequired: string,
            titleLabel: string,
            titlePlaceholder: string,
            titleRequired: string,
            messageLabel: string,
            messagePlaceholder: string,
            messageRequired: string,
            linkLabel: string,
            linkPlaceholder: string,
            linkRequired: string
        },
        resetPassword: {
            subjectLabel: string,
            subjectPlaceholder: string,
            subjectRequired: string,
            titleLabel: string,
            titlePlaceholder: string,
            titleRequired: string,
            messageLabel: string,
            messagePlaceholder: string,
            messageRequired: string,
            passwordMessageLabel: string,
            passwordMessagePlaceholder: string,
            passwordMessageRequired: string,
            linkLabel: string,
            linkPlaceholder: string,
            linkRequired: string
        },
        orderComment: {
            subjectLabel: string,
            subjectPlaceholder: string,
            subjectRequired: string,
            titleLabel: string,
            titlePlaceholder: string,
            titleRequired: string,
            messageLabel: string,
            messagePlaceholder: string,
            messageRequired: string,
            linkLabel: string,
            linkPlaceholder: string,
            linkRequired: string
        },
        orderSend: {
            subjectLabel: string,
            subjectPlaceholder: string,
            subjectRequired: string,
            titleLabel: string,
            titlePlaceholder: string,
            titleRequired: string,
            messageLabel: string,
            messagePlaceholder: string,
            messageRequired: string,
            linkLabel: string,
            linkPlaceholder: string,
            linkRequired: string,
            attachmentLabel: string,
            attachmentPlaceholder: string,
            attachmentRequired: string
        },
        orderStatus: {
            productionSubjectLabel: string,
            productionSubjectPlaceholder: string,
            productionSubjectRequired: string,
            productionTitleLabel: string,
            productionTitlePlaceholder: string,
            productionTitleRequired: string,
            productionMessageLabel: string,
            productionMessagePlaceholder: string,
            productionMessageRequired: string,
            readySubjectLabel: string,
            readySubjectPlaceholder: string,
            readySubjectRequired: string,
            readyTitleLabel: string,
            readyTitlePlaceholder: string,
            readyTitleRequired: string,
            readyMessageLabel: string,
            readyMessagePlaceholder: string,
            readyMessageRequired: string,
            finishedSubjectLabel: string,
            finishedSubjectPlaceholder: string,
            finishedSubjectRequired: string,
            finishedTitleLabel: string,
            finishedTitlePlaceholder: string,
            finishedTitleRequired: string,
            finishedMessageLabel: string,
            finishedMessagePlaceholder: string,
            finishedMessageRequired: string,
            cancelledSubjectLabel: string,
            cancelledSubjectPlaceholder: string,
            cancelledSubjectRequired: string,
            cancelledTitleLabel: string,
            cancelledTitlePlaceholder: string,
            cancelledTitleRequired: string,
            cancelledMessageLabel: string,
            cancelledMessagePlaceholder: string,
            cancelledMessageRequired: string,
            linkLabel: string,
            linkPlaceholder: string,
            linkRequired: string,
            attachmentLabel: string,
            attachmentPlaceholder: string,
            attachmentRequired: string
        }
    },
    orderFormat: {
        option: {
            select: string,
            dimensions: string,
            boards: string,
            edges: string,
            corners: string,
            pattern: string,
            content: string,
            packageType: string,
            csvSeparator: string,
            csvReplacements: string,
            csvColumns: string
        },
        key: string,
        value: string
        editEntry: {
            label: string,
            placeholder: string,
            required: string
        },
        csvReplacement: {
            title: string,
            regexLabel: string,
            regexPlaceholder: string,
            regexRequired: string,
            replacementLabel: string
        }
    },
    textInfo: {
        option: {
            select: string,
            businessConditions: string,
            cookiesInfo: string,
            gdprInfo: string,
            orderInfo: string,
            workingHours: string
        },
        businessConditions: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string
        }
        cookiesInfo: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string
        },
        gdprInfo: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string
        },
        orderInfo: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string
        },
        workingHours: {
            title: string,
            valueLabel: string,
            valuePlaceholder: string,
            valueRequired: string
        },
    },
    unitTable: {
        id: string,
        value: string
    },
    units: {
        editUnit: {
            title: string,
            valuePlaceholder: string,
            valueRequired: string
        }
    },
    users: {
        fetchDataError: string,
        deleteUser: {
            title: string,
            message: string
        },
        userAuthorities: {
            title: string,
            authorities: string,
            customer: string,
            employee: string,
            manager: string,
            admin: string
        },
        userEnabled: {
            title: string,
            dialogTitle: string,
            disableQuestion: string,
            enableQuestion: string
        },
        userConfirmed: {
            title: string,
            dialogTitle: string,
            denyQuestion: string,
            confirmQuestion: string
        }
    }
}
