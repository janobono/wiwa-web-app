import { Outlet } from 'react-router-dom';

import ProductStateProvider from '../../component/state/product-state-provider';

const ProductsBasePage = () => {
    return (
        <ProductStateProvider>
            <Outlet/>
        </ProductStateProvider>
    )
}

export default ProductsBasePage;
