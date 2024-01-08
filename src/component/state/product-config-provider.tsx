import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAuthState } from './auth-state-provider';
import { useHealthState } from './health-state-provider';
import { SingleValueBody } from '../../model/service';
import { ClientResponse, CONTEXT_PATH, getData, postData } from '../../data';

const PATH_PRODUCT_CONFIG = CONTEXT_PATH + 'product-config/';

export interface ProductConfigState {
    busy: boolean,
    vatRate?: number,
    setVatRate: (vatRate: number) => Promise<ClientResponse<SingleValueBody<number>>>,
    productCategories?: number[],
    setProductCategories: (productCategories: number[]) => Promise<ClientResponse<number[]>>,
    boardCategoryId?: number,
    setBoardCategoryId: (boardCategoryId: number) => Promise<ClientResponse<SingleValueBody<number>>>,
    edgeCategoryId?: number,
    setEdgeCategoryId: (edgeCategoryId: number) => Promise<ClientResponse<SingleValueBody<number>>>,
    serviceCategoryId?: number,
    setServiceCategoryId: (serviceCategoryId: number) => Promise<ClientResponse<SingleValueBody<number>>>,
    searchCategories?: number[],
    setSearchCategories: (searchCategories: number[]) => Promise<ClientResponse<number[]>>
}

const productConfigStateContext = createContext<ProductConfigState | undefined>(undefined);

const ProductConfigStateProvider = ({children}: { children: ReactNode }) => {
    const authState = useAuthState();
    const healthState = useHealthState();

    const [busy, setBusy] = useState(false);
    const [vatRate, setVatRateValue] = useState<number>();
    const [productCategories, setProductCategoriesValue] = useState<number[]>();
    const [boardCategoryId, setBoardCategoryIdValue] = useState<number>();
    const [edgeCategoryId, setEdgeCategoryIdValue] = useState<number>();
    const [serviceCategoryId, setServiceCategoryIdValue] = useState<number>();
    const [searchCategories, setSearchCategoriesValue] = useState<number[]>();

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
                const response = await getData<number[]>(
                    PATH_PRODUCT_CONFIG + 'product-categories',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setProductCategoriesValue(response.data);
                }
            }
            fetchProductCategories().then();

            const fetchBoardCategoryId = async () => {
                const response = await getData<SingleValueBody<number>>(
                    PATH_PRODUCT_CONFIG + 'board-category-id',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setBoardCategoryIdValue(response.data.value);
                }
            }
            fetchBoardCategoryId().then();

            const fetchEdgeCategoryId = async () => {
                const response = await getData<SingleValueBody<number>>(
                    PATH_PRODUCT_CONFIG + 'edge-category-id',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setEdgeCategoryIdValue(response.data.value);
                }
            }
            fetchEdgeCategoryId().then();

            const fetchServiceCategoryId = async () => {
                const response = await getData<SingleValueBody<number>>(
                    PATH_PRODUCT_CONFIG + 'service-category-id',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setServiceCategoryIdValue(response.data.value);
                }
            }
            fetchServiceCategoryId().then();

            const fetchSearchCategories = async () => {
                const response = await getData<number[]>(
                    PATH_PRODUCT_CONFIG + 'search-categories',
                    undefined,
                    authState?.accessToken
                );
                if (response.data) {
                    setSearchCategoriesValue(response.data);
                }
            }
            fetchSearchCategories().then();
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

    const setProductCategories = async (productCategories: number[]) => {
        setBusy(true);
        try {
            const response = await postData<number[]>(
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

    const setBoardCategoryId = async (boardCategoryId: number) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<number>>(
                PATH_PRODUCT_CONFIG + 'board-category-id',
                {value: boardCategoryId},
                authState?.accessToken
            );
            if (response.data) {
                setBoardCategoryIdValue(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setEdgeCategoryId = async (edgeCategoryId: number) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<number>>(
                PATH_PRODUCT_CONFIG + 'edge-category-id',
                {value: edgeCategoryId},
                authState?.accessToken
            );
            if (response.data) {
                setEdgeCategoryIdValue(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setServiceCategoryId = async (serviceCategoryId: number) => {
        setBusy(true);
        try {
            const response = await postData<SingleValueBody<number>>(
                PATH_PRODUCT_CONFIG + 'service-category-id',
                {value: serviceCategoryId},
                authState?.accessToken
            );
            if (response.data) {
                setServiceCategoryIdValue(response.data.value);
            }
            return response;
        } finally {
            setBusy(false);
        }
    }

    const setSearchCategories = async (searchCategories: number[]) => {
        setBusy(true);
        try {
            const response = await postData<number[]>(
                PATH_PRODUCT_CONFIG + 'search-categories',
                searchCategories,
                authState?.accessToken
            );
            if (response.data) {
                setSearchCategoriesValue(response.data);
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
                    boardCategoryId,
                    setBoardCategoryId,
                    edgeCategoryId,
                    setEdgeCategoryId,
                    serviceCategoryId,
                    setServiceCategoryId,
                    searchCategories,
                    setSearchCategories
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
