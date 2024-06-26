import {
    CONTEXT_PATH,
    deleteData,
    getData,
    postData,
    postFile,
    putData,
    setPageableQueryParams,
    setQueryParam
} from '../';
import { CategoryItemChange, Page, Pageable } from '../../model';
import { Edge, EdgeChange, EdgeField, EdgeSearchCriteria } from '../../model/edge';

const PATH = CONTEXT_PATH + 'edges';

export const getEdges = (criteria?: EdgeSearchCriteria, pageable?: Pageable<EdgeField>, accessToken?: string) => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageable);
    if (criteria) {
        if (criteria.searchField) {
            setQueryParam(queryParams, 'searchField', criteria.searchField);
        }
        if (criteria.code) {
            setQueryParam(queryParams, 'code', criteria.code);
        }
        if (criteria.name) {
            setQueryParam(queryParams, 'name', criteria.name);
        }
        if (criteria.widthFrom) {
            setQueryParam(queryParams, 'widthFrom', criteria.widthFrom);
        }
        if (criteria.widthTo) {
            setQueryParam(queryParams, 'widthTo', criteria.widthTo);
        }
        if (criteria.thicknessFrom) {
            setQueryParam(queryParams, 'thicknessFrom', criteria.thicknessFrom);
        }
        if (criteria.thicknessTo) {
            setQueryParam(queryParams, 'thicknessTo', criteria.thicknessTo);
        }
        if (criteria.priceFrom) {
            setQueryParam(queryParams, 'priceFrom', criteria.priceFrom);
        }
        if (criteria.priceTo) {
            setQueryParam(queryParams, 'priceTo', criteria.priceTo);
        }
        if (criteria.codeListItems) {
            setQueryParam(queryParams, 'codeListItems', criteria.codeListItems.join(','));
        }
    }
    return getData<Page<Edge>>(PATH, queryParams, accessToken);
}

export const getEdge = (id: number, accessToken?: string) => {
    return getData<Edge>(PATH + '/' + id, undefined, accessToken);
}

export const addEdge = (edgeChange: EdgeChange, accessToken?: string) => {
    return postData<Edge>(PATH, edgeChange, accessToken);
}

export const setEdge = (id: number, edgeChange: EdgeChange, accessToken?: string) => {
    return putData<Edge>(PATH + '/' + id, edgeChange, accessToken);
}

export const deleteEdge = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id, accessToken);
}

export const setEdgeImage = (id: number, file: File, accessToken?: string) => {
    return postFile<void>(PATH + '/' + id + '/images', file, accessToken);
}

export const deleteEdgeImage = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id + '/images', accessToken);
}

export const setEdgeCategoryItems = (id: number, categoryItems: CategoryItemChange[], accessToken?: string) => {
    return postData<Edge>(PATH + '/' + id + '/category-items', categoryItems, accessToken);
}
