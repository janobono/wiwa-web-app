export interface CodeListData {
    code: string,
    name: string
}

export interface CodeList {
    id: number,
    code: string,
    name: string
}

export interface CodeListItemData {
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
