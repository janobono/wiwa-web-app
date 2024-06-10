import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import AccessDefender from '../../component/layout/access-defender';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const ChangePasswordPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const resourceState = useResourceState();

    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordValid, setOldPasswordValid] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordValid, setNewPasswordValid] = useState(false);

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordConfirmationValid, setPasswordConfirmationValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return oldPasswordValid && newPasswordValid && passwordConfirmationValid && captchaValid;
    }

    const handleSubmit = async () => {
        setFormError(undefined);
        if (isFormValid()) {
            const response = await authState?.changePassword({
                oldPassword,
                newPassword,
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
                    default:
                        setFormError(resourceState?.auth?.changePassword.error);
                        break;
                }
            } else {
                navigate('/');
            }
        }
    }

    return (
        <AccessDefender>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.auth?.changePassword.title}
                    </div>
                    <form className="max-w-sm" onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit().then();
                    }}>
                        <WiwaFormInput
                            label={resourceState?.auth?.changePassword.oldPasswordLabel}
                            required={true}
                            type="password"
                            placeholder={resourceState?.auth?.changePassword.oldPasswordPlaceholder}
                            value={oldPassword}
                            setValue={setOldPassword}
                            setValid={setOldPasswordValid}
                            validate={() => {
                                if (oldPassword.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changePassword.oldPasswordRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInput
                            label={resourceState?.auth?.changePassword.passwordLabel}
                            required={true}
                            type="password"
                            placeholder={resourceState?.auth?.changePassword.passwordPlaceholder}
                            value={newPassword}
                            setValue={setNewPassword}
                            setValid={setNewPasswordValid}
                            validate={() => {
                                if (newPassword.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changePassword.passwordRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInput
                            label={resourceState?.auth?.changePassword.passwordConfirmationLabel}
                            required={true}
                            type="password"
                            placeholder={resourceState?.auth?.changePassword.passwordConfirmationPlaceholder}
                            value={passwordConfirmation}
                            setValue={setPasswordConfirmation}
                            setValid={setPasswordConfirmationValid}
                            validate={() => {
                                if (passwordConfirmation.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changePassword.passwordConfirmationRequired
                                    };
                                }
                                if (passwordConfirmation !== newPassword) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changePassword.passwordConfirmationNotEquals
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
                        >{resourceState?.auth?.changePassword.submit}</WiwaButton>
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

export default ChangePasswordPage;
