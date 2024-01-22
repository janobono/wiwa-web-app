export interface ProductCategory {
    id: number,
    name: string
}

export interface ProductCategoryItem {
    id?: number,
    name?: string,
    category: ProductCategory
}

export interface ProductCategoryItemData {
    categoryId: number,
    itemId?: number
}
