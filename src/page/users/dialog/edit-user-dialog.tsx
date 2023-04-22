import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Save } from 'react-feather';
import { useTranslation } from 'react-i18next';

import { Authority, User } from '../../../client/model';
import { RESOURCE } from '../../../locale';
import { useUserState } from '../../../state';

import { WiwaButton, WiwaCheckBox, WiwaSpinner } from '../../../component/ui';
import { UserAuthoritiesComponent, UserCardFields } from '../../../component/user';
import { EditAuthoritiesDialog } from './index';

interface EditUserDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    user: User,
    onUserEditHandler: (user: User) => void
}

const EditUserDialog: React.FC<EditUserDialogProps> = (props) => {
    const {t} = useTranslation();

    const userState = useUserState();

    const [user, setUser] = useState<User>({...props.user, authorities: [...props.user.authorities]});

    const [titleBefore, setTitleBefore] = useState('');
    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [midName, setMidName] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameValid, setLastNameValid] = useState(false);
    const [titleAfter, setTitleAfter] = useState('');

    const [confirmed, setConfirmed] = useState(props.user.enabled);

    const [enabled, setEnabled] = useState(props.user.confirmed);

    const [authorities, setAuthorities] = useState<Authority[]>([]);

    const [showEditAuthoritiesDialog, setShowEditAuthoritiesDialog] = useState(false);

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setTitleBefore(user.titleBefore ? user.titleBefore : '');
        setFirstName(user.firstName);
        setMidName(user.midName ? user.midName : '');
        setLastName(user.lastName ? user.lastName : '');
        setTitleAfter(user.titleAfter ? user.titleAfter : '');

        setConfirmed(user.confirmed);

        setEnabled(user.enabled);

        setAuthorities([...user.authorities])
    }, [user]);

    useEffect(() => {
        if (!isSubmitting && user.confirmed !== confirmed) {
            saveConfirmed();
        }
    }, [confirmed]);

    useEffect(() => {
        if (!isSubmitting && user.enabled !== enabled) {
            saveEnabled();
        }
    }, [enabled]);

    const saveUserCard = async () => {
        setSubmitting(true);
        try {
            if (user !== undefined && user.id !== undefined) {
                const clientResponse = await userState?.setUserCard(user.id, {
                    titleBefore,
                    firstName,
                    midName,
                    lastName,
                    titleAfter
                });
                if (clientResponse !== undefined && clientResponse.error === undefined) {
                    if (clientResponse.data) {
                        setUser(clientResponse.data);
                    }
                } else {
                    setError(t(RESOURCE.PAGE.USERS.DIALOG.EDIT_USER.ERROR).toString());
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const saveConfirmed = async () => {
        setSubmitting(true);
        try {
            if (user !== undefined && user.id !== undefined) {
                const clientResponse = await userState?.setUserConfirmed(user.id, confirmed);
                if (clientResponse !== undefined && clientResponse.error === undefined) {
                    if (clientResponse.data) {
                        setUser(clientResponse.data);
                    }
                } else {
                    setError(t(RESOURCE.PAGE.USERS.DIALOG.EDIT_USER.ERROR).toString());
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const saveEnabled = async () => {
        setSubmitting(true);
        try {
            if (user !== undefined && user.id !== undefined) {
                const clientResponse = await userState?.setUserEnabled(user.id, enabled);
                if (clientResponse !== undefined && clientResponse.error === undefined) {
                    if (clientResponse.data) {
                        setUser(clientResponse.data);
                    }
                } else {
                    setError(t(RESOURCE.PAGE.USERS.DIALOG.EDIT_USER.ERROR).toString());
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const saveAuthorities = async (authorities: Authority[]) => {
        setSubmitting(true);
        try {
            if (user !== undefined && user.id !== undefined) {
                const clientResponse = await userState?.setUserAuthorities(user.id, authorities);
                if (clientResponse !== undefined && clientResponse.error === undefined) {
                    if (clientResponse.data) {
                        setUser(clientResponse.data);
                    }
                } else {
                    setError(t(RESOURCE.PAGE.USERS.DIALOG.EDIT_USER.ERROR).toString());
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const handleClose = () => {
        if (user) {
            props.onUserEditHandler(user);
        }
        props.setShowDialog(false);
    }

    return (
        <>
            <Transition appear show={props.showDialog} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                                    <div className="text-lg md:text-xl font-bold text-center mb-5">
                                        {t(RESOURCE.PAGE.USERS.DIALOG.EDIT_USER.TITLE)}
                                    </div>

                                    {isSubmitting ?
                                        <div className="flex items-center justify-center">
                                            <WiwaSpinner className="w-5 h-5 border-2 pr-1"/>
                                        </div>
                                        :
                                        <>
                                            <div className="items-center justify-center p-5 border">
                                                <UserCardFields
                                                    titleBefore={titleBefore}
                                                    setTitleBefore={setTitleBefore}
                                                    titleAfter={titleAfter}
                                                    setTitleAfter={setTitleAfter}
                                                    firstName={firstName}
                                                    setFirstName={setFirstName}
                                                    firstNameValid={firstNameValid}
                                                    setFirstNameValid={setFirstNameValid}
                                                    midName={midName}
                                                    setMidName={setMidName}
                                                    lastName={lastName}
                                                    setLastName={setLastName}
                                                    lastNameValid={lastNameValid}
                                                    setLastNameValid={setLastNameValid}
                                                />

                                                <WiwaButton
                                                    size="xs"
                                                    disabled={isSubmitting || !firstNameValid || !lastNameValid}
                                                    title={t(RESOURCE.ACTION.SAVE).toString()}
                                                    onClick={saveUserCard}
                                                >
                                                    <Save size="18"/>
                                                </WiwaButton>
                                            </div>

                                            <div className="mb-2">
                                                <WiwaCheckBox
                                                    name="confirmed"
                                                    value={confirmed}
                                                    setValue={setConfirmed}
                                                    message=""
                                                    required={false}
                                                    disabled={false}
                                                >{t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.CONFIRMED.LABEL)}
                                                </WiwaCheckBox>
                                            </div>

                                            <div className="mb-2">
                                                <WiwaCheckBox
                                                    name="enabled"
                                                    value={enabled}
                                                    setValue={setEnabled}
                                                    message=""
                                                    required={false}
                                                    disabled={false}
                                                >{t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.ENABLED.LABEL)}
                                                </WiwaCheckBox>
                                            </div>

                                            <div className="mb-2">
                                                <div className="flex flex-row items-center gap-5">
                                                    <UserAuthoritiesComponent authorities={authorities}/>
                                                    <WiwaButton
                                                        size="xs"
                                                        title={t(RESOURCE.ACTION.SAVE).toString()}
                                                        onClick={() => setShowEditAuthoritiesDialog(true)}
                                                    >
                                                        <Save size="18"/>
                                                    </WiwaButton>
                                                </div>
                                            </div>
                                        </>
                                    }

                                    {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {showEditAuthoritiesDialog &&
                <EditAuthoritiesDialog
                    showDialog={showEditAuthoritiesDialog}
                    setShowDialog={setShowEditAuthoritiesDialog}
                    authorities={authorities}
                    onAuthoritiesEditHandler={saveAuthorities}
                />
            }
        </>
    );
}

export default EditUserDialog;
