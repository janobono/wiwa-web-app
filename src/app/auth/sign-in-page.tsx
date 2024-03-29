import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuthState } from '../../component/state/auth-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import { WiwaErrorCode } from '../../model/service';

const SignInPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const resourceState = useResourceState();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const [formSubmit, setFormSubmit] = useState(false);
    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return usernameValid && passwordValid;
    }

    const handleSubmit = async () => {
        setFormSubmit(true);
        setFormError(undefined);
        try {
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
                            setFormError(resourceState?.auth?.signIn.error);
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
                    <WiwaFormInput
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

                    <WiwaFormInput
                        label={resourceState?.auth?.signIn.passwordLabel}
                        required={true}
                        type="password"
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
                    </WiwaFormInput>

                    <WiwaButton
                        type="submit"
                        className="btn-primary w-full"
                        disabled={!isFormValid() || formSubmit}
                    >{resourceState?.auth?.signIn.submit}</WiwaButton>
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
