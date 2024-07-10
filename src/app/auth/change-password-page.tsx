import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import AuthDefender from '../../component/layout/auth-defender';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaFormInputPassword from '../../component/ui/wiwa-form-input-password';
import { AuthContext, AuthResourceContext, CommonResourceContext, ErrorContext } from '../../context';

const ChangePasswordPage = () => {
    const navigate = useNavigate();

    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const authResourceState = useContext(AuthResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

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
                        setFormError(commonResourceState?.resource?.error.userIsDisabled);
                        break;
                    case WiwaErrorCode.INVALID_CREDENTIALS:
                        setFormError(commonResourceState?.resource?.error.invalidCredentials);
                        break;
                    case WiwaErrorCode.INVALID_CAPTCHA:
                        setFormError(commonResourceState?.resource?.error.invalidCaptcha);
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

    return (
        <MaintenanceDefender>
            <AuthDefender>
                <WiwaBreadcrumb breadcrumbs={[
                    {key: 0, label: commonResourceState?.resource?.navigation.authNav.title || ''},
                    {
                        key: 1,
                        label: authResourceState?.resource?.changePassword.title || '',
                        to: '/auth/change-password'
                    }
                ]}/>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <form className="max-w-sm" onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit().then();
                        }}>
                            <WiwaFormInputPassword
                                label={authResourceState?.resource?.changePassword.oldPasswordLabel}
                                required={true}
                                placeholder={authResourceState?.resource?.changePassword.oldPasswordPlaceholder}
                                value={oldPassword}
                                setValue={setOldPassword}
                                setValid={setOldPasswordValid}
                                validate={() => {
                                    if (oldPassword.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changePassword.oldPasswordRequired
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />

                            <WiwaFormInputPassword
                                label={authResourceState?.resource?.changePassword.passwordLabel}
                                required={true}
                                placeholder={authResourceState?.resource?.changePassword.passwordPlaceholder}
                                value={newPassword}
                                setValue={setNewPassword}
                                setValid={setNewPasswordValid}
                                validate={() => {
                                    if (newPassword.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changePassword.passwordRequired
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />

                            <WiwaFormInputPassword
                                label={authResourceState?.resource?.changePassword.passwordConfirmationLabel}
                                required={true}
                                placeholder={authResourceState?.resource?.changePassword.passwordConfirmationPlaceholder}
                                value={passwordConfirmation}
                                setValue={setPasswordConfirmation}
                                setValid={setPasswordConfirmationValid}
                                validate={() => {
                                    if (passwordConfirmation.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changePassword.passwordConfirmationRequired
                                        };
                                    }
                                    if (passwordConfirmation !== newPassword) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changePassword.passwordConfirmationNotEquals
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

export default ChangePasswordPage;
