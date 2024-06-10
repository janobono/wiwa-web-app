import { createContext, ReactNode, useContext, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import {
    addEdge as apiAddEdge,
    deleteEdge as apiDeleteEdge,
    deleteEdgeImage as apiDeleteEdgeImage,
    getEdge as apiGetEdge,
    getEdges as apiGetEdges,
    setEdge as apiSetEdge,
    setEdgeCategoryItems as apiSetEdgeCategoryItems,
    setEdgeImage as apiSetEdgeImage
} from '../../api/controller/edge';
import { Page, Pageable } from '../../api/model';
import { Edge, EdgeCategoryItemChange, EdgeChange, EdgeSearchCriteria } from '../../api/model/edge';
import { useAuthState } from '../auth';

export interface EdgeState {
    busy: boolean,
    data?: Page<Edge>,
    getEdges: (criteria?: EdgeSearchCriteria, pageable?: Pageable) => Promise<ClientResponse<Page<Edge>>>,
    getEdge: (id: number) => Promise<ClientResponse<Edge>>,
    addEdge: (edgeChange: EdgeChange) => Promise<ClientResponse<Edge>>,
    setEdge: (id: number, edgeChange: EdgeChange) => Promise<ClientResponse<Edge>>,
    deleteEdge: (id: number) => Promise<ClientResponse<void>>,
    setEdgeImage: (id: number, file: File) => Promise<ClientResponse<void>>,
    deleteEdgeImage: (id: number) => Promise<ClientResponse<void>>,
    setEdgeCategoryItems: (id: number, edgeCategoryItems: EdgeCategoryItemChange[]) => Promise<ClientResponse<Edge>>
}

const edgeStateContext = createContext<EdgeState | undefined>(undefined);

const EdgeStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Edge>>();

    const handleResponse = (id: number, response: ClientResponse<Edge>) => {
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
    }

    const getEdges = async (criteria?: EdgeSearchCriteria, pageable?: Pageable) => {
        setBusy(true);
        try {
            return await apiGetEdges(criteria, pageable, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const getEdge = async (id: number) => {
        setBusy(true);
        try {
            return await apiGetEdge(id, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const addEdge = async (edgeChange: EdgeChange) => {
        setBusy(true);
        try {
            const response = await apiAddEdge(edgeChange, authState?.authToken?.accessToken);
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

    const setEdge = async (id: number, edgeChange: EdgeChange) => {
        setBusy(true);
        try {
            const response = await apiSetEdge(id, edgeChange, authState?.authToken?.accessToken);
            handleResponse(id, response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const deleteEdge = async (id: number) => {
        setBusy(true);
        try {
            const response = await apiDeleteEdge(id, authState?.authToken?.accessToken);
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

    const setEdgeImage = async (id: number, file: File) => {
        setBusy(true);
        try {
            return await apiSetEdgeImage(id, file, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const deleteEdgeImage = async (id: number) => {
        setBusy(true);
        try {
            return await apiDeleteEdgeImage(id, authState?.authToken?.accessToken);
        } finally {
            setBusy(false);
        }
    }

    const setEdgeCategoryItems = async (id: number, edgeCategoryItems: EdgeCategoryItemChange[]) => {
        setBusy(true);
        try {
            const response = await apiSetEdgeCategoryItems(id, edgeCategoryItems, authState?.authToken?.accessToken);
            handleResponse(id, response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <edgeStateContext.Provider
            value={
                {
                    busy,
                    data,
                    getEdges,
                    getEdge,
                    addEdge,
                    setEdge,
                    deleteEdge,
                    setEdgeImage,
                    deleteEdgeImage,
                    setEdgeCategoryItems
                }
            }
        >{children}
        </edgeStateContext.Provider>
    );
}

export default EdgeStateProvider;

export const useEdgeState = () => {
    return useContext(edgeStateContext);
}
