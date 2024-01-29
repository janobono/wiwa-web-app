import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Trash } from 'react-feather';

import WiwaSelectCodeListItemDialog from '../../../component/app/wiwa-select-code-list-item-dialog';
import CodeListStateProvider, { useCodeListState } from '../../../component/state/code-list-state-provider';
import CodeListItemStateProvider from '../../../component/state/code-list-item-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../../component/state/dialog-state-provider';
import { useProductConfigState } from '../../../component/state/product-config-state-provider';
import { useResourceState } from '../../../component/state/resource-state-provider';
import WiwaButton from '../../../component/ui/wiwa-button';
import { CodeListItem, ProductCategory, ProductCategoryItem } from '../../../model/service';

const SELECT_CODE_LIST_ITEM_DIALOG_ID = 'select-code-list-item-dialog-001';

const SearchItemsPage = () => {
    return (
        <CodeListStateProvider>
            <CodeListItemStateProvider>
                <SearchItemsPageContent/>
            </CodeListItemStateProvider>
        </CodeListStateProvider>
    )
}

export default SearchItemsPage;

const SearchItemsPageContent = () => {
    const navigate = useNavigate();

    const codeListState = useCodeListState();
    const dialogState = useDialogState();
    const productConfigState = useProductConfigState();
    const resourceState = useResourceState();

    const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
    const [data, setData] = useState<ProductCategoryItem[]>([]);
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (productConfigState?.productCategories) {
            setProductCategories([...productConfigState.productCategories]);
        } else {
            setProductCategories([]);
        }
    }, [productConfigState?.productCategories]);

    useEffect(() => {
        setChanged(false);
        if (productConfigState?.searchItems) {
            setData([...productConfigState.searchItems]);
        } else {
            setData([]);
        }
    }, [productConfigState?.searchItems]);

    const addHandler = async (codeListItem: CodeListItem) => {
        const response = await codeListState?.getCodeList(codeListItem.codeListId);
        if (response?.data) {
            const newData = data.filter(item => item.id !== codeListItem.id);
            newData.push({
                id: codeListItem.id,
                code: codeListItem.code,
                name: codeListItem.value,
                category: {...response.data}
            });
            setData(newData);
            setChanged(true);
        }
    }

    const deleteHandler = (id: number) => {
        setData(data.filter(item => item.id !== id));
        setChanged(true);
    }

    const confirmHandler = async () => {
        const response = await productConfigState?.setSearchItems(
            data.map(item => {
                return {itemId: item.id, categoryId: item.category.id}
            })
        );
        if (response?.error) {
            setError(resourceState?.manager?.productConfig.searchItems.error);
        }
    }

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-row w-full">
                        <div className="text-lg md:text-xl font-bold text-center grow">
                            {resourceState?.manager?.productConfig.searchItems.title}
                        </div>
                        <div className="join">
                            <WiwaButton
                                className="btn-primary join-item"
                                title={resourceState?.manager?.productConfig.searchItems.confirm}
                                disabled={!changed || productConfigState?.busy}
                                onClick={confirmHandler}
                            ><Check size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="btn-secondary join-item"
                                title={resourceState?.manager?.productConfig.searchItems.back}
                                onClick={() => navigate('/manager/product-config/index')}
                            ><ArrowLeft size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.manager?.productConfig.searchItems.id}</th>
                                <th>{resourceState?.manager?.productConfig.searchItems.code}</th>
                                <th>{resourceState?.manager?.productConfig.searchItems.name}</th>
                                <th>{resourceState?.manager?.productConfig.searchItems.categoryId}</th>
                                <th>{resourceState?.manager?.productConfig.searchItems.categoryCode}</th>
                                <th>{resourceState?.manager?.productConfig.searchItems.categoryName}</th>
                                <th>
                                    <WiwaButton
                                        title={resourceState?.manager?.productConfig.searchItems.addSearchItem.title}
                                        className="btn-primary btn-xs"
                                        disabled={productConfigState?.busy}
                                        onClick={() => {
                                            setShowDialog(true);
                                        }}
                                    >
                                        <Plus size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map(productCategoryItem =>
                                <tr key={productCategoryItem.id} className="hover">
                                    <td>{productCategoryItem.id}</td>
                                    <td>{productCategoryItem.code}</td>
                                    <td>{productCategoryItem.name}</td>
                                    <td>{productCategoryItem.category.id}</td>
                                    <td>{productCategoryItem.category.code}</td>
                                    <td>{productCategoryItem.category.name}</td>
                                    <th>
                                        <WiwaButton
                                            className="btn-accent btn-xs join-item"
                                            title={resourceState?.manager?.productConfig.searchItems.deleteSearchItem.title}
                                            disabled={productConfigState?.busy}
                                            onClick={() => {
                                                dialogState?.showDialog({
                                                    type: DialogType.YES_NO,
                                                    title: resourceState?.manager?.productConfig.searchItems.deleteSearchItem.title,
                                                    message: resourceState?.manager?.productConfig.searchItems.deleteSearchItem.message,
                                                    callback: (answer: DialogAnswer) => {
                                                        if (answer === DialogAnswer.YES) {
                                                            deleteHandler(productCategoryItem.id);
                                                        }
                                                    }
                                                });
                                            }}
                                        ><Trash size={18}/>
                                        </WiwaButton>
                                    </th>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {productCategories.length > 0 &&
                    <WiwaSelectCodeListItemDialog
                        dialogId={SELECT_CODE_LIST_ITEM_DIALOG_ID}
                        codeLists={productCategories}
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                        onSelectCodeListItem={addHandler}
                    />
                }
            </>
    )
}
