import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Search, Trash } from 'react-feather';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaInput from '../../component/ui/wiwa-input';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { Page, Product } from '../../model/service';
import { CONTEXT_PATH, deleteData, getData, setPageableQueryParams, setQueryParam } from '../../data';

const PATH_PRODUCTS = CONTEXT_PATH + 'products';

const ProductsPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [data, setData] = useState<Page<Product>>();
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const fetchData = async () => {
        setError(undefined);
        setSubmitting(true);
        try {
            if (authState?.accessToken !== undefined) {
                const pageable = {
                    page: page,
                    size: 10,
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

                if (response.error) {
                    setError(resourceState?.manager?.products.fetchDataError);
                } else if (response.data) {
                    setData(response.data);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    const deleteHandler = async (id: number) => {
        setSubmitting(true);
        setError(undefined);
        try {
            const response = await deleteData(
                PATH_PRODUCTS + '/' + id,
                authState?.accessToken || ''
            )
            if (response.error) {
                setError(resourceState?.manager?.products.deleteProduct.error);
            } else {
                await fetchData();
            }
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        setPrevious(data !== undefined && !data.first);
        setNext(data !== undefined && !data.last);
    }, [data]);

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="join pb-5 w-2/3">
                            <WiwaInput
                                className="join-item"
                                placeholder={resourceState?.manager?.products.searchProduct.placeholder}
                                value={searchField}
                                onChange={event => setSearchField(event.target.value)}
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        fetchData().then();
                                    }
                                }}
                            />
                            <WiwaButton
                                title={resourceState?.manager?.products.searchProduct.title}
                                className="join-item"
                                onClick={fetchData}
                            ><Search size={18}/></WiwaButton>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.manager?.products.id}</th>
                                <th>{resourceState?.manager?.products.code}</th>
                                <th>{resourceState?.manager?.products.name}</th>
                                <th>{resourceState?.manager?.products.stockStatus}</th>
                                <th>
                                    <WiwaButton
                                        title={resourceState?.manager?.products.addProduct}
                                        className="btn-primary md:btn-xs"
                                        disabled={submitting}
                                        onClick={() => navigate('new')}
                                    >
                                        <Plus size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.content.map(product =>
                                <tr key={product.id} className="hover">
                                    <td>{product.id}</td>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>{product.note}</td>
                                    <td>{product.stockStatus}</td>
                                    <th>
                                        <div className="join">
                                            <WiwaButton
                                                title={resourceState?.manager?.products.editProduct}
                                                className="btn-primary md:btn-xs join-item"
                                                disabled={submitting}
                                                onClick={() => navigate(product.id)}
                                            >
                                                <Edit size={18}/>
                                            </WiwaButton>
                                            <WiwaButton
                                                className="btn-accent md:btn-xs join-item"
                                                title={resourceState?.manager?.products.deleteProduct.title}
                                                disabled={submitting}
                                                onClick={() => {
                                                    dialogState?.showDialog({
                                                        type: DialogType.YES_NO,
                                                        title: resourceState?.manager?.products.deleteProduct.title,
                                                        message: resourceState?.manager?.products.deleteProduct.message,
                                                        callback: (answer: DialogAnswer) => {
                                                            if (answer === DialogAnswer.YES) {
                                                                deleteHandler(product.id).then();
                                                            }
                                                        }
                                                    });
                                                }}
                                            ><Trash size={18}/>
                                            </WiwaButton>
                                        </div>
                                    </th>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-center pt-5">
                        <WiwaPageable
                            isPrevious={previous}
                            previousHandler={() => setPage(page + 1)}
                            page={page + 1}
                            pageHandler={() => fetchData()}
                            isNext={next}
                            nextHandler={() => setPage(page - 1)}
                            disabled={submitting}
                        />
                    </div>
                </div>
            </>
    )
}

export default ProductsPage;
