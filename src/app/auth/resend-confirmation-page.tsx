import { useState } from 'react';

import { WiwaErrorCode } from '../../api/model';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const ResendConfirmationPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [formError, setFormError] = useState<string>();
    const [message, setMessage] = useState<string>();

    const isFormValid = (): boolean => {
        return captchaValid;
    }

    const handleSubmit = async () => {
        setMessage(undefined);
        setFormError(undefined);
        if (isFormValid()) {
            const response = await authState?.resendConfirmation({
                captchaText,
                captchaToken
            });
            if (response?.error) {
                switch (response?.error.code) {
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
                        setFormError(resourceState?.auth?.resendConfirmation.error);
                        break;
                }
            } else {
                setMessage(resourceState?.auth?.resendConfirmation.message);
            }
        }
    }

    return (
        <div className="container p-5 mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg md:text-xl font-bold text-center">
                    {resourceState?.auth?.resendConfirmation.title}
                </div>
                {message ?
                    <div className="max-w-sm text-sm md:text-base pt-5">{message}</div>
                    :
                    <form className="max-w-sm" onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit().then();
                    }}>
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
                }
            </div>
        </div>
    )
}

export default ResendConfirmationPage;
