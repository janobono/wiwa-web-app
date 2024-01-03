import { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'react-feather';

import WiwaButton from './wiwa-button';
import WiwaInput from './wiwa-input';
import WiwaSpinner from './wiwa-spinner';
import { useCaptchaState } from '../state/captcha-state-provider';
import { useResourceState } from '../state/resource-state-provider';

const WiwaFormCaptcha = (
    {
        required = true,
        valueName,
        tokenName,
        value = '',
        setValue,
        token,
        setToken,
        setValid
    }: {
        required?: boolean,
        valueName?: string,
        tokenName?: string,
        value?: string,
        setValue: (value: string) => void,
        token?: string,
        setToken: (value: string) => void,
        setValid?: (valid: boolean) => void,
    }) => {
    const captchaState = useCaptchaState();
    const resourceState = useResourceState();

    const didMount = useRef(false);
    const [message, setMessage] = useState<string>();
    const [error, setError] = useState(true);
    const [image, setImage] = useState('');

    const revalidate = () => {
        const valid = value !== undefined && value.trim().length > 0;

        if (valid) {
            setMessage(undefined);
        } else {
            setMessage(resourceState?.common?.captcha.required);
        }

        if (setValid) {
            setValid(valid && token !== undefined);
        }
    }

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        revalidate();
    }, [value]);

    useEffect(() => {
        reFetch().then();
    }, []);

    const reFetch = useCallback(async () => {
        setError(false);
        try {
            const response = await captchaState?.getCaptcha();
            if (response?.data) {
                if (setToken) {
                    setToken(response.data.captchaToken);
                }
                setImage(response.data.captchaImage);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    }, [captchaState, setToken])

    return (
        <div className="form-control w-full">
            <input type="hidden" id={tokenName} name={tokenName} value={token}/>
            <label className="label">
                <span className="label-text">{resourceState?.common?.captcha.label + (required ? '*' : '')}</span>
            </label>
            <WiwaInput
                id={valueName}
                name={valueName}
                placeholder={resourceState?.common?.captcha.placeholder}
                value={value}
                onChange={event => setValue(event.target.value)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        revalidate();
                    }
                }}
            />
            {captchaState?.busy ?
                <WiwaSpinner/>
                :
                <div className="flex-1 flex flex-wrap pt-1.5">
                    {error ?
                        <div
                            className="font-normal flex-1 text-sm md:text-base text-error align-middle">
                            {resourceState?.common?.captcha.error}
                        </div>
                        :
                        <img
                            className="flex-1 object-fill h-8 md:h-12"
                            src={image}
                            alt="captcha"
                        />
                    }
                    <WiwaButton
                        className="btn-sm md:btn-md"
                        title={resourceState?.common?.captcha.action}
                        onClick={() => reFetch()}
                    >
                        <RefreshCw size="16"/>
                    </WiwaButton>
                </div>
            }
            {message &&
                <label className="label">
                    <span className="label-text-alt text-error">{message}</span>
                </label>
            }
        </div>
    )
}

export default WiwaFormCaptcha;
