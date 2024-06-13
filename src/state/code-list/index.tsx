import { createContext, ReactNode, useContext, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import {
    addCodeList as apiAddCodeList,
    deleteCodeList as apiDeleteCodeList,
    getCodeList as apiGetCodeList,
    getCodeLists as apiGetCodeLists,
    setCodeList as apiSetCodeList,
} from '../../api/controller/code-list';
import { Page, Pageable } from '../../api/model';
import { CodeList, CodeListChange, CodeListField, CodeListSearchCriteria } from '../../api/model/code-list';
import { useAuthState } from '../auth';

export interface CodeListState {
    busy: boolean,
    data?: Page<CodeList>,
    getCodeLists: (criteria?: CodeListSearchCriteria, pageable?: Pageable<CodeListField>) => Promise<ClientResponse<Page<CodeList>>>,
    getCodeList: (id: number) => Promise<ClientResponse<CodeList>>,
    addCodeList: (codeListChange: CodeListChange) => Promise<ClientResponse<CodeList>>,
    setCodeList: (id: number, codeListChange: CodeListChange) => Promise<ClientResponse<CodeList>>,
    deleteCodeList: (id: number) => Promise<ClientResponse<void>>
}

const codeListContext = createContext<CodeListState | undefined>(undefined);

const CodeListStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<CodeList>>();

    const getCodeLists = async (criteria?: CodeListSearchCriteria, pageable?: Pageable<CodeListField>) => {
        setBusy(true);
        try {
            const response = await apiGetCodeLists(criteria, pageable, authState?.authToken?.accessToken);
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
            return await apiGetCodeList(id, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const addCodeList = async (codeListChange: CodeListChange) => {
        setBusy(true);
        try {
            const response = await apiAddCodeList(codeListChange, authState?.authToken?.accessToken);
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

    const setCodeList = async (id: number, codeListChange: CodeListChange) => {
        setBusy(true);
        try {
            const response = await apiSetCodeList(id, codeListChange, authState?.authToken?.accessToken);
            if (response.data && data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content[index] = response.data;
                    setData(newData);
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
            const response = await apiDeleteCodeList(id, authState?.authToken?.accessToken);
            if (response.error === undefined && data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content.splice(index, 1);
                    setData(newData);
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

export default CodeListStateProvider;

export const useCodeListState = () => {
    return useContext(codeListContext);
}
