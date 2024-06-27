import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Authority } from '../../api/model';
import { AuthContext } from '../../context';

const AuthDefender = ({children, authority}: { children?: ReactNode, authority?: Authority }) => {
    const navigate = useNavigate();
    const authState = useContext(AuthContext);

    useEffect(() => {
        if (authState?.accessExpired) {
            navigate('/');
            return;
        }

        if (authority) {
            if (authority === Authority.W_ADMIN) {
                if (!authState?.adminAuthority) {
                    navigate('/');
                    return;
                }
            }
            if (authority === Authority.W_MANAGER) {
                if (!authState?.adminAuthority && !authState?.managerAuthority) {
                    navigate('/');
                    return;
                }
            }
            if (authority === Authority.W_EMPLOYEE) {
                if (!authState?.adminAuthority && !authState?.managerAuthority && !authState?.employeeAuthority) {
                    navigate('/');
                    return;
                }
            }
            if (authority === Authority.W_CUSTOMER) {
                if (!authState?.adminAuthority && !authState?.managerAuthority && !authState?.employeeAuthority && !authState?.customerAuthority) {
                    navigate('/');
                    return;
                }
            }
        }
    }, [
        authority,
        navigate,
        authState?.accessExpired,
        authState?.adminAuthority,
        authState?.managerAuthority,
        authState?.employeeAuthority,
        authState?.customerAuthority
    ]);

    return (
        <>
            {children}
        </>
    )
}

export default AuthDefender;
