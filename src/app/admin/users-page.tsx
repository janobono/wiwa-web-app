import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PieChart, Search, Settings, ShoppingCart, Tool, Trash } from 'react-feather';

import WiwaUserAuthorities from '../../component/app/wiwa-user-authorities';
import BaseDialog from '../../component/dialog/base-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaInput from '../../component/ui/wiwa-input';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { containsAuthority } from '../../auth';
import { Authority, Page, User } from '../../model/service';

import { CONTEXT_PATH, deleteData, getData, patchData, setPageableQueryParams, setQueryParam } from '../../data';

const PATH_USERS = CONTEXT_PATH + 'users';

const USER_AUTHORITIES_DIALOG_ID = 'admin-users-authorities-dialog-001';

const UsersPage = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [data, setData] = useState<Page<User>>();
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const fetchData = async () => {
        setError(undefined);
        setSubmitting(true);
        try {
            if (authState?.accessToken !== undefined) {
                const pageable = {
                    page: page,
                    size: 10,
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

                if (response.error) {
                    setError(resourceState?.admin?.users.fetchDataError);
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
                userAuthorities,
                authState?.accessToken || ''
            );
            if (response.error) {
                setError(resourceState?.admin?.users.userAuthorities.error);
            } else {
                fetchData().then();
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
                setError(resourceState?.admin?.users.userEnabled.error);
            } else {
                fetchData().then();
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
                setError(resourceState?.admin?.users.userConfirmed.error);
            } else {
                fetchData().then();
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
                setError(resourceState?.admin?.users.deleteUser.error);
            } else {
                fetchData().then();
            }
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        fetchData().then();
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
                                placeholder={resourceState?.admin?.users.searchUser.placeholder}
                                value={searchField}
                                onChange={event => setSearchField(event.target.value)}
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        fetchData().then();
                                    }
                                }}
                            />
                            <WiwaButton
                                title={resourceState?.admin?.users.searchUser.title}
                                className="join-item"
                                onClick={fetchData}
                            ><Search size={18}/></WiwaButton>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.admin?.users.userTable.id}</th>
                                <th>{resourceState?.admin?.users.userTable.username}</th>
                                <th>{resourceState?.admin?.users.userTable.email}</th>
                                <th>{resourceState?.admin?.users.userTable.firstName}</th>
                                <th>{resourceState?.admin?.users.userTable.lastName}</th>
                                <th>{resourceState?.admin?.users.userTable.authorities}</th>
                                <th>{resourceState?.admin?.users.userTable.confirmed}</th>
                                <th>{resourceState?.admin?.users.userTable.enabled}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.content.map(user =>
                                <tr key={user.id} className="hover">
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <th>
                                        <UserAuthorities user={user} disabled={submitting}
                                                         authoritiesHandler={authoritiesHandler}/>
                                    </th>
                                    <th>
                                        <UserConfirmed user={user} disabled={submitting}
                                                       userConfirmedHandler={userConfirmedHandler}/>
                                    </th>
                                    <th>
                                        <UserEnabled user={user} disabled={submitting}
                                                     userEnabledHandler={userEnabledHandler}/>
                                    </th>
                                    <th>
                                        <WiwaButton
                                            className="btn-accent md:btn-xs"
                                            title={resourceState?.admin?.users.deleteUser.title}
                                            disabled={submitting || user.id === authState?.user?.id}
                                            onClick={() => {
                                                dialogState?.showDialog({
                                                    type: DialogType.YES_NO,
                                                    title: resourceState?.admin?.users.deleteUser.title,
                                                    message: resourceState?.admin?.users.deleteUser.message,
                                                    callback: (answer: DialogAnswer) => {
                                                        if (answer === DialogAnswer.YES) {
                                                            if (user.id !== undefined) {
                                                                deleteHandler(user.id).then();
                                                            }
                                                        }
                                                    }
                                                });
                                            }}
                                        ><Trash size={18}/>
                                        </WiwaButton>
                                    </th>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-center pt-5">
                        <WiwaPageable
                            isPrevious={previous}
                            previousHandler={() => setPage(page + 1)}
                            page={page + 1}
                            pageHandler={() => fetchData()}
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

const UserEnabled = (
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
        <div className="flex flex-row w-full items-center justify-center">
            <input
                type="checkbox"
                className="checkbox checkbox-accent"
                disabled={disabled || user.id === authState?.user?.id}
                onClick={() => {
                    dialogState?.showDialog({
                        type: DialogType.YES_NO,
                        title: resourceState?.admin?.users.userEnabled.dialogTitle,
                        message: user.enabled ?
                            resourceState?.admin?.users.userEnabled.disableQuestion :
                            resourceState?.admin?.users.userEnabled.enableQuestion,
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
                readOnly={true}
            />
        </div>
    )
}

const UserConfirmed = (
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
        <div className="flex flex-row w-full items-center justify-center">
            <input
                type="checkbox"
                className="checkbox checkbox-warning"
                disabled={disabled || user.id === authState?.user?.id}
                onClick={() => {
                    dialogState?.showDialog({
                        type: DialogType.YES_NO,
                        title: resourceState?.admin?.users.userConfirmed.dialogTitle,
                        message: user.confirmed ?
                            resourceState?.admin?.users.userConfirmed.denyQuestion :
                            resourceState?.admin?.users.userConfirmed.confirmQuestion,
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
                readOnly={true}
            />
        </div>
    )
}

const UserAuthorities = (
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
            <WiwaButton
                title={resourceState?.admin?.users.userAuthorities.title}
                className="btn-ghost md:btn-xs"
                disabled={disabled || user.id === authState?.user?.id}
                onClick={() => {
                    setShow(true);
                }}
            >
                <WiwaUserAuthorities authorities={user.authorities}/>
            </WiwaButton>

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
                        {resourceState?.admin?.users.userAuthorities.title}
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
                                <span>{resourceState?.admin?.users.userAuthorities.customer}</span>
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
                                <span>{resourceState?.admin?.users.userAuthorities.employee}</span>
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
                                <span>{resourceState?.admin?.users.userAuthorities.manager}</span>
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
                                <span>{resourceState?.admin?.users.userAuthorities.admin}</span>
                            </div>
                        </div>

                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                type="submit"
                            >{resourceState?.admin?.users.userAuthorities.submit}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    cancelHandler();
                                }}
                            >{resourceState?.admin?.users.userAuthorities.cancel}
                            </WiwaButton>
                        </div>
                    </form>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
