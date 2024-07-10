import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import { EMAIL_REGEX } from '../../component/ui';
import WiwaFormInputEmail from '../../component/ui/wiwa-form-input-email';
import WiwaFormInputPassword from '../../component/ui/wiwa-form-input-password';
import WiwaFormInputString from '../../component/ui/wiwa-form-input-string';
import WiwaFormCheckBox from '../../component/ui/wiwa-form-check-box';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { AuthContext, AuthResourceContext, CommonResourceContext, ErrorContext } from '../../context';


const SignUpPage = () => {
    const navigate = useNavigate();

    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const authResourceState = useContext(AuthResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

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

    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return usernameValid && passwordValid && passwordConfirmationValid && emailValid && firstNameValid && lastNameValid && gdpr && captchaValid;
    }

    const handleSubmit = async () => {
        setFormError(undefined);
        if (isFormValid()) {
            const response = await authState?.signUp({
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
            if (response?.error) {
                switch (response?.error.code) {
                    case WiwaErrorCode.USER_USERNAME_IS_USED:
                        setFormError(commonResourceState?.resource?.error.userUsernameIsUsed);
                        break;
                    case WiwaErrorCode.USER_EMAIL_IS_USED:
                        setFormError(commonResourceState?.resource?.error.userEmailIsUsed);
                        break;
                    case WiwaErrorCode.GDPR:
                        setFormError(commonResourceState?.resource?.error.gdpr);
                        break;
                    case WiwaErrorCode.INVALID_CAPTCHA:
                        setFormError(commonResourceState?.resource?.error.invalidCaptcha);
                        break;
                    default:
                        errorState?.addError(response?.error);
                        break;
                }
            }
        }
    }

    useEffect(() => {
        const user = authState?.authUser?.user;
        if (user) {
            navigate('/');
        }
    }, [authState?.authUser, navigate]);

    return (
        <MaintenanceDefender>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {authResourceState?.resource?.signUp.title}
                    </div>
                    <div className="text-sm md:text-base font-normal text-center pb-5">
                        <span>{authResourceState?.resource?.signUp.subtitle} </span>
                        <NavLink
                            className="link"
                            to="/auth/sign-in"
                        >{authResourceState?.resource?.signUp.subtitleLink}
                        </NavLink>
                    </div>
                    <form className="max-w-sm" onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit().then();
                    }}>
                        <WiwaFormInputString
                            label={authResourceState?.resource?.signUp.usernameLabel}
                            required={true}
                            placeholder={authResourceState?.resource?.signUp.usernamePlaceholder}
                            value={username}
                            setValue={setUsername}
                            setValid={setUsernameValid}
                            validate={() => {
                                if (username.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.usernameRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInputPassword
                            label={authResourceState?.resource?.signUp.passwordLabel}
                            required={true}
                            placeholder={authResourceState?.resource?.signUp.passwordPlaceholder}
                            value={password}
                            setValue={setPassword}
                            setValid={setPasswordValid}
                            validate={() => {
                                if (password.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.passwordRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInputPassword
                            label={authResourceState?.resource?.signUp.passwordConfirmationLabel}
                            required={true}
                            placeholder={authResourceState?.resource?.signUp.passwordConfirmationPlaceholder}
                            value={passwordConfirmation}
                            setValue={setPasswordConfirmation}
                            setValid={setPasswordConfirmationValid}
                            validate={() => {
                                if (passwordConfirmation.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.passwordConfirmationRequired
                                    };
                                }
                                if (passwordConfirmation !== password) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.passwordConfirmationNotEquals
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInputEmail
                            label={authResourceState?.resource?.signUp.emailLabel}
                            required={true}
                            placeholder={authResourceState?.resource?.signUp.emailPlaceholder}
                            value={email}
                            setValue={setEmail}
                            setValid={setEmailValid}
                            validate={() => {
                                if (email.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.emailRequired
                                    };
                                }
                                if (!EMAIL_REGEX.test(email)) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.emailFormat
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInputString
                            label={authResourceState?.resource?.signUp.titleBeforeLabel}
                            placeholder={authResourceState?.resource?.signUp.titleBeforePlaceholder}
                            value={titleBefore}
                            setValue={setTitleBefore}
                        />

                        <WiwaFormInputString
                            label={authResourceState?.resource?.signUp.firstNameLabel}
                            required={true}
                            placeholder={authResourceState?.resource?.signUp.firstNamePlaceholder}
                            value={firstName}
                            setValue={setFirstName}
                            setValid={setFirstNameValid}
                            validate={() => {
                                if (firstName.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.firstNameRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInputString
                            label={authResourceState?.resource?.signUp.midNameLabel}
                            placeholder={authResourceState?.resource?.signUp.midNamePlaceholder}
                            value={midName}
                            setValue={setMidName}
                        />

                        <WiwaFormInputString
                            label={authResourceState?.resource?.signUp.lastNameLabel}
                            required={true}
                            placeholder={authResourceState?.resource?.signUp.lastNamePlaceholder}
                            value={lastName}
                            setValue={setLastName}
                            setValid={setLastNameValid}
                            validate={() => {
                                if (lastName.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: authResourceState?.resource?.signUp.lastNameRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInputString
                            label={authResourceState?.resource?.signUp.titleAfterLabel}
                            placeholder={authResourceState?.resource?.signUp.titleAfterPlaceholder}
                            value={titleAfter}
                            setValue={setTitleAfter}
                        />

                        <WiwaFormCheckBox className="flex flex-row py-5" value={gdpr} setValue={setGdpr}>
                            <NavLink
                                className="link text-sm md:text:xs pl-2"
                                to="/ui/gdpr-info"
                            >{authResourceState?.resource?.signUp.gdprLabel}
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
                            disabled={authState?.busy || !isFormValid()}
                        >{commonResourceState?.resource?.action.submit}</WiwaButton>
                        {formError &&
                            <label className="label">
                                <span className="label-text-alt text-error">{formError}</span>
                            </label>
                        }
                    </form>
                </div>
            </div>
        </MaintenanceDefender>
    )
}

export default SignUpPage;
