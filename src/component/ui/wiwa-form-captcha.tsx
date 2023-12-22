import { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'react-feather';

import WiwaButton from './wiwa-button';
import WiwaInput from './wiwa-input';
import WiwaSpinner from './wiwa-spinner';
import { useResourceState } from '../state/resource-state-provider';
import { Captcha } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_CAPTCHA = CONTEXT_PATH + 'captcha';

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
    const resourceState = useResourceState();

    const didMount = useRef(false);
    const [message, setMessage] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(true);
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
        setLoading(true);
        setLoadingError(false);
        try {
            const response = await getData<Captcha>(PATH_CAPTCHA);
            if (response.data) {
                if (setToken) {
                    setToken(response.data.captchaToken);
                }
                setImage(response.data.captchaImage);
            } else {
                setLoadingError(true);
            }
        } catch (error) {
            setLoadingError(true);
        } finally {
            setLoading(false);
        }
    }, [setToken])

    return (
        <div className="form-control w-full max-w-xs pb-5">
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
            {loading ?
                <WiwaSpinner/>
                :
                <div className="flex-1 flex flex-wrap pt-1.5">
                    {loadingError ?
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
