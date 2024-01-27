import { ProductCategoryItem } from '../../model/service';

const WiwaProductCategoryItems = ({categoryItems}: { categoryItems: ProductCategoryItem[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {categoryItems.map(item =>
                    <tr key={item.id}>
                        <th>{item.id}</th>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default WiwaProductCategoryItems;
