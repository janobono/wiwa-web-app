import { useContext, useEffect, useState } from 'react';

import { AuthContext, CommonResourceContext } from '../../context';

const RefreshToken = () => {
    const authState = useContext(AuthContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (authState) {
            setShow(authState.accessExpired && !authState.refreshExpired);
        } else {
            setShow(false);
        }
    }, [authState, authState?.accessExpired, authState?.refreshExpired]);

    return (!show ? null :
            <div className="alert alert-warning text-xs md:text-base">
                <span>{commonResourceState?.resource?.refreshToken.text}</span>
                <button
                    className="btn btn-sm normal-case text-xs md:text-base"
                    onClick={() => {
                        authState?.refreshAuth();
                    }}
                >{commonResourceState?.resource?.refreshToken.action}</button>
            </div>
    )
}

export default RefreshToken;
