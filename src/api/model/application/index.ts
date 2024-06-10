import { Dimensions, Entry } from '../';

export interface ApplicationImageInfo {
    fileName: string,
    thumbnail: string
}

export interface ApplicationProperties {
    defaultLocale: string,
    appTitle: string,
    appDescription: string,
    tokenExpiresIn: number,
    currency: Currency
}

export interface CompanyInfo {
    name: string,
    street: string,
    city: string,
    zipCode: string,
    state: string,
    phone: string,
    mail: string,
    businessId: string,
    taxId: string,
    vatRegNo: string,
    commercialRegisterInfo: string,
    mapUrl: string
}

export interface Currency {
    code: string,
    symbol: string
}

export interface FreeDay {
    name: string,
    day: number,
    month: number
}

export interface ManufactureProperties {
    minimalSystemDimensions: Dimensions,
    minimalEdgedBoardDimensions: Dimensions,
    minimalLayeredBoardDimensions: Dimensions,
    minimalFrameBoardDimensions: Dimensions,
    edgeWidthAppend: number,
    edgeLengthAppend: number,
    duplicatedBoardAppend: number
}

export interface OrderCommentMail {
    subject: string,
    title: string,
    message: string,
    link: string
}

export enum BoardDimension {
    X = 'X',
    Y = 'Y'
}

export enum BoardPosition {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2'
}

export enum CornerPosition {
    A1B1 = 'A1B1',
    A1B2 = 'A1B2',
    A2B1 = 'A2B1',
    A2B2 = 'A2B2'
}

export enum CSVColumn {
    NUMBER = 'NUMBER',
    NAME = 'NAME',
    MATERIAL = 'MATERIAL',
    DECOR = 'DECOR',
    X_DIMENSION = 'X_DIMENSION',
    Y_DIMENSION = 'Y_DIMENSION',
    QUANTITY = 'QUANTITY',
    ORIENTATION = 'ORIENTATION',
    THICKNESS = 'THICKNESS',
    EDGE_A1 = 'EDGE_A1',
    EDGE_A2 = 'EDGE_A2',
    EDGE_B1 = 'EDGE_B1',
    EDGE_B2 = 'EDGE_B2',
    CORNER_A1B1 = 'CORNER_A1B1',
    CORNER_A1B2 = 'CORNER_A1B2',
    CORNER_A2B1 = 'CORNER_A2B1',
    CORNER_A2B2 = 'CORNER_A2B2',
    DESCRIPTION = 'DESCRIPTION'
}

export enum EdgePosition {
    A1 = 'A1',
    A1I = 'A1I',
    A2 = 'A2',
    A2I = 'A2I',
    B1 = 'B1',
    B1I = 'B1I',
    B2 = 'B2',
    B2I = 'B2I',
    A1B1 = 'A1B1',
    A1B2 = 'A1B2',
    A2B1 = 'A2B1',
    A2B2 = 'A2B2'
}

export enum OrderContent {
    MATERIAL_NOT_FOUND = 'MATERIAL_NOT_FOUND',
    BOARD_NOT_FOUND = 'BOARD_NOT_FOUND',
    EDGE_NOT_FOUND = 'EDGE_NOT_FOUND',

    CREATOR = 'CREATOR',
    CREATED = 'CREATED',
    ORDER_NUMBER = 'ORDER_NUMBER',
    DELIVERY_DATE = 'DELIVERY_DATE',
    PACKAGE_TYPE = 'PACKAGE_TYPE',

    CONTACT_INFO = 'CONTACT_INFO',
    NAME = 'NAME',
    STREET = 'STREET',
    ZIP_CODE = 'ZIP_CODE',
    CITY = 'CITY',
    STATE = 'STATE',
    PHONE = 'PHONE',
    EMAIL = 'EMAIL',
    BUSINESS_ID = 'BUSINESS_ID',
    TAX_ID = 'TAX_ID',

    ORDER_SUMMARY = 'ORDER_SUMMARY',
    BOARD_SUMMARY = 'BOARD_SUMMARY',
    BOARD_SUMMARY_MATERIAL = 'BOARD_SUMMARY_MATERIAL',
    BOARD_SUMMARY_NAME = 'BOARD_SUMMARY_NAME',
    BOARD_SUMMARY_AREA = 'BOARD_SUMMARY_AREA',
    BOARD_SUMMARY_COUNT = 'BOARD_SUMMARY_COUNT',
    BOARD_SUMMARY_WEIGHT = 'BOARD_SUMMARY_WEIGHT',
    BOARD_SUMMARY_PRICE = 'BOARD_SUMMARY_PRICE',
    BOARD_SUMMARY_VAT_PRICE = 'BOARD_SUMMARY_VAT_PRICE',

    EDGE_SUMMARY = 'EDGE_SUMMARY',
    EDGE_SUMMARY_NAME = 'EDGE_SUMMARY_NAME',
    EDGE_SUMMARY_LENGTH = 'EDGE_SUMMARY_LENGTH',
    EDGE_SUMMARY_GLUE_LENGTH = 'EDGE_SUMMARY_GLUE_LENGTH',
    EDGE_SUMMARY_WEIGHT = 'EDGE_SUMMARY_WEIGHT',
    EDGE_SUMMARY_EDGE_PRICE = 'EDGE_SUMMARY_EDGE_PRICE',
    EDGE_SUMMARY_EDGE_VAT_PRICE = 'EDGE_SUMMARY_EDGE_VAT_PRICE',
    EDGE_SUMMARY_GLUE_PRICE = 'EDGE_SUMMARY_GLUE_PRICE',
    EDGE_SUMMARY_GLUE_VAT_PRICE = 'EDGE_SUMMARY_GLUE_VAT_PRICE',

    GLUE_SUMMARY = 'GLUE_SUMMARY',
    GLUE_SUMMARY_AREA = 'GLUE_SUMMARY_AREA',
    GLUE_SUMMARY_PRICE = 'GLUE_SUMMARY_PRICE',
    GLUE_SUMMARY_VAT_PRICE = 'GLUE_SUMMARY_VAT_PRICE',

    CUT_SUMMARY = 'CUT_SUMMARY',
    CUT_SUMMARY_THICKNESS = 'CUT_SUMMARY_THICKNESS',
    CUT_SUMMARY_AMOUNT = 'CUT_SUMMARY_AMOUNT',
    CUT_SUMMARY_PRICE = 'CUT_SUMMARY_PRICE',
    CUT_SUMMARY_VAT_PRICE = 'CUT_SUMMARY_VAT_PRICE',

    TOTAL_SUMMARY = 'TOTAL_SUMMARY',
    TOTAL_SUMMARY_WEIGHT = 'TOTAL_SUMMARY_WEIGHT',
    TOTAL_SUMMARY_PRICE = 'TOTAL_SUMMARY_PRICE',
    TOTAL_SUMMARY_VAT_PRICE = 'TOTAL_SUMMARY_VAT_PRICE',

    PARTS_LIST = 'PARTS_LIST',
    PARTS_LIST_NAME = 'PARTS_LIST_NAME',
    PARTS_LIST_NUMBER = 'PARTS_LIST_NUMBER',
    PARTS_LIST_X = 'PARTS_LIST_X',
    PARTS_LIST_Y = 'PARTS_LIST_Y',
    PARTS_LIST_QUANTITY = 'PARTS_LIST_QUANTITY',
    PARTS_LIST_DESCRIPTION = 'PARTS_LIST_DESCRIPTION',
    PARTS_LIST_EDGES = 'PARTS_LIST_EDGES',
    PARTS_LIST_CORNERS = 'PARTS_LIST_CORNERS',
    PARTS_LIST_BOARDS = 'PARTS_LIST_BOARDS',
    PARTS_LIST_POSITION = 'PARTS_LIST_POSITION'
}

export enum OrderPackageType {
    NO_PACKAGE = 'NO_PACKAGE',
    NO_PACKAGE_WITH_REMAINS = 'NO_PACKAGE_WITH_REMAINS',
    PACKAGE = 'PACKAGE',
    PACKAGE_WITH_REMAINS = 'PACKAGE_WITH_REMAINS'
}

export enum OrderPattern {
    CSV_NUMBER = 'CSV_NUMBER',
    CSV_BASIC = 'CSV_BASIC',
    CSV_FRAME = 'CSV_FRAME',
    CSV_DUPLICATED_BASIC = 'CSV_DUPLICATED_BASIC',
    CSV_DUPLICATED_FRAME = 'CSV_DUPLICATED_FRAME',
    CSV_DECOR = 'CSV_DECOR',
    CSV_EDGE = 'CSV_EDGE',
    CSV_CORNER_STRAIGHT = 'CSV_CORNER_STRAIGHT',
    CSV_CORNER_ROUNDED = 'CSV_CORNER_ROUNDED',

    PDF_TITLE = 'PDF_TITLE',
    PDF_ORDER_NUMBER = 'PDF_ORDER_NUMBER',
    PDF_INTEGER = 'PDF_INTEGER',
    PDF_UNIT = 'PDF_UNIT',
    PDF_PRICE = 'PDF_PRICE',
    PDF_DECOR = 'PDF_DECOR',
    PDF_EDGE = 'PDF_EDGE',
    PDF_CORNER_STRAIGHT = 'PDF_CORNER_STRAIGHT',
    PDF_CORNER_ROUNDED = 'PDF_CORNER_ROUNDED'
}

export interface OrderProperties {
    dimensions: Entry<BoardDimension, string>[],
    boards: Entry<BoardPosition, string>[],
    edges: Entry<EdgePosition, string>[],
    corners: Entry<CornerPosition, string>[],
    pattern: Entry<OrderPattern, string>[],
    content: Entry<OrderContent, string>[],
    packageType: Entry<OrderPackageType, string>[],
    csvSeparator: string,
    csvReplacements: Entry<string, string>[],
    csvColumns: Entry<CSVColumn, string>[]
}

export interface OrderSendMail {
    subject: string,
    title: string,
    message: string,
    link: string,
    attachment: string
}

export interface OrderStatusMail {
    productionSubject: string,
    productionTitle: string,
    productionMessage: string,
    readySubject: string,
    readyTitle: string,
    readyMessage: string,
    finishedSubject: string,
    finishedTitle: string,
    finishedMessage: string,
    cancelledSubject: string,
    cancelledTitle: string,
    cancelledMessage: string,
    link: string,
    attachment: string
}

export interface PriceForCutting {
    thickness: number,
    price: number
}

export interface PriceForGluingEdge {
    width: number,
    price: number
}

export interface PriceForGluingLayer {
    price: number
}

export interface ResetPasswordMail {
    subject: string,
    title: string,
    message: string,
    passwordMessage: string,
    link: string
}

export interface SignUpMail {
    subject: string,
    title: string,
    message: string,
    link: string
}

export enum UnitId {
    MILLIMETER = 'MILLIMETER',
    METER = 'METER',
    SQUARE_METER = 'SQUARE_METER',
    KILOGRAM = 'KILOGRAM',
    PIECE = 'PIECE'
}

export interface Unit {
    id: UnitId,
    value: string
}
