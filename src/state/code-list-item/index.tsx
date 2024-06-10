import { createContext, ReactNode, useContext, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import {
    addCodeListItem as apiAddCodeListItem,
    deleteCodeListItem as apiDeleteCodeListItem,
    getCodeListItem as apiGetCodeListItem,
    getCodeListItems as apiGetCodeListItems,
    moveCodeListItemDown as apiMoveCodeListItemDown,
    moveCodeListItemUp as apiMoveCodeListItemUp,
    setCodeListItem as apiSetCodeListItem
} from '../../api/controller/code-list-item';
import { Page, Pageable } from '../../api/model';
import { CodeListItem, CodeListItemChange, CodeListItemSearchCriteria } from '../../api/model/code-list';
import { useAuthState } from '../auth';

export interface CodeListItemState {
    busy: boolean,
    data?: CodeListItem[],
    getCodeListItems: (criteria?: CodeListItemSearchCriteria, pageable?: Pageable) => Promise<ClientResponse<Page<CodeListItem>>>,
    getCodeListItem: (id: number) => Promise<ClientResponse<CodeListItem>>,
    addCodeListItem: (codeListItemChange: CodeListItemChange) => Promise<ClientResponse<CodeListItem>>,
    setCodeListItem: (id: number, codeListItemChange: CodeListItemChange) => Promise<ClientResponse<CodeListItem>>,
    deleteCodeListItem: (id: number) => Promise<ClientResponse<void>>,
    moveUpCodeListItem: (id: number) => Promise<ClientResponse<CodeListItem>>,
    moveDownCodeListItem: (id: number) => Promise<ClientResponse<CodeListItem>>
}

const codeListItemContext = createContext<CodeListItemState | undefined>(undefined);

const CodeListItemStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<CodeListItem[]>();

    const getCodeListItems = async (criteria?: CodeListItemSearchCriteria, pageable?: Pageable) => {
        setBusy(true);
        try {
            const response = await apiGetCodeListItems(criteria, pageable, authState?.authToken?.accessToken);
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
            return await apiGetCodeListItem(id, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const addCodeListItem = async (codeListItemChange: CodeListItemChange) => {
        setBusy(true);
        try {
            const response = await apiAddCodeListItem(codeListItemChange, authState?.authToken?.accessToken);
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

    const setCodeListItem = async (id: number, codeListItemChange: CodeListItemChange) => {
        setBusy(true);
        try {
            const response = await apiSetCodeListItem(id, codeListItemChange, authState?.authToken?.accessToken);
            if (response.data && data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData[index] = response.data;
                    setData(newData);
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
            const response = await apiDeleteCodeListItem(id, authState?.authToken?.accessToken);
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
            return await apiMoveCodeListItemUp(id, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const moveDownCodeListItem = async (id: number) => {
        setBusy(true);
        try {
            return await apiMoveCodeListItemDown(id, authState?.authToken?.accessToken);
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
