import { useParams } from 'react-router-dom';

const ProductCodeListItemsPage = () => {
    const {productId} = useParams();

    return (
        <>{productId}</>
    )
}

export default ProductCodeListItemsPage;
