import { useEffect } from 'react';

import AccessDefender from '../../component/layout/access-defender';
import { useAuthState } from '../../component/state/auth-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';

const SignOutPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    useEffect(() => {
        authState?.signOut();
    }, [authState]);

    return (
        <AccessDefender>
            <div className="container p-5 mx-auto flex flex-row items-center justify-center">
                <WiwaButton
                    className="btn-primary"
                    onClick={() => authState?.signOut()}
                >{resourceState?.common?.baseNavigation.authNav.signOut}</WiwaButton>
            </div>
        </AccessDefender>
    )
}

export default SignOutPage;
