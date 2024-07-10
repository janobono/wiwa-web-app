import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import AuthDefender from '../../component/layout/auth-defender';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import { EMAIL_REGEX } from '../../component/ui';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInputEmail from '../../component/ui/wiwa-form-input-email';
import WiwaFormInputPassword from '../../component/ui/wiwa-form-input-password';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import { AuthContext, AuthResourceContext, CommonResourceContext, ErrorContext } from '../../context';

const ChangeEmailPage = () => {
    const navigate = useNavigate();

    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const authResourceState = useContext(AuthResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

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
                        setFormError(commonResourceState?.resource?.error.userIsDisabled);
                        break;
                    case WiwaErrorCode.INVALID_CREDENTIALS:
                        setFormError(commonResourceState?.resource?.error.invalidCredentials);
                        break;
                    case WiwaErrorCode.INVALID_CAPTCHA:
                        setFormError(commonResourceState?.resource?.error.invalidCaptcha);
                        break;
                    case WiwaErrorCode.USER_EMAIL_IS_USED:
                        setFormError(commonResourceState?.resource?.error.userEmailIsUsed);
                        break;
                    default:
                        errorState?.addError(response?.error);
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
        <MaintenanceDefender>
            <AuthDefender>
                <WiwaBreadcrumb breadcrumbs={[
                    {key: 0, label: commonResourceState?.resource?.navigation.authNav.title || ''},
                    {
                        key: 1,
                        label: authResourceState?.resource?.changeEmail.title || '',
                        to: '/auth/change-email'
                    }
                ]}/>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <form className="max-w-sm" onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit().then();
                        }}>
                            <WiwaFormInputEmail
                                label={authResourceState?.resource?.changeEmail.emailLabel}
                                required={true}
                                placeholder={authResourceState?.resource?.changeEmail.emailPlaceholder}
                                value={email}
                                setValue={setEmail}
                                setValid={setEmailValid}
                                validate={() => {
                                    if (email.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changeEmail.emailRequired
                                        };
                                    }
                                    if (!EMAIL_REGEX.test(email)) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changeEmail.emailFormat
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />

                            <WiwaFormInputPassword
                                label={authResourceState?.resource?.changeEmail.passwordLabel}
                                required={true}
                                placeholder={authResourceState?.resource?.changeEmail.passwordPlaceholder}
                                value={password}
                                setValue={setPassword}
                                setValid={setPasswordValid}
                                validate={() => {
                                    if (password.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changeEmail.passwordRequired
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
                            >{commonResourceState?.resource?.action.submit}</WiwaButton>
                            {formError &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{formError}</span>
                                </label>
                            }
                        </form>
                    </div>
                </div>
            </AuthDefender>
        </MaintenanceDefender>
    )
}

export default ChangeEmailPage;
