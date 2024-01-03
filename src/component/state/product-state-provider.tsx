import { createContext, ReactNode, useContext, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { Page, Product, ProductData } from '../../model/service';
import {
    ClientResponse,
    CONTEXT_PATH,
    deleteData,
    getData,
    postData,
    putData,
    setPageableQueryParams,
    setQueryParam
} from '../../data';

const PATH_PRODUCTS = CONTEXT_PATH + 'products';

export interface ProductState {
    busy: boolean,
    data?: Page<Product>,
    getProducts: (page: number, size: number, searchField?: string) => Promise<ClientResponse<Page<Product>>>,
    getProduct: (id: number) => Promise<ClientResponse<Product>>,
    addProduct: (productData: ProductData) => Promise<ClientResponse<Product>>,
    setProduct: (id: number, productData: ProductData) => Promise<ClientResponse<Product>>,
    deleteProduct: (id: number) => Promise<ClientResponse<void>>
}

const productStateContext = createContext<ProductState | undefined>(undefined);

const ProductStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<Page<Product>>();

    const getProducts = async (page: number, size: number, searchField?: string) => {
        setBusy(true);
        try {
            const pageable = {
                page,
                size,
                sort: {
                    field: 'name',
                    asc: true
                }
            }
            const queryParams = new URLSearchParams();
            setPageableQueryParams(queryParams, pageable);
            setQueryParam(queryParams, 'searchField', searchField);
            const response = await getData<Page<Product>>(
                PATH_PRODUCTS,
                queryParams,
                authState?.accessToken || ''
            );
            if (response.data) {
                setData(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const getProduct = async (id: number) => {
        setBusy(true);
        try {
            return getData<Product>(
                PATH_PRODUCTS + '/' + id,
                undefined,
                authState?.accessToken || ''
            );
        } finally {
            setBusy(false);
        }
    }

    const addProduct = async (productData: ProductData) => {
        setBusy(true);
        try {
            const response = await postData<Product>(
                PATH_PRODUCTS,
                productData,
                authState?.accessToken || ''
            );
            if (response.data) {
                if (data) {
                    const newData = {...data};
                    newData.content = [response.data, ...data.content];
                    setData(newData);
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setProduct = async (id: number, productData: ProductData) => {
        setBusy(true);
        try {
            const response = await putData<Product>(
                PATH_PRODUCTS + '/' + id,
                productData,
                authState?.accessToken || ''
            );
            if (response.data) {
                if (data) {
                    const newData = {...data};
                    const index = newData.content.findIndex(item => item.id === id);
                    if (index !== -1) {
                        newData.content[index] = response.data;
                        setData(newData);
                    }
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const deleteProduct = async (id: number) => {
        setBusy(true);
        try {
            const response = await deleteData(
                PATH_PRODUCTS + '/' + id,
                authState?.accessToken || ''
            );
            if (response.error === undefined) {
                if (data) {
                    const newData = {...data};
                    const index = newData.content.findIndex(item => item.id === id);
                    if (index !== -1) {
                        newData.content.splice(index, 1);
                        setData(newData);
                    }
                }
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <productStateContext.Provider
            value={
                {
                    busy,
                    data,
                    getProducts,
                    getProduct,
                    addProduct,
                    setProduct,
                    deleteProduct
                }
            }
        >{children}
        </productStateContext.Provider>
    );
}

export default ProductStateProvider;

export const useProductState = () => {
    return useContext(productStateContext);
}
