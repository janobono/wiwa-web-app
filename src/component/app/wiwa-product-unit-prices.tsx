import WiwaValueNumber from './wiwa-value-number';
import WiwaUnitValue from './wiwa-unit-value.tsx';
import { ProductUnitPrice } from '../../model/service';

const WiwaProductUnitPrices = ({unitPrices}: { unitPrices: ProductUnitPrice[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {unitPrices.map((unitPrice, index) =>
                    <tr key={index}>
                        <th>{unitPrice.validFrom}</th>
                        <td><WiwaValueNumber value={unitPrice.value}/><span> </span><WiwaUnitValue
                            unitId={unitPrice.unit}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default WiwaProductUnitPrices;
