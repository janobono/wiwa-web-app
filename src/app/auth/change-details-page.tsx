import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import AuthDefender from '../../component/layout/auth-defender';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaFormInputString from '../../component/ui/wiwa-form-input-string';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { AuthContext, AuthResourceContext, CommonResourceContext, ErrorContext } from '../../context';

const ChangeDetailsPage = () => {
    const navigate = useNavigate();

    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const authResourceState = useContext(AuthResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [titleBefore, setTitleBefore] = useState('');

    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(false);

    const [midName, setMidName] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameValid, setLastNameValid] = useState(false);

    const [titleAfter, setTitleAfter] = useState('');

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return firstNameValid && lastNameValid && captchaValid;
    }

    const handleSubmit = async () => {
        setFormError(undefined);
        if (isFormValid()) {
            const response = await authState?.changeUserDetails({
                titleBefore: titleBefore.length === 0 ? undefined : titleBefore,
                firstName,
                midName: midName.length === 0 ? undefined : midName,
                lastName,
                titleAfter: titleAfter.length === 0 ? undefined : titleAfter,
                gdpr: true,
                captchaText,
                captchaToken
            });
            if (response?.error) {
                switch (response?.error.code) {
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
                navigate('/');
            }
        }
    }

    useEffect(() => {
        const user = authState?.authUser?.user;
        if (user) {
            setTitleBefore(user.titleBefore || '');
            setFirstName(user.firstName);
            setMidName(user.midName || '');
            setLastName(user.lastName);
            setTitleAfter(user.titleAfter || '');
        }
    }, [authState?.authUser]);

    return (
        <MaintenanceDefender>
            <AuthDefender>
                <WiwaBreadcrumb breadcrumbs={[
                    {key: 0, label: commonResourceState?.resource?.navigation.authNav.title || ''},
                    {
                        key: 1,
                        label: authResourceState?.resource?.changeDetails.title || '',
                        to: '/auth/change-details'
                    }
                ]}/>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <form className="max-w-sm" onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit().then();
                        }}>
                            <WiwaFormInputString
                                label={authResourceState?.resource?.changeDetails.titleBeforeLabel}
                                placeholder={authResourceState?.resource?.changeDetails.titleBeforePlaceholder}
                                value={titleBefore}
                                setValue={setTitleBefore}
                            />

                            <WiwaFormInputString
                                label={authResourceState?.resource?.changeDetails.firstNameLabel}
                                required={true}
                                placeholder={authResourceState?.resource?.changeDetails.firstNamePlaceholder}
                                value={firstName}
                                setValue={setFirstName}
                                setValid={setFirstNameValid}
                                validate={() => {
                                    if (firstName.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changeDetails.firstNameRequired
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />

                            <WiwaFormInputString
                                label={authResourceState?.resource?.changeDetails.midNameLabel}
                                placeholder={authResourceState?.resource?.changeDetails.midNamePlaceholder}
                                value={midName}
                                setValue={setMidName}
                            />

                            <WiwaFormInputString
                                label={authResourceState?.resource?.changeDetails.lastNameLabel}
                                placeholder={authResourceState?.resource?.changeDetails.lastNamePlaceholder}
                                value={lastName}
                                setValue={setLastName}
                                setValid={setLastNameValid}
                                validate={() => {
                                    if (lastName.trim().length === 0) {
                                        return {
                                            valid: false,
                                            message: authResourceState?.resource?.changeDetails.lastNameRequired
                                        };
                                    }
                                    return {valid: true};
                                }}
                            />

                            <WiwaFormInputString
                                label={authResourceState?.resource?.changeDetails.titleAfterLabel}
                                placeholder={authResourceState?.resource?.changeDetails.titleAfterPlaceholder}
                                value={titleAfter}
                                setValue={setTitleAfter}
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

export default ChangeDetailsPage;
