import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Search, UserMinus, UserPlus } from 'react-feather';
import { Page, User } from '../../client/model';
import { RESOURCE } from '../../locale';
import { hasAdminAuthority, useAuthState, UserStateProvider, useUserState } from '../../state';

import { WiwaButton, WiwaInput, WiwaSpinner } from '../../component/ui';
import { UserCard } from '../../component/user';
import WiwaPageable from '../../component/ui/wiwa-pageable';

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

    const authState = useAuthState();
    const userState = useUserState();

    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [page, setPage] = useState(0);
    const [usersPage, setUsersPage] = useState<Page<User>>();
    const [searchField, setSearchField] = useState('');

    const searchUsers = async () => {
        setLoading(true);
        setSelectedUser(undefined);
        try {
            const searchResult = await userState?.getUsers({
                page,
                size: 9,
                sort: {field: 'username', asc: true}
            }, searchField);
            if (searchResult) {
                setUsersPage(searchResult.data);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        searchUsers();
    }, [page]);

    return (
        <section className="w-full  min-h-[250px]">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center mb-5">
                        {t(RESOURCE.PAGE.USERS.USERS.TITLE)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3">

                    <div className="flex flex-row gap-1 mb-5">
                        {hasAdminAuthority(authState?.user) &&
                            <>
                                <WiwaButton
                                    size="xs"
                                    title={t(RESOURCE.ACTION.ADD).toString()}
                                    onClick={() => {
                                    }}
                                >
                                    <UserPlus size="18"/>
                                </WiwaButton>

                                <WiwaButton
                                    size="xs"
                                    disabled={selectedUser === undefined}
                                    title={t(RESOURCE.ACTION.EDIT).toString()}
                                    onClick={() => {
                                    }}
                                >
                                    <Edit size="18"/>
                                </WiwaButton>

                                <WiwaButton
                                    size="xs"
                                    disabled={selectedUser === undefined}
                                    variant="error"
                                    title={t(RESOURCE.ACTION.REMOVE).toString()}
                                    onClick={() => {
                                    }}
                                >
                                    <UserMinus size="18"/>
                                </WiwaButton>
                            </>
                        }
                    </div>

                    <div className="flex flex-row gap-1 mb-5">
                        <WiwaInput
                            className="p-0.5 flex-grow"
                            type="text"
                            value={searchField}
                            onChange={event => setSearchField(event.target.value)}
                        />

                        <WiwaButton
                            size="xs"
                            disabled={loading}
                            title={t(RESOURCE.ACTION.SEARCH).toString()}
                            onClick={() => {
                                if (page !== 0) {
                                    setPage(0);
                                } else {
                                    searchUsers();
                                }
                            }}
                        >
                            <Search size="18"/>
                        </WiwaButton>
                    </div>

                    <div className="flex flex-row justify-start md:justify-end mb-5">
                        <WiwaPageable
                            disabled={loading || usersPage === undefined}
                            page={page}
                            totalPages={usersPage ? usersPage.totalPages : 0}
                            setPage={(value: number) => {
                                setLoading(true);
                                setPage(value);
                            }}
                        />
                    </div>
                </div>

                <div className="w-full min-h-[420px]">
                    {
                        !loading ?
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {usersPage?.content.map(user =>
                                    <UserCard
                                        key={user.id}
                                        user={user}
                                        selected={selectedUser !== undefined && selectedUser.id === user.id}
                                        onSelect={setSelectedUser}
                                    />
                                )}
                            </div>
                            :
                            <div className="flex gap-5 w-full items-center justify-center">
                                <WiwaSpinner/>
                                <div>{t(RESOURCE.LOADING)}</div>
                            </div>
                    }
                </div>
            </div>
        </section>
    );
}
