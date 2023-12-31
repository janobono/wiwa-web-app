import { useParams } from 'react-router-dom';

const ProductImagesPage = () => {
    const {productId} = useParams();

    return (
        <>{productId}</>
    )
}

export default ProductImagesPage;
