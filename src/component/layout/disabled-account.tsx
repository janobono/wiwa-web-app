import { useContext, useEffect, useState } from 'react';

import { AuthContext, CommonResourceContext } from '../../context';

const DisabledAccount = () => {
    const authState = useContext(AuthContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (authState?.authUser) {
            setShow(!authState.authUser.user.enabled);
        } else {
            setShow(false);
        }
    }, [authState?.authUser]);

    return (!show ? null :
        <div className="alert alert-error text-xs md:text-base">
            <span>{commonResourceState?.resource?.disabledAccount.text}</span>
        </div>)
}

export default DisabledAccount;
