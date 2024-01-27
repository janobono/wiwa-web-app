import { useParams } from 'react-router-dom';

const ProductCategoryItemsPage = () => {
    const {productId} = useParams();

    return (
        <>{productId}</>
    )
}

export default ProductCategoryItemsPage;
