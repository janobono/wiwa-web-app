import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext, ResourceContext } from '../../context';

const ConfirmAccount = () => {
    const authState = useContext(AuthContext);
    const resourceState = useContext(ResourceContext);

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
