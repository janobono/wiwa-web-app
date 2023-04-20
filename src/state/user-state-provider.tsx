import React, { createContext, useContext } from 'react';
import { useAuthState } from './auth-state-provider';
import { Authority, Page, User, UserCard } from '../client/model';
import { ClientResponse, Pageable, userClient } from '../client';

export interface UserState {
    getUser: (id: string) => Promise<ClientResponse<User> | undefined>,
    setUserCard: (id: string, userCard: UserCard) => Promise<ClientResponse<User> | undefined>,
    deleteUser: (id: string) => Promise<ClientResponse<void> | undefined>,
    getUsers: (pageable?: Pageable, searchField?: string, username?: string, email?: string) => Promise<ClientResponse<Page<User>> | undefined>,
    addUser: (user: User) => Promise<ClientResponse<User> | undefined>,
    setUserEnabled: (id: string, enabled: boolean) => Promise<ClientResponse<User> | undefined>,
    setUserConfirmed: (id: string, confirmed: boolean) => Promise<ClientResponse<User> | undefined>,
    setUserAuthorities: (id: string, authorities: Authority[]) => Promise<ClientResponse<User> | undefined>
}

const userStateContext = createContext<UserState | undefined>(undefined);

const UserStateProvider: React.FC<any> = ({children}) => {
    const authState = useAuthState();

    const getUser = async (id: string): Promise<ClientResponse<User> | undefined> => {
        const token = authState?.token;
        if (token) {
            return userClient.getUser(id, token);
        }
    }

    const setUserCard = async (id: string, userCard: UserCard): Promise<ClientResponse<User> | undefined> => {
        const token = authState?.token;
        if (token) {
            return userClient.putUser(id, userCard, token);
        }
    }

    const deleteUser = async (id: string): Promise<ClientResponse<void> | undefined> => {
        const token = authState?.token;
        if (token) {
            const error = await userClient.deleteUser(id, token);
            if (error) {
                return error;
            }
        }
    }

    const getUsers = async (pageable?: Pageable, searchField?: string, username?: string, email?: string): Promise<ClientResponse<Page<User>> | undefined> => {
        const token = authState?.token;
        if (token) {
            return userClient.getUsers(token, pageable, searchField, username, email);
        }
    }

    const addUser = async (user: User): Promise<ClientResponse<User> | undefined> => {
        const token = authState?.token;
        if (token) {
            return userClient.postUser(user, token);
        }
    }

    const setUserEnabled = async (id: string, enabled: boolean): Promise<ClientResponse<User> | undefined> => {
        const token = authState?.token;
        if (token) {
            return userClient.patchUserEnable(id, {value: enabled}, token);
        }
    }

    const setUserConfirmed = async (id: string, confirmed: boolean): Promise<ClientResponse<User> | undefined> => {
        const token = authState?.token;
        if (token) {
            return userClient.patchUserConfirm(id, {value: confirmed}, token);
        }
    }

    const setUserAuthorities = async (id: string, authorities: Authority[]): Promise<ClientResponse<User> | undefined> => {
        const token = authState?.token;
        if (token) {
            return userClient.patchUserAuthorities(id, {value: authorities}, token);
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
