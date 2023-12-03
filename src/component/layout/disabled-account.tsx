import { useEffect, useState } from 'react';

import { useAuthState } from '../state/auth-state-provider';
import { useResourceState } from '../state/resource-state-provider';

const DisabledAccount = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (authState?.user) {
            setShow(!authState.user.enabled);
        } else {
            setShow(false);
        }
    }, [authState?.user]);

    return (!show ? null :
        <div className="alert alert-error text-xs md:text-base">
            <span>
                <span>{resourceState?.common?.disabledAccount.text}</span>
            </span>
        </div>)
}

export default DisabledAccount;
