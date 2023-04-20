import React from 'react';

import { Authority } from '../../client/model';
import { PieChart, Settings, ShoppingCart, Tool } from 'react-feather';

interface UserAuthoritiesComponentProps {
    authorities: Authority[]
}

const UserAuthoritiesComponent: React.FC<UserAuthoritiesComponentProps> = (props) => {

    const containsAuthority = (authorities: Authority[], authority: Authority) => {
        return authorities.some(a => a === authority);
    };

    return (
        <div className="grid grid-cols-4 gap-2">
            {containsAuthority(props.authorities, Authority.W_ADMIN) ? <Settings size="18"/> : <div/>}
            {containsAuthority(props.authorities, Authority.W_MANAGER) ? <PieChart size="18"/> : <div/>}
            {containsAuthority(props.authorities, Authority.W_EMPLOYEE) ? <Tool size="18"/> : <div/>}
            {containsAuthority(props.authorities, Authority.W_CUSTOMER) ? <ShoppingCart size="18"/> : <div/>}
        </div>
    )
}

export default UserAuthoritiesComponent;
