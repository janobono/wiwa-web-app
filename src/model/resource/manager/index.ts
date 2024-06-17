export interface ResourceManager {
    title: string,
    codeListsTab: string,
    categoriesTab: string,
    boardsTab: string,
    edgesTab: string,
    orderInputsTab: string,
    ordersTab: string,
    boards: {
        fetchDataError: string,
        addBoard: {
            error: string
        },
        editBoard: {
            error: string
        },
        deleteBoard: {
            title: string,
            message: string,
            error: string
        },
        boardDialog: {
            title: string,
            codeLabel: string,
            codePlaceholder: string,
            codeRequired: string,
            nameLabel: string,
            namePlaceholder: string,
            nameRequired: string,
            descriptionLabel: string,
            descriptionPlaceholder: string,
            boardCodeLabel: string,
            boardCodePlaceholder: string,
            boardCodeRequired: string,
            structureCodeLabel: string,
            structureCodePlaceholder: string,
            structureCodeRequired: string,
            orientationLabel: string,
            weightLabel: string,
            weightPlaceholder: string,
            weightRequired: string,
            lengthLabel: string,
            lengthPlaceholder: string,
            lengthRequired: string,
            widthLabel: string,
            widthPlaceholder: string,
            widthRequired: string,
            thicknessLabel: string,
            thicknessPlaceholder: string,
            thicknessRequired: string,
            priceLabel: string,
            pricePlaceholder: string,
            priceRequired: string
        }
    },
    categories: {
        option: {
            select: string,
            board: string,
            edge: string,
            material: string
        },
        setCategoryError: string,
        setCategoriesError: string,
        deleteCategoryQuestionTitle: string,
        deleteCategoryQuestionMessage: string
    },
    codeLists: {
        id: string,
        code: string,
        name: string,
        fetchDataError: string,
        searchCodeList: {
            placeholder: string
        },
        addCodeList: {
            error: string
        },
        editCodeList: {
            error: string
        },
        deleteCodeList: {
            title: string,
            message: string,
            error: string
        },
        codeListDialog: {
            title: string,
            codeLabel: string,
            codePlaceholder: string,
            codeRequired: string,
            nameLabel: string,
            namePlaceholder: string,
            nameRequired: string
        },
        codeListItems: {
            title: string,
            id: string,
            code: string,
            value: string,
            fetchDataError: string,
            addCodeListItem: {
                error: string
            },
            editCodeListItem: {
                error: string
            },
            moveUpCodeListItem: {
                error: string
            },
            moveDownCodeListItem: {
                error: string
            },
            deleteCodeListItem: {
                title: string,
                message: string,
                error: string
            },
            codeListItemDialog: {
                title: string,
                codeLabel: string,
                codePlaceholder: string,
                codeRequired: string,
                valueLabel: string,
                valuePlaceholder: string,
                valueRequired: string
            }
        },
    }
}
