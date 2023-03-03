import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthState } from '../../../../state';
import { WiwaErrorCode } from '../../../../client';
import { RESOURCE } from '../../../../locale';

import { EMAIL_REGEX, WiwaButton, WiwaCaptcha, WiwaFormInput, WiwaSpinner } from '../../../ui';

interface ChangeEmailDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeEmailDialog: React.FC<ChangeEmailDialogProps> = (props) => {
    const {t} = useTranslation();

    const authState = useAuthState();

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [isSubmitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string>();

    const isFormValid = (): boolean => {
        return emailValid && passwordValid && captchaValid;
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid() && captchaToken) {
                const wiwaError = await authState?.changeEmail({
                    email,
                    password,
                    captchaText,
                    captchaToken
                });
                if (wiwaError) {
                    switch (wiwaError.code) {
                        case WiwaErrorCode.INVALID_CAPTCHA:
                            setError(t(RESOURCE.ERROR.INVALID_CAPTCHA).toString());
                            break;
                        case WiwaErrorCode.USER_EMAIL_IS_USED:
                            setError(t(RESOURCE.ERROR.USER_EMAIL_IS_USED).toString());
                            break;
                        case WiwaErrorCode.USER_NOT_FOUND:
                            setError(t(RESOURCE.ERROR.USER_NOT_FOUND).toString());
                            break;
                        case WiwaErrorCode.INVALID_CREDENTIALS:
                            setError(t(RESOURCE.ERROR.INVALID_CREDENTIALS).toString());
                            break;
                        default:
                            setError(t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.ERROR).toString());
                            break;
                    }
                } else {
                    setSubmitted(true);
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
                                    {t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.TITLE)}
                                </div>
                                {submitted ?
                                    <>
                                        <div className="mb-5">
                                            {t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.MESSAGE)}
                                        </div>
                                        <WiwaButton
                                            className="w-full"
                                            onClick={() => props.setShowDialog(false)}
                                        >
                                            {t(RESOURCE.ACTION.OK)}
                                        </WiwaButton>
                                    </>
                                    :
                                    <>
                                        <form
                                            onSubmit={(event => {
                                                event.preventDefault();
                                                handleSubmit();
                                            })}>
                                            <div className="mb-5">
                                                <WiwaFormInput
                                                    type="email"
                                                    name="email"
                                                    label={t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.FORM.EMAIL.LABEL)}
                                                    placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.FORM.EMAIL.PLACEHOLDER).toString()}
                                                    required={true}
                                                    value={email}
                                                    setValue={setEmail}
                                                    valid={emailValid}
                                                    setValid={setEmailValid}
                                                    validate={() => {
                                                        if (email.trim().length === 0) {
                                                            return {
                                                                valid: false,
                                                                message: t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.FORM.EMAIL.VALIDATION_MESSAGE_1).toString()
                                                            };
                                                        }
                                                        const valid = EMAIL_REGEX.test(email);
                                                        let message;
                                                        if (!valid) {
                                                            message = t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.FORM.EMAIL.VALIDATION_MESSAGE_2).toString();
                                                        }
                                                        return {valid, message};
                                                    }}/>
                                            </div>

                                            <div className="mb-5">
                                                <WiwaFormInput
                                                    type="password"
                                                    name="password"
                                                    label={t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.FORM.PASSWORD.LABEL)}
                                                    placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.FORM.PASSWORD.PLACEHOLDER).toString()}
                                                    required={true}
                                                    value={password}
                                                    setValue={setPassword}
                                                    valid={passwordValid}
                                                    setValid={setPasswordValid}
                                                    validate={() => {
                                                        if (password.trim().length === 0) {
                                                            return {
                                                                valid: false,
                                                                message: t(RESOURCE.COMPONENT.PAGE.AUTH.DIALOG.CHANGE_EMAIL.FORM.PASSWORD.VALIDATION_MESSAGE).toString()
                                                            };
                                                        }
                                                        return {valid: true};
                                                    }}
                                                />
                                            </div>

                                            <div className="mb-5">
                                                <WiwaCaptcha
                                                    name="captcha"
                                                    required={true}
                                                    captchaText={captchaText}
                                                    setCaptchaText={setCaptchaText}
                                                    captchaToken={captchaToken}
                                                    setCaptchaToken={setCaptchaToken}
                                                    valid={captchaValid}
                                                    setValid={setCaptchaValid}
                                                />
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
                                                    {t(RESOURCE.ACTION.SAVE)}
                                                </WiwaButton>
                                            }
                                        </form>
                                        {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                                    </>
                                }
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ChangeEmailDialog;
