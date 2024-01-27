import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'react-feather';

import { useProductConfigState } from '../../../component/state/product-config-state-provider.tsx';
import { useResourceState } from '../../../component/state/resource-state-provider.tsx';
import WiwaValueNumber from '../../../component/app/wiwa-value-number.tsx';
import WiwaButton from '../../../component/ui/wiwa-button.tsx';
import VatRateDialog from './vat-rate-dialog.tsx';



const ProductConfigPage = () => {
    const navigate = useNavigate();

    const productConfigState = useProductConfigState();
    const resourceState = useResourceState();

    const [showVatRateDialog, setShowVatRateDialog] = useState(false);

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
                            <td>{productConfigState?.productCategories?.length}</td>
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
                            <td>{productConfigState?.boardCategoryItem?.name}</td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productConfigState?.productCategories === undefined || productConfigState?.productCategories.length === 0}
                                    onClick={() => {

                                    }}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.edgeCategory.title}</th>
                            <td>{productConfigState?.edgeCategoryItem?.name}</td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productConfigState?.productCategories === undefined || productConfigState?.productCategories.length === 0}
                                    onClick={() => {

                                    }}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.serviceCategory.title}</th>
                            <td>{productConfigState?.serviceCategoryItem?.name}</td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productConfigState?.productCategories === undefined || productConfigState?.productCategories.length === 0}
                                    onClick={() => {

                                    }}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        <tr className="hover">
                            <th>{resourceState?.manager?.productConfig.searchCategories.title}</th>
                            <td>{productConfigState?.searchItems?.length}</td>
                            <th>
                                <WiwaButton
                                    className="btn-primary md:btn-xs"
                                    title={resourceState?.common?.action.edit}
                                    disabled={productConfigState?.busy || productConfigState?.productCategories === undefined || productConfigState?.productCategories.length === 0}
                                    onClick={() => navigate('/manager/product-config/search-categories')}
                                ><Edit size={18}/>
                                </WiwaButton>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <VatRateDialog showDialog={showVatRateDialog} setShowDialog={setShowVatRateDialog}/>
        </>
    )
}

export default ProductConfigPage;
