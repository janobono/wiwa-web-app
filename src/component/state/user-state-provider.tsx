import { createContext, ReactNode, useContext, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { Authority, Page, User } from '../../model/service';
import {
    ClientResponse,
    CONTEXT_PATH,
    deleteData,
    getData,
    patchData,
    setPageableQueryParams,
    setQueryParam
} from '../../data';

const PATH_USERS = CONTEXT_PATH + 'users';

export interface UserState {
    busy: boolean,
    data?: Page<User>,
    getUsers: (page: number, size: number, searchField?: string) => Promise<ClientResponse<Page<User>>>,
    setAuthorities: (id: number, authorities: Authority[]) => Promise<ClientResponse<User>>,
    setConfirmed: (id: number, confirmed: boolean) => Promise<ClientResponse<User>>,
    setEnabled: (id: number, enabled: boolean) => Promise<ClientResponse<User>>,
    deleteUser: (id: number) => Promise<ClientResponse<void>>
}

const userContext = createContext<UserState | undefined>(undefined);

const UserProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<User>>();

    const getUsers = async (page: number, size: number, searchField?: string) => {
        setBusy(true);
        try {
            const pageable = {
                page,
                size,
                sort: {
                    field: 'username',
                    asc: true
                }
            }

            const queryParams = new URLSearchParams();
            setPageableQueryParams(queryParams, pageable);
            setQueryParam(queryParams, 'searchField', searchField);
            const response = await getData<Page<User>>(
                PATH_USERS,
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

    const setAuthorities = async (id: number, authorities: Authority[]) => {
        setBusy(true);
        try {
            const response = await patchData<User>(
                PATH_USERS + '/' + id + '/authorities',
                authorities,
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

    const setConfirmed = async (id: number, confirmed: boolean) => {
        setBusy(true);
        try {
            const response = await patchData<User>(
                PATH_USERS + '/' + id + '/confirm',
                {value: confirmed},
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

    const setEnabled = async (id: number, enabled: boolean) => {
        setBusy(true);
        try {
            const response = await patchData<User>(
                PATH_USERS + '/' + id + '/enable',
                {value: enabled},
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

    const deleteUser = async (id: number) => {
        setBusy(true);
        try {
            const response = await deleteData<void>(
                PATH_USERS + '/' + id,
                authState?.accessToken || ''
            );
            if (response.data) {
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
        <userContext.Provider
            value={
                {
                    busy,
                    data,
                    getUsers,
                    setAuthorities,
                    setConfirmed,
                    setEnabled,
                    deleteUser
                }
            }
        >{children}
        </userContext.Provider>
    )
}

export default UserProvider;

export const useUserState = () => {
    return useContext(userContext);
}
