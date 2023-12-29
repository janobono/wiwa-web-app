import WiwaProductQuantityKey from './wiwa-product-quantity-key';
import WiwaValueNumber from './wiwa-value-number';
import WiwaUnitValue from './wiwa-unit-value.tsx';
import { ProductQuantity } from '../../model/service';

const WiwaProductQuantities = ({quantities}: { quantities: ProductQuantity[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {quantities.map(quantity =>
                    <tr key={quantity.key}>
                        <th><WiwaProductQuantityKey quantityKey={quantity.key}/></th>
                        <td><WiwaValueNumber value={quantity.value}/><span> </span><WiwaUnitValue unitId={quantity.unit}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default WiwaProductQuantities;
