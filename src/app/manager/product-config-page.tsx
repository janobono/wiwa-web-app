import { useState } from 'react';
import { useProductConfigState } from '../../component/state/product-config-provider.tsx';
import { useResourceState } from '../../component/state/resource-state-provider.tsx';
import WiwaButton from '../../component/ui/wiwa-button.tsx';
import { Edit } from 'react-feather';
import WiwaValueNumber from '../../component/app/wiwa-value-number.tsx';

const ProductConfigPage = () => {
    const productConfigState = useProductConfigState();
    const resourceState = useResourceState();


    const [error, setError] = useState<string>();

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
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
                                        onClick={() => {

                                        }}
                                    ><Edit size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>{resourceState?.manager?.productConfig.productCategories.title}</th>
                                <td>{productConfigState?.productCategories}</td>
                                <th>
                                    <WiwaButton
                                        className="btn-primary md:btn-xs"
                                        title={resourceState?.common?.action.edit}
                                        disabled={productConfigState?.busy}
                                        onClick={() => {

                                        }}
                                    ><Edit size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>{resourceState?.manager?.productConfig.boardCategory.title}</th>
                                <td>{productConfigState?.boardCategoryId}</td>
                                <th>
                                    <WiwaButton
                                        className="btn-primary md:btn-xs"
                                        title={resourceState?.common?.action.edit}
                                        disabled={productConfigState?.busy}
                                        onClick={() => {

                                        }}
                                    ><Edit size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>{resourceState?.manager?.productConfig.edgeCategory.title}</th>
                                <td>{productConfigState?.edgeCategoryId}</td>
                                <th>
                                    <WiwaButton
                                        className="btn-primary md:btn-xs"
                                        title={resourceState?.common?.action.edit}
                                        disabled={productConfigState?.busy}
                                        onClick={() => {

                                        }}
                                    ><Edit size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>{resourceState?.manager?.productConfig.serviceCategory.title}</th>
                                <td>{productConfigState?.serviceCategoryId}</td>
                                <th>
                                    <WiwaButton
                                        className="btn-primary md:btn-xs"
                                        title={resourceState?.common?.action.edit}
                                        disabled={productConfigState?.busy}
                                        onClick={() => {

                                        }}
                                    ><Edit size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>{resourceState?.manager?.productConfig.searchCategories.title}</th>
                                <td>{productConfigState?.searchCategories}</td>
                                <th>
                                    <WiwaButton
                                        className="btn-primary md:btn-xs"
                                        title={resourceState?.common?.action.edit}
                                        disabled={productConfigState?.busy}
                                        onClick={() => {

                                        }}
                                    ><Edit size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
    )
}

export default ProductConfigPage;
