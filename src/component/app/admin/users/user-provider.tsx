import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ClientResponse } from '../../../../api/controller';
import * as apiUser from '../../../../api/controller/user';
import { Authority, User } from '../../../../api/model';
import { UserField, UserSearchCriteria } from '../../../../api/model/user';
import { AuthContext, ErrorContext } from '../../../../context';

export interface UserState {
    busy: boolean,
    editEnabled: boolean,
    previous: boolean,
    next: boolean,
    page: number,
    setPage: (page: number) => void,
    setCriteria: (criteria?: UserSearchCriteria) => void,
    data?: User[],
    selected?: User,
    setSelected: (selected?: User) => void,
    getUsers: () => Promise<void>,
    setAuthorities: (authorities: Authority[]) => Promise<void>,
    setEnabled: (enabled: boolean) => Promise<void>,
    setConfirmed: (confirmed: boolean) => Promise<void>,
    deleteUser: () => Promise<void>
}

export const UserContext = createContext<UserState | undefined>(undefined);

const UserProvider = ({children}: { children: ReactNode }) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const [busy, setBusy] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [criteria, setCriteria] = useState<UserSearchCriteria>();
    const [data, setData] = useState<User[]>();
    const [selected, setSelected] = useState<User>();

    useEffect(() => {
        setEditEnabled(false);

        if (selected && data) {
            const index = data.findIndex(item => item.id === selected?.id);
            if (index !== -1) {
                setSelected(data[index]);
                setEditEnabled(data[index].id !== authState?.authUser?.user.id);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    useEffect(() => {
        getUsers().then();
    }, [criteria, page]);

    const createData = (): User[] => {
        if (data) {
            return [...data];
        }
        return [];
    }

    const handleResponse = (response: ClientResponse<User>) => {
        if (response?.data) {
            const newData = createData();
            const index = newData.findIndex(item => item.id === response.data?.id);
            if (index !== -1) {
                newData[index] = response.data;
            }
            setData(newData);
        }
    }

    const getUsers = async () => {
        setBusy(true);
        try {
            const response = await apiUser.getUsers(criteria, {
                page,
                size: 10,
                sort: {field: UserField.id, asc: true}
            }, authState?.authToken?.accessToken);
            setPrevious(!response.data?.first || false);
            setNext(!response.data?.last || false);
            setData(response.data?.content);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setAuthorities = async (authorities: Authority[]) => {
        setBusy(true);
        try {
            const response = await apiUser.setAuthorities(selected?.id || -1, authorities, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const setEnabled = async (enabled: boolean) => {
        setBusy(true);
        try {
            const response = await apiUser.setEnabled(selected?.id || -1, enabled, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const setConfirmed = async (confirmed: boolean) => {
        setBusy(true);
        try {
            const response = await apiUser.setConfirmed(selected?.id || -1, confirmed, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteUser = async () => {
        setBusy(true);
        try {
            const response = await apiUser.deleteUser(selected?.id || -1, authState?.authToken?.accessToken);
            if (!response.error) {
                const newData = createData();
                const index = newData.findIndex(item => item.id === selected?.id);
                if (index !== -1) {
                    newData.splice(index, 1);
                }
                setData(newData);
                setSelected(undefined);
            }
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <UserContext.Provider
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
                    getUsers,
                    setAuthorities,
                    setEnabled,
                    setConfirmed,
                    deleteUser
                }
            }
        >{children}
        </UserContext.Provider>
    )
}

export default UserProvider;
