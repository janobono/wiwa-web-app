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
    sortNum: number,
    code: string,
    value: string,
    leafNode: boolean
}

export enum CodeListItemField {
    id = 'id',
    codeListId = 'codeListId',
    sortNum = 'sortNum',
    code = 'code',
    value = 'value',
    leafNode = 'leafNode'
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

export enum CodeListField {
    id = 'id',
    code = 'code',
    name = 'name'
}

export interface CodeListSearchCriteria {
    searchField?: string,
    code?: string,
    name?: string
}
