import React, { createContext, useContext } from 'react';
import { useAuthState } from './auth-state-provider';
import { Authority, Page, User, UserCard } from '../client/model';
import { Pageable, userClient, WiwaError } from '../client';

export interface UserState {
    getUser: (id: string) => Promise<User | WiwaError | undefined>,
    setUserCard: (id: string, userCard: UserCard) => Promise<User | WiwaError | undefined>,
    deleteUser: (id: string) => Promise<WiwaError | undefined>,
    getUsers: (pageable?: Pageable, searchField?: string, username?: string, email?: string) => Promise<Page<User> | WiwaError | undefined>,
    addUser: (user: User) => Promise<User | WiwaError | undefined>,
    setUserEnabled: (id: string, enabled: boolean) => Promise<User | WiwaError | undefined>,
    setUserConfirmed: (id: string, confirmed: boolean) => Promise<User | WiwaError | undefined>,
    setUserAuthorities: (id: string, authorities: Authority[]) => Promise<User | WiwaError | undefined>
}

const userStateContext = createContext<UserState | undefined>(undefined);

const UserStateProvider: React.FC<any> = ({children}) => {
    const authState = useAuthState();

    const getUser = async (id: string): Promise<User | WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const clientResponse = await userClient.getUser(id, token);
            if (clientResponse.error) {
                return clientResponse.error;
            }
            if (clientResponse.data) {
                return clientResponse.data;
            }
        }
    }

    const setUserCard = async (id: string, userCard: UserCard): Promise<User | WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const clientResponse = await userClient.putUser(id, userCard, token);
            if (clientResponse.error) {
                return clientResponse.error;
            }
            if (clientResponse.data) {
                return clientResponse.data;
            }
        }
    }

    const deleteUser = async (id: string): Promise<WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const error = await userClient.deleteUser(id, token);
            if (error) {
                return error;
            }
        }
    }

    const getUsers = async (pageable?: Pageable, searchField?: string, username?: string, email?: string): Promise<Page<User> | WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const clientResponse = await userClient.getUsers(token, pageable, searchField, username, email);
            if (clientResponse.error) {
                return clientResponse.error;
            }
            if (clientResponse.data) {
                return clientResponse.data;
            }
        }
    }

    const addUser = async (user: User): Promise<User | WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const clientResponse = await userClient.postUser(user, token);
            if (clientResponse.error) {
                return clientResponse.error;
            }
            if (clientResponse.data) {
                return clientResponse.data;
            }
        }
    }

    const setUserEnabled = async (id: string, enabled: boolean): Promise<User | WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const clientResponse = await userClient.patchUserEnable(id, {value: enabled}, token);
            if (clientResponse.error) {
                return clientResponse.error;
            }
            if (clientResponse.data) {
                return clientResponse.data;
            }
        }
    }

    const setUserConfirmed = async (id: string, confirmed: boolean): Promise<User | WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const clientResponse = await userClient.patchUserConfirm(id, {value: confirmed}, token);
            if (clientResponse.error) {
                return clientResponse.error;
            }
            if (clientResponse.data) {
                return clientResponse.data;
            }
        }
    }

    const setUserAuthorities = async (id: string, authorities: Authority[]): Promise<User | WiwaError | undefined> => {
        const token = authState?.token;
        if (token) {
            const clientResponse = await userClient.patchUserAuthorities(id, {value: authorities}, token);
            if (clientResponse.error) {
                return clientResponse.error;
            }
            if (clientResponse.data) {
                return clientResponse.data;
            }
        }
    }

    return (
        <userStateContext.Provider
            value={
                {
                    getUser,
                    setUserCard,
                    deleteUser,
                    getUsers,
                    addUser,
                    setUserEnabled,
                    setUserConfirmed,
                    setUserAuthorities
                }
            }
        >{children}
        </userStateContext.Provider>
    );
}

export default UserStateProvider;

export const useUserState = () => {
    return useContext(userStateContext);
}
