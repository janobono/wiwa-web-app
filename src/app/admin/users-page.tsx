import { useContext, useEffect, useState } from 'react';
import { Lock, Trash, Unlock, UserCheck, Users as FeatherUsers, UserX } from 'react-feather';

import { UserField } from '../../api/model/user';
import AuthoritiesDialog from '../../component/app/admin/users/authorities-dialog';
import UserProvider, { UserContext } from '../../component/app/admin/users/user-provider';
import UserSearchCriteriaForm from '../../component/app/admin/users/user-search-criteria-form';
import UserTable from '../../component/app/admin/users/user-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { AdminResourceContext, CommonResourceContext, DialogContext } from '../../context';
import { DialogAnswer, DialogType } from '../../context/model/dialog';

const AUTHORITIES_DIALOG_ID = 'admin-authorities-dialog-001';

const UsersPage = () => {
    const commonResourceState = useContext(CommonResourceContext);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.adminNav.users || '',
                    to: '/admin/users'
                }
            ]}/>
            <UserProvider>
                <UsersPageContent/>
            </UserProvider>
        </>
    )
}

export default UsersPage;

const UsersPageContent = () => {
    const dialogState = useContext(DialogContext);
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);
    const userState = useContext(UserContext);

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        userState?.getUsers().then();
    }, []);

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <UserSearchCriteriaForm searchHandler={(criteria) => userState?.setCriteria(criteria)}>
                    <>
                        <WiwaButton
                            title={adminResourceState?.resource?.users.userAuthorities.title}
                            className="btn-primary join-item"
                            disabled={userState?.busy || !userState?.editEnabled}
                            onClick={() => {
                                setShowDialog(true);
                            }}
                        >
                            <FeatherUsers size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            className="btn-warning join-item"
                            title={adminResourceState?.resource?.users.userConfirmed.dialogTitle}
                            disabled={userState?.busy || !userState?.editEnabled}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: adminResourceState?.resource?.users.userConfirmed.dialogTitle,
                                    message: userState?.selected?.confirmed ?
                                        adminResourceState?.resource?.users.userConfirmed.denyQuestion :
                                        adminResourceState?.resource?.users.userConfirmed.confirmQuestion,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            userState?.setConfirmed(!userState?.selected?.confirmed).then();
                                        }
                                    }
                                });
                            }}
                        >
                            {userState?.selected?.confirmed ?
                                <UserX size={18}/>
                                :
                                <UserCheck size={18}/>
                            }
                        </WiwaButton>
                        <WiwaButton
                            className="btn-error join-item"
                            title={adminResourceState?.resource?.users.userEnabled.dialogTitle}
                            disabled={userState?.busy || !userState?.editEnabled}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: adminResourceState?.resource?.users.userEnabled.dialogTitle,
                                    message: userState?.selected?.enabled ?
                                        adminResourceState?.resource?.users.userEnabled.disableQuestion :
                                        adminResourceState?.resource?.users.userEnabled.enableQuestion,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            userState?.setEnabled(!userState?.selected?.enabled).then();
                                        }
                                    }
                                });
                            }}
                        >
                            {userState?.selected?.enabled ?
                                <Lock size={18}/>
                                :
                                <Unlock size={18}/>
                            }
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            title={commonResourceState?.resource?.action.delete}
                            disabled={userState?.busy || !userState?.editEnabled}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: adminResourceState?.resource?.users.deleteUser.title,
                                    message: adminResourceState?.resource?.users.deleteUser.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            userState?.deleteUser().then();
                                        }
                                    }
                                });
                            }}
                        ><Trash size={18}/>
                        </WiwaButton>
                    </>
                </UserSearchCriteriaForm>

                <div className="overflow-x-auto">
                    <UserTable
                        fields={Object.values(UserField)}
                        rows={userState?.data}
                        selected={userState?.selected}
                        setSelected={(selected) => userState?.setSelected(selected)}
                    />
                </div>

                <div className="flex justify-center w-full">
                    <WiwaPageable
                        isPrevious={userState?.previous || false}
                        previousHandler={() => userState?.setPage(userState?.page + 1)}
                        page={(userState?.page || 0) + 1}
                        pageHandler={() => userState?.getUsers()}
                        isNext={userState?.next || false}
                        nextHandler={() => userState?.setPage(userState?.page - 1)}
                        disabled={userState?.busy}
                    />
                </div>
            </div>

            <AuthoritiesDialog
                dialogId={AUTHORITIES_DIALOG_ID}
                showDialog={showDialog}
                authorities={userState?.selected?.authorities || []}
                cancelHandler={() => setShowDialog(false)}
                okHandler={(authorities) => {
                    userState?.setAuthorities(authorities).then();
                    setShowDialog(false);
                }}/>
        </>
    )
}
