import WiwaUnitValue from './wiwa-unit-value';
import WiwaValueDate from './wiwa-value-date';
import WiwaValueNumber from './wiwa-value-number';
import { ProductUnitPrice } from '../../model/service';

const WiwaProductUnitPrices = ({unitPrices}: { unitPrices: ProductUnitPrice[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {unitPrices.map((unitPrice, index) =>
                    <tr key={index}>
                        <th><WiwaValueDate value={unitPrice.validFrom}/></th>
                        <td><WiwaValueNumber value={unitPrice.value}/><span> </span><WiwaUnitValue
                            unitId={unitPrice.unit}/>
                        </td>
                        <td><WiwaValueNumber value={unitPrice.vatValue}/><span> </span><WiwaUnitValue
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
