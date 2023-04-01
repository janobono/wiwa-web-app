import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { WiwaErrorCode } from '../../client';
import { RESOURCE } from '../../locale';
import { useAuthState } from '../../state';

import { WiwaButton, WiwaFormInput, WiwaNavLink } from '../../component/ui';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const authState = useAuthState();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const isFormValid = (): boolean => {
        return usernameValid && passwordValid;
    };

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (authState?.user) {
            navigate('/');
        }
    }, [authState?.user, navigate]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid()) {
                const wiwaError = await authState?.signIn({username, password});
                if (wiwaError) {
                    switch (wiwaError.code) {
                        case WiwaErrorCode.USER_NOT_FOUND:
                            setError(t(RESOURCE.ERROR.USER_NOT_FOUND).toString());
                            break;
                        case WiwaErrorCode.USER_IS_DISABLED:
                            setError(t(RESOURCE.ERROR.USER_IS_DISABLED).toString());
                            break;
                        case WiwaErrorCode.INVALID_CREDENTIALS:
                            setError(t(RESOURCE.ERROR.INVALID_CREDENTIALS).toString());
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
                        {t(RESOURCE.PAGE.AUTH.SIGN_IN.TITLE)}
                    </div>
                    <div className="text-xs md:text-base font-normal text-center mb-5">
                        <span>{t(RESOURCE.PAGE.AUTH.SIGN_IN.SUBTITLE)} </span>
                        <WiwaNavLink
                            to="/auth/sign-up">{t(RESOURCE.PAGE.AUTH.SIGN_IN.SUBTITLE_LINK)}
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
                                label={t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.USERNAME.LABEL)}
                                placeholder={t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.USERNAME.PLACEHOLDER).toString()}
                                required={true}
                                value={username}
                                setValue={setUsername}
                                valid={usernameValid}
                                setValid={setUsernameValid}
                                validate={() => {
                                    if (username.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.USERNAME.VALIDATION_MESSAGE).toString()
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />
                        </div>
                        <div className="mb-2">
                            <WiwaFormInput
                                type="password"
                                name="password"
                                label={t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.PASSWORD.LABEL)}
                                placeholder={t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.PASSWORD.PLACEHOLDER).toString()}
                                required={true}
                                value={password}
                                setValue={setPassword}
                                valid={passwordValid}
                                setValid={setPasswordValid}
                                validate={() => {
                                    if (password.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.PASSWORD.VALIDATION_MESSAGE).toString()
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />
                        </div>
                        <div className="flex justify-end mb-1">
                            <WiwaNavLink
                                className="text-xs md:text-base"
                                to="/auth/reset-password"
                            >{t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.LINK)}</WiwaNavLink>
                        </div>
                        <WiwaButton
                            type="submit"
                            className="w-full"
                            disabled={!isFormValid() || isSubmitting}
                        >{t(RESOURCE.PAGE.AUTH.SIGN_IN.FORM.SUBMIT)}
                        </WiwaButton>
                    </form>
                    {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                </div>
            </div>
        </section>
    );
};

export default SignInPage;
