import { createContext, ReactNode, useContext, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { CodeListItem, CodeListItemData, Page } from '../../model/service';
import {
    ClientResponse,
    CONTEXT_PATH,
    deleteData,
    getData,
    patchData,
    postData,
    putData,
    setQueryParam
} from '../../data';

const PATH_CODE_LIST_ITEMS = CONTEXT_PATH + 'code-list-items';

export interface CodeListItemState {
    busy: boolean,
    data?: CodeListItem[],
    getCodeListItems: (codeListId: number, parentId?: number) => Promise<ClientResponse<Page<CodeListItem>>>,
    getCodeListItem: (id: number) => Promise<ClientResponse<CodeListItem>>,
    addCodeListItem: (codeListItemData: CodeListItemData) => Promise<ClientResponse<CodeListItem>>,
    setCodeListItem: (id: number, codeListItemData: CodeListItemData) => Promise<ClientResponse<CodeListItem>>,
    deleteCodeListItem: (id: number) => Promise<ClientResponse<void>>,
    moveUpCodeListItem: (id: number) => Promise<ClientResponse<CodeListItem>>,
    moveDownCodeListItem: (id: number) => Promise<ClientResponse<CodeListItem>>
}

const codeListItemContext = createContext<CodeListItemState | undefined>(undefined);

const CodeListItemStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<CodeListItem[]>();

    const getCodeListItems = async (codeListId: number, parentId?: number) => {
        setBusy(true);
        try {
            const queryParams = new URLSearchParams();
            setQueryParam(queryParams, 'codeListId', codeListId);
            if (parentId) {
                setQueryParam(queryParams, 'parentId', parentId);
            } else {
                setQueryParam(queryParams, 'root', 'true');
            }
            const response = await getData<Page<CodeListItem>>(
                PATH_CODE_LIST_ITEMS,
                queryParams,
                authState?.accessToken || ''
            );
            if (response.data) {
                setData(response.data.content);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const getCodeListItem = async (id: number) => {
        setBusy(true);
        try {
            return await getData<CodeListItem>(
                PATH_CODE_LIST_ITEMS + '/' + id,
                undefined,
                authState?.accessToken || ''
            );
        } finally {
            setBusy(false);
        }
    }

    const addCodeListItem = async (codeListItemData: CodeListItemData) => {
        setBusy(true);
        try {
            const response = await postData<CodeListItem>(
                PATH_CODE_LIST_ITEMS,
                codeListItemData,
                authState?.accessToken || ''
            );
            if (response.data) {
                if (data) {
                    const newData = [response.data, ...data];
                    setData(newData);
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setCodeListItem = async (id: number, codeListItemData: CodeListItemData) => {
        setBusy(true);
        try {
            const response = await putData<CodeListItem>(
                PATH_CODE_LIST_ITEMS + '/' + id,
                codeListItemData,
                authState?.accessToken || ''
            );
            if (response.data) {
                if (data) {
                    const newData = [...data];
                    const index = newData.findIndex(item => item.id === id);
                    if (index !== -1) {
                        newData[index] = response.data;
                        setData(newData);
                    }
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const deleteCodeListItem = async (id: number) => {
        setBusy(true);
        try {
            const response = await deleteData<void>(
                PATH_CODE_LIST_ITEMS + '/' + id,
                authState?.accessToken || ''
            );
            if (response.error === undefined) {
                if (data) {
                    const newData = [...data];
                    const index = newData.findIndex(item => item.id === id);
                    if (index !== -1) {
                        newData.splice(index, 1);
                        setData(newData);
                    }
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const moveUpCodeListItem = async (id: number) => {
        setBusy(true);
        try {
            return patchData<CodeListItem>(
                PATH_CODE_LIST_ITEMS + '/' + id + '/move-up',
                undefined,
                authState?.accessToken || ''
            );
        } finally {
            setBusy(false);
        }
    }

    const moveDownCodeListItem = async (id: number) => {
        setBusy(true);
        try {
            return patchData<CodeListItem>(
                PATH_CODE_LIST_ITEMS + '/' + id + '/move-down',
                undefined,
                authState?.accessToken || ''
            );
        } finally {
            setBusy(false);
        }
    }

    return (
        <codeListItemContext.Provider
            value={
                {
                    busy,
                    data,
                    getCodeListItems,
                    getCodeListItem,
                    addCodeListItem,
                    setCodeListItem,
                    deleteCodeListItem,
                    moveUpCodeListItem,
                    moveDownCodeListItem
                }
            }
        >{children}
        </codeListItemContext.Provider>
    )
}

export default CodeListItemStateProvider;

export const useCodeListItemState = () => {
    return useContext(codeListItemContext);
}
