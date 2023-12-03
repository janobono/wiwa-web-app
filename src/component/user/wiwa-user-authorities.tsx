import { PieChart, Settings, ShoppingCart, Tool, X } from 'react-feather';

import { Authority } from '../../model/service';
import { containsAuthority } from '../../auth';

const WiwaUserAuthorities = ({authorities}: { authorities: Authority[] }) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            {containsAuthority(authorities, Authority.W_ADMIN) ? <Settings size="18"/> : <X size="18"/>}
            {containsAuthority(authorities, Authority.W_MANAGER) ? <PieChart size="18"/> : <X size="18"/>}
            {containsAuthority(authorities, Authority.W_EMPLOYEE) ? <Tool size="18"/> : <X size="18"/>}
            {containsAuthority(authorities, Authority.W_CUSTOMER) ? <ShoppingCart size="18"/> : <X size="18"/>}
        </div>
    )
}

export default WiwaUserAuthorities;
