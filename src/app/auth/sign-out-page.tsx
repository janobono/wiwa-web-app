import { useContext, useEffect } from 'react';

import AuthDefender from '../../component/layout/auth-defender';
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
        <AuthDefender>
            <div className="container p-5 mx-auto flex flex-row items-center justify-center">
                <WiwaButton
                    className="btn-primary"
                    disabled={authState?.busy}
                    onClick={() => authState?.signOut()}
                >{resourceState?.common?.navigation.authNav.signOut}</WiwaButton>
            </div>
        </AuthDefender>
    )
}

export default SignOutPage;
