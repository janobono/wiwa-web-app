import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PieChart, Search, Settings, ShoppingCart, Tool, Trash } from 'react-feather';
import { twMerge } from 'tailwind-merge';

import BaseDialog from '../../component/dialog/base-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaInput from '../../component/ui/wiwa-input';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import WiwaUserAuthorities from '../../component/user/wiwa-user-authorities';
import { containsAuthority } from '../../auth';
import { Authority, Page, User } from '../../model/service';

import { CONTEXT_PATH, deleteData, getData, patchData, setPageableQueryParams, setQueryParam } from '../../data';

const PATH_USERS = CONTEXT_PATH + 'users';

const USER_AUTHORITIES_DIALOG_ID = 'admin-users-authorities-dialog-001';

const UsersPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [data, setData] = useState<Page<User>>();
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const fetchUsers = async () => {
        setError(undefined);
        setSubmitting(true);
        try {
            if (authState?.accessToken !== undefined) {
                const pageable = {
                    page: page,
                    size: 8,
                    sort: {
                        field: 'username',
                        asc: true
                    }
                }

                const queryParams = new URLSearchParams();
                setPageableQueryParams(queryParams, pageable);
                setQueryParam(queryParams, 'search-field', searchField);
                const response = await getData<Page<User>>(
                    PATH_USERS,
                    queryParams,
                    authState?.accessToken || ''
                );

                if (response.error) {
                    setError(resourceState?.admin?.users.error);
                } else if (response.data) {
                    setData(response.data);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const authoritiesHandler = async (id: string, userAuthorities: Authority[]) => {
        setSubmitting(true);
        try {
            const response = await patchData<User>(
                PATH_USERS + '/' + id + '/authorities',
                {value: userAuthorities},
                authState?.accessToken || ''
            );
            if (response.error) {
                setError(resourceState?.admin?.users.userCard.userAuthorities.error);
            } else {
                fetchUsers().then();
            }
        } finally {
            setSubmitting(false);
        }
    }

    const userEnabledHandler = async (id: string, enabled: boolean) => {
        setSubmitting(true);
        try {
            const response = await patchData<User>(
                PATH_USERS + '/' + id + '/enable',
                {value: enabled},
                authState?.accessToken || ''
            );
            if (response.error) {
                setError(resourceState?.admin?.users.userCard.userEnabled.error);
            } else {
                fetchUsers().then();
            }
        } finally {
            setSubmitting(false);
        }
    }

    const userConfirmedHandler = async (id: string, confirmed: boolean) => {
        setSubmitting(true);
        try {
            const response = await patchData<User>(
                PATH_USERS + '/' + id + '/confirm',
                {value: confirmed},
                authState?.accessToken || ''
            );
            if (response.error) {
                setError(resourceState?.admin?.users.userCard.userConfirmed.error);
            } else {
                fetchUsers().then();
            }
        } finally {
            setSubmitting(false);
        }
    }

    const deleteHandler = async (id: string) => {
        setSubmitting(true);
        try {
            const response = await deleteData(
                PATH_USERS + '/' + id,
                authState?.accessToken || ''
            );
            if (response.error) {
                setError(resourceState?.admin?.users.userCard.deleteUser.error);
            } else {
                fetchUsers().then();
            }
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        fetchUsers().then();
    }, []);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);
    }, [data]);

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="join pb-5 w-2/3">
                            <WiwaInput
                                className="join-item"
                                placeholder={resourceState?.admin?.users.searchUserPlaceholder}
                                value={searchField}
                                onChange={event => setSearchField(event.target.value)}
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        fetchUsers().then();
                                    }
                                }}
                            />
                            <WiwaButton
                                title={resourceState?.admin?.users.searchUser}
                                className="join-item"
                                onClick={fetchUsers}
                            ><Search size={24}/></WiwaButton>
                        </div>
                    </div>

                    <div className="flex justify-center w-full pt-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                            {data?.content.map(user =>
                                <UserComponent
                                    key={user.id}
                                    user={user}
                                    authoritiesHandler={authoritiesHandler}
                                    userEnabledHandler={userEnabledHandler}
                                    userConfirmedHandler={userConfirmedHandler}
                                    deleteHandler={deleteHandler}
                                    disabled={submitting}
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-center pt-5">
                        <WiwaPageable
                            isPrevious={previous}
                            previousHandler={() => setPage(page + 1)}
                            page={page + 1}
                            pageHandler={() => fetchUsers()}
                            isNext={next}
                            nextHandler={() => setPage(page - 1)}
                            disabled={submitting}
                        />
                    </div>
                </div>
            </>
    )
}

export default UsersPage;

const UserComponent = (
    {
        user,
        authoritiesHandler,
        userEnabledHandler,
        userConfirmedHandler,
        deleteHandler,
        disabled
    }: {
        user: User,
        authoritiesHandler: (id: string, userAuthorities: Authority[]) => void,
        userEnabledHandler: (id: string, enabled: boolean) => void,
        userConfirmedHandler: (id: string, confirmed: boolean) => void,
        deleteHandler: (id: string) => void,
        disabled: boolean
    }) => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    return (
        <div
            className={twMerge(`flex flex-col border border-solid p-5
                ${!user.enabled && 'border-2 border-accent'}
                ${user.enabled && !user.confirmed && 'border-2 border-warning'}
            `)}
        >
            <div className="flex flex-row justify-end w-full">
                <WiwaButton
                    className="btn-accent"
                    title={resourceState?.admin?.users.userCard.deleteUser.title}
                    disabled={disabled || user.id === authState?.user?.id}
                    onClick={() => {
                        dialogState?.showDialog({
                            type: DialogType.YES_NO,
                            title: resourceState?.admin?.users.userCard.deleteUser.title,
                            message: resourceState?.admin?.users.userCard.deleteUser.message,
                            callback: (answer: DialogAnswer) => {
                                if (answer === DialogAnswer.YES) {
                                    if (user.id !== undefined) {
                                        deleteHandler(user.id);
                                    }
                                }
                            }
                        });
                    }}
                ><Trash size={24}/>
                </WiwaButton>
            </div>
            <UserCardComponent user={user}/>
            <UserAuthoritiesCard user={user} disabled={disabled} authoritiesHandler={authoritiesHandler}/>
            <UserConfirmedCard user={user} disabled={disabled} userConfirmedHandler={userConfirmedHandler}/>
            <UserEnabledCard user={user} disabled={disabled} userEnabledHandler={userEnabledHandler}/>
        </div>
    )
}

const UserCardComponent = ({user}: { user: User }) => {
    const resourceState = useResourceState();

    return (
        <div
            className="grid grid-cols-2 place-items-start gap-2 w-full items-center">
            <div className="font-bold">{resourceState?.admin?.users.userCard.username}</div>
            <div>{user.username}</div>

            <div className="font-bold">{resourceState?.admin?.users.userCard.email}</div>
            <div>{user.email}</div>

            <div className="font-bold">{resourceState?.admin?.users.userCard.firstName}</div>
            <div>{user.firstName}</div>

            <div className="font-bold">{resourceState?.admin?.users.userCard.lastName}</div>
            <div>{user.lastName}</div>
        </div>
    )
}

const UserEnabledCard = (
    {
        user,
        disabled,
        userEnabledHandler
    }: {
        user: User,
        disabled: boolean,
        userEnabledHandler: (id: string, enabled: boolean) => void
    }) => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-row w-full pt-5 gap-5">
            <div
                className="font-bold">{resourceState?.admin?.users.userCard.userEnabled.title}
            </div>
            <input
                type="checkbox"
                className="checkbox checkbox-accent"
                disabled={disabled || user.id === authState?.user?.id}
                onClick={() => {
                    dialogState?.showDialog({
                        type: DialogType.YES_NO,
                        title: resourceState?.admin?.users.userCard.userEnabled.dialogTitle,
                        message: user.enabled ?
                            resourceState?.admin?.users.userCard.userEnabled.disableQuestion :
                            resourceState?.admin?.users.userCard.userEnabled.enableQuestion,
                        callback: (answer: DialogAnswer) => {
                            if (answer === DialogAnswer.YES) {
                                if (user.id !== undefined) {
                                    userEnabledHandler(user.id, !user.enabled);
                                }
                            }
                        }
                    });
                }}
                checked={user.enabled}
            />
        </div>
    )
}

const UserConfirmedCard = (
    {
        user,
        disabled,
        userConfirmedHandler
    }: {
        user: User,
        disabled: boolean,
        userConfirmedHandler: (id: string, confirmed: boolean) => void
    }) => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    return (
        <div className="flex flex-row w-full pt-5 gap-5">
            <div
                className="font-bold">{resourceState?.admin?.users.userCard.userConfirmed.title}
            </div>
            <input
                type="checkbox"
                className="checkbox checkbox-warning"
                disabled={disabled || user.id === authState?.user?.id}
                onClick={() => {
                    dialogState?.showDialog({
                        type: DialogType.YES_NO,
                        title: resourceState?.admin?.users.userCard.userConfirmed.dialogTitle,
                        message: user.confirmed ?
                            resourceState?.admin?.users.userCard.userConfirmed.denyQuestion :
                            resourceState?.admin?.users.userCard.userConfirmed.confirmQuestion,
                        callback: (answer: DialogAnswer) => {
                            if (answer === DialogAnswer.YES) {
                                if (user.id !== undefined) {
                                    userConfirmedHandler(user.id, !user.confirmed);
                                }
                            }
                        }
                    });
                }}
                checked={user.confirmed}
            />
        </div>
    )
}

const UserAuthoritiesCard = (
    {
        user,
        disabled,
        authoritiesHandler
    }: {
        user: User,
        disabled: boolean,
        authoritiesHandler: (id: string, userAuthorities: Authority[]) => void
    }) => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="flex flex-row w-full pt-5 gap-5 items-center">
                <div className="font-bold">{resourceState?.admin?.users.userCard.userAuthorities.authorities}</div>
                <button
                    className="btn btn-ghost"
                    title={resourceState?.admin?.users.userCard.userAuthorities.title}
                    disabled={disabled || user.id === authState?.user?.id}
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    <WiwaUserAuthorities authorities={user.authorities}/>
                </button>
            </div>

            <AuthoritiesDialog
                showDialog={show}
                authorities={user.authorities}
                cancelHandler={() => setShow(false)}
                okHandler={(authorities) => {
                    try {
                        authoritiesHandler(user.id || '', authorities);
                    } finally {
                        setShow(false);
                    }
                }}
            />
        </>
    )
}

const AuthoritiesDialog = ({showDialog, authorities, okHandler, cancelHandler}: {
    showDialog: boolean,
    authorities: Authority[],
    okHandler: (authorities: Authority[]) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [customerAuthority, setCustomerAuthority] = useState(false);
    const [employeeAuthority, setEmployeeAuthority] = useState(false);
    const [managerAuthority, setManagerAuthority] = useState(false);
    const [adminAuthority, setAdminAuthority] = useState(false);

    useEffect(() => {
        setCustomerAuthority(containsAuthority(authorities, Authority.W_CUSTOMER));
        setEmployeeAuthority(containsAuthority(authorities, Authority.W_EMPLOYEE));
        setManagerAuthority(containsAuthority(authorities, Authority.W_MANAGER));
        setAdminAuthority(containsAuthority(authorities, Authority.W_ADMIN));
    }, [showDialog, authorities]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={USER_AUTHORITIES_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.users.userCard.userAuthorities.title}
                    </div>
                    <form
                        className="max-w-sm"
                        onSubmit={(event => {
                            event.preventDefault();
                            const authorities = [];
                            if (customerAuthority) {
                                authorities.push(Authority.W_CUSTOMER);
                            }
                            if (employeeAuthority) {
                                authorities.push(Authority.W_EMPLOYEE);
                            }
                            if (managerAuthority) {
                                authorities.push(Authority.W_MANAGER);
                            }
                            if (adminAuthority) {
                                authorities.push(Authority.W_ADMIN);
                            }
                            okHandler(authorities);
                        })}>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={customerAuthority}
                                    onChange={() => setCustomerAuthority(!customerAuthority)}
                                    className="checkbox"
                                />
                                <ShoppingCart size="18"/>
                                <span>{resourceState?.admin?.users.userCard.userAuthorities.customer}</span>
                            </div>
                        </div>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={employeeAuthority}
                                    onChange={() => setEmployeeAuthority(!employeeAuthority)}
                                    className="checkbox"
                                />
                                <Tool size="18"/>
                                <span>{resourceState?.admin?.users.userCard.userAuthorities.employee}</span>
                            </div>
                        </div>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={managerAuthority}
                                    onChange={() => setManagerAuthority(!managerAuthority)}
                                    className="checkbox"
                                />
                                <PieChart size="18"/>
                                <span>{resourceState?.admin?.users.userCard.userAuthorities.manager}</span>
                            </div>
                        </div>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={adminAuthority}
                                    onChange={() => setAdminAuthority(!adminAuthority)}
                                    className="checkbox"
                                />
                                <Settings size="18"/>
                                <span>{resourceState?.admin?.users.userCard.userAuthorities.admin}</span>
                            </div>
                        </div>

                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                type="submit"
                            >{resourceState?.admin?.users.userCard.userAuthorities.submit}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    cancelHandler();
                                }}
                            >{resourceState?.admin?.users.userCard.userAuthorities.cancel}
                            </WiwaButton>
                        </div>
                    </form>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
