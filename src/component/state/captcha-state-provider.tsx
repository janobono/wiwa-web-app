import { createContext, ReactNode, useContext, useState } from 'react';

import { Captcha } from '../../model/service';
import { ClientResponse, CONTEXT_PATH, getData } from '../../data';

const PATH_CAPTCHA = CONTEXT_PATH + 'ui/captcha';

export interface CaptchaState {
    busy: boolean,
    getCaptcha: () => Promise<ClientResponse<Captcha>>,
}

const captchaStateContext = createContext<CaptchaState | undefined>(undefined);

const CaptchaStateProvider = ({children}: { children: ReactNode }) => {
    const [busy, setBusy] = useState(false);

    const getCaptcha = async () => {
        setBusy(true);
        try {
            return getData<Captcha>(PATH_CAPTCHA);
        } finally {
            setBusy(false);
        }
    }

    return (
        <captchaStateContext.Provider
            value={
                {
                    busy,
                    getCaptcha
                }
            }
        >{children}
        </captchaStateContext.Provider>
    );
}

export default CaptchaStateProvider;

export const useCaptchaState = () => {
    return useContext(captchaStateContext);
}
