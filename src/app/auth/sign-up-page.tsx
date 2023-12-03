import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuthState } from '../../component/state/auth-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaFormCheckBox from '../../component/ui/wiwa-form-check-box';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { WiwaErrorCode } from '../../model/service';
import { EMAIL_REGEX } from '../../const';

const SignUpPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const resourceState = useResourceState();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordConfirmationValid, setPasswordConfirmationValid] = useState(false);

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [titleBefore, setTitleBefore] = useState('');

    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(false);

    const [midName, setMidName] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameValid, setLastNameValid] = useState(false);

    const [titleAfter, setTitleAfter] = useState('');

    const [gdpr, setGdpr] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [formSubmit, setFormSubmit] = useState(false);
    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return usernameValid && passwordValid && passwordConfirmationValid && emailValid && firstNameValid && lastNameValid && gdpr && captchaValid;
    }

    const handleSubmit = async () => {
        setFormSubmit(true);
        setFormError(undefined);
        try {
            if (isFormValid()) {
                const errorCode = await authState?.signUp({
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
                if (errorCode) {
                    switch (errorCode) {
                        case WiwaErrorCode.USER_USERNAME_IS_USED:
                            setFormError(resourceState?.common?.error.userUsernameIsUsed);
                            break;
                        case WiwaErrorCode.USER_EMAIL_IS_USED:
                            setFormError(resourceState?.common?.error.userEmailIsUsed);
                            break;
                        case WiwaErrorCode.GDPR:
                            setFormError(resourceState?.common?.error.gdpr);
                            break;
                        case WiwaErrorCode.INVALID_CAPTCHA:
                            setFormError(resourceState?.common?.error.invalidCaptcha);
                            break;
                        default:
                            setFormError(resourceState?.auth?.signUp.error);
                            break;
                    }
                }
            }
        } finally {
            setFormSubmit(false);
        }
    }

    useEffect(() => {
        if (authState?.user) {
            navigate('/');
        }
    }, [authState?.user, navigate]);

    return (
        <div className="container p-5 mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg md:text-xl font-bold text-center">
                    {resourceState?.auth?.signUp.title}
                </div>
                <div className="text-sm md:text-base font-normal text-center pb-5">
                    <span>{resourceState?.auth?.signUp.subtitle} </span>
                    <NavLink
                        className="link"
                        to="/auth/sign-in"
                    >{resourceState?.auth?.signUp.subtitleLink}
                    </NavLink>
                </div>
                <form className="max-w-sm" onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit().then();
                }}>
                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.usernameLabel}
                        required={true}
                        placeholder={resourceState?.auth?.signUp.usernamePlaceholder}
                        value={username}
                        setValue={setUsername}
                        setValid={setUsernameValid}
                        validate={() => {
                            if (username.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.usernameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.passwordLabel}
                        required={true}
                        type="password"
                        placeholder={resourceState?.auth?.signUp.passwordPlaceholder}
                        value={password}
                        setValue={setPassword}
                        setValid={setPasswordValid}
                        validate={() => {
                            if (password.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.passwordRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.passwordConfirmationLabel}
                        required={true}
                        type="password"
                        placeholder={resourceState?.auth?.signUp.passwordConfirmationPlaceholder}
                        value={passwordConfirmation}
                        setValue={setPasswordConfirmation}
                        setValid={setPasswordConfirmationValid}
                        validate={() => {
                            if (passwordConfirmation.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.passwordConfirmationRequired
                                };
                            }
                            if (passwordConfirmation !== password) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.passwordConfirmationNotEquals
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.emailLabel}
                        required={true}
                        type="email"
                        placeholder={resourceState?.auth?.signUp.emailPlaceholder}
                        value={email}
                        setValue={setEmail}
                        setValid={setEmailValid}
                        validate={() => {
                            if (email.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.emailRequired
                                };
                            }
                            if (!EMAIL_REGEX.test(email)) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.emailFormat
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.titleBeforeLabel}
                        placeholder={resourceState?.auth?.signUp.titleBeforePlaceholder}
                        value={titleBefore}
                        setValue={setTitleBefore}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.firstNameLabel}
                        required={true}
                        placeholder={resourceState?.auth?.signUp.firstNamePlaceholder}
                        value={firstName}
                        setValue={setFirstName}
                        setValid={setFirstNameValid}
                        validate={() => {
                            if (firstName.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.firstNameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.midNameLabel}
                        placeholder={resourceState?.auth?.signUp.midNamePlaceholder}
                        value={midName}
                        setValue={setMidName}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.lastNameLabel}
                        placeholder={resourceState?.auth?.signUp.lastNamePlaceholder}
                        value={lastName}
                        setValue={setLastName}
                        setValid={setLastNameValid}
                        validate={() => {
                            if (lastName.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signUp.lastNameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.auth?.signUp.titleAfterLabel}
                        placeholder={resourceState?.auth?.signUp.titleAfterPlaceholder}
                        value={titleAfter}
                        setValue={setTitleAfter}
                    />

                    <WiwaFormCheckBox className="py-5" value={gdpr} setValue={setGdpr}>
                        <NavLink
                            className="link text-sm md:text:xs pl-2"
                            to="/ui/gdpr-info"
                        >{resourceState?.auth?.signUp.gdprLabel}
                        </NavLink>
                    </WiwaFormCheckBox>

                    <WiwaFormCaptcha
                        value={captchaText}
                        setValue={setCaptchaText}
                        token={captchaToken}
                        setToken={setCaptchaToken}
                        setValid={setCaptchaValid}
                    />

                    <WiwaButton
                        type="submit"
                        className="btn-primary w-full"
                        disabled={!isFormValid() || formSubmit}
                    >{resourceState?.auth?.signUp.submit}</WiwaButton>
                    {formError &&
                        <label className="label">
                            <span className="label-text-alt text-error">{formError}</span>
                        </label>
                    }
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;
