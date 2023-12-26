import { useResourceState } from '../state/resource-state-provider';
import { ProductAttributeKey } from '../../model/service';

const WiwaProductAttributeKey = ({attributeKey}: { attributeKey: ProductAttributeKey }) => {
    const resourceState = useResourceState();

    const translate = (attributeKey: ProductAttributeKey) => {
        switch (attributeKey) {
            case ProductAttributeKey.BOARD_CODE:
                return resourceState?.common?.productAttributeKey.boardCode;
            case ProductAttributeKey.STRUCTURE_CODE:
                return resourceState?.common?.productAttributeKey.structureCode;
            case ProductAttributeKey.ORIENTATION:
                return resourceState?.common?.productAttributeKey.orientation;
        }
    }

    return (
        <>
            {translate(attributeKey)}
        </>
    )
}

export default WiwaProductAttributeKey;
