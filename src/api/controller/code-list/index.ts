import { CONTEXT_PATH, deleteData, getData, postData, putData, setPageableQueryParams, setQueryParam } from '../';
import { Page, Pageable } from '../../model';
import { CodeList, CodeListChange, CodeListField, CodeListSearchCriteria } from '../../model/code-list';

const PATH = CONTEXT_PATH + 'code-lists';

export const getCodeLists = (criteria?: CodeListSearchCriteria, pageable?: Pageable<CodeListField>, accessToken?: string) => {
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
    }
    return getData<Page<CodeList>>(PATH, queryParams, accessToken);
}

export const getCodeList = (id: number, accessToken?: string) => {
    return getData<CodeList>(PATH + '/' + id, undefined, accessToken);
}

export const addCodeList = (codeListChange: CodeListChange, accessToken?: string) => {
    return postData<CodeList>(PATH, codeListChange, accessToken);
}

export const setCodeList = (id: number, codeListChange: CodeListChange, accessToken?: string) => {
    return putData<CodeList>(PATH + '/' + id, codeListChange, accessToken);
}

export const deleteCodeList = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id, accessToken);
}
