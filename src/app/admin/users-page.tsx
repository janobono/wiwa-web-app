import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    Lock,
    PieChart,
    Search,
    Settings,
    ShoppingCart,
    Tool,
    Trash,
    Unlock,
    UserCheck,
    Users as FeatherUsers,
    UserX
} from 'react-feather';

import { Authority, containsAuthority, User } from '../../api/model';
import BaseDialog from '../../component/dialog/base-dialog';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaInput from '../../component/ui/wiwa-input';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { DialogAnswer, DialogType } from '../../model/ui';
import { useAuthState } from '../../state/auth';
import { useDialogState } from '../../state/dialog';
import { useResourceState } from '../../state/resource';
import UserProvider, { useUserState } from '../../state/user';
import UserTable from '../../component/user/user-table.tsx';
import { UserField } from '../../api/model/user';

const USER_AUTHORITIES_DIALOG_ID = 'admin-users-authorities-dialog-001';

const UsersPage = () => {
    return (
        <UserProvider>
            <Users/>
        </UserProvider>
    )
}

export default UsersPage;

const Users = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();
    const userState = useUserState();

    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<User>();
    const [searchField, setSearchField] = useState('');
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        setPrevious(userState?.data !== undefined && !userState?.data.first);
        setNext(userState?.data !== undefined && !userState?.data.last);

        if (selected && userState?.data) {
            const index = userState.data.content.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                setSelected(userState.data.content[index]);
            }
        } else {
            setSelected(undefined);
        }
    }, [userState?.data, selected]);

    const fetchData = async () => {
        setError(undefined);
        const response = await userState?.getUsers({searchField}, {page, size: 10});
        if (response?.error) {
            setError(resourceState?.admin?.users.fetchDataError);
        }
    }

    const authoritiesHandler = async (id: number, authorities: Authority[]) => {
        const response = await userState?.setAuthorities(id, authorities);
        if (response?.error) {
            setError(resourceState?.admin?.users.userAuthorities.error);
        }
    }

    const userEnabledHandler = async (id: number, enabled: boolean) => {
        const response = await userState?.setEnabled(id, enabled);
        if (response?.error) {
            setError(resourceState?.admin?.users.userEnabled.error);
        }
    }

    const userConfirmedHandler = async (id: number, confirmed: boolean) => {
        const response = await userState?.setConfirmed(id, confirmed);
        if (response?.error) {
            setError(resourceState?.admin?.users.userConfirmed.error);
        }
    }

    const deleteHandler = async (id: number) => {
        const response = await userState?.deleteUser(id);
        if (response?.error) {
            setError(resourceState?.admin?.users.deleteUser.error);
        }
    }

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

                        <div className="join pb-5 px-5">
                            <WiwaButton
                                title={resourceState?.admin?.users.userAuthorities.title}
                                className="btn-primary join-item"
                                disabled={userState?.busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
                                onClick={() => {
                                    setShowDialog(true);
                                }}
                            >
                                <FeatherUsers size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="btn-warning join-item"
                                title={resourceState?.admin?.users.userConfirmed.dialogTitle}
                                disabled={userState?.busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
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
                                disabled={userState?.busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
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
                                disabled={userState?.busy || selected === undefined || selected?.id === authState?.authUser?.user.id}
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
                    </div>

                    <div className="overflow-x-auto">
                        <UserTable
                            fields={Object.values(UserField)}
                            users={userState?.data?.content}
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
                            disabled={userState?.busy}
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
