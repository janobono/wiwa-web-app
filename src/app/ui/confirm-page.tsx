import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuthState } from '../../component/state/auth-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaSpinner from '../../component/ui/wiwa-spinner';
import { WiwaErrorCode } from '../../model/service';

const ConfirmPage = () => {
    const {token} = useParams();

    const authState = useAuthState();
    const resourceState = useResourceState();

    const [done, setDone] = useState(false);
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if (token) {
            const action = async () => {
                try {
                    const response = await authState?.confirm({token});
                    if (response?.error) {
                        switch (response?.error.code) {
                            case WiwaErrorCode.UNSUPPORTED_VALIDATION_TOKEN:
                                setMessage(resourceState?.common?.error.unsupportedValidationToken);
                                break;
                            default:
                                setMessage(resourceState?.ui?.confirm.error);
                                break;
                        }
                    } else {
                        setMessage(resourceState?.ui?.confirm.message);
                    }
                } finally {
                    setDone(true);
                }
            }
            action().then();
        }
    }, [token, authState, resourceState?.ui, resourceState?.common]);

    return (
        <div className="container p-5 mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg md:text-xl font-bold text-center pb-5">
                    {resourceState?.ui?.confirm.title}
                </div>
                {done ?
                    <div className="max-w-sm text-sm md:text-base">{message}</div>
                    :
                    <WiwaSpinner/>
                }
            </div>
        </div>
    )
}

export default ConfirmPage;
