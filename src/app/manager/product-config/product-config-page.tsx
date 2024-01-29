import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'react-feather';

import VatRateDialog from './vat-rate-dialog';
import WiwaSelectCodeListItemDialog from '../../../component/app/wiwa-select-code-list-item-dialog';
import WiwaValueNumber from '../../../component/app/wiwa-value-number';
import CodeListStateProvider from '../../../component/state/code-list-state-provider';
import CodeListItemStateProvider from '../../../component/state/code-list-item-state-provider';
import { useProductConfigState } from '../../../component/state/product-config-state-provider';
import { useResourceState } from '../../../component/state/resource-state-provider';
import WiwaButton from '../../../component/ui/wiwa-button';
import { ProductCategory } from '../../../model/service';

const SELECT_BOARD_CATEGORY_DIALOG_ID = 'product-config-select-board-category-dialog-001';
const SELECT_EDGE_CATEGORY_DIALOG_ID = 'product-config-select-edge-category-dialog-001';
const SELECT_SERVICE_CATEGORY_DIALOG_ID = 'product-config-select-service-category-dialog-001';

const ProductConfigPage = () => {
    const navigate = useNavigate();

    const productConfigState = useProductConfigState();
    const resourceState = useResourceState();

    const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);

    const [showVatRateDialog, setShowVatRateDialog] = useState(false);
    const [showBoardCategoryDialog, setShowBoardCategoryDialog] = useState(false);
    const [showEdgeCategoryDialog, setShowEdgeCategoryDialog] = useState(false);
    const [showServiceCategoryDialog, setShowServiceCategoryDialog] = useState(false);

    useEffect(() => {
        if (productConfigState?.productCategories) {
            setProductCategories([...productConfigState.productCategories]);
        } else {
            setProductCategories([]);
        }
    }, [productConfigState?.productCategories]);

    return (
        <>
            <div className="flex flex-col p-5 w-full">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.vatRate.title}</th>
                            <td><WiwaValueNumber value={productConfigState?.vatRate}/></td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy}
                                    onClick={() => setShowVatRateDialog(true)}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.productCategories.title}</th>
                            <td>
                                <div className="flex flex-col gap-1">
                                    {productConfigState?.productCategories?.map(productCategory =>
                                        <div key={productCategory.id}
                                             className="badge badge-secondary">
                                            {productCategory.code}:{productCategory.name}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy}
                                    onClick={() => navigate('/manager/product-config/product-categories')}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.boardCategory.title}</th>
                            <td>
                                {productConfigState?.boardCategoryItem &&
                                    <div
                                        className="badge badge-secondary">
                                        {productConfigState.boardCategoryItem.category.code}:{productConfigState.boardCategoryItem.category.name}
                                        <div
                                            className="badge badge-primary">
                                            {productConfigState.boardCategoryItem.code}:{productConfigState.boardCategoryItem.name}
                                        </div>
                                    </div>
                                }
                            </td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productCategories.length === 0}
                                    onClick={() => setShowBoardCategoryDialog(true)}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.edgeCategory.title}</th>
                            <td>
                                {productConfigState?.edgeCategoryItem &&
                                    <div
                                        className="badge badge-secondary">
                                        {productConfigState.edgeCategoryItem.category.code}:{productConfigState.edgeCategoryItem.category.name}
                                        <div
                                            className="badge badge-primary">
                                            {productConfigState.edgeCategoryItem.code}:{productConfigState.edgeCategoryItem.name}
                                        </div>
                                    </div>
                                }
                            </td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productCategories.length === 0}
                                    onClick={() => setShowEdgeCategoryDialog(true)}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.serviceCategory.title}</th>
                            <td>
                                {productConfigState?.serviceCategoryItem &&
                                    <div
                                        className="badge badge-secondary">
                                        {productConfigState.serviceCategoryItem.category.code}:{productConfigState.serviceCategoryItem.category.name}
                                        <div
                                            className="badge badge-primary">
                                            {productConfigState.serviceCategoryItem.code}:{productConfigState.serviceCategoryItem.name}
                                        </div>
                                    </div>
                                }
                            </td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productCategories.length === 0}
                                    onClick={() => setShowServiceCategoryDialog(true)}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.searchItems.title}</th>
                            <td>
                                <div className="flex flex-col gap-1">
                                    {productConfigState?.searchItems?.map(searchItem =>
                                        <div
                                            key={searchItem.id}
                                            className="badge badge-secondary"
                                        >
                                            {searchItem.category.code}:{searchItem.category.name}
                                            <div
                                                className="badge badge-primary">
                                                {searchItem.code}:{searchItem.name}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productCategories.length === 0}
                                    onClick={() => navigate('/manager/product-config/search-items')}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <VatRateDialog showDialog={showVatRateDialog} setShowDialog={setShowVatRateDialog}/>

            {productCategories.length > 0 &&
                <CodeListStateProvider>
                    <CodeListItemStateProvider>
                        <WiwaSelectCodeListItemDialog
                            dialogId={SELECT_BOARD_CATEGORY_DIALOG_ID}
                            codeLists={productCategories}
                            showDialog={showBoardCategoryDialog}
                            setShowDialog={setShowBoardCategoryDialog}
                            onSelectCodeListItem={(codeListItem) => {
                                productConfigState?.setBoardCategoryItem({
                                    categoryId: codeListItem.codeListId,
                                    itemId: codeListItem.id
                                })
                            }}
                        />
                    </CodeListItemStateProvider>
                </CodeListStateProvider>
            }

            {productCategories.length > 0 &&
                <CodeListStateProvider>
                    <CodeListItemStateProvider>
                        <WiwaSelectCodeListItemDialog
                            dialogId={SELECT_EDGE_CATEGORY_DIALOG_ID}
                            codeLists={productCategories}
                            showDialog={showEdgeCategoryDialog}
                            setShowDialog={setShowEdgeCategoryDialog}
                            onSelectCodeListItem={(codeListItem) => {
                                productConfigState?.setEdgeCategoryItem({
                                    categoryId: codeListItem.codeListId,
                                    itemId: codeListItem.id
                                })
                            }}
                        />
                    </CodeListItemStateProvider>
                </CodeListStateProvider>
            }

            {productCategories.length > 0 &&
                <CodeListStateProvider>
                    <CodeListItemStateProvider>
                        <WiwaSelectCodeListItemDialog
                            dialogId={SELECT_SERVICE_CATEGORY_DIALOG_ID}
                            codeLists={productCategories}
                            showDialog={showServiceCategoryDialog}
                            setShowDialog={setShowServiceCategoryDialog}
                            onSelectCodeListItem={(codeListItem) => {
                                productConfigState?.setServiceCategoryItem({
                                    categoryId: codeListItem.codeListId,
                                    itemId: codeListItem.id
                                })
                            }}
                        />
                    </CodeListItemStateProvider>
                </CodeListStateProvider>
            }
        </>
    )
}

export default ProductConfigPage;
