import { useEffect, useState } from 'react';

import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const DisabledAccount = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

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
            <span>
                <span>{resourceState?.common?.disabledAccount.text}</span>
            </span>
        </div>)
}

export default DisabledAccount;
