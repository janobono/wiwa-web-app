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
import { CodeListItem, CodeListItemChange, CodeListItemSearchCriteria } from '../../model/code-list';

const PATH = CONTEXT_PATH + 'code-list-items';

export const getCodeListItems = (criteria?: CodeListItemSearchCriteria, pageable?: Pageable, accessToken?: string) => {
    const queryParams = new URLSearchParams();
    setPageableQueryParams(queryParams, pageable);
    if (criteria) {
        if (criteria.codeListId) {
            setQueryParam(queryParams, 'codeListId', criteria.codeListId);
        }
        if (criteria.root) {
            setQueryParam(queryParams, 'root', criteria.root);
        }
        if (criteria.parentId) {
            setQueryParam(queryParams, 'parentId', criteria.parentId);
        }
        if (criteria.searchField) {
            setQueryParam(queryParams, 'searchField', criteria.searchField);
        }
        if (criteria.code) {
            setQueryParam(queryParams, 'code', criteria.code);
        }
        if (criteria.value) {
            setQueryParam(queryParams, 'value', criteria.value);
        }
        if (criteria.treeCode) {
            setQueryParam(queryParams, 'treeCode', criteria.treeCode);
        }
    }
    return getData<Page<CodeListItem>>(PATH, queryParams, accessToken);
}

export const getCodeListItem = (id: number, accessToken?: string) => {
    return getData<CodeListItem>(PATH + '/' + id, undefined, accessToken);
}

export const addCodeListItem = (codeListItemChange: CodeListItemChange, accessToken?: string) => {
    return postData<CodeListItem>(PATH, codeListItemChange, accessToken);
}

export const setCodeListItem = (id: number, codeListItemChange: CodeListItemChange, accessToken?: string) => {
    return putData<CodeListItem>(PATH + '/' + id, codeListItemChange, accessToken);
}

export const deleteCodeListItem = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id, accessToken);
}

export const moveCodeListItemUp = (id: number, accessToken?: string) => {
    return patchData<CodeListItem>(PATH + '/' + id + '/move-up', undefined, accessToken);
}

export const moveCodeListItemDown = (id: number, accessToken?: string) => {
    return patchData<CodeListItem>(PATH + '/' + id + '/move-down', undefined, accessToken);
}
