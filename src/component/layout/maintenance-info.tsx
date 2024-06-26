import { useContext } from 'react';

import { HealthContext, ResourceContext } from '../../context';

const MaintenanceInfo = () => {
    const healthState = useContext(HealthContext);
    const resourceState = useContext(ResourceContext);

    return (
        healthState?.maintenance &&
        <div className="alert alert-warning text-xs md:text-base">
            <span>{resourceState?.common?.maintenance}</span>
        </div>
    )
}

export default MaintenanceInfo;
