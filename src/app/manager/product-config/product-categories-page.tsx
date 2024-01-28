import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Trash } from 'react-feather';

import WiwaSelectCodeListDialog from '../../../component/app/wiwa-select-code-list-dialog';
import CodeListStateProvider from '../../../component/state/code-list-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../../component/state/dialog-state-provider';
import { useProductConfigState } from '../../../component/state/product-config-state-provider';
import { useResourceState } from '../../../component/state/resource-state-provider';
import WiwaButton from '../../../component/ui/wiwa-button';
import { CodeList, ProductCategory } from '../../../model/service';

const SELECT_CODE_LIST_DIALOG_ID = 'select-code-list-dialog-001';

const ProductCategoriesPage = () => {
    const navigate = useNavigate();

    const dialogState = useDialogState();
    const productConfigState = useProductConfigState();
    const resourceState = useResourceState();

    const [data, setData] = useState<ProductCategory[]>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        setChanged(false);
        if (productConfigState?.productCategories) {
            setData([...productConfigState.productCategories]);
        } else {
            setData(undefined);
        }
    }, [productConfigState?.productCategories]);

    const addHandler = (codeList: CodeList) => {
        if (data) {
            const newData = data.filter(item => item.id !== codeList.id);
            newData.push({...codeList});
            setData(newData);
            setChanged(true);
        }
    }

    const deleteHandler = (id: number) => {
        if (data) {
            setData(data.filter(item => item.id !== id));
            setChanged(true);
        }
    }

    const confirmHandler = async () => {
        if (data) {
            const response = await productConfigState?.setProductCategories(
                data.map(item => {
                    return {categoryId: item.id}
                })
            );
            if (response?.error) {
                setError(resourceState?.manager?.productConfig.productCategories.error);
            }
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
                            {resourceState?.manager?.productConfig.productCategories.title}
                        </div>
                        <div className="join">
                            <WiwaButton
                                className="btn-primary join-item"
                                title={resourceState?.manager?.productConfig.productCategories.confirm}
                                disabled={!changed || productConfigState?.busy}
                                onClick={confirmHandler}
                            ><Check size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="btn-secondary join-item"
                                title={resourceState?.manager?.productConfig.productCategories.back}
                                onClick={() => navigate('/manager/product-config/index')}
                            ><ArrowLeft size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.manager?.productConfig.productCategories.id}</th>
                                <th>{resourceState?.manager?.productConfig.productCategories.code}</th>
                                <th>{resourceState?.manager?.productConfig.productCategories.name}</th>
                                <th>
                                    <WiwaButton
                                        title={resourceState?.manager?.productConfig.productCategories.addProductCategory.title}
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
                            {data?.map(productCategory =>
                                <tr key={productCategory.id} className="hover">
                                    <td>{productCategory.id}</td>
                                    <td>{productCategory.code}</td>
                                    <td>{productCategory.name}</td>
                                    <th>
                                        <WiwaButton
                                            className="btn-accent btn-xs join-item"
                                            title={resourceState?.manager?.productConfig.productCategories.deleteProductCategory.title}
                                            disabled={productConfigState?.busy}
                                            onClick={() => {
                                                dialogState?.showDialog({
                                                    type: DialogType.YES_NO,
                                                    title: resourceState?.manager?.productConfig.productCategories.deleteProductCategory.title,
                                                    message: resourceState?.manager?.productConfig.productCategories.deleteProductCategory.message,
                                                    callback: (answer: DialogAnswer) => {
                                                        if (answer === DialogAnswer.YES) {
                                                            deleteHandler(productCategory.id);
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

                <CodeListStateProvider>
                    <WiwaSelectCodeListDialog
                        dialogId={SELECT_CODE_LIST_DIALOG_ID}
                        showDialog={showDialog}
                        setShowDialog={setShowDialog}
                        onSelectCodeList={addHandler}
                    />
                </CodeListStateProvider>
            </>
    )
}

export default ProductCategoriesPage;
