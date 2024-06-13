import { createContext, ReactNode, useContext, useState } from 'react';

import { ClientResponse } from '../../api/controller';
import {
    deleteUser as apiDeleteUser,
    getUsers as apiGetUsers,
    setAuthorities as apiSetAuthorities,
    setConfirmed as apiSetConfirmed,
    setEnabled as apiSetEnabled
} from '../../api/controller/user';
import { Authority, Page, Pageable, User } from '../../api/model';
import { useAuthState } from '../auth';
import { UserField, UserSearchCriteria } from '../../api/model/user';

export interface UserState {
    busy: boolean,
    data?: Page<User>,
    getUsers: (criteria?: UserSearchCriteria, pageable?: Pageable<UserField>) => Promise<ClientResponse<Page<User>>>,
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

    const handleResponse = (id: number, response: ClientResponse<User>) => {
        if (response.data && data) {
            const newData = {...data};
            const index = newData.content.findIndex(item => item.id === id);
            if (index !== -1) {
                newData.content[index] = response.data;
                setData(newData);
            }
        }
    }

    const getUsers = async (criteria?: UserSearchCriteria, pageable?: Pageable<UserField>) => {
        setBusy(true);
        try {
            const response = await apiGetUsers(criteria, pageable, authState?.authToken?.accessToken);
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
            const response = await apiSetAuthorities(id, authorities, authState?.authToken?.accessToken);
            handleResponse(id, response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setConfirmed = async (id: number, confirmed: boolean) => {
        setBusy(true);
        try {
            const response = await apiSetConfirmed(id, confirmed, authState?.authToken?.accessToken);
            handleResponse(id, response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setEnabled = async (id: number, enabled: boolean) => {
        setBusy(true);
        try {
            const response = await apiSetEnabled(id, enabled, authState?.authToken?.accessToken);
            handleResponse(id, response);
            return response;
        } finally {
            setBusy(false);
        }
    }

    const deleteUser = async (id: number) => {
        setBusy(true);
        try {
            const response = await apiDeleteUser(id, authState?.authToken?.accessToken);
            if (response.data && data) {
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
