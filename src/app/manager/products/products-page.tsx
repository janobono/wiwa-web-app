import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Search, Trash } from 'react-feather';

import { DialogAnswer, DialogType, useDialogState } from '../../../component/state/dialog-state-provider';
import { useProductState } from '../../../component/state/product-state-provider';
import { useResourceState } from '../../../component/state/resource-state-provider';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaInput from '../../../component/ui/wiwa-input';
import WiwaPageable from '../../../component/ui/wiwa-pageable';

const ProductsPage = () => {
    const navigate = useNavigate();

    const dialogState = useDialogState();
    const resourceState = useResourceState();
    const productState = useProductState();

    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [error, setError] = useState<string>();

    const fetchData = async () => {
        setError(undefined);
        const response = await productState?.getProducts(page, 10, searchField);
        if (response?.error) {
            setError(resourceState?.manager?.products.fetchDataError);
        }
    }

    const deleteHandler = async (id: number) => {
        setError(undefined);
        const response = await productState?.deleteProduct(id);
        if (response?.error) {
            setError(resourceState?.manager?.products.deleteProduct.error);
        }
    }

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        setPrevious(productState?.data !== undefined && !productState?.data?.first);
        setNext(productState?.data !== undefined && !productState?.data?.last);
    }, [productState?.data]);

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
                                        disabled={productState?.busy}
                                        onClick={() => navigate('/manager/products/new/index')}
                                    >
                                        <Plus size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {productState?.data?.content.map(product =>
                                <tr key={product.id} className="hover">
                                    <td>{product.id}</td>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>{product.stockStatus}</td>
                                    <th>
                                        <div className="join">
                                            <WiwaButton
                                                title={resourceState?.manager?.products.editProduct}
                                                className="btn-primary md:btn-xs join-item"
                                                disabled={productState?.busy}
                                                onClick={() => navigate('/manager/products/' + product.id + '/index')}
                                            >
                                                <Edit size={18}/>
                                            </WiwaButton>
                                            <WiwaButton
                                                className="btn-accent md:btn-xs join-item"
                                                title={resourceState?.manager?.products.deleteProduct.title}
                                                disabled={productState?.busy}
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
                            disabled={productState?.busy}
                        />
                    </div>
                </div>
            </>
    )
}

export default ProductsPage;
