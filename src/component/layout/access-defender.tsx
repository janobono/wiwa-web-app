import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from '../state/auth-state-provider';
import { Authority } from '../../model/service';
import { hasAnyAuthority } from '../../auth.ts';

const AccessDefender = ({children, authority}: { children?: ReactNode, authority?: Authority }) => {
    const navigate = useNavigate();
    const authState = useAuthState();

    useEffect(() => {
        if (authState?.accessExpired) {
            navigate('/');
        } else {
            if (authority) {
                if (!hasAnyAuthority(authState?.user, authority)) {
                    navigate('/');
                }
            }
        }
    }, [authState?.accessExpired, authState?.user, authority, navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default AccessDefender;
