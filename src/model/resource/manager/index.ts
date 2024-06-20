export interface ResourceManager {
    boards: {
        deleteBoard: {
            title: string,
            message: string
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
            deleteTitle: string,
            deleteMessage: string
        },
        boardImage: {
            editTitle: string,
            editFileLabel: string,
            editFilePlaceholder: string,
            editFileRequired: string,
            editFileFormat: string,
            deleteTitle: string,
            deleteMessage: string
        }
    },
    categoryTable: {
        id: string,
        code: string,
        name: string
    },
    categoryItemTable: {
        id: string,
        code: string,
        name: string,
        category: string
    },
    categories: {
        option: {
            select: string,
            board: string,
            edge: string,
            material: string
        },
        deleteCategoryQuestionTitle: string,
        deleteCategoryQuestionMessage: string
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
    codeLists: {
        id: string,
        code: string,
        name: string,
        fetchDataError: string,
        searchCodeList: {
            placeholder: string
        },
        deleteCodeList: {
            title: string,
            message: string
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
            deleteCodeListItem: {
                title: string,
                message: string
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
        deleteEdge: {
            title: string,
            message: string
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
            deleteTitle: string,
            deleteMessage: string
        },
        edgeImage: {
            editTitle: string,
            editFileLabel: string,
            editFilePlaceholder: string,
            editFileRequired: string,
            editFileFormat: string,
            deleteTitle: string,
            deleteMessage: string
        }
    },
    freeDayTable: {
        name: string,
        day: string,
        month: string
    },
    orderInputs: {
        option: {
            select: string,
            vatRate: string,
            manufactureProperties: string,
            priceForGluingLayer: string,
            pricesForGluingEdge: string,
            pricesForCutting: string,
            freeDays: string
        },
        freeDay: {
            title: string,
            nameLabel: string,
            namePlaceholder: string,
            nameRequired: string,
            dateLabel: string,
            datePlaceholder: string,
            dateRequired: string,
            deleteQuestionTitle: string,
            deleteQuestionMessage: string
        },
        manufactureProperties: {
            minimalSystemDimensionsLabel: string,
            minimalSystemDimensionsPlaceholderX: string,
            minimalSystemDimensionsPlaceholderY: string,
            minimalSystemDimensionsRequired: string,
            minimalEdgedBoardDimensionsLabel: string,
            minimalEdgedBoardDimensionsPlaceholderX: string,
            minimalEdgedBoardDimensionsPlaceholderY: string,
            minimalEdgedBoardDimensionsRequired: string,
            minimalLayeredBoardDimensionsLabel: string,
            minimalLayeredBoardDimensionsPlaceholderX: string,
            minimalLayeredBoardDimensionsPlaceholderY: string,
            minimalLayeredBoardDimensionsRequired: string,
            minimalFrameBoardDimensionsLabel: string,
            minimalFrameBoardDimensionsPlaceholderX: string,
            minimalFrameBoardDimensionsPlaceholderY: string,
            minimalFrameBoardDimensionsRequired: string,
            edgeWidthAppendLabel: string,
            edgeWidthAppendPlaceholder: string,
            edgeWidthAppendRequired: string,
            edgeLengthAppendLabel: string,
            edgeLengthAppendPlaceholder: string,
            edgeLengthAppendRequired: string,
            duplicatedBoardAppendLabel: string,
            duplicatedBoardAppendPlaceholder: string,
            duplicatedBoardAppendRequired: string
        },
        vatRate: {
            label: string,
            placeholder: string,
            required: string
        }
    },
    selectCodeListDialog: {
        title: string,
        searchTitle: string,
        searchPlaceholder: string
    },
    selectCodeListItemDialog: {
        title: string,
        codeListPlaceholder: string
    }
}
