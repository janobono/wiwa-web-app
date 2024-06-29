import { OrderItemSummary, OrderSummary } from './summary';
import { Part } from './part';

export enum ItemImage {
    FULL = 'FULL',
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2'
}

export interface OrderBoard {
    id: number,
    code: string,
    name: string,
    boardCode: string,
    structureCode: string,
    orientation: boolean,
    weight: number,
    length: number,
    width: number,
    thickness: number,
    price: number
}

export interface OrderCommentChange {
    comment: string
}

export interface OrderComment {
    id: number,
    creator: OrderUser,
    created: string,
    comment: string
}

export interface OrderContact {
    name: string,
    street: string,
    zipCode: string,
    city: string,
    state: string,
    phone: string,
    email: string,
    businessId?: string,
    taxId?: string
}

export enum OrderContactField {
    name = 'name',
    street = 'street',
    zipCode = 'zipCode',
    city = 'city',
    state = 'state',
    phone = 'phone',
    email = 'email',
    businessId = 'businessId',
    taxId = 'taxId'
}

export interface OrderEdge {
    id: number,
    code: string,
    name: string,
    weight: number,
    width: number,
    thickness: number,
    price: number
}

export interface OrderItemChange {
    name: string,
    description?: string,
    orientation: boolean,
    quantity: number,
    part: Part
}

export interface OrderItemImage {
    itemImage: ItemImage,
    image: string
}

export interface OrderItem {
    id: number,
    sortNum: number,
    name: string,
    description: string,
    orientation: boolean,
    quantity: number,
    part: Part,
    summary: OrderItemSummary
}

export enum OrderItemField {
    id = 'id',
    sortNum = 'sortNum',
    name = 'name',
    description = 'description',
    orientation = 'orientation',
    quantity = 'quantity',
}

export enum OrderPackageType {
    NO_PACKAGE = 'NO_PACKAGE',
    NO_PACKAGE_WITH_REMAINS = 'NO_PACKAGE_WITH_REMAINS',
    PACKAGE = 'PACKAGE',
    PACKAGE_WITH_REMAINS = 'PACKAGE_WITH_REMAINS'
}

export enum OrderStatus {
    NEW = 'NEW',
    SENT = 'SENT',
    IN_PRODUCTION = 'IN_PRODUCTION',
    READY = 'READY',
    FINISHED = 'FINISHED',
    CANCELLED = 'CANCELLED'
}

export interface OrderStatusChange {
    notifyUser: boolean,
    sendSummary: boolean,
    newStatus: OrderStatus
}

export interface OrderUser {
    id: number,
    titleBefore: string,
    firstName: string,
    midName: string,
    lastName: string,
    titleAfter: string,
    email: string
}

export enum OrderUserField {
    id = 'id',
    titleBefore = 'titleBefore',
    firstName = 'firstName',
    midName = 'midName',
    lastName = 'lastName',
    titleAfter = 'titleAfter',
    email = 'email'
}

export interface OrderUserSearchCriteria {
    searchField: string,
    email: string
}

export interface Order {
    id: number,
    creator: OrderUser,
    created: string,
    status: OrderStatus,
    orderNumber: number,
    weight: number,
    total: number,
    vatTotal: number,
    deliveryDate: string,
    packageType: OrderPackageType,
    boards: OrderBoard[],
    edges: OrderEdge[],
    items: OrderItem[],
    summary: OrderSummary,
    comments: OrderComment[]
}

export enum OrderField {
    id = 'id',
    creator = 'creator',
    created = 'created',
    status = 'status',
    orderNumber = 'orderNumber',
    weight = 'weight',
    total = 'total',
    vatTotal = 'vatTotal',
    deliveryDate = 'deliveryDate',
    packageType = 'packageType'
}

export interface OrderSearchCriteria {
    userIds?: number[],
    createdFrom?: string,
    createdTo?: string,
    statuses?: OrderStatus[],
    totalFrom?: number,
    totalTo?: number
}

export interface SendOrder {
    contact: OrderContact,
    gdprAgreement: boolean,
    businessConditionsAgreement: boolean,
    deliveryDate?: string,
    packageType: OrderPackageType
}
