import { useEffect, useState } from 'react';

import { useAuthState } from '../state/auth-state-provider';
import { useResourceState } from '../state/resource-state-provider';

const RefreshToken = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (authState) {
            setShow(authState.accessExpired && !authState.refreshExpired && authState.refreshToken !== undefined);
        } else {
            setShow(false);
        }
    }, [authState, authState?.accessExpired, authState?.refreshExpired]);

    return (!show ? null :
            <div className="alert alert-warning text-xs md:text-base">
            <span>
                <span>{resourceState?.common?.refreshToken.text}</span>
            </span>
                <div>
                    <button
                        className="btn btn-sm normal-case text-xs md:text-base"
                        onClick={() => {
                            authState?.refreshAuth();
                        }}
                    >{resourceState?.common?.refreshToken.action}</button>
                </div>
            </div>
    )
}

export default RefreshToken;
