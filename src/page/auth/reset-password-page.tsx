import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { WiwaErrorCode } from '../../client';
import { RESOURCE } from '../../locale';
import { useAuthState } from '../../state';

import { WiwaButton, WiwaCaptcha } from '../../component/ui';
import { UserEmailField } from '../../component/user';

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const authState = useAuthState();

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

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
                        <div className="m-5">{t(RESOURCE.PAGE.AUTH.RESET_PASSWORD.SUBMITTED_MESSAGE)}</div>
                        <WiwaButton onClick={() => navigate('/')}>{t(RESOURCE.ACTION.OK)}</WiwaButton>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center mb-5">
                            {t(RESOURCE.PAGE.AUTH.RESET_PASSWORD.TITLE)}
                        </div>
                        <form className="max-w-sm" onSubmit={(event => {
                            event.preventDefault();
                            handleSubmit();
                        })}>
                            <UserEmailField
                                email={email}
                                setEmail={setEmail}
                                emailValid={emailValid}
                                setEmailValid={setEmailValid}
                            />

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
