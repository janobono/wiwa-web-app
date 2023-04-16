import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Search, UserMinus, UserPlus } from 'react-feather';

import { Pageable } from '../../client';
import { Page, User } from '../../client/model';
import { RESOURCE } from '../../locale';
import UserStateProvider, { useUserState } from '../../state/user-state-provider';

import { WiwaButton, WiwaInput } from '../../component/ui';
import { UserCard } from '../../component/user';

const UsersPage: React.FC = () => {

    return (
        <UserStateProvider>
            <UsersPageContent/>
        </UserStateProvider>
    );
}

export default UsersPage;

const UsersPageContent: React.FC = () => {
    const {t} = useTranslation();

    const userState = useUserState();

    const [selectedUser, setSelectedUser] = useState<User>();
    const [pageable, setPageable] = useState<Pageable>({page: 0, size: 30, sort: {field: 'username', asc: true}});
    const [page, setPage] = useState<Page<User>>();
    const [searchField, setSearchField] = useState<string>();

    const searchUsers = async () => {
        const searchResult = await userState?.getUsers(pageable, searchField);
        setPage(searchResult as Page<User>);
    }

    useEffect(() => {
        searchUsers();
    }, [pageable]);

    return (
        <section className="w-full  min-h-[250px]">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center mb-5">
                        {t(RESOURCE.PAGE.USERS.USERS.TITLE)}
                    </div>
                </div>

                <div className="grid grid-cols-3 my-5">
                    <div className="flex flex-row gap-1">
                        <WiwaButton
                            title={t(RESOURCE.ACTION.ADD).toString()}
                            onClick={() => {
                            }}
                        >
                            <UserPlus size="18"/>
                        </WiwaButton>

                        <WiwaButton
                            disabled={selectedUser === undefined}
                            title={t(RESOURCE.ACTION.EDIT).toString()}
                            onClick={() => {
                            }}
                        >
                            <Edit size="18"/>
                        </WiwaButton>

                        <WiwaButton
                            disabled={selectedUser === undefined}
                            variant="error"
                            title={t(RESOURCE.ACTION.REMOVE).toString()}
                            onClick={() => {
                            }}
                        >
                            <UserMinus size="18"/>
                        </WiwaButton>
                    </div>

                    <div className="flex flex-row gap-1">
                        <WiwaInput
                            className="p-0.5 flex-grow"
                            type="text"
                            value={searchField}
                            onChange={event => setSearchField(event.target.value)}
                        />

                        <WiwaButton
                            title={t(RESOURCE.ACTION.SEARCH).toString()}
                            onClick={() => searchUsers}
                        >
                            <Search size="18"/>
                        </WiwaButton>
                    </div>

                    <div className="flex flex-row gap-1">
                        {
                            //TODO Page selector
                        }
                    </div>
                </div>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {page?.content.map(user =>
                            <UserCard
                                key={user.id}
                                user={user}
                                selected={selectedUser !== undefined && selectedUser.id === user.id}
                                onSelect={setSelectedUser}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
