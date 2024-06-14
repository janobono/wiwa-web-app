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
import { Page, Pageable } from '../../model';
import { Board, BoardCategoryItemChange, BoardChange, BoardField, BoardSearchCriteria } from '../../model/board';

const PATH = CONTEXT_PATH + 'boards';

export const getBoards = (criteria?: BoardSearchCriteria, pageable?: Pageable<BoardField>, accessToken?: string) => {
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
        if (criteria.boardCode) {
            setQueryParam(queryParams, 'boardCode', criteria.boardCode);
        }
        if (criteria.structureCode) {
            setQueryParam(queryParams, 'structureCode', criteria.structureCode);
        }
        if (criteria.orientation) {
            setQueryParam(queryParams, 'orientation', criteria.orientation);
        }
        if (criteria.lengthFrom) {
            setQueryParam(queryParams, 'lengthFrom', criteria.lengthFrom);
        }
        if (criteria.lengthTo) {
            setQueryParam(queryParams, 'lengthTo', criteria.lengthTo);
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
    return getData<Page<Board>>(PATH, queryParams, accessToken);
}

export const getBoard = (id: number, accessToken?: string) => {
    return getData<Board>(PATH + '/' + id, undefined, accessToken);
}

export const addBoard = (boardChange: BoardChange, accessToken?: string) => {
    return postData<Board>(PATH, boardChange, accessToken);
}

export const setBoard = (id: number, boardChange: BoardChange, accessToken?: string) => {
    return putData<Board>(PATH + '/' + id, boardChange, accessToken);
}

export const deleteBoard = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id, accessToken);
}

export const setBoardImage = (id: number, file: File, accessToken?: string) => {
    return postFile<void>(PATH + '/' + id + '/images', file, accessToken);
}

export const deleteBoardImage = (id: number, accessToken?: string) => {
    return deleteData<void>(PATH + '/' + id + '/images', accessToken);
}

export const setBoardCategoryItems = (id: number, boardCategoryItems: BoardCategoryItemChange[], accessToken?: string) => {
    return postData<Board>(PATH + '/' + id + '/category-items', boardCategoryItems, accessToken);
}
