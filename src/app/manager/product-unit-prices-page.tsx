import { useParams } from 'react-router-dom';

const ProductUnitPricesPage = () => {
    const {productId} = useParams();

    return (
        <>{productId}</>
    )
}

export default ProductUnitPricesPage;
