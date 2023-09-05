import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Search, UserMinus, UserPlus } from 'react-feather';
import { Page, User } from '../../client/model';
import { RESOURCE } from '../../locale';
import { hasAdminAuthority, useAuthState, UserStateProvider, useUserState } from '../../state';

import { WiwaButton, WiwaInput, WiwaSpinner } from '../../component/ui';
import { UserCard } from '../../component/user';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { DialogAnswer, YesNoDialog } from '../../component/dialog';
import { AddUserDialog, EditUserDialog } from './dialog';

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

    const [showAddUserDialog, setShowAddUserDialog] = useState(false);
    const [showEditUserDialog, setShowEditUserDialog] = useState(false);
    const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);

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

    const addUserHandler = (user: User) => {
        setLoading(true);
        try {
            if (usersPage !== undefined) {
                const newContent = [user, ...usersPage.content];
                setUsersPage({...usersPage, content: newContent});
                setSelectedUser(user);
            }
        } finally {
            setLoading(false);
        }
    }

    const editUserHandler = (user: User) => {
        setLoading(true);
        try {
            if (selectedUser !== undefined && usersPage !== undefined) {
                const newContent = usersPage.content.map(u => u.id === user.id ? user : u);
                setUsersPage({...usersPage, content: newContent});
                setSelectedUser(user);
            }
        } finally {
            setLoading(false);
        }
    }

    const deleteUserHandler = (dialogAnswer: DialogAnswer) => {
        if (dialogAnswer === DialogAnswer.YES && selectedUser !== undefined && usersPage !== undefined) {
            setLoading(true);
            try {
                const newContent = usersPage.content.filter(user => user.id !== selectedUser.id);
                setSelectedUser(undefined);
                if (selectedUser.id) {
                    userState?.deleteUser(selectedUser.id);
                }
                setUsersPage({...usersPage, content: newContent});
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
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
                                        disabled={loading}
                                        size="xs"
                                        title={t(RESOURCE.ACTION.ADD).toString()}
                                        onClick={() => setShowAddUserDialog(true)}
                                    >
                                        <UserPlus size="18"/>
                                    </WiwaButton>

                                    <WiwaButton
                                        size="xs"
                                        disabled={loading || selectedUser === undefined}
                                        title={t(RESOURCE.ACTION.EDIT).toString()}
                                        onClick={() => setShowEditUserDialog(true)}
                                    >
                                        <Edit size="18"/>
                                    </WiwaButton>

                                    <WiwaButton
                                        size="xs"
                                        disabled={loading || selectedUser === undefined}
                                        variant="error"
                                        title={t(RESOURCE.ACTION.REMOVE).toString()}
                                        onClick={() => setShowDeleteUserDialog(true)}
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

            {showAddUserDialog &&
                <AddUserDialog
                    showDialog={showAddUserDialog}
                    setShowDialog={setShowAddUserDialog}
                    onUserAddHandler={addUserHandler}
                />
            }

            {showEditUserDialog && selectedUser !== undefined &&
                <EditUserDialog
                    showDialog={showEditUserDialog}
                    setShowDialog={setShowEditUserDialog}
                    user={selectedUser}
                    onUserEditHandler={editUserHandler}
                />
            }

            {showDeleteUserDialog && selectedUser !== undefined &&
                <YesNoDialog
                    showDialog={showDeleteUserDialog}
                    setShowDialog={setShowDeleteUserDialog}
                    title={t(RESOURCE.PAGE.USERS.USERS.TITLE).toString()}
                    question={t(RESOURCE.PAGE.USERS.USERS.DELETE_USER_CONFIRMATION_QUESTION).toString()}
                    dialogAnswerHandler={deleteUserHandler}
                />
            }
        </>
    );
}
