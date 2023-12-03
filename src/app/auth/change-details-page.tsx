import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AccessDefender from '../../component/layout/access-defender';
import { useAuthState } from '../../component/state/auth-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaFormCaptcha from '../../component/ui/wiwa-form-captcha';
import WiwaButton from '../../component/ui/wiwa-button';
import { WiwaErrorCode } from '../../model/service';

const ChangeDetailsPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const resourceState = useResourceState();

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

    const [formSubmit, setFormSubmit] = useState(false);
    const [formError, setFormError] = useState<string>();

    const isFormValid = (): boolean => {
        return firstNameValid && lastNameValid && captchaValid;
    }

    const handleSubmit = async () => {
        setFormSubmit(true);
        setFormError(undefined);
        try {
            if (isFormValid()) {
                const errorCode = await authState?.changeUserDetails({
                    titleBefore,
                    firstName,
                    midName,
                    lastName,
                    titleAfter,
                    gdpr: true,
                    captchaText,
                    captchaToken
                });
                if (errorCode) {
                    switch (errorCode) {
                        case WiwaErrorCode.USER_IS_DISABLED:
                            setFormError(resourceState?.common?.error.userIsDisabled);
                            break;
                        case WiwaErrorCode.INVALID_CAPTCHA:
                            setFormError(resourceState?.common?.error.invalidCaptcha);
                            break;
                        default:
                            setFormError(resourceState?.auth?.changeDetails.error);
                            break;
                    }
                } else {
                    navigate('/');
                }
            }
        } finally {
            setFormSubmit(false);
        }
    }

    useEffect(() => {
        if (authState?.user) {
            setTitleBefore(authState.user.titleBefore);
            setFirstName(authState.user.firstName);
            setMidName(authState.user.midName);
            setLastName(authState.user.lastName);
            setTitleAfter(authState.user.titleAfter);
        }
    }, [authState?.user]);


    return (
        <AccessDefender>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.auth?.changeDetails.title}
                    </div>
                    <form className="max-w-sm" onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit().then();
                    }}>
                        <WiwaFormInput
                            label={resourceState?.auth?.changeDetails.titleBeforeLabel}
                            placeholder={resourceState?.auth?.changeDetails.titleBeforePlaceholder}
                            value={titleBefore}
                            setValue={setTitleBefore}
                        />

                        <WiwaFormInput
                            label={resourceState?.auth?.changeDetails.firstNameLabel}
                            required={true}
                            placeholder={resourceState?.auth?.changeDetails.firstNamePlaceholder}
                            value={firstName}
                            setValue={setFirstName}
                            setValid={setFirstNameValid}
                            validate={() => {
                                if (firstName.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changeDetails.firstNameRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInput
                            label={resourceState?.auth?.changeDetails.midNameLabel}
                            placeholder={resourceState?.auth?.changeDetails.midNamePlaceholder}
                            value={midName}
                            setValue={setMidName}
                        />

                        <WiwaFormInput
                            label={resourceState?.auth?.changeDetails.lastNameLabel}
                            placeholder={resourceState?.auth?.changeDetails.lastNamePlaceholder}
                            value={lastName}
                            setValue={setLastName}
                            setValid={setLastNameValid}
                            validate={() => {
                                if (lastName.trim().length === 0) {
                                    return {
                                        valid: false,
                                        message: resourceState?.auth?.changeDetails.lastNameRequired
                                    };
                                }
                                return {valid: true};
                            }}
                        />

                        <WiwaFormInput
                            label={resourceState?.auth?.changeDetails.titleAfterLabel}
                            placeholder={resourceState?.auth?.changeDetails.titleAfterPlaceholder}
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
                            disabled={!isFormValid() || formSubmit}
                        >{resourceState?.auth?.changeDetails.submit}</WiwaButton>
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

export default ChangeDetailsPage;
