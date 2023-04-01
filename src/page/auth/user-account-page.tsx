import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Edit, Mail } from 'react-feather';

import { RESOURCE } from '../../locale';
import { useAuthState } from '../../state';

import { WiwaButton } from '../../component/ui';
import { ChangeEmailDialog, ChangePasswordDialog, ChangeUserDetailsDialog, ResendConfirmationDialog } from './dialog';

const UserAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const authState = useAuthState();

    const [showEmailDialog, setShowEmailDialog] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false);
    const [showResendConfirmationDialog, setShowResendConfirmationDialog] = useState(false);

    useEffect(() => {
        if (!authState?.user) {
            navigate('/');
        }
    }, [authState?.user]);

    return (
        <section className="w-full">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center mb-5">
                        {t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.TITLE)}
                    </div>
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 place-items-start gap-2 w-full text-xs md:text-base items-center">

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.USERNAME)}</div>
                        <div>{authState?.user?.sub}</div>
                        <div></div>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.PASSWORD)}</div>
                        <div>******</div>
                        <WiwaButton
                            title={t(RESOURCE.ACTION.CHANGE_PASSWORD).toString()}
                            onClick={() => setShowPasswordDialog(true)}
                        >
                            <Edit size="18"/>
                        </WiwaButton>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.EMAIL)}</div>
                        <div>{authState?.user?.email}</div>
                        <WiwaButton
                            title={t(RESOURCE.ACTION.CHANGE_EMAIL).toString()}
                            onClick={() => setShowEmailDialog(true)}
                        >
                            <Edit size="18"/>
                        </WiwaButton>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.TITLE_BEFORE)}</div>
                        <div>{authState?.user?.titleBefore}</div>
                        <div></div>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.FIRST_NAME)}</div>
                        <div>{authState?.user?.firstName}</div>
                        <div></div>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.MID_NAME)}</div>
                        <div>{authState?.user?.midName}</div>
                        <div></div>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.LAST_NAME)}</div>
                        <div>{authState?.user?.lastName}</div>
                        <div></div>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.TITLE_AFTER)}</div>
                        <div>{authState?.user?.titleAfter}</div>
                        <div></div>

                        <div className="font-bold">{t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.GDPR)}</div>
                        <div>{authState?.user?.gdpr && t(RESOURCE.ACTION.YES)}</div>
                        <WiwaButton
                            title={t(RESOURCE.ACTION.CHANGE_USER_DETAILS).toString()}
                            onClick={() => setShowUserDetailsDialog(true)}
                        >
                            <Edit size="18"/>
                        </WiwaButton>
                    </div>

                    {!authState?.user?.confirmed &&
                        <div className="bg-yellow-400 p-2 my-5">
                            <div
                                className="flex flex-col md:flex-row w-full justify-center items-center">
                                <div className="text-xs md:text-base pr-1">
                                    {t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.CONFIRMATION_WARNING)}
                                </div>
                                <WiwaButton
                                    title={t(RESOURCE.PAGE.AUTH.USER_ACCOUNT.SEND_CONFIRMATION).toString()}
                                    onClick={() => setShowResendConfirmationDialog(true)}
                                >
                                    <Mail size="18"/>
                                </WiwaButton>
                            </div>
                        </div>
                    }
                </div>
                {showEmailDialog &&
                    <ChangeEmailDialog showDialog={showEmailDialog} setShowDialog={setShowEmailDialog}/>
                }
                {showPasswordDialog &&
                    <ChangePasswordDialog showDialog={showPasswordDialog} setShowDialog={setShowPasswordDialog}/>
                }
                {showUserDetailsDialog &&
                    <ChangeUserDetailsDialog showDialog={showUserDetailsDialog}
                                             setShowDialog={setShowUserDetailsDialog}/>
                }
                {showResendConfirmationDialog &&
                    <ResendConfirmationDialog showDialog={showResendConfirmationDialog}
                                              setShowDialog={setShowResendConfirmationDialog}/>
                }
            </div>
        </section>
    );
}

export default UserAccountPage;
