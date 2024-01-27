import { Outlet } from 'react-router-dom';

import ProductConfigStateProvider from '../../component/state/product-config-state-provider.tsx';

const ProductConfigBasePage = () => {
    return (
        <ProductConfigStateProvider>
            <Outlet/>
        </ProductConfigStateProvider>
    )
}

export default ProductConfigBasePage;
