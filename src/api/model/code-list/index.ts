export interface CodeListChange {
    code: string,
    name: string
}

export interface CodeListItemChange {
    codeListId: number,
    parentId?: number,
    code: string,
    value: string
}

export interface CodeListItem {
    id: number,
    codeListId: number,
    code: string,
    value: string,
    leafNode: boolean
}

export interface CodeListItemSearchCriteria {
    codeListId?: number,
    root?: boolean,
    parentId?: number,
    searchField?: string,
    code?: string,
    value?: string,
    treeCode?: string
}

export interface CodeList {
    id: number,
    code: string,
    name: string
}

export interface CodeListSearchCriteria {
    searchField?: string,
    code?: string,
    name?: string
}
