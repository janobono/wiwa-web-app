import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthState } from '../../../state';

import { EMAIL_REGEX, WiwaButton, WiwaCaptcha, WiwaFormInput } from '../../ui';
import { RESOURCE } from '../../../locale';
import { WiwaErrorCode } from '../../../client';

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const authState = useAuthState();

    const [email, setEMail] = useState('');
    const [emailValid, setEMailValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const [submitted, setSubmitted] = useState(false);

    const isFormValid = (): boolean => {
        return emailValid && captchaValid;
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid() && captchaToken) {
                const wiwaError = await authState?.resetPassword({email, captchaText, captchaToken});
                if (wiwaError) {
                    switch (wiwaError.code) {
                        case WiwaErrorCode.USER_NOT_FOUND:
                            setError(t(RESOURCE.ERROR.USER_NOT_FOUND).toString());
                            break;
                        case WiwaErrorCode.USER_IS_DISABLED:
                            setError(t(RESOURCE.ERROR.USER_IS_DISABLED).toString());
                            break;
                        case WiwaErrorCode.INVALID_CAPTCHA:
                            setError(t(RESOURCE.ERROR.INVALID_CAPTCHA).toString());
                            break;
                        default:
                            setError(wiwaError.message);
                            break;
                    }
                } else {
                    setSubmitted(true);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="w-full">
            <div className="container p-5 mx-auto">

                {submitted ?
                    <div className="flex flex-col items-center justify-center min-h-[480px]">
                        <div className="m-5">{t(RESOURCE.COMPONENT.PAGE.AUTH.RESET_PASSWORD.SUBMITTED_MESSAGE)}</div>
                        <WiwaButton onClick={() => navigate('/')}>{t(RESOURCE.ACTION.OK)}</WiwaButton>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center mb-5">
                            {t(RESOURCE.COMPONENT.PAGE.AUTH.RESET_PASSWORD.TITLE)}
                        </div>
                        <form className="max-w-sm" onSubmit={(event => {
                            event.preventDefault();
                            handleSubmit();
                        })}>
                            <div className="mb-2">
                                <WiwaFormInput
                                    type="email"
                                    name="email"
                                    label={t(RESOURCE.COMPONENT.PAGE.AUTH.RESET_PASSWORD.FORM.EMAIL.LABEL)}
                                    placeholder={t(RESOURCE.COMPONENT.PAGE.AUTH.RESET_PASSWORD.FORM.EMAIL.PLACEHOLDER).toString()}
                                    required={true}
                                    value={email}
                                    setValue={setEMail}
                                    valid={emailValid}
                                    setValid={setEMailValid}
                                    validate={() => {
                                        if (email.trim().length === 0) {
                                            return {
                                                valid: false,
                                                message: t(RESOURCE.COMPONENT.PAGE.AUTH.RESET_PASSWORD.FORM.EMAIL.VALIDATION_MESSAGE_1).toString()
                                            };
                                        }
                                        const valid = EMAIL_REGEX.test(email);
                                        let message;
                                        if (!valid) {
                                            message = t(RESOURCE.COMPONENT.PAGE.AUTH.RESET_PASSWORD.FORM.EMAIL.VALIDATION_MESSAGE_2).toString();
                                        }
                                        return {valid, message};
                                    }}/>
                            </div>
                            <div className="mb-2">
                                <WiwaCaptcha
                                    name="captcha"
                                    required={true}
                                    captchaText={captchaText}
                                    setCaptchaText={setCaptchaText}
                                    captchaToken={captchaToken}
                                    setCaptchaToken={setCaptchaToken}
                                    valid={captchaValid}
                                    setValid={setCaptchaValid}
                                />
                            </div>
                            <WiwaButton
                                type="submit"
                                className="w-full"
                                disabled={!isFormValid() || isSubmitting}
                            >{t(RESOURCE.ACTION.OK)}
                            </WiwaButton>
                        </form>
                        {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                    </div>
                }
            </div>
        </section>
    );
}

export default ResetPasswordPage;
