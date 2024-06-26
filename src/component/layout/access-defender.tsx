import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { hasAnyAuthority } from '../../auth';
import { Authority } from '../../api/model';
import { AuthContext, HealthContext } from '../../context';

const AccessDefender = ({children, authority}: { children?: ReactNode, authority?: Authority }) => {
    const navigate = useNavigate();
    const authState = useContext(AuthContext);
    const healthState = useContext(HealthContext);

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
