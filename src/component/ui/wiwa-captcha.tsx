import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'react-feather';

import { captchaClient } from '../../client';

import { WiwaFormInput, WiwaSpinner } from './index';
import { RESOURCE } from '../../locale';

interface WiwaCaptchaProps {
    name: string,
    required?: boolean
    captchaText: string,
    setCaptchaText: (value: string) => void,
    captchaToken: string,
    setCaptchaToken: (value: string) => void,
    valid: boolean,
    setValid: (valid: boolean) => void
}

const WiwaCaptcha: React.FC<WiwaCaptchaProps> = (props) => {
    const {t} = useTranslation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [captchaImage, setCaptchaImage] = useState('');

    useEffect(() => {
        refetch();
    }, []);

    const refetch = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await captchaClient.getCaptcha();
            if (response.data) {
                setCaptchaImage(response.data.captchaImage);
                props.setCaptchaToken(response.data.captchaToken);
            } else if (response.error) {
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <WiwaFormInput
            type="text"
            name={props.name}
            label={t(RESOURCE.COMPONENT.UI.WIWA_CAPTCHA.LABEL)}
            placeholder={t(RESOURCE.COMPONENT.UI.WIWA_CAPTCHA.PLACEHOLDER).toString()}
            required={props.required}
            value={props.captchaText}
            setValue={props.setCaptchaText}
            valid={props.valid}
            setValid={props.setValid}
            validate={() => {
                if (props.captchaText.trim().length === 0) {
                    return {valid: false, message: t(RESOURCE.COMPONENT.UI.WIWA_CAPTCHA.VALIDATION_MESSAGE).toString()};
                }
                return {valid: true};
            }}>
            {loading ?
                <div className="flex-1 flex justify-center items-center p-1">
                    <WiwaSpinner className="w-5 h-5 border-2"/>
                </div>
                :
                <div className="flex-1 flex flex-wrap mb-2">
                    {error ?
                        <div
                            className="font-normal h-[24px] flex-1 h-full text-xs md:text-base text-red-500 align-middle">
                            {t(RESOURCE.COMPONENT.UI.WIWA_CAPTCHA.ERROR)}
                        </div>
                        :
                        <>
                            <img
                                className="h-[28px] flex-1"
                                src={captchaImage}
                                alt={t(RESOURCE.COMPONENT.UI.WIWA_CAPTCHA.LABEL).toString()}/>
                        </>
                    }
                    <div
                        className="flex flex-wrap  p-1 gap-1 justify-center items-center bg-blue-100 hover:bg-blue-300 cursor-pointer"
                        onClick={() => refetch()}
                    >
                        <RefreshCw size="16"/>
                    </div>
                </div>
            }
        </WiwaFormInput>
    );
}

export default WiwaCaptcha;
