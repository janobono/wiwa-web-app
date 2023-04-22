import React from 'react';
import { PieChart, Settings, ShoppingCart, Tool, X } from 'react-feather';

import { Authority } from '../../client/model';
import { containsAuthority } from '../../state';

interface UserAuthoritiesComponentProps {
    authorities: Authority[]
}

const UserAuthoritiesComponent: React.FC<UserAuthoritiesComponentProps> = (props) => {

    return (
        <div className="grid grid-cols-4 gap-2">
            {containsAuthority(props.authorities, Authority.W_ADMIN) ? <Settings size="18"/> : <X size="18"/>}
            {containsAuthority(props.authorities, Authority.W_MANAGER) ? <PieChart size="18"/> : <X size="18"/>}
            {containsAuthority(props.authorities, Authority.W_EMPLOYEE) ? <Tool size="18"/> : <X size="18"/>}
            {containsAuthority(props.authorities, Authority.W_CUSTOMER) ? <ShoppingCart size="18"/> : <X size="18"/>}
        </div>
    )
}

export default UserAuthoritiesComponent;
