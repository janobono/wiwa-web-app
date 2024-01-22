import { useState } from 'react';

const ProductCategoriesPage = () => {

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
