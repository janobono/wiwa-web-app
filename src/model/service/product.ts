import { ApplicationImage } from './ui.ts';

export interface ProductAttribute {
    key: ProductAttributeKey,
    value: string
}

export enum ProductAttributeKey {
    ORIENTATION = 'ORIENTATION',
    BOARD_CODE = 'BOARD_CODE',
    STRUCTURE_CODE = 'STRUCTURE_CODE'
}

export interface ProductData {
    code: string,
    name: string,
    note: string,
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
    unitId: string
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
    note: string,
    stockStatus: ProductStockStatus,
    attributes: ProductAttribute[],
    images: ApplicationImage[],
    quantities: ProductQuantity[],
    unitPrices: ProductUnitPrice[],
    codeListItems: number[]
}

export interface ProductUnitPrice {
    validFrom: string,
    value: number
    unitId: string
}