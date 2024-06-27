import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext, HealthContext } from '../../context';

const MaintenanceDefender = ({children}: { children?: ReactNode }) => {
    const navigate = useNavigate();
    const authState = useContext(AuthContext);
    const healthState = useContext(HealthContext);

    useEffect(() => {
        if (healthState?.maintenance && !(authState?.adminAuthority || authState?.managerAuthority)) {
            navigate('/maintenance');
        }
    }, [
        navigate,
        healthState?.maintenance,
        authState?.adminAuthority,
        authState?.managerAuthority
    ]);

    return (
        <>
            {children}
        </>
    )
}

export default MaintenanceDefender;
