import { useEffect, useState } from 'react';
import { PieChart, Settings, ShoppingCart, Tool, X } from 'react-feather';

import { Authority } from '../../model/service';
import { containsAuthority } from '../../auth';

const WiwaUserAuthorities = ({authorities}: { authorities: Authority[] }) => {

    const [admin, setAdmin] = useState(false);
    const [manager, setManager] = useState(false);
    const [employee, setEmployee] = useState(false);
    const [customer, setCustomer] = useState(false);

    useEffect(() => {
        setAdmin(containsAuthority(authorities, Authority.W_ADMIN));
        setManager(containsAuthority(authorities, Authority.W_MANAGER));
        setEmployee(containsAuthority(authorities, Authority.W_EMPLOYEE));
        setCustomer(containsAuthority(authorities, Authority.W_CUSTOMER));
    }, [authorities]);

    return (
        <div className="grid grid-cols-4 gap-2 min-w-24">
            {admin ? <Settings size="18"/> : <X size="18"/>}
            {manager ? <PieChart size="18"/> : <X size="18"/>}
            {employee ? <Tool size="18"/> : <X size="18"/>}
            {customer ? <ShoppingCart size="18"/> : <X size="18"/>}
        </div>
    )
}

export default WiwaUserAuthorities;
