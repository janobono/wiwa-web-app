export interface ResourceManager {
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
        },
        boardCategories: {
            error: string,
            deleteTitle: string,
            deleteMessage: string
        },
        boardImage: {
            editTitle: string,
            editFileLabel: string,
            editFilePlaceholder: string,
            editFileRequired: string,
            editFileFormat: string,
            editError: string,
            deleteTitle: string,
            deleteMessage: string,
            deleteError: string
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
    },
    edges: {
        fetchDataError: string,
        addEdge: {
            error: string
        },
        editEdge: {
            error: string
        },
        deleteEdge: {
            title: string,
            message: string,
            error: string
        },
        edgeDialog: {
            title: string,
            codeLabel: string,
            codePlaceholder: string,
            codeRequired: string,
            nameLabel: string,
            namePlaceholder: string,
            nameRequired: string,
            descriptionLabel: string,
            descriptionPlaceholder: string,
            weightLabel: string,
            weightPlaceholder: string,
            weightRequired: string,
            widthLabel: string,
            widthPlaceholder: string,
            widthRequired: string,
            thicknessLabel: string,
            thicknessPlaceholder: string,
            thicknessRequired: string,
            priceLabel: string,
            pricePlaceholder: string,
            priceRequired: string
        },
        edgeCategories: {
            error: string,
            deleteTitle: string,
            deleteMessage: string
        },
        edgeImage: {
            editTitle: string,
            editFileLabel: string,
            editFilePlaceholder: string,
            editFileRequired: string,
            editFileFormat: string,
            editError: string,
            deleteTitle: string,
            deleteMessage: string,
            deleteError: string
        }
    },
    orderInputs: {
        option: {
            select: string,
            manufactureProperties: string,
            priceForGluingLayer: string,
            pricesForGluingEdge: string,
            pricesForCutting: string,
            freeDays: string
        }
    }
}
