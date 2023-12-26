import WiwaProductAttributeKey from './wiwa-product-attribute-key';
import WiwaValue from './wiwa-value';
import { ProductAttribute } from '../../model/service';

const WiwaProductAttributes = ({attributes}: { attributes: ProductAttribute[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {attributes.map(attribute =>
                    <tr key={attribute.key}>
                        <th><WiwaProductAttributeKey attributeKey={attribute.key}/></th>
                        <td><WiwaValue value={attribute.value}/></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default WiwaProductAttributes;
