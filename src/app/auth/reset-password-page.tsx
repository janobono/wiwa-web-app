import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import { EMAIL_REGEX } from '../../component/ui';
import WiwaFormInputEmail from '../../component/ui/wiwa-form-input-email';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { AuthContext, AuthResourceContext, CommonResourceContext, ErrorContext } from '../../context';

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const authResourceState = useContext(AuthResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [formError, setFormError] = useState<string>();
    const [message, setMessage] = useState<string>();

    const isFormValid = (): boolean => {
        return emailValid && captchaValid;
    }

    const handleSubmit = async () => {
        setMessage(undefined);
        setFormError(undefined);
        if (isFormValid()) {
            const response = await authState?.resetPassword({
                email,
                captchaText,
                captchaToken
            });
            if (response?.error) {
                switch (response?.error.code) {
                    case WiwaErrorCode.USER_NOT_FOUND:
                        setFormError(commonResourceState?.resource?.error.userNotFound);
                        break;
                    case WiwaErrorCode.USER_IS_DISABLED:
                        setFormError(commonResourceState?.resource?.error.userIsDisabled);
                        break;
                    case WiwaErrorCode.INVALID_CAPTCHA:
                        setFormError(commonResourceState?.resource?.error.invalidCaptcha);
                        break;
                    default:
                        errorState?.addError(response?.error);
                        break;
                }
            } else {
                setMessage(authResourceState?.resource?.resetPassword.message);
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
                        {authResourceState?.resource?.resetPassword.title}
                    </div>
                    {message ?
                        <div className="max-w-sm text-sm md:text-base pt-5">{message}</div>
                        :
                        <form className="max-w-sm" onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit().then();
                        }}>
                            <WiwaFormInputEmail
                                label={authResourceState?.resource?.resetPassword.emailLabel}
                                required={true}
                                placeholder={authResourceState?.resource?.resetPassword.emailPlaceholder}
                                value={email}
                                setValue={setEmail}
                                setValid={setEmailValid}
                                validate={() => {
                                    if (email.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.resetPassword.emailRequired
                                        };
                                    }
                                    if (!EMAIL_REGEX.test(email)) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.resetPassword.emailFormat
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
                    }
                </div>
            </div>
        </MaintenanceDefender>
    )
}

export default ResetPasswordPage;
