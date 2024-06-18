import { useEffect } from 'react';

import AccessDefender from '../../component/layout/access-defender';
import WiwaButton from '../../component/ui/wiwa-button';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const SignOutPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    useEffect(() => {
        if (authState) {
            authState.signOut().then();
        }
    }, [authState]);

    return (
        <AccessDefender>
            <div className="container p-5 mx-auto flex flex-row items-center justify-center">
                <WiwaButton
                    className="btn-primary"
                    disabled={authState?.busy}
                    onClick={() => authState?.signOut()}
                >{resourceState?.common?.navigation.authNav.signOut}</WiwaButton>
            </div>
        </AccessDefender>
    )
}

export default SignOutPage;
