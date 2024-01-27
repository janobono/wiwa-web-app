import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProductConfigState } from '../../../component/state/product-config-state-provider.tsx';
import { useResourceState } from '../../../component/state/resource-state-provider.tsx';

const ProductCategoriesPage = () => {
    const navigate = useNavigate();

    const productConfigState = useProductConfigState();
    const resourceState = useResourceState();

    const [error, setError] = useState<string>();

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
            </>
    )
}

export default ProductCategoriesPage;
