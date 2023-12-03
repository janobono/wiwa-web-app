import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from '../../component/state/auth-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { WiwaErrorCode } from '../../model/service';
import { EMAIL_REGEX } from '../../const';

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const resourceState = useResourceState();

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [formSubmit, setFormSubmit] = useState(false);
    const [formError, setFormError] = useState<string>();
    const [message, setMessage] = useState<string>();

    const isFormValid = (): boolean => {
        return emailValid && captchaValid;
    }

    const handleSubmit = async () => {
        setMessage(undefined);
        setFormSubmit(true);
        setFormError(undefined);
        try {
            if (isFormValid()) {
                const errorCode = await authState?.resetPassword({
                    email,
                    captchaText,
                    captchaToken
                });
                if (errorCode) {
                    switch (errorCode) {
                        case WiwaErrorCode.USER_NOT_FOUND:
                            setFormError(resourceState?.common?.error.userNotFound);
                            break;
                        case WiwaErrorCode.USER_IS_DISABLED:
                            setFormError(resourceState?.common?.error.userIsDisabled);
                            break;
                        case WiwaErrorCode.INVALID_CAPTCHA:
                            setFormError(resourceState?.common?.error.invalidCaptcha);
                            break;
                        default:
                            setFormError(resourceState?.auth?.resetPassword.error);
                            break;
                    }
                } else {
                    setMessage(resourceState?.auth?.resetPassword.message);
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
                    {resourceState?.auth?.resetPassword.title}
                </div>
                {message ?
                    <div className="max-w-sm text-sm md:text-base pt-5">{message}</div>
                    :
                    <form className="max-w-sm" onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit().then();
                    }}>
                        <WiwaFormInput
                            label={resourceState?.auth?.resetPassword.emailLabel}
                            required={true}
                            type="email"
                            placeholder={resourceState?.auth?.resetPassword.emailPlaceholder}
                            value={email}
                            setValue={setEmail}
                            setValid={setEmailValid}
                            validate={() => {
                                if (email.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.resetPassword.emailRequired
                                    };
                                }
                                if (!EMAIL_REGEX.test(email)) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.resetPassword.emailFormat
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
                            disabled={!isFormValid() || formSubmit}
                        >{resourceState?.auth?.resetPassword.submit}</WiwaButton>
                        {formError &&
                            <label className="label">
                                <span className="label-text-alt text-error">{formError}</span>
                            </label>
                        }
                    </form>
                }
            </div>
        </div>
    )
}

export default ResetPasswordPage;
