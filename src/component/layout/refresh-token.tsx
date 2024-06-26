import { useContext, useEffect, useState } from 'react';

import { AuthContext, ResourceContext } from '../../context';

const RefreshToken = () => {
    const authState = useContext(AuthContext);
    const resourceState = useContext(ResourceContext);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (authState) {
            setShow(authState.accessExpired && !authState.refreshExpired && authState?.authToken !== undefined);
        } else {
            setShow(false);
        }
    }, [authState, authState?.accessExpired, authState?.refreshExpired]);

    return (!show ? null :
            <div className="alert alert-warning text-xs md:text-base">
                <span>{resourceState?.common?.refreshToken.text}</span>
                <button
                    className="btn btn-sm normal-case text-xs md:text-base"
                    onClick={() => {
                        authState?.refreshAuth();
                    }}
                >{resourceState?.common?.refreshToken.action}</button>
            </div>
    )
}

export default RefreshToken;
