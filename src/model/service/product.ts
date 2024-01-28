import { ApplicationImage } from './ui.ts';
import { UnitId } from './unit.ts';

export interface ProductAttribute {
    key: ProductAttributeKey,
    value: string
}

export enum ProductAttributeKey {
    BOARD_CODE = 'BOARD_CODE',
    STRUCTURE_CODE = 'STRUCTURE_CODE',
    ORIENTATION = 'ORIENTATION'
}

export interface ProductCategory {
    id: number,
    code: string,
    name: string
}

export interface ProductCategoryData {
    categoryId: number
}

export interface ProductCategoryItem {
    id: number,
    code: string,
    name: string,
    category: ProductCategory
}

export interface ProductCategoryItemData {
    categoryId: number,
    itemId: number
}

export interface ProductData {
    code: string,
    name: string,
    description?: string,
    stockStatus: ProductStockStatus,
    attributes: ProductAttribute[],
    quantities: ProductQuantity[]
}

export enum ProductStockStatus {
    ON_STOCK = 'ON_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
    TO_ORDER = 'TO_ORDER',
    ON_INQUIRE = 'ON_INQUIRE'
}

export interface ProductQuantity {
    key: ProductQuantityKey,
    value: number,
    unit: UnitId
}

export enum ProductQuantityKey {
    SALE = 'SALE',
    WEIGHT = 'WEIGHT',
    NET_WEIGHT = 'NET_WEIGHT',
    LENGTH = 'LENGTH',
    WIDTH = 'WIDTH',
    THICKNESS = 'THICKNESS'
}

export interface Product {
    id: number,
    code: string,
    name: string,
    description?: string,
    stockStatus: ProductStockStatus,
    attributes: ProductAttribute[],
    images: ApplicationImage[],
    quantities: ProductQuantity[],
    unitPrices: ProductUnitPrice[],
    categoryItems: ProductCategoryItem[]
}

export interface ProductUnitPrice {
    validFrom: string,
    value: number
    unit: UnitId
}
