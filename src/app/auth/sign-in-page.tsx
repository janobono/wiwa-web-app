import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInputPassword from '../../component/ui/wiwa-form-input-password';
import WiwaFormInputString from '../../component/ui/wiwa-form-input-string';
import { useAuthState } from '../../state/auth';
import { useErrorState } from '../../state/error';
import { useResourceState } from '../../state/resource';

const SignInPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return usernameValid && passwordValid;
    }

    const handleSubmit = async () => {
        setFormError(undefined);
        if (isFormValid()) {
            const response = await authState?.signIn({username: username || '', password: password || ''});
            if (response?.error) {
                switch (response?.error.code) {
                    case WiwaErrorCode.USER_NOT_FOUND:
                        setFormError(resourceState?.common?.error.userNotFound);
                        break;
                    case WiwaErrorCode.USER_IS_DISABLED:
                        setFormError(resourceState?.common?.error.userIsDisabled);
                        break;
                    case WiwaErrorCode.INVALID_CREDENTIALS:
                        setFormError(resourceState?.common?.error.invalidCredentials);
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
        <div className="container p-5 mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg md:text-xl font-bold text-center">
                    {resourceState?.auth?.signIn.title}
                </div>
                <div className="text-sm md:text-base font-normal text-center pb-5">
                    <span>{resourceState?.auth?.signIn.subtitle} </span>
                    <NavLink
                        className="link"
                        to="/auth/sign-up"
                    >{resourceState?.auth?.signIn.subtitleLink}
                    </NavLink>
                </div>
                <form className="max-w-sm" onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit().then();
                }}>
                    <WiwaFormInputString
                        label={resourceState?.auth?.signIn.usernameLabel}
                        required={true}
                        placeholder={resourceState?.auth?.signIn.usernamePlaceholder}
                        value={username}
                        setValue={setUsername}
                        setValid={setUsernameValid}
                        validate={() => {
                            if (username.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signIn.usernameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputPassword
                        label={resourceState?.auth?.signIn.passwordLabel}
                        required={true}
                        placeholder={resourceState?.auth?.signIn.passwordPlaceholder}
                        value={password}
                        setValue={setPassword}
                        setValid={setPasswordValid}
                        validate={() => {
                            if (password.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.auth?.signIn.passwordRequired
                                };
                            }
                            return {valid: true};
                        }}
                    >
                        <div className="flex justify-end mb-1">
                            <NavLink
                                className="link text-sm md:text-base"
                                to="/auth/reset-password"
                            >{resourceState?.auth?.signIn.forgottenPasswordLink}</NavLink>
                        </div>
                    </WiwaFormInputPassword>

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
    )
}

export default SignInPage;
