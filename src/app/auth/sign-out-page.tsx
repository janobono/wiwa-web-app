import { useContext, useEffect } from 'react';

import AccessDefender from '../../component/layout/access-defender';
import WiwaButton from '../../component/ui/wiwa-button';
import { AuthContext, ResourceContext } from '../../context';

const SignOutPage = () => {
    const authState = useContext(AuthContext);
    const resourceState = useContext(ResourceContext);

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
