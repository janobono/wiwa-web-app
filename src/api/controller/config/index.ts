import { CONTEXT_PATH, deleteData, getData, postData, postFile, setPageableQueryParams } from '../';
import { Page, Pageable, SingleValueBody } from '../../model';
import {
    ApplicationImageInfo,
    ApplicationImageInfoField,
    CompanyInfo,
    FreeDay,
    ManufactureProperties,
    OrderCommentMail,
    OrderProperties,
    OrderSendMail,
    OrderStatusMail,
    PriceForCutting,
    PriceForGluingEdge,
    PriceForGluingLayer,
    ResetPasswordMail,
    SignUpMail,
    Unit
} from '../../model/application';
import { BoardCategory } from '../../model/board';

const PATH = CONTEXT_PATH + 'config';

export const getApplicationImages = (pageable?: Pageable<ApplicationImageInfoField>, accessToken?: string) => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageable);
    return getData<Page<ApplicationImageInfo>>(PATH + '/application-images', queryParams, accessToken);
}

export const setApplicationImage = (file: File, accessToken?: string) => {
    return postFile<ApplicationImageInfo>(PATH + '/application-images', file, accessToken);
}

export const deleteApplicationImage = (fileName: string, accessToken?: string) => {
    return deleteData<void>(PATH + '/application-images/' + fileName, accessToken);
}

export const setLogo = (file: File, accessToken?: string) => {
    return postFile<ApplicationImageInfo>(PATH + '/logo', file, accessToken);
}

export const setMaintenance = (maintenance: boolean, accessToken?: string) => {
    return postData<SingleValueBody<boolean>>(PATH + '/maintenance', {value: maintenance}, accessToken);
}

export const setTitle = (title: string, accessToken?: string) => {
    return postData<SingleValueBody<string>>(PATH + '/title', {value: title}, accessToken);
}

export const setWelcomeText = (welcomeText: string, accessToken?: string) => {
    return postData<SingleValueBody<string>>(PATH + '/welcome-text', {value: welcomeText}, accessToken);
}

export const setApplicationInfo = (applicationInfo: string[], accessToken?: string) => {
    return postData<string[]>(PATH + '/application-info', applicationInfo, accessToken);
}

export const setCompanyInfo = (companyInfo: CompanyInfo, accessToken?: string) => {
    return postData<CompanyInfo>(PATH + '/company-info', companyInfo, accessToken);
}

export const setUnits = (units: Unit[], accessToken?: string) => {
    return postData<Unit[]>(PATH + '/units', units, accessToken);
}

export const getVatRate = (accessToken?: string) => {
    return getData<SingleValueBody<number>>(PATH + '/vat-rate', undefined, accessToken);
}

export const setVatRate = (vatRate: number, accessToken?: string) => {
    return postData<SingleValueBody<number>>(PATH + '/vat-rate', {value: vatRate}, accessToken);
}

export const setBusinessConditions = (businessConditions: string, accessToken?: string) => {
    return postData<SingleValueBody<string>>(PATH + '/business-conditions', {value: businessConditions}, accessToken);
}

export const setCookiesInfo = (cookiesInfo: string, accessToken?: string) => {
    return postData<SingleValueBody<string>>(PATH + '/cookies-info', {value: cookiesInfo}, accessToken);
}

export const setGdprInfo = (gdprInfo: string, accessToken?: string) => {
    return postData<SingleValueBody<string>>(PATH + '/gdpr-info', {value: gdprInfo}, accessToken);
}

export const setOrderInfo = (orderInfo: string, accessToken?: string) => {
    return postData<SingleValueBody<string>>(PATH + '/order-info', {value: orderInfo}, accessToken);
}

export const setWorkingHours = (workingHours: string, accessToken?: string) => {
    return postData<SingleValueBody<string>>(PATH + '/working-hours', {value: workingHours}, accessToken);
}

export const getSignUpMail = (accessToken?: string) => {
    return getData<SignUpMail>(PATH + '/sign-up-mail', undefined, accessToken);
}

export const setSignUpMail = (signUpMail: SignUpMail, accessToken?: string) => {
    return postData<SignUpMail>(PATH + '/sign-up-mail', signUpMail, accessToken);
}

export const getResetPasswordMail = (accessToken?: string) => {
    return getData<ResetPasswordMail>(PATH + '/reset-password-mail', undefined, accessToken);
}

export const setResetPasswordMail = (resetPasswordMail: ResetPasswordMail, accessToken?: string) => {
    return postData<ResetPasswordMail>(PATH + '/reset-password-mail', resetPasswordMail, accessToken);
}

export const getManufactureProperties = (accessToken?: string) => {
    return getData<ManufactureProperties>(PATH + '/manufacture-properties', undefined, accessToken);
}

export const setManufactureProperties = (resetPasswordMail: ResetPasswordMail, accessToken?: string) => {
    return postData<ResetPasswordMail>(PATH + '/manufacture-properties', resetPasswordMail, accessToken);
}

export const getPriceForGluingLayer = (accessToken?: string) => {
    return getData<PriceForGluingLayer>(PATH + '/price-for-gluing-layer', undefined, accessToken);
}

export const setPriceForGluingLayer = (priceForGluingLayer: number, accessToken?: string) => {
    return postData<PriceForGluingLayer>(PATH + '/price-for-gluing-layer', {price: priceForGluingLayer}, accessToken);
}

export const getPricesForGluingEdge = (accessToken?: string) => {
    return getData<PriceForGluingEdge[]>(PATH + '/prices-for-gluing-edge', undefined, accessToken);
}

export const setPricesForGluingEdge = (pricesForGluingEdge: PriceForGluingEdge[], accessToken?: string) => {
    return postData<PriceForGluingEdge[]>(PATH + '/prices-for-gluing-edge', pricesForGluingEdge, accessToken);
}

export const getPricesForCutting = (accessToken?: string) => {
    return getData<PriceForCutting[]>(PATH + '/prices-for-cutting', undefined, accessToken);
}

export const setPricesForCutting = (pricesForCutting: PriceForCutting[], accessToken?: string) => {
    return postData<PriceForCutting[]>(PATH + '/prices-for-cutting', pricesForCutting, accessToken);
}

export const setFreeDays = (freeDays: FreeDay[], accessToken?: string) => {
    return postData<FreeDay[]>(PATH + '/free-days', freeDays, accessToken);
}

export const getOrderCommentMail = (accessToken?: string) => {
    return getData<OrderCommentMail>(PATH + '/order-comment-mail', undefined, accessToken);
}

export const setOrderCommentMail = (orderCommentMail: OrderCommentMail, accessToken?: string) => {
    return postData<OrderCommentMail>(PATH + '/order-comment-mail', orderCommentMail, accessToken);
}

export const getOrderSendMail = (accessToken?: string) => {
    return getData<OrderSendMail>(PATH + '/order-send-mail', undefined, accessToken);
}

export const setOrderSendMail = (orderSendMail: OrderSendMail, accessToken?: string) => {
    return postData<OrderSendMail>(PATH + '/order-send-mail', orderSendMail, accessToken);
}

export const getOrderStatusMail = (accessToken?: string) => {
    return getData<OrderStatusMail>(PATH + '/order-status-mail', undefined, accessToken);
}

export const setOrderStatusMail = (orderStatusMail: OrderStatusMail, accessToken?: string) => {
    return postData<OrderStatusMail>(PATH + '/order-status-mail', orderStatusMail, accessToken);
}

export const getBoardMaterialCategory = (accessToken?: string) => {
    return getData<BoardCategory>(PATH + '/board-material-category', undefined, accessToken);
}

export const setBoardMaterialCategory = (categoryId: number, accessToken?: string) => {
    return postData<BoardCategory>(PATH + '/board-material-category', {value: categoryId}, accessToken);
}

export const setBoardCategories = (categoryIds: number[], accessToken?: string) => {
    return postData<BoardCategory[]>(PATH + '/board-categories', categoryIds, accessToken);
}

export const setEdgeCategories = (categoryIds: number[], accessToken?: string) => {
    return postData<BoardCategory[]>(PATH + '/edge-categories', categoryIds, accessToken);
}

export const setOrderProperties = (orderProperties: OrderProperties, accessToken?: string) => {
    return postData<OrderProperties>(PATH + '/order-properties', orderProperties, accessToken);
}
