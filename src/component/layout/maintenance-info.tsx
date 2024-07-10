import { useContext } from 'react';

import { CommonResourceContext, HealthContext } from '../../context';

const MaintenanceInfo = () => {
    const healthState = useContext(HealthContext);
    const commonResourceState = useContext(CommonResourceContext);

    return (
        healthState?.maintenance &&
        <div className="alert alert-warning text-xs md:text-base">
            <span>{commonResourceState?.resource?.maintenance}</span>
        </div>
    )
}

export default MaintenanceInfo;
