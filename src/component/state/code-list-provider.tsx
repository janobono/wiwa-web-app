import { createContext, ReactNode, useContext, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { CodeList, CodeListData, Page } from '../../model/service';
import {
    ClientResponse,
    CONTEXT_PATH,
    deleteData,
    getData,
    postData,
    putData,
    setPageableQueryParams,
    setQueryParam
} from '../../data';

const PATH_CODE_LISTS = CONTEXT_PATH + 'code-lists';

export interface CodeListState {
    busy: boolean,
    data?: Page<CodeList>,
    getCodeLists: (page: number, size: number, searchField?: string) => Promise<ClientResponse<Page<CodeList>>>,
    getCodeList: (id: number) => Promise<ClientResponse<CodeList>>,
    addCodeList: (codeListData: CodeListData) => Promise<ClientResponse<CodeList>>,
    setCodeList: (id: number, codeListData: CodeListData) => Promise<ClientResponse<CodeList>>,
    deleteCodeList: (id: number) => Promise<ClientResponse<void>>
}

const codeListContext = createContext<CodeListState | undefined>(undefined);

const CodeListProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<CodeList>>();

    const getCodeLists = async (page: number, size: number, searchField?: string) => {
        setBusy(true);
        try {
            const pageable = {
                page,
                size,
                sort: {
                    field: 'name',
                    asc: true
                }
            }
            const queryParams = new URLSearchParams();
            setPageableQueryParams(queryParams, pageable);
            setQueryParam(queryParams, 'searchField', searchField);
            const response = await getData<Page<CodeList>>(
                PATH_CODE_LISTS,
                queryParams,
                authState?.accessToken || ''
            );
            if (response.data) {
                setData(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const getCodeList = async (id: number) => {
        setBusy(true);
        try {
            return getData<CodeList>(
                PATH_CODE_LISTS + '/' + id,
                undefined,
                authState?.accessToken || ''
            );
        } finally {
            setBusy(false);
        }
    }

    const addCodeList = async (codeListData: CodeListData) => {
        setBusy(true);
        try {
            const response = await postData<CodeList>(
                PATH_CODE_LISTS,
                codeListData,
                authState?.accessToken || ''
            );
            if (response.data) {
                if (data) {
                    const newData = {...data};
                    newData.content = [response.data, ...data.content];
                    setData(newData);
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setCodeList = async (id: number, codeListData: CodeListData) => {
        setBusy(true);
        try {
            const response = await putData<CodeList>(
                PATH_CODE_LISTS + '/' + id,
                codeListData,
                authState?.accessToken || ''
            );
            if (response.data) {
                if (data) {
                    const newData = {...data};
                    const index = newData.content.findIndex(item => item.id === id);
                    if (index !== -1) {
                        newData.content[index] = response.data;
                        setData(newData);
                    }
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const deleteCodeList = async (id: number) => {
        setBusy(true);
        try {
            const response = await deleteData<void>(
                PATH_CODE_LISTS + '/' + id,
                authState?.accessToken || ''
            );
            if (response.error === undefined) {
                if (data) {
                    const newData = {...data};
                    const index = newData.content.findIndex(item => item.id === id);
                    if (index !== -1) {
                        newData.content.splice(index, 1);
                        setData(newData);
                    }
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <codeListContext.Provider
            value={
                {
                    busy,
                    data,
                    getCodeLists,
                    getCodeList,
                    addCodeList,
                    setCodeList,
                    deleteCodeList
                }
            }
        >{children}
        </codeListContext.Provider>
    )
}

export default CodeListProvider;

export const useCodeListState = () => {
    return useContext(codeListContext);
}
