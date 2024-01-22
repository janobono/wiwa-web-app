import { createContext, ReactNode, useContext, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { ApplicationImage, Page } from '../../model/service';
import { ClientResponse, CONTEXT_PATH, deleteData, getData, postFile, setPageableQueryParams } from '../../data';

const PATH_APPLICATION_IMAGES = CONTEXT_PATH + 'config/application-images';

export interface ApplicationImageState {
    busy: boolean,
    data?: Page<ApplicationImage>,
    getApplicationImages: (page: number, size: number) => Promise<ClientResponse<Page<ApplicationImage>>>,
    addApplicationImage: (file: File) => Promise<ClientResponse<ApplicationImage>>,
    deleteApplicationImage: (fileName: string) => Promise<ClientResponse<void>>,
}

const applicationImageContext = createContext<ApplicationImageState | undefined>(undefined);

const ApplicationImageProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<ApplicationImage>>();

    const getApplicationImages = async (page: number, size: number) => {
        setBusy(true);
        try {
            const pageable = {
                page,
                size,
                sort: {
                    field: 'fileName',
                    asc: true
                }
            }

            const queryParams = new URLSearchParams();
            setPageableQueryParams(queryParams, pageable);
            const response = await getData<Page<ApplicationImage>>(
                PATH_APPLICATION_IMAGES,
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

    const addApplicationImage = async (file: File) => {
        setBusy(true);
        try {
            const response = await postFile<ApplicationImage>(
                PATH_APPLICATION_IMAGES,
                file,
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

    const deleteApplicationImage = async (fileName: string) => {
        setBusy(true);
        try {
            const response = await deleteData<void>(
                PATH_APPLICATION_IMAGES + '/' + fileName,
                authState?.accessToken || ''
            )
            if (!response.error) {
                if (data) {
                    const newData = {...data};
                    const index = newData.content.findIndex(item => item.fileName === fileName);
                    if (index !== -1) {
                        newData.content.splice(index, 1);
                        setData(newData);
                    }
                }
            }
            return response
        } finally {
            setBusy(false);
        }
    }

    return (
        <applicationImageContext.Provider
            value={
                {
                    busy,
                    data,
                    getApplicationImages,
                    addApplicationImage,
                    deleteApplicationImage
                }
            }
        >{children}
        </applicationImageContext.Provider>
    )
}

export default ApplicationImageProvider;

export const useApplicationImageState = () => {
    return useContext(applicationImageContext);
}
