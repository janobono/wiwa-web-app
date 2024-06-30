import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import * as apiEdge from '../../api/controller/edge';
import { CategoryItemChange } from '../../api/model';
import { Edge, EdgeChange, EdgeField, EdgeSearchCriteria } from '../../api/model/edge';
import { AuthContext, ErrorContext } from '../../context';

export interface EdgeState {
    busy: boolean,
    editEnabled: boolean,
    previous: boolean,
    next: boolean,
    page: number,
    setPage: (page: number) => void,
    setCriteria: (criteria?: EdgeSearchCriteria) => void,
    data?: Edge[],
    selected?: Edge,
    setSelected: (selected?: Edge) => void,
    getEdges: () => Promise<void>,
    addEdge: (edgeChange: EdgeChange) => Promise<void>,
    setEdge: (edgeChange: EdgeChange) => Promise<void>,
    deleteEdge: () => Promise<void>,
    setEdgeCategoryItems: (categoryItemChanges: CategoryItemChange[]) => Promise<void>,
    setEdgeImage: (file: File) => Promise<void>,
    deleteEdgeImage: () => Promise<void>
}

export const EdgeContext = createContext<EdgeState | undefined>(undefined);

const EdgeProvider = ({children}: { children: ReactNode }) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const [busy, setBusy] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [criteria, setCriteria] = useState<EdgeSearchCriteria>();
    const [data, setData] = useState<Edge[]>();
    const [selected, setSelected] = useState<Edge>();

    useEffect(() => {
        setEditEnabled(false);

        if (selected && data) {
            const index = data.findIndex(item => item.id === selected?.id);
            if (index !== -1) {
                setSelected(data[index]);
                setEditEnabled(true);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    useEffect(() => {
        getEdges().then();
    }, [criteria, page]);

    const createData = (): Edge[] => {
        if (data) {
            return [...data];
        }
        return [];
    }

    const handleResponse = (response: ClientResponse<Edge>) => {
        if (response?.data) {
            const newData = createData();
            const index = newData.findIndex(item => item.id === response.data?.id);
            if (index !== -1) {
                newData[index] = response.data;
            }
            setData(newData);
        }
    }

    const getEdges = async () => {
        setBusy(true);
        try {
            const response = await apiEdge.getEdges(criteria, {
                page,
                size: 10,
                sort: {field: EdgeField.id, asc: true}
            }, authState?.authToken?.accessToken);
            setPrevious(!response.data?.first || false);
            setNext(!response.data?.last || false);
            setData(response.data?.content);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const addEdge = async (edgeChange: EdgeChange) => {
        setBusy(true);
        try {
            const response = await apiEdge.addEdge(edgeChange, authState?.authToken?.accessToken);
            if (response.data) {
                const newData = [response.data, ...createData()];
                setData(newData);
                setSelected(response.data);
            }
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setEdge = async (edgeChange: EdgeChange) => {
        setBusy(true);
        try {
            const response = await apiEdge.setEdge(selected?.id || -1, edgeChange, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteEdge = async () => {
        setBusy(true);
        try {
            const response = await apiEdge.deleteEdge(selected?.id || -1, authState?.authToken?.accessToken);
            if (!response.error) {
                const newData = createData();
                const index = newData.findIndex(item => item.id === selected?.id);
                if (index !== -1) {
                    newData.splice(index, 1);
                }
                setData(newData);
                setSelected(undefined);
            }
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setEdgeCategoryItems = async (categoryItemChanges: CategoryItemChange[]) => {
        setBusy(true);
        try {
            const response = await apiEdge.setEdgeCategoryItems(selected?.id || -1, categoryItemChanges, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const setEdgeImage = async (file: File) => {
        setBusy(true);
        try {
            const response = await apiEdge.setEdgeImage(selected?.id || -1, file, authState?.authToken?.accessToken);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteEdgeImage = async () => {
        setBusy(true);
        try {
            const response = await apiEdge.deleteEdgeImage(selected?.id || -1, authState?.authToken?.accessToken);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <EdgeContext.Provider
            value={
                {
                    busy,
                    editEnabled,
                    previous,
                    next,
                    page,
                    setPage,
                    setCriteria,
                    data,
                    selected,
                    setSelected,
                    getEdges,
                    addEdge,
                    setEdge,
                    deleteEdge,
                    setEdgeCategoryItems,
                    setEdgeImage,
                    deleteEdgeImage
                }
            }
        >{children}
        </EdgeContext.Provider>
    )
}

export default EdgeProvider;
