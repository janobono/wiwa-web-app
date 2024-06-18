export enum Authority {
    W_ADMIN = 'w-admin',
    W_MANAGER = 'w-manager',
    W_EMPLOYEE = 'w-employee',
    W_CUSTOMER = 'w-customer'
}

export const containsAuthority = (authorities: Authority[], authority: Authority) => {
    return authorities.some(a => a === authority);
};

export interface CategoryItemChange {
    categoryId: number,
    itemId: number
}

export interface CategoryItem {
    id: number,
    code: string,
    name: string,
    category: Category
}

export enum CategoryItemField {
    id = 'id',
    code = 'code',
    name = 'name',
    category = 'category'
}

export interface Category {
    id: number,
    code: string,
    name: string
}

export enum CategoryField {
    id = 'id',
    code = 'code',
    name = 'name'
}

export interface Dimensions {
    x: number,
    y: number
}

export interface Entry<K, V> {
    key: K,
    value: V
}

export interface HealthStatus {
    status: string
}

export interface Page<T> {
    totalPages: number,
    totalElements: number,
    size: number,
    content: T[],
    number: number,
    last: boolean,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}

export interface Pageable<T> {
    page: number,
    size: number,
    sort?: {
        field: T,
        asc: boolean
    }
}

export interface SingleValueBody<T> {
    value: T
}

export interface User {
    id: number,
    username: string,
    titleBefore?: string,
    firstName: string,
    midName?: string,
    lastName: string,
    titleAfter?: string,
    email: string,
    gdpr: boolean,
    confirmed: boolean,
    enabled: boolean,
    authorities: Authority[]
}

export enum WiwaErrorCode {
    UNKNOWN = 'UNKNOWN',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',

    APPLICATION_IMAGE_NOT_SUPPORTED = 'APPLICATION_IMAGE_NOT_SUPPORTED',
    APPLICATION_PROPERTY_NOT_FOUND = 'APPLICATION_PROPERTY_NOT_FOUND',
    AUTHORITY_NOT_FOUND = 'AUTHORITY_NOT_FOUND',
    GDPR = 'GDPR',
    INVALID_CAPTCHA = 'INVALID_CAPTCHA',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    UNSUPPORTED_VALIDATION_TOKEN = 'UNSUPPORTED_VALIDATION_TOKEN',
    USER_EMAIL_IS_USED = 'USER_EMAIL_IS_USED',
    USER_IS_DISABLED = 'USER_IS_DISABLED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_USERNAME_IS_USED = 'USER_USERNAME_IS_USED',
    CODE_IS_USED = 'CODE_IS_USED',
    BOARD_NOT_FOUND = 'BOARD_NOT_FOUND',
    EDGE_NOT_FOUND = 'EDGE_NOT_FOUND',
    CODE_LIST_NOT_FOUND = 'CODE_LIST_NOT_FOUND',
    CODE_LIST_ITEM_NOT_FOUND = 'CODE_LIST_ITEM_NOT_FOUND',
    CODE_LIST_ITEM_NOT_EMPTY = 'CODE_LIST_ITEM_NOT_EMPTY',
    QUANTITY_UNIT_NOT_FOUND = 'QUANTITY_UNIT_NOT_FOUND',
    ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
    ORDER_IS_IMMUTABLE = 'ORDER_IS_IMMUTABLE',
    ORDER_STATUS_INVALID = 'ORDER_STATUS_INVALID',
    ORDER_IS_EMPTY = 'ORDER_IS_EMPTY',
    ORDER_AGREEMENTS_INVALID = 'ORDER_AGREEMENTS_INVALID',
    ORDER_DELIVERY_DATE_INVALID = 'ORDER_DELIVERY_DATE_INVALID',
    ORDER_ITEM_NOT_FOUND = 'ORDER_ITEM_NOT_FOUND',
    ORDER_ITEM_PROPERTIES = 'ORDER_ITEM_PROPERTIES',
    ORDER_ITEM_PART_BOARD = 'ORDER_ITEM_PART_BOARD',
    ORDER_ITEM_PART_EDGE = 'ORDER_ITEM_PART_EDGE',
    ORDER_ITEM_PART_CORNER = 'ORDER_ITEM_PART_CORNER'
}

export interface WiwaError {
    code: WiwaErrorCode,
    message: string,
    timestamp: string
}
