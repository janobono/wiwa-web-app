export interface EdgeCategoryItemChange {
    categoryId: number,
    itemId: number
}

export interface EdgeCategoryItem {
    id: string,
    code: string,
    name: string,
    category: EdgeCategory
}

export interface EdgeCategory {
    id: number,
    code: string,
    name: string
}

export interface EdgeChange {
    code: string,
    name: string,
    description?: string,
    weight: number,
    width: number,
    thickness: number,
    price: number
}

export interface Edge {
    id: number,
    code: string,
    name: string,
    description?: string,
    sale: number,
    weight: number,
    width: number,
    thickness: number,
    price: number,
    vatPrice: number,
    categoryItems: EdgeCategoryItem[]
}

export interface EdgeSearchCriteria {
    searchField?: string,
    code?: string,
    name?: string,
    widthFrom?: number,
    widthTo?: number,
    thicknessFrom?: number,
    thicknessTo?: number,
    priceFrom?: number,
    priceTo?: number,
    codeListItems?: string[]
}

export enum EdgeField {
    id = 'id',
    code = 'code',
    name = 'name',
    description = 'description',
    sale = 'sale',
    weight = 'weight',
    width = 'width',
    thickness = 'thickness',
    price = 'price'
}
