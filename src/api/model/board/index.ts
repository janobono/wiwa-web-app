import { CategoryItem } from '../';

export interface BoardChange {
    code: string,
    name: string,
    description?: string,
    boardCode: string,
    structureCode: string,
    orientation: boolean,
    weight: number,
    length: number,
    width: number,
    thickness: number,
    price: number
}

export interface Board {
    id: number,
    code: string,
    name: string,
    description?: string,
    boardCode: string,
    structureCode: string,
    orientation: boolean,
    sale: number,
    weight: number,
    length: number,
    width: number,
    thickness: number,
    price: number,
    vatPrice: number,
    categoryItems: CategoryItem[]
}

export interface BoardSearchCriteria {
    searchField?: string,
    code?: string,
    name?: string,
    boardCode?: string,
    structureCode?: string,
    orientation?: boolean,
    lengthFrom?: number,
    lengthTo?: number,
    widthFrom?: number,
    widthTo?: number,
    thicknessFrom?: number,
    thicknessTo?: number,
    priceFrom?: number,
    priceTo?: number,
    codeListItems?: string[]
}

export enum BoardField {
    id = 'id',
    code = 'code',
    name = 'name',
    description = 'description',
    boardCode = 'boardCode',
    structureCode = 'structureCode',
    orientation = 'orientation',
    sale = 'sale',
    weight = 'weight',
    length = 'length',
    width = 'width',
    thickness = 'thickness',
    price = 'price',
    vatPrice = 'vatPrice',
    codeListItems = 'codeListItems',
    image = 'image'
}
