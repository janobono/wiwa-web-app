import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext, CommonResourceContext } from '../../context';

const ConfirmAccount = () => {
    const authState = useContext(AuthContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (authState?.authUser) {
            setShow(!authState.authUser.user.confirmed);
        } else {
            setShow(false);
        }
    }, [authState?.authUser]);

    return (!show ? null :
        <div className="alert alert-warning text-xs md:text-base">
            <span>
                <span>{commonResourceState?.resource?.confirmAccount.text}</span>
                <span> </span>
            </span>
            <NavLink
                className="btn btn-sm normal-case text-xs md:text-base"
                to="/auth/resend-confirmation"
            >{commonResourceState?.resource?.confirmAccount.action}</NavLink>
        </div>)
}

export default ConfirmAccount;
