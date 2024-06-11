import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import { EMAIL_REGEX } from '../../const';
import AccessDefender from '../../component/layout/access-defender';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const ChangeEmailPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const resourceState = useResourceState();

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return emailValid && passwordValid && captchaValid;
    }

    const handleSubmit = async () => {
        setFormError(undefined);
        if (isFormValid()) {
            const response = await authState?.changeEmail({
                email,
                password,
                captchaText,
                captchaToken
            });
            if (response?.error) {
                switch (response?.error.code) {
                    case WiwaErrorCode.USER_IS_DISABLED:
                        setFormError(resourceState?.common?.error.userIsDisabled);
                        break;
                    case WiwaErrorCode.INVALID_CREDENTIALS:
                        setFormError(resourceState?.common?.error.invalidCredentials);
                        break;
                    case WiwaErrorCode.INVALID_CAPTCHA:
                        setFormError(resourceState?.common?.error.invalidCaptcha);
                        break;
                    case WiwaErrorCode.USER_EMAIL_IS_USED:
                        setFormError(resourceState?.common?.error.userEmailIsUsed);
                        break;
                    default:
                        setFormError(resourceState?.auth?.changeEmail.error);
                        break;
                }
            } else {
                navigate('/');
            }
        }
    }

    useEffect(() => {
        const user = authState?.authUser?.user;
        if (user) {
            setEmail(user.email);
        }
    }, [authState?.authUser]);

    return (
        <AccessDefender>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.auth?.changeEmail.title}
                    </div>
                    <form className="max-w-sm" onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit().then();
                    }}>
                        <WiwaFormInput
                            label={resourceState?.auth?.changeEmail.emailLabel}
                            required={true}
                            type="email"
                            placeholder={resourceState?.auth?.changeEmail.emailPlaceholder}
                            value={email}
                            setValue={setEmail}
                            setValid={setEmailValid}
                            validate={() => {
                                if (email.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changeEmail.emailRequired
                                    };
                                }
                                if (!EMAIL_REGEX.test(email)) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changeEmail.emailFormat
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInput
                            label={resourceState?.auth?.changeEmail.passwordLabel}
                            required={true}
                            type="password"
                            placeholder={resourceState?.auth?.changeEmail.passwordPlaceholder}
                            value={password}
                            setValue={setPassword}
                            setValid={setPasswordValid}
                            validate={() => {
                                if (password.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changeEmail.passwordRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

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
                        >{resourceState?.common?.action.submit}</WiwaButton>
                        {formError &&
                            <label className="label">
                                <span className="label-text-alt text-error">{formError}</span>
                            </label>
                        }
                    </form>
                </div>
            </div>
        </AccessDefender>
    )
}

export default ChangeEmailPage;
