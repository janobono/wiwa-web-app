import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Authority, User } from '../../../client/model';
import { RESOURCE } from '../../../locale';
import { useUserState } from '../../../state';

import { EMAIL_REGEX, WiwaButton, WiwaCheckBox, WiwaFormInput, WiwaSpinner } from '../../../component/ui';
import { UserAuthoritiesComponent } from '../../../component/user';

interface AddUserDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    onUserAddHandler: (user: User) => void
}

const AddUserDialog: React.FC<AddUserDialogProps> = (props) => {
    const {t} = useTranslation();

    const userState = useUserState();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [titleBefore, setTitleBefore] = useState('');

    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(false);

    const [midName, setMidName] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameValid, setLastNameValid] = useState(false);

    const [titleAfter, setTitleAfter] = useState('');

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [gdpr, setGdpr] = useState(false);

    const [confirmed, setConfirmed] = useState(false);

    const [enabled, setEnabled] = useState(false);

    const [authorities, setAuthorities] = useState<Authority[]>([]);

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const isFormValid = (): boolean => {
        return false;
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
                    gdpr,
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
                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="username"
                                            label={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.USERNAME.LABEL)}
                                            placeholder={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.USERNAME.PLACEHOLDER).toString()}
                                            required={true}
                                            value={username}
                                            setValue={setUsername}
                                            valid={usernameValid}
                                            setValid={setUsernameValid}
                                            validate={() => {
                                                if (username.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.USERNAME.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="email"
                                            name="email"
                                            label={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.EMAIL.LABEL)}
                                            placeholder={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.EMAIL.PLACEHOLDER).toString()}
                                            required={true}
                                            value={email}
                                            setValue={setEmail}
                                            valid={emailValid}
                                            setValid={setEmailValid}
                                            validate={() => {
                                                if (email.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.EMAIL.VALIDATION_MESSAGE1).toString()
                                                    };
                                                }
                                                const valid = EMAIL_REGEX.test(email);
                                                let message;
                                                if (!valid) {
                                                    message = t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.EMAIL.VALIDATION_MESSAGE2).toString();
                                                }
                                                return {valid, message};
                                            }}/>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                        <div>
                                            <WiwaFormInput
                                                type="text"
                                                name="titleBefore"
                                                label={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.TITLE_BEFORE.LABEL)}
                                                placeholder={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.TITLE_BEFORE.PLACEHOLDER).toString()}
                                                required={false}
                                                value={titleBefore}
                                                setValue={setTitleBefore}
                                                valid={true}
                                                setValid={() => {
                                                }}
                                                validate={() => {
                                                    return {valid: true};
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <WiwaFormInput
                                                type="text"
                                                name="titleAfter"
                                                label={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.TITLE_AFTER.LABEL)}
                                                placeholder={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.TITLE_AFTER.PLACEHOLDER).toString()}
                                                required={false}
                                                value={titleAfter}
                                                setValue={setTitleAfter}
                                                valid={true}
                                                setValid={() => {
                                                }}
                                                validate={() => {
                                                    return {valid: true};
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="firstName"
                                            label={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.FIRST_NAME.LABEL)}
                                            placeholder={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.FIRST_NAME.PLACEHOLDER).toString()}
                                            required={true}
                                            value={firstName}
                                            setValue={setFirstName}
                                            valid={firstNameValid}
                                            setValid={setFirstNameValid}
                                            validate={() => {
                                                if (firstName.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.FIRST_NAME.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="midName"
                                            label={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.MID_NAME.LABEL)}
                                            placeholder={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.MID_NAME.PLACEHOLDER).toString()}
                                            required={false}
                                            value={midName}
                                            setValue={setMidName}
                                            valid={true}
                                            setValid={() => {
                                            }}
                                            validate={() => {
                                                return {valid: true};
                                            }}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="lastName"
                                            label={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.LAST_NAME.LABEL)}
                                            placeholder={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.LAST_NAME.PLACEHOLDER).toString()}
                                            required={true}
                                            value={lastName}
                                            setValue={setLastName}
                                            valid={lastNameValid}
                                            setValid={setLastNameValid}
                                            validate={() => {
                                                if (lastName.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.LAST_NAME.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <WiwaCheckBox
                                            name="gdpr"
                                            value={gdpr}
                                            setValue={setGdpr}
                                            message={t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.GDPR.VALIDATION_MESSAGE).toString()}
                                            disabled={false}
                                            required={true}
                                        >{t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.GDPR.LABEL)}
                                        </WiwaCheckBox>
                                    </div>
                                    <div className="mb-2">
                                        <WiwaCheckBox
                                            name="confirmed"
                                            value={confirmed}
                                            setValue={setConfirmed}
                                            message=""
                                            required={false}
                                            disabled={false}
                                        >{t(RESOURCE.PAGE.USERS.DIALOG.ADD_USER.FORM.GDPR.LABEL)}
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
                                        <div className="flex flex-row">
                                            <UserAuthoritiesComponent authorities={authorities}/>
                                            <WiwaButton

                                            >

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
    );
}

export default AddUserDialog;
