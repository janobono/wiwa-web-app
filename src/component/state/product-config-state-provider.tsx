import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { useHealthState } from './health-state-provider';
import { ProductCategoryData, SingleValueBody } from '../../model/service';
import { ClientResponse, CONTEXT_PATH, getData, postData } from '../../data';
import { ProductCategory, ProductCategoryItem, ProductCategoryItemData } from '../../model/service';

const PATH_PRODUCT_CONFIG = CONTEXT_PATH + 'product-config/';

export interface ProductConfigState {
    busy: boolean,
    vatRate?: number,
    setVatRate: (vatRate: number) => Promise<ClientResponse<SingleValueBody<number>>>,
    productCategories?: ProductCategory[],
    setProductCategories: (productCategories: ProductCategoryData[]) => Promise<ClientResponse<ProductCategory[]>>,
    boardCategoryItem?: ProductCategoryItem,
    setBoardCategoryItem: (boardCategoryItemData: ProductCategoryItemData) => Promise<ClientResponse<ProductCategoryItem>>,
    edgeCategoryItem?: ProductCategoryItem,
    setEdgeCategoryItem: (edgeCategoryItemData: ProductCategoryItemData) => Promise<ClientResponse<ProductCategoryItem>>,
    serviceCategoryItem?: ProductCategoryItem,
    setServiceCategoryItem: (serviceCategoryItemData: ProductCategoryItemData) => Promise<ClientResponse<ProductCategoryItem>>,
    searchItems?: ProductCategoryItem[],
    setSearchItems: (searchItems: ProductCategoryItemData[]) => Promise<ClientResponse<ProductCategoryItem[]>>
}

const productConfigStateContext = createContext<ProductConfigState | undefined>(undefined);

const ProductConfigStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();
    const healthState = useHealthState();

    const [busy, setBusy] = useState(false);
    const [vatRate, setVatRateValue] = useState<number>();
    const [productCategories, setProductCategoriesValue] = useState<ProductCategory[]>();
    const [boardCategoryItem, setBoardCategoryItemValue] = useState<ProductCategoryItem>();
    const [edgeCategoryItem, setEdgeCategoryItemValue] = useState<ProductCategoryItem>();
    const [serviceCategoryItem, setServiceCategoryItemValue] = useState<ProductCategoryItem>();
    const [searchItems, setSearchItemsValue] = useState<ProductCategoryItem[]>();

    useEffect(() => {
        if (healthState?.up) {
            const fetchVatRate = async () => {
                const response = await getData<SingleValueBody<number>>(
                    PATH_PRODUCT_CONFIG + 'vat-rate',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setVatRateValue(response.data.value);
                }
            }
            fetchVatRate().then();

            const fetchProductCategories = async () => {
                const response = await getData<ProductCategory[]>(
                    PATH_PRODUCT_CONFIG + 'product-categories',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setProductCategoriesValue(response.data);
                }
            }
            fetchProductCategories().then();

            const fetchBoardCategoryItem = async () => {
                const response = await getData<ProductCategoryItem>(
                    PATH_PRODUCT_CONFIG + 'board-category-item',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setBoardCategoryItemValue(response.data);
                }
            }
            fetchBoardCategoryItem().then();

            const fetchEdgeCategoryItem = async () => {
                const response = await getData<ProductCategoryItem>(
                    PATH_PRODUCT_CONFIG + 'edge-category-item',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setEdgeCategoryItemValue(response.data);
                }
            }
            fetchEdgeCategoryItem().then();

            const fetchServiceCategoryItem = async () => {
                const response = await getData<ProductCategoryItem>(
                    PATH_PRODUCT_CONFIG + 'service-category-item',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setServiceCategoryItemValue(response.data);
                }
            }
            fetchServiceCategoryItem().then();

            const fetchSearchItems = async () => {
                const response = await getData<ProductCategoryItem[]>(
                    PATH_PRODUCT_CONFIG + 'search-items',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setSearchItemsValue(response.data);
                }
            }
            fetchSearchItems().then();
        }
    }, [healthState?.up]);

    const setVatRate = async (vatRate: number) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<number>>(
                PATH_PRODUCT_CONFIG + 'vat-rate',
                {value: vatRate},
                authState?.accessToken
            );
            if (response.data) {
                setVatRateValue(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setProductCategories = async (productCategories: ProductCategoryData[]) => {
        setBusy(true);
        try {
            const response = await postData<ProductCategory[]>(
                PATH_PRODUCT_CONFIG + 'product-categories',
                productCategories,
                authState?.accessToken
            );
            if (response.data) {
                setProductCategoriesValue(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setBoardCategoryItem = async (boardCategoryItemData: ProductCategoryItemData) => {
        setBusy(true);
        try {
            const response = await postData<ProductCategoryItem>(
                PATH_PRODUCT_CONFIG + 'board-category-item',
                boardCategoryItemData,
                authState?.accessToken
            );
            if (response.data) {
                setBoardCategoryItemValue(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setEdgeCategoryItem = async (edgeCategoryItemData: ProductCategoryItemData) => {
        setBusy(true);
        try {
            const response = await postData<ProductCategoryItem>(
                PATH_PRODUCT_CONFIG + 'edge-category-item',
                edgeCategoryItemData,
                authState?.accessToken
            );
            if (response.data) {
                setEdgeCategoryItemValue(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setServiceCategoryItem = async (serviceCategoryItemData: ProductCategoryItemData) => {
        setBusy(true);
        try {
            const response = await postData<ProductCategoryItem>(
                PATH_PRODUCT_CONFIG + 'service-category-item',
                serviceCategoryItemData,
                authState?.accessToken
            );
            if (response.data) {
                setServiceCategoryItemValue(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setSearchItems = async (searchItems: ProductCategoryItemData[]) => {
        setBusy(true);
        try {
            const response = await postData<ProductCategoryItem[]>(
                PATH_PRODUCT_CONFIG + 'search-items',
                searchItems,
                authState?.accessToken
            );
            if (response.data) {
                setSearchItemsValue(response.data);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    return (
        <productConfigStateContext.Provider
            value={
                {
                    busy,
                    vatRate,
                    setVatRate,
                    productCategories,
                    setProductCategories,
                    boardCategoryItem,
                    setBoardCategoryItem,
                    edgeCategoryItem,
                    setEdgeCategoryItem,
                    serviceCategoryItem,
                    setServiceCategoryItem,
                    searchItems,
                    setSearchItems
                }
            }
        >{children}
        </productConfigStateContext.Provider>
    );
}

export default ProductConfigStateProvider;

export const useProductConfigState = () => {
    return useContext(productConfigStateContext);
}
