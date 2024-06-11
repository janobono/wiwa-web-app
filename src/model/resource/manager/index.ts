export interface ResourceManager {
    title: string,
    codeListsTab: string,
    boardsTab: string,
    edgesTab: string,
    orderInputsTab: string,
    ordersTab: string,
    fetchDataError: string,
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
