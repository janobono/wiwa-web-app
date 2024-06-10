import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from '../../state/auth';
import { Authority } from '../../api/model';
import { hasAnyAuthority } from '../../model';
import { useHealthState } from '../../state/health';

const AccessDefender = ({children, authority}: { children?: ReactNode, authority?: Authority }) => {
    const navigate = useNavigate();
    const authState = useAuthState();
    const healthState = useHealthState();

    useEffect(() => {
        if (authState?.accessExpired) {
            navigate('/');
            return;
        }

        if (authority) {
            if (!hasAnyAuthority(authState?.authUser, authority)) {
                navigate('/');
                return;
            }
        }

        if (healthState?.maintenance) {
            const hasAuthority = hasAnyAuthority(authState?.authUser, Authority.W_ADMIN, Authority.W_MANAGER);
            if (!hasAuthority) {
                navigate('/maintenance');
            }
        }
    }, [authState?.accessExpired, authState?.authUser, authority, navigate, healthState?.maintenance]);

    return (
        <>
            {children}
        </>
    )
}

export default AccessDefender;
