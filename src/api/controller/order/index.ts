import {
    CONTEXT_PATH,
    deleteData,
    getData,
    patchData,
    postData,
    putData,
    setPageableQueryParams,
    setQueryParam
} from '../';
import { Page, Pageable } from '../../model';
import {
    Order,
    OrderCommentChange,
    OrderContact,
    OrderItemChange,
    OrderItemImage,
    OrderSearchCriteria,
    OrderStatusChange,
    SendOrder
} from '../../model/order';

const PATH = CONTEXT_PATH + 'orders';

export const getOrders = (criteria?: OrderSearchCriteria, pageable?: Pageable, accessToken?: string) => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageable);
    if (criteria) {
        if (criteria.userIds) {
            setQueryParam(queryParams, 'userIds', criteria.userIds.map(item => `${item}`).join(','));
        }
        if (criteria.createdFrom) {
            setQueryParam(queryParams, 'createdFrom', criteria.createdFrom);
        }
        if (criteria.createdTo) {
            setQueryParam(queryParams, 'createdTo', criteria.createdTo);
        }
        if (criteria.statuses) {
            setQueryParam(queryParams, 'statuses', criteria.statuses.join(','));
        }
        if (criteria.totalFrom) {
            setQueryParam(queryParams, 'totalFrom', criteria.totalFrom);
        }
        if (criteria.totalTo) {
            setQueryParam(queryParams, 'totalTo', criteria.totalTo);
        }
    }
    return getData<Page<Order>>(PATH, queryParams, accessToken);
}

export const getOrderContacts = (pageable?: Pageable, accessToken?: string) => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageable);
    return getData<Page<OrderContact>>(PATH + '/contacts', queryParams, accessToken);
}

export const setOrderContact = (id: number, orderContact: OrderContact, accessToken?: string) => {
    return postData<OrderContact>(PATH + '/' + id + '/contacts', orderContact, accessToken);
}

export const getOrder = (id: number, accessToken?: string) => {
    return getData<Order>(PATH + '/' + id, undefined, accessToken);
}

export const addOrder = (accessToken?: string) => {
    return postData<Order>(PATH, undefined, accessToken);
}

export const recountOrder = (id: number, accessToken?: string) => {
    return postData<Order>(PATH + '/' + id + '/recount', undefined, accessToken);
}

export const getHtml = (id: number, accessToken?: string) => {
    return getData<string>(PATH + '/' + id + '/html', undefined, accessToken);
}

export const getCsv = (id: number, accessToken?: string) => {
    return getData<string>(PATH + '/' + id + '/csv', undefined, accessToken);
}

export const sendOrder = (id: number, sendOrder: SendOrder, accessToken?: string) => {
    return postData<Order>(PATH + '/' + id + '/send', sendOrder, accessToken);
}

export const setOrderStatus = (id: number, orderStatusChange: OrderStatusChange, accessToken?: string) => {
    return putData<Order>(PATH + '/' + id + '/status', orderStatusChange, accessToken);
}

export const addComment = (id: number, orderCommentChange: OrderCommentChange, accessToken?: string) => {
    return postData<Order>(PATH + '/' + id + '/comments', orderCommentChange, accessToken);
}

export const addItem = (id: number, orderItemChange: OrderItemChange, accessToken?: string) => {
    return postData<Order>(PATH + '/' + id + '/item', orderItemChange, accessToken);
}

export const setItem = (id: number, itemId: number, orderItemChange: OrderItemChange, accessToken?: string) => {
    return putData<Order>(PATH + '/' + id + '/item/' + itemId, orderItemChange, accessToken);
}

export const moveUpItem = (id: number, itemId: number, accessToken?: string) => {
    return patchData<Order>(PATH + '/' + id + '/item/' + itemId + '/move-up', undefined, accessToken);
}

export const moveDownItem = (id: number, itemId: number, accessToken?: string) => {
    return patchData<Order>(PATH + '/' + id + '/item/' + itemId + '/move-down', undefined, accessToken);
}

export const deleteItem = (id: number, itemId: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id + '/item/' + itemId, accessToken);
}

export const getItemImages = (id: number, itemId: number, accessToken?: string) => {
    return getData<OrderItemImage[]>(PATH + '/' + id + '/item/' + itemId + '/images', undefined, accessToken);
}

export const deleteOrder = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id, accessToken);
}