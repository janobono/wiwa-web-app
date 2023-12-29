import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { Product, ProductAttribute, ProductQuantity, ProductStockStatus, ProductUnitPrice } from '../../model/service';
import { CONTEXT_PATH, getData, postData, putData } from '../../data.ts';
import { useAuthState } from '../../component/state/auth-state-provider.tsx';
import { useResourceState } from '../../component/state/resource-state-provider.tsx';
import WiwaFormInput from '../../component/ui/wiwa-form-input.tsx';
import WiwaSelect from '../../component/ui/wiwa-select.tsx';
import WiwaProductStockStatus from '../../component/app/wiwa-product-stock-status.tsx';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer.tsx';
import WiwaButton from '../../component/ui/wiwa-button';
import { Check, Edit } from 'react-feather';
import WiwaProductAttributes from '../../component/app/wiwa-product-attributes.tsx';
import WiwaProductQuantities from '../../component/app/wiwa-product-quantities.tsx';
import ProductDescriptionDialog from './product/product-description-dialog.tsx';
import ProductAttributesDialog from './product/product-attributes-dialog.tsx';
import ProductQuantitiesDialog from './product/product-quantities-dialog.tsx';

const PATH_PRODUCTS = CONTEXT_PATH + 'products';

const ProductPage = () => {
    const navigate = useNavigate();

    const {productId} = useParams();

    const authState = useAuthState();
    const resourceState = useResourceState();

    const [code, setCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [description, setDescription] = useState<string>();

    const [stockStatus, setStockStatus] = useState<ProductStockStatus>();
    const [stockStatusValid, setStockStatusValid] = useState(false);

    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);

    const [quantities, setQuantities] = useState<ProductQuantity[]>([]);

    const [unitPrices, setUnitPrices] = useState<ProductUnitPrice[]>([]);

    const [codeListItems, setCodeListItems] = useState<number[]>([]);

    const [error, setError] = useState<string>();

    const [showDescriptionDialog, setShowDescriptionDialog] = useState(false);
    const [showAttributesDialog, setShowAttributesDialog] = useState(false);
    const [showQuantitiesDialog, setShowQuantitiesDialog] = useState(false);
    const [showUnitPricesDialog, setShowUnitPricesDialog] = useState(false);
    const [showPicturesDialog, setShowPicturesDialog] = useState(false);
    const [showCodeListsDialog, setShowCodeListsDialog] = useState(false);

    const [changed, setChanged] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const isEditMode = () => {
        return productId !== 'new';
    }

    const confirmHandler = async () => {
        setSubmitting(true);
        try {
            const productData = {
                code,
                name,
                description,
                stockStatus,
                attributes,
                quantities
            }
            let response;
            if (isEditMode()) {
                response = await putData<Product>(
                    PATH_PRODUCTS + '/' + productId,
                    productData,
                    authState?.accessToken || ''
                );
            } else {
                response = await postData<Product>(
                    PATH_PRODUCTS,
                    productData,
                    authState?.accessToken || ''
                );
            }
            if (response.error) {
                setError(response.error.message);
            } else {
                if (!isEditMode()) {
                    navigate('/manager/products/' + response.data?.id);
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            if (isEditMode()) {
                setError(undefined);
                if (authState?.accessToken !== undefined) {
                    const response = await getData<Product>(
                        PATH_PRODUCTS + '/' + productId,
                        undefined,
                        authState?.accessToken || ''
                    );

                    if (response.error) {
                        setError(response.error.message);
                    } else if (response.data) {
                        setCode(response.data.code);
                        setCodeValid(true);

                        setName(response.data.name);
                        setNameValid(true);

                        setDescription(response.data.description);

                        setStockStatus(response.data.stockStatus);
                        setStockStatusValid(true);

                        setAttributes(response.data.attributes);

                        setQuantities(response.data.quantities);

                        setUnitPrices(response.data.unitPrices);

                        setCodeListItems(response.data.codeListItems);
                    }
                }
            }
        }
        fetchProduct().then();
    }, [authState?.accessToken, productId]);

    useEffect(() => {
        setFormValid(codeValid && nameValid && stockStatusValid);
    }, [codeValid, nameValid, stockStatusValid]);

    const stockStatusChangeHandler = (event: FormEvent<HTMLSelectElement>) => {
        setStockStatus(event.currentTarget.value as ProductStockStatus);
        setStockStatusValid(true);
        setChanged(true);
    }

    return (
        error ?
            <div className="flex flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row w-full">
                            <div className="text-lg md:text-xl font-bold text-center grow">
                                {resourceState?.manager?.products.product.title}
                            </div>
                            <WiwaButton
                                className="btn-secondary join-item"
                                title={resourceState?.manager?.products.product.confirm}
                                disabled={!formValid || !changed || submitting}
                                onClick={confirmHandler}
                            ><Check size={18}/>
                            </WiwaButton>
                        </div>
                        <div className="flex flex-row w-full gap-5 pb-2">
                            <div className="flex basis-1/6">
                                <WiwaFormInput
                                    label={resourceState?.manager?.products.product.codeLabel}
                                    required={true}
                                    placeholder={resourceState?.manager?.products.product.codePlaceholder}
                                    value={code}
                                    setValue={(value) => {
                                        setCode(value);
                                        setChanged(true);
                                    }}
                                    setValid={setCodeValid}
                                    validate={() => {
                                        if (code.trim().length === 0) {
                                            return {
                                                valid: false,
                                                message: resourceState?.manager?.products.product.codeRequired
                                            };
                                        }
                                        return {valid: true};
                                    }}
                                />
                            </div>
                            <div className="flex basis-3/6">
                                <WiwaFormInput
                                    label={resourceState?.manager?.products.product.nameLabel}
                                    required={true}
                                    placeholder={resourceState?.manager?.products.product.namePlaceholder}
                                    value={name}
                                    setValue={(value) => {
                                        setName(value);
                                        setChanged(true);
                                    }}
                                    setValid={setNameValid}
                                    validate={() => {
                                        if (name.trim().length === 0) {
                                            return {
                                                valid: false,
                                                message: resourceState?.manager?.products.product.nameRequired
                                            };
                                        }
                                        return {valid: true};
                                    }}
                                />
                            </div>
                            <div className="flex basis-2/6">
                                <div className="form-control w-full">
                                    <label className="label">
                            <span
                                className="label-text">{resourceState?.manager?.products.product.stockStatusLabel + '*'}</span>
                                    </label>
                                    <WiwaSelect
                                        onChange={event => stockStatusChangeHandler(event)}
                                    >
                                        <option disabled
                                                selected={stockStatus === undefined}>{resourceState?.manager?.products.product.stockStatusPlaceholder}</option>

                                        {Object.values(ProductStockStatus).map(value =>
                                            <option
                                                key={value}
                                                selected={stockStatus === value}
                                                value={value}><WiwaProductStockStatus stockStatus={value}/></option>
                                        )}
                                    </WiwaSelect>
                                    {stockStatus === undefined &&
                                        <label className="label">
                                          <span
                                              className="label-text-alt text-error">{resourceState?.manager?.products.product.stockStatusRequired}</span>
                                        </label>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-5">
                            <div className="flex basis-2/3">
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row w-full gap-5">
                                        <span className="grow label-text">
                                           {resourceState?.manager?.products.product.descriptionLabel}
                                        </span>
                                        <WiwaButton
                                            title={resourceState?.common?.action.edit}
                                            className="btn-primary btn-xs"
                                            onClick={() => setShowDescriptionDialog(true)}
                                        >
                                            <Edit size={18}/>
                                        </WiwaButton>
                                    </div>
                                    <div className="p-5 flex content-stretch justify-center items-center">
                                        <WiwaMarkdownRenderer className="prose max-w-none" md={description}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex basis-1/3">
                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex flex-row w-full">
                                        <span className="grow label-text">
                                            {resourceState?.manager?.products.product.attributes.title}
                                        </span>
                                        <WiwaButton
                                            title={resourceState?.common?.action.edit}
                                            className="btn-primary btn-xs"
                                            onClick={() => setShowAttributesDialog(true)}
                                        >
                                            <Edit size={18}/>
                                        </WiwaButton>
                                    </div>
                                    <WiwaProductAttributes attributes={attributes}/>

                                    <div className="flex flex-row w-full">
                                        <span className="grow label-text">
                                            {resourceState?.manager?.products.product.quantities.title}
                                        </span>
                                        <WiwaButton
                                            title={resourceState?.common?.action.edit}
                                            className="btn-primary btn-xs"
                                            onClick={() => setShowQuantitiesDialog(true)}
                                        >
                                            <Edit size={18}/>
                                        </WiwaButton>
                                    </div>
                                    <WiwaProductQuantities quantities={quantities}/>

                                    <div className="flex flex-row w-full">
                                        <span className="grow label-text">
                                            {resourceState?.manager?.products.product.unitPrices.title}
                                        </span>
                                        <WiwaButton
                                            title={resourceState?.common?.action.edit}
                                            className="btn-primary btn-xs"
                                            disabled={!isEditMode()}
                                            onClick={() => setShowUnitPricesDialog(true)}
                                        >
                                            <Edit size={18}/>
                                        </WiwaButton>
                                    </div>
                                    <div className="flex w-full">
                                        unit prices
                                    </div>

                                    <div className="flex flex-row w-full">
                                        <span className="grow label-text">
                                            {resourceState?.manager?.products.product.pictures.title}
                                        </span>
                                        <WiwaButton
                                            title={resourceState?.common?.action.edit}
                                            className="btn-primary btn-xs"
                                            disabled={!isEditMode()}
                                            onClick={() => setShowPicturesDialog(true)}
                                        >
                                            <Edit size={18}/>
                                        </WiwaButton>
                                    </div>
                                    <div className="flex w-full">
                                        pictures
                                    </div>

                                    <div className="flex flex-row w-full">
                                        <span className="grow label-text">
                                            {resourceState?.manager?.products.product.codeLists.title}
                                        </span>
                                        <WiwaButton
                                            title={resourceState?.common?.action.edit}
                                            className="btn-primary btn-xs"
                                            disabled={!isEditMode()}
                                            onClick={() => setShowCodeListsDialog(true)}
                                        >
                                            <Edit size={18}/>
                                        </WiwaButton>
                                    </div>
                                    <div className="flex w-full">
                                        code list items
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductDescriptionDialog
                    description={description}
                    setDescription={(value) => {
                        setDescription(value);
                        setChanged(true);
                    }}
                    showDialog={showDescriptionDialog}
                    setShowDialog={setShowDescriptionDialog}
                />

                <ProductAttributesDialog
                    attributes={attributes}
                    setAttributes={(value) => {
                        setAttributes(value);
                        setChanged(true);
                    }}
                    showDialog={showAttributesDialog}
                    setShowDialog={setShowAttributesDialog}
                />

                <ProductQuantitiesDialog
                    quantities={quantities}
                    setQuantities={(value) => {
                        setQuantities(value);
                        setChanged(true);
                    }}
                    showDialog={showQuantitiesDialog}
                    setShowDialog={setShowQuantitiesDialog}
                />
            </>
    )
}

export default ProductPage;
