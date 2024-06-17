import { CONTEXT_PATH, getData } from '../';
import { Category, SingleValueBody } from '../../model';
import { ApplicationProperties, CompanyInfo, FreeDay, OrderProperties, Unit } from '../../model/application';
import { Captcha } from '../../model/captcha';

const PATH = CONTEXT_PATH + 'ui';

export const getCaptcha = () => {
    return getData<Captcha>(PATH + '/captcha');
}

export const getLogoPath = () => {
    return PATH + '/logo';
}

export const getApplicationImagePath = (fileName: string) => {
    return PATH + '/application-images/' + fileName;
}

export const getBoardImagePath = (boardId: number) => {
    return PATH + '/board-images/' + boardId;
}

export const getEdgeImagePath = (edgeId: number) => {
    return PATH + '/edge-images/' + edgeId;
}

export const getMaintenance = () => {
    return getData<SingleValueBody<boolean>>(PATH + '/maintenance');
}

export const getApplicationProperties = () => {
    return getData<ApplicationProperties>(PATH + '/application-properties');
}

export const getTitle = () => {
    return getData<SingleValueBody<string>>(PATH + '/title');
}

export const getWelcomeText = () => {
    return getData<SingleValueBody<string>>(PATH + '/welcome-text');
}

export const getApplicationInfo = () => {
    return getData<string[]>(PATH + '/application-info');
}

export const getCompanyInfo = () => {
    return getData<CompanyInfo>(PATH + '/company-info');
}

export const getUnits = () => {
    return getData<Unit[]>(PATH + '/units');
}

export const getBusinessConditions = () => {
    return getData<SingleValueBody<string>>(PATH + '/business-conditions');
}

export const getCookiesInfo = () => {
    return getData<SingleValueBody<string>>(PATH + '/cookies-info');
}

export const getGdprInfo = () => {
    return getData<SingleValueBody<string>>(PATH + '/gdpr-info');
}

export const getOrderInfo = () => {
    return getData<SingleValueBody<string>>(PATH + '/order-info');
}

export const getWorkingHours = () => {
    return getData<SingleValueBody<string>>(PATH + '/working-hours');
}

export const getFreeDays = () => {
    return getData<FreeDay[]>(PATH + '/free-days');
}

export const getBoardCategories = () => {
    return getData<Category[]>(PATH + '/board-categories');
}

export const getEdgeCategories = () => {
    return getData<Category[]>(PATH + '/edge-categories');
}

export const getOrderProperties = () => {
    return getData<OrderProperties>(PATH + '/order-properties');
}
