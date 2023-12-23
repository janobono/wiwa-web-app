export interface ResourceManager {
    title: string,
    codeListsTab: string,
    quantityUnitsTab: string,
    productsTab: string,
    fetchDataError: string,
    codeLists: {
        id: string,
        code: string,
        name: string,
        codeListItems: string,
        fetchDataError: string,
        searchCodeList: {
            title: string,
            placeholder: string
        },
        addCodeList: {
            title: string,
            error: string
        },
        editCodeList: {
            title: string,
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
        }
    },
    quantityUnits: {
        id: string,
        type: string,
        unit: string,
        fetchDataError: string,
        addQuantityUnit: {
            title: string,
            error: string
        },
        editQuantityUnit: {
            title: string,
            error: string
        },
        deleteQuantityUnit: {
            title: string,
            message: string,
            error: string
        },
        quantityUnitDialog: {
            title: string,
            idLabel: string,
            idPlaceholder: string,
            idRequired: string,
            typeLabel: string,
            typePlaceholder: string,
            typeRequired: string,
            unitLabel: string,
            unitPlaceholder: string,
            unitRequired: string
        }
    }
}
