export interface ResourceManager {
    title: string,
    codeListsTab: string,
    fetchDataError: string,
    codeLists: {
        id: string,
        code: string,
        name: string,
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
        },
        codeListItems: {
            title: string,
            id: string,
            code: string,
            value: string,
            fetchDataError: string,
            addCodeListItem: {
                title: string,
                error: string
            },
            editCodeListItem: {
                title: string,
                error: string
            },
            moveUpCodeListItem: {
                title: string,
                error: string
            },
            moveDownCodeListItem: {
                title: string,
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
