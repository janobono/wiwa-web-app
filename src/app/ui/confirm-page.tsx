import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { WiwaErrorCode } from '../../api/model';
import WiwaSpinner from '../../component/ui/wiwa-spinner';
import { AuthContext, ErrorContext, ResourceContext } from '../../context';

const ConfirmPage = () => {
    const {token} = useParams();

    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const didMount = useRef(false);
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        if (didMount.current) {
            return;
        }

        didMount.current = true;

        if (token) {
            const action = async () => {
                const response = await authState?.confirm({token});
                if (response?.error) {
                    switch (response?.error.code) {
                        case WiwaErrorCode.UNSUPPORTED_VALIDATION_TOKEN:
                            setMessage(resourceState?.common?.error.unsupportedValidationToken);
                            break;
                        default:
                            errorState?.addError(response?.error);
                            break;
                    }
                } else {
                    setMessage(resourceState?.ui?.confirm.message);
                }
            }
            action().then();
        }
    }, [token]);

    return (
        <div className="container p-5 mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg md:text-xl font-bold text-center pb-5">
                    {resourceState?.ui?.confirm.title}
                </div>
                {authState?.busy ?
                    <WiwaSpinner/>
                    :
                    <div className="max-w-sm text-sm md:text-base">{message}</div>
                }
            </div>
        </div>
    )
}

export default ConfirmPage;
