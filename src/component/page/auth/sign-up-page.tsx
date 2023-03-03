import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthState } from '../../../state';
import {
    EMAIL_REGEX,
    WiwaButton,
    WiwaCaptcha,
    WiwaCheckBox,
    WiwaFormInput,
    WiwaNavLink,
    WiwaNewPassword
} from '../../ui';
import { RESOURCE } from '../../../locale';
import { WiwaErrorCode } from '../../../client';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const authState = useAuthState();

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

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const isFormValid = (): boolean => {
        return usernameValid
            && passwordValid
            && firstNameValid
            && lastNameValid
            && emailValid
            && gdpr
            && captchaValid;
    }

    useEffect(() => {
        if (authState?.user) {
            navigate('/');
        }
    }, [authState?.user, navigate]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid() && captchaToken) {
                const wiwaError = await authState?.signUp({
                    username,
                    password,
                    titleBefore,
                    firstName,
                    midName,
                    lastName,
                    titleAfter,
                    email,
                    gdpr,
                    captchaText,
                    captchaToken
                });
                if (wiwaError) {
                    switch (wiwaError.code) {
                        case WiwaErrorCode.USER_USERNAME_IS_USED:
                            setError(t(RESOURCE.ERROR.USER_USERNAME_IS_USED).toString());
                            break;
                        case WiwaErrorCode.USER_EMAIL_IS_USED:
                            setError(t(RESOURCE.ERROR.USER_EMAIL_IS_USED).toString());
                            break;
                        case WiwaErrorCode.GDPR:
                            setError(t(RESOURCE.ERROR.GDPR).toString());
                            break;
                        default:
                            setError(wiwaError.message);
                            break;
                    }
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="w-full">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.TITLE)}
                    </div>
                    <div className="text-xs md:text-base font-normal text-center mb-5">
                        <span>{t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.SUBTITLE)} </span>
                        <WiwaNavLink
                            to="/auth/sign-in">{t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.SUBTITLE_LINK)}
                        </WiwaNavLink>
                    </div>
                    <form className="max-w-sm" onSubmit={(event => {
                        event.preventDefault();
                        handleSubmit();
                    })}>
                        <div className="mb-2">
                            <WiwaFormInput
                                type="text"
                                name="username"
                                label={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.USERNAME.LABEL)}
                                placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.USERNAME.PLACEHOLDER).toString()}
                                required={true}
                                value={username}
                                setValue={setUsername}
                                valid={usernameValid}
                                setValid={setUsernameValid}
                                validate={() => {
                                    if (username.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.USERNAME.VALIDATION_MESSAGE).toString()
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />
                        </div>
                        <div className="mb-2">
                            <WiwaNewPassword
                                name="password"
                                value={password}
                                setValue={setPassword}
                                valid={passwordValid}
                                setValid={setPasswordValid}
                            />
                        </div>
                        <div className="mb-2">
                            <WiwaFormInput
                                type="email"
                                name="email"
                                label={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.EMAIL.LABEL)}
                                placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.EMAIL.PLACEHOLDER).toString()}
                                required={true}
                                value={email}
                                setValue={setEmail}
                                valid={emailValid}
                                setValid={setEmailValid}
                                validate={() => {
                                    if (email.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.EMAIL.VALIDATION_MESSAGE1).toString()
                                        };
                                    }
                                    const valid = EMAIL_REGEX.test(email);
                                    let message;
                                    if (!valid) {
                                        message = t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.EMAIL.VALIDATION_MESSAGE2).toString();
                                    }
                                    return {valid, message};
                                }}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                            <div>
                                <WiwaFormInput
                                    type="text"
                                    name="titleBefore"
                                    label={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.TITLE_BEFORE.LABEL)}
                                    placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.TITLE_BEFORE.PLACEHOLDER).toString()}
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
                                    label={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.TITLE_AFTER.LABEL)}
                                    placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.TITLE_AFTER.PLACEHOLDER).toString()}
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
                                label={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.FIRST_NAME.LABEL)}
                                placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.FIRST_NAME.PLACEHOLDER).toString()}
                                required={true}
                                value={firstName}
                                setValue={setFirstName}
                                valid={firstNameValid}
                                setValid={setFirstNameValid}
                                validate={() => {
                                    if (firstName.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.FIRST_NAME.VALIDATION_MESSAGE).toString()
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
                                label={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.MID_NAME.LABEL)}
                                placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.MID_NAME.PLACEHOLDER).toString()}
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
                                label={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.LAST_NAME.LABEL)}
                                placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.LAST_NAME.PLACEHOLDER).toString()}
                                required={true}
                                value={lastName}
                                setValue={setLastName}
                                valid={lastNameValid}
                                setValid={setLastNameValid}
                                validate={() => {
                                    if (lastName.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.LAST_NAME.VALIDATION_MESSAGE).toString()
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
                                message={t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.GDPR.VALIDATION_MESSAGE).toString()}
                                disabled={false}
                                required={true}
                            ><span>{t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.GDPR.LABEL)} <WiwaNavLink
                                to="/gdpr-info">{t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.GDPR.LINK)}</WiwaNavLink>
                            </span></WiwaCheckBox>
                        </div>
                        <div className="mb-2">
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
                        <WiwaButton
                            type="submit"
                            className="w-full"
                            disabled={!isFormValid() || isSubmitting}
                        >{t(RESOURCE.COMPONENT.PAGE.AUTH.SIGN_UP.FORM.SUBMIT)}
                        </WiwaButton>
                    </form>
                    {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                </div>
            </div>
        </section>
    );
}

export default SignUpPage;
