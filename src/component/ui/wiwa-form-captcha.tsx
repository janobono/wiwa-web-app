import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'react-feather';

import WiwaButton from './wiwa-button';
import WiwaInput from './wiwa-input';
import WiwaSpinner from './wiwa-spinner';
import { getCaptcha } from '../../api/controller/ui';
import { CommonResourceContext } from '../../context';

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
    const commonResourceState = useContext(CommonResourceContext);

    const didMount = useRef(false);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState<string>();
    const [error, setError] = useState(true);
    const [image, setImage] = useState('');

    const revalidate = () => {
        const valid = value !== undefined && value.trim().length > 0;

        if (valid) {
            setMessage(undefined);
        } else {
            setMessage(commonResourceState?.resource?.captcha.required);
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
        setBusy(true);
        setError(false);
        try {
            const response = await getCaptcha();
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
        } finally {
            setBusy(false);
        }
    }, [setToken])

    return (
        <div className="form-control w-full pb-2">
            <input type="hidden" id={tokenName} name={tokenName} value={token}/>
            <label className="label">
                <span
                    className="label-text">{commonResourceState?.resource?.captcha.label + (required ? '*' : '')}</span>
            </label>
            <WiwaInput
                id={valueName}
                name={valueName}
                placeholder={commonResourceState?.resource?.captcha.placeholder}
                value={value}
                onChange={event => setValue(event.target.value)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        revalidate();
                    }
                }}
            />
            {busy ?
                <WiwaSpinner/>
                :
                <div className="flex-1 flex flex-wrap pt-1.5">
                    {error ?
                        <div
                            className="font-normal flex-1 text-sm md:text-base text-error align-middle">
                            {commonResourceState?.resource?.captcha.error}
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
                        title={commonResourceState?.resource?.captcha.action}
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
