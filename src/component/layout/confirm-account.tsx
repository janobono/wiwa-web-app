import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthState } from '../state/auth-state-provider';
import { useResourceState } from '../state/resource-state-provider';

const ConfirmAccount = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (authState?.user) {
            setShow(!authState.user.confirmed);
        } else {
            setShow(false);
        }
    }, [authState?.user]);

    return (!show ? null :
        <div className="alert alert-warning text-xs md:text-base">
            <span>
                <span>{resourceState?.common?.confirmAccount.text}</span>
                <span> </span>
            </span>
            <NavLink
                className="btn btn-sm normal-case text-xs md:text-base"
                to="/auth/resend-confirmation"
            >{resourceState?.common?.confirmAccount.action}</NavLink>
        </div>)
}

export default ConfirmAccount;
