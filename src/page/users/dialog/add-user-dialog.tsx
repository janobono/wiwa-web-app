import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Authority, User } from '../../../client/model';
import { RESOURCE } from '../../../locale';
import { useUserState } from '../../../state';

import { WiwaButton, WiwaCheckBox, WiwaSpinner } from '../../../component/ui';
import { UserAuthoritiesComponent, UserCardFields, UserEmailField, UsernameField } from '../../../component/user';
import { Edit } from 'react-feather';
import { EditAuthoritiesDialog } from './index';

interface AddUserDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    onUserAddHandler: (user: User) => void
}

const AddUserDialog: React.FC<AddUserDialogProps> = (props) => {
    const {t} = useTranslation();

    const userState = useUserState();

    const [showEditAuthoritiesDialog, setShowEditAuthoritiesDialog] = useState(false);

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [titleBefore, setTitleBefore] = useState('');

    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(false);

    const [midName, setMidName] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameValid, setLastNameValid] = useState(false);

    const [titleAfter, setTitleAfter] = useState('');

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [confirmed, setConfirmed] = useState(false);

    const [enabled, setEnabled] = useState(false);

    const [authorities, setAuthorities] = useState<Authority[]>([]);

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const isFormValid = (): boolean => {
        return usernameValid
            && firstNameValid
            && lastNameValid
            && emailValid;
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid()) {
                const user = {
                    username,
                    email,
                    titleBefore,
                    firstName,
                    midName,
                    lastName,
                    titleAfter,
                    gdpr: true,
                    confirmed,
                    enabled,
                    authorities
                };
                const clientResponse = await userState?.addUser(user);
                if (clientResponse !== undefined && clientResponse.data !== undefined) {
                    props.setShowDialog(false);
                    props.onUserAddHandler(clientResponse.data);
                } else {
                    setError(t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.ERROR).toString());
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Transition appear show={props.showDialog} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => props.setShowDialog(false)}>
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
                                        {t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.TITLE)}
                                    </div>
                                    <form
                                        onSubmit={(event => {
                                            event.preventDefault();
                                            handleSubmit();
                                        })}>
                                        <UsernameField
                                            username={username}
                                            setUsername={setUsername}
                                            usernameValid={usernameValid}
                                            setUsernameValid={setUsernameValid}
                                        />

                                        <UserEmailField
                                            email={email}
                                            setEmail={setEmail}
                                            emailValid={emailValid}
                                            setEmailValid={setEmailValid}
                                        />

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
                                                    title={t(RESOURCE.ACTION.EDIT).toString()}
                                                    onClick={() => setShowEditAuthoritiesDialog(true)}
                                                >
                                                    <Edit size="18"/>
                                                </WiwaButton>
                                            </div>
                                        </div>
                                        {isSubmitting ?
                                            <div className="flex items-center justify-center">
                                                <WiwaSpinner className="w-5 h-5 border-2 pr-1"/>
                                            </div>
                                            :
                                            <WiwaButton
                                                type="submit"
                                                className="w-full"
                                                disabled={!isFormValid() || isSubmitting}
                                            >
                                                {t(RESOURCE.ACTION.ADD)}
                                            </WiwaButton>
                                        }
                                    </form>
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
                    onAuthoritiesEditHandler={setAuthorities}
                />
            }
        </>
    );
}

export default AddUserDialog;
