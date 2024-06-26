import { useContext, useEffect, useState } from 'react';

import { AuthContext, ResourceContext } from '../../context';

const DisabledAccount = () => {
    const authState = useContext(AuthContext);
    const resourceState = useContext(ResourceContext);

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
            <span>{resourceState?.common?.disabledAccount.text}</span>
        </div>)
}

export default DisabledAccount;
