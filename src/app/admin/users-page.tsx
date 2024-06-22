import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    Lock,
    PieChart,
    Settings,
    ShoppingCart,
    Tool,
    Trash,
    Unlock,
    UserCheck,
    Users as FeatherUsers,
    UserX
} from 'react-feather';

import { ClientResponse } from '../../api/controller';
import { deleteUser, getUsers, setAuthorities, setConfirmed, setEnabled } from '../../api/controller/user';
import { Authority, containsAuthority, Page, User } from '../../api/model';
import { UserField, UserSearchCriteria } from '../../api/model/user';
import UserTable from '../../component/app/admin/user-table';
import UserSearchCriteriaForm from '../../component/app/admin/user-search-criteria-form';
import BaseDialog from '../../component/dialog/base-dialog';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { DialogAnswer, DialogType } from '../../model/ui';
import { useAuthState } from '../../state/auth';
import { useDialogState } from '../../state/dialog';
import { useErrorState } from '../../state/error';
import { useResourceState } from '../../state/resource';

const USER_AUTHORITIES_DIALOG_ID = 'admin-users-authorities-dialog-001';

const UsersPage = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<User>>();
    const [selected, setSelected] = useState<User>();

    const [criteria, setCriteria] = useState<UserSearchCriteria>();
    const [page, setPage] = useState(0);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, [criteria]);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);

        if (selected && data) {
            const index = data.content.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                setSelected(data.content[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    const fetchData = async () => {
        setBusy(true);
        try {
            const response = await getUsers(criteria, {page, size: 10}, authState?.authToken?.accessToken);

            setData(response.data);

            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const handleResponse = (response: ClientResponse<User>) => {
        if (response?.data) {
            if (data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === response.data?.id);
                if (index !== -1) {
                    newData.content[index] = response.data;
                }
                setData(newData);
            } else {
                setData(undefined);
            }
        }
    }

    const authoritiesHandler = async (id: number, authorities: Authority[]) => {
        setBusy(true);
        try {
            const response = await setAuthorities(id, authorities, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const userEnabledHandler = async (id: number, enabled: boolean) => {
        setBusy(true);
        try {
            const response = await setEnabled(id, enabled, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const userConfirmedHandler = async (id: number, confirmed: boolean) => {
        setBusy(true);
        try {
            const response = await setConfirmed(id, confirmed, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (id: number) => {
        setBusy(true);
        try {
            const response = await deleteUser(id, authState?.authToken?.accessToken);
            setSelected(undefined);
            if (data) {
                const newData = {...data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content.splice(index, 1);
                }
                setData(newData);
            }
            errorState?.addError(response?.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.adminNav.users || '',
                    to: '/admin/users'
                }
            ]}/>
            <div className="flex flex-col p-5 w-full">
                <UserSearchCriteriaForm searchHandler={setCriteria}>
                    <div className="join pl-5">
                        <WiwaButton
                            title={resourceState?.admin?.users.userAuthorities.title}
                            className="btn-primary join-item"
                            disabled={busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
                            onClick={() => {
                                setShowDialog(true);
                            }}
                        >
                            <FeatherUsers size={18}/>
                        </WiwaButton>

                        <WiwaButton
                            className="btn-warning join-item"
                            title={resourceState?.admin?.users.userConfirmed.dialogTitle}
                            disabled={busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: resourceState?.admin?.users.userConfirmed.dialogTitle,
                                    message: selected?.confirmed ?
                                        resourceState?.admin?.users.userConfirmed.denyQuestion :
                                        resourceState?.admin?.users.userConfirmed.confirmQuestion,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            if (selected !== undefined) {
                                                userConfirmedHandler(selected.id, !selected.confirmed).then();
                                            }
                                        }
                                    }
                                });
                            }}
                        >
                            {selected?.confirmed ?
                                <UserX size={18}/>
                                :
                                <UserCheck size={18}/>
                            }
                        </WiwaButton>

                        <WiwaButton
                            className="btn-error join-item"
                            title={resourceState?.admin?.users.userEnabled.dialogTitle}
                            disabled={busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: resourceState?.admin?.users.userEnabled.dialogTitle,
                                    message: selected?.enabled ?
                                        resourceState?.admin?.users.userEnabled.disableQuestion :
                                        resourceState?.admin?.users.userEnabled.enableQuestion,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            if (selected !== undefined) {
                                                userEnabledHandler(selected.id, !selected.enabled).then();
                                            }
                                        }
                                    }
                                });
                            }}
                        >
                            {selected?.enabled ?
                                <Lock size={18}/>
                                :
                                <Unlock size={18}/>
                            }
                        </WiwaButton>

                        <WiwaButton
                            className="btn-accent join-item"
                            title={resourceState?.common?.action.delete}
                            disabled={busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: resourceState?.admin?.users.deleteUser.title,
                                    message: resourceState?.admin?.users.deleteUser.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            if (selected !== undefined) {
                                                deleteHandler(selected.id).then();
                                            }
                                        }
                                    }
                                });
                            }}
                        ><Trash size={18}/>
                        </WiwaButton>
                    </div>
                </UserSearchCriteriaForm>

                <div className="overflow-x-auto">
                    <UserTable
                        fields={Object.values(UserField)}
                        rows={data?.content}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>

                <div className="w-full flex justify-center pt-5">
                    <WiwaPageable
                        isPrevious={previous}
                        previousHandler={() => setPage(page + 1)}
                        page={page + 1}
                        pageHandler={() => fetchData()}
                        isNext={next}
                        nextHandler={() => setPage(page - 1)}
                        disabled={busy}
                    />
                </div>
            </div>

            <AuthoritiesDialog
                showDialog={showDialog}
                authorities={selected?.authorities || []}
                cancelHandler={() => setShowDialog(false)}
                okHandler={(authorities) => {
                    if (selected) {
                        try {
                            authoritiesHandler(selected.id, authorities).then();
                        } finally {
                            setShowDialog(false);
                        }
                    }
                }}
            />
        </>
    )
}

export default UsersPage;

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
                            >{resourceState?.common?.action.submit}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    cancelHandler();
                                }}
                            >{resourceState?.common?.action.cancel}
                            </WiwaButton>
                        </div>
                    </form>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
