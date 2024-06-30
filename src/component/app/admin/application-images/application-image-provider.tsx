import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import * as apiConfig from '../../../../api/controller/config';
import { ApplicationImageInfo, ApplicationImageInfoField } from '../../../../api/model/application';
import { AuthContext, ErrorContext } from '../../../../context';

export interface ApplicationImageState {
    busy: boolean,
    editEnabled: boolean,
    previous: boolean,
    next: boolean,
    page: number,
    setPage: (page: number) => void,
    data?: ApplicationImageInfo[],
    selected?: ApplicationImageInfo,
    setSelected: (selected?: ApplicationImageInfo) => void,
    getApplicationInfoImages: () => Promise<void>,
    setApplicationImage: (file: File) => Promise<void>,
    deleteApplicationImage: () => Promise<void>
}

export const ApplicationImageContext = createContext<ApplicationImageState | undefined>(undefined);

const ApplicationImageProvider = ({children}: { children: ReactNode }) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const [busy, setBusy] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState<ApplicationImageInfo[]>();
    const [selected, setSelected] = useState<ApplicationImageInfo>();

    useEffect(() => {
        setEditEnabled(false);

        if (selected && data) {
            const index = data.findIndex(item => item.fileName === selected?.fileName);
            if (index !== -1) {
                setSelected(data[index]);
                setEditEnabled(true);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    useEffect(() => {
        getApplicationInfoImages().then();
    }, [page]);

    const createData = (): ApplicationImageInfo[] => {
        if (data) {
            return [...data];
        }
        return [];
    }

    const getApplicationInfoImages = async () => {
        setBusy(true);
        try {
            const response = await apiConfig.getApplicationImages({
                page,
                size: 10,
                sort: {field: ApplicationImageInfoField.fileName, asc: true}
            }, authState?.authToken?.accessToken);
            setPrevious(!response.data?.first || false);
            setNext(!response.data?.last || false);
            setData(response.data?.content);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setApplicationImage = async (file: File) => {
        setBusy(true);
        try {
            const response = await apiConfig.setApplicationImage(file, authState?.authToken?.accessToken);
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

    const deleteApplicationImage = async () => {
        setBusy(true);
        try {
            const response = await apiConfig.deleteApplicationImage(selected?.fileName || '', authState?.authToken?.accessToken);
            if (!response.error) {
                const newData = createData();
                const index = newData.findIndex(item => item.fileName === selected?.fileName);
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

    return (
        <ApplicationImageContext.Provider
            value={
                {
                    busy,
                    editEnabled,
                    previous,
                    next,
                    page,
                    setPage,
                    data,
                    selected,
                    setSelected,
                    getApplicationInfoImages,
                    setApplicationImage,
                    deleteApplicationImage
                }
            }
        >{children}
        </ApplicationImageContext.Provider>
    )
}

export default ApplicationImageProvider;
