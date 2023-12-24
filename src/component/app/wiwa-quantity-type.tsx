import { useResourceState } from '../state/resource-state-provider';
import { QuantityType } from '../../model/service';

const WiwaQuantityType = ({type}: { type: QuantityType }) => {
    const resourceState = useResourceState();

    const translate = (type: QuantityType) => {
        switch (type) {
            case QuantityType.AREA:
                return resourceState?.common?.quantityType.area;
            case QuantityType.DISTANCE:
                return resourceState?.common?.quantityType.distance;
            case QuantityType.MONETARY:
                return resourceState?.common?.quantityType.monetary;
            case QuantityType.VOLUME:
                return resourceState?.common?.quantityType.volume;
            case QuantityType.TEMPORAL:
                return resourceState?.common?.quantityType.temporal;
            case QuantityType.MASS:
                return resourceState?.common?.quantityType.mass;
            case QuantityType.PACK:
                return resourceState?.common?.quantityType.pack;
        }
    }

    return (
        <>
            {translate(type)}
        </>
    )
}

export default WiwaQuantityType;
