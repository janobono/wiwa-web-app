import { useHealthState } from '../../state/health';
import { useResourceState } from '../../state/resource';

const MaintenanceInfo = () => {
    const healthState = useHealthState();
    const resourceState = useResourceState();

    return (
        healthState?.maintenance &&
        <div className="alert alert-warning text-xs md:text-base">
            <span>{resourceState?.common?.maintenance}</span>
        </div>
    )
}

export default MaintenanceInfo;
