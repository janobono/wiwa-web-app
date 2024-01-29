import { ProductCategoryItem } from '../../model/service';

const WiwaProductCategoryItems = ({categoryItems}: { categoryItems: ProductCategoryItem[] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <tbody>
                {categoryItems.map(item =>
                    <tr key={item.id}>
                        <td>
                            <div className="badge badge-secondary">
                                {item.category.code}:{item.category.name}
                                <div
                                    className="badge badge-primary">
                                    {item.code}:{item.name}
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default WiwaProductCategoryItems;
