import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { WiwaErrorCode } from '../../client';
import { RESOURCE } from '../../locale';
import { useAuthState } from '../../state';

import { WiwaButton, WiwaCaptcha, WiwaNavLink, WiwaNewPassword } from '../../component/ui';
import { UserCardFields, UserEmailField, UsernameField } from '../../component/user';
import { AuthGdprCheckBox } from '../../component/auth';

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
                        {t(RESOURCE.PAGE.AUTH.SIGN_UP.TITLE)}
                    </div>
                    <div className="text-xs md:text-base font-normal text-center mb-5">
                        <span>{t(RESOURCE.PAGE.AUTH.SIGN_UP.SUBTITLE)} </span>
                        <WiwaNavLink
                            to="/auth/sign-in">{t(RESOURCE.PAGE.AUTH.SIGN_UP.SUBTITLE_LINK)}
                        </WiwaNavLink>
                    </div>
                    <form className="max-w-sm" onSubmit={(event => {
                        event.preventDefault();
                        handleSubmit();
                    })}>
                        <UsernameField
                            username={username}
                            setUsername={setUsername}
                            usernameValid={usernameValid}
                            setUsernameValid={setUsernameValid}
                        />
                        <div className="mb-2">
                            <WiwaNewPassword
                                name="password"
                                value={password}
                                setValue={setPassword}
                                valid={passwordValid}
                                setValid={setPasswordValid}
                            />
                        </div>

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

                        <AuthGdprCheckBox gdpr={gdpr} setGdpr={setGdpr}/>

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
                        >{t(RESOURCE.PAGE.AUTH.SIGN_UP.FORM.SUBMIT)}
                        </WiwaButton>
                    </form>
                    {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                </div>
            </div>
        </section>
    );
}

export default SignUpPage;
