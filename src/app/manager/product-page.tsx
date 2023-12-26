import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import {
    Product,
    ProductAttribute,
    ProductAttributeKey,
    ProductQuantity,
    ProductStockStatus,
    ProductUnitPrice
} from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data.ts';
import { useAuthState } from '../../component/state/auth-state-provider.tsx';
import { useDialogState } from '../../component/state/dialog-state-provider.tsx';
import { useResourceState } from '../../component/state/resource-state-provider.tsx';
import WiwaFormInput from '../../component/ui/wiwa-form-input.tsx';
import WiwaSelect from '../../component/ui/wiwa-select.tsx';
import WiwaProductStockStatus from '../../component/app/wiwa-product-stock-status.tsx';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer.tsx';
import WiwaButton from '../../component/ui/wiwa-button';
import { Edit } from 'react-feather';
import { createPortal } from 'react-dom';
import MdDialog from '../../component/dialog/md-dialog';
import WiwaProductAttributes from '../../component/app/wiwa-product-attributes.tsx';
import BaseDialog from '../../component/dialog/base-dialog.tsx';
import WiwaFormCheckBox from '../../component/ui/wiwa-form-check-box.tsx';

const PATH_PRODUCTS = CONTEXT_PATH + 'products';

const PRODUCT_ATTRIBUTES_DIALOG_ID = 'product-attributes-dialog-001';
const PRODUCT_DESCRIPTION_DIALOG_ID = 'product-description-dialog-001';

const ProductPage = () => {
    const {productId} = useParams();

    const navigate = useNavigate();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [id, setId] = useState<number>();

    const [code, setCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [description, setDescription] = useState('');

    const [stockStatus, setStockStatus] = useState<ProductStockStatus>();
    const [stockStatusValid, setStockStatusValid] = useState(false);

    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);

    const [quantities, setQuantities] = useState<ProductQuantity[]>([]);

    const [unitPrices, setUnitPrices] = useState<ProductUnitPrice[]>([]);

    const [codeListItems, setCodeListItems] = useState<number[]>([]);

    const [error, setError] = useState<string>();

    const [showDescriptionDialog, setShowDescriptionDialog] = useState(false);
    const [showAttributesDialog, setShowAttributesDialog] = useState(false);

    const [changed, setChanged] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId !== 'new') {
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
                        setId(response.data.id);

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
    }, [productId]);

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
                        <div className="text-lg md:text-xl font-bold text-center">
                            {resourceState?.manager?.products.product.title}
                        </div>
                        <div className="flex flex-row w-full gap-5">
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
                                        <label className="label grow">
                                           <span
                                               className="label-text">{resourceState?.manager?.products.product.descriptionLabel}</span>
                                        </label>
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
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row w-full">
                                        <div className="flex flex-row grow">
                                            <WiwaProductAttributes attributes={attributes.length > 0 ? attributes : [
                                                {key: ProductAttributeKey.BOARD_CODE, value: ''},
                                                {key: ProductAttributeKey.STRUCTURE_CODE, value: ''},
                                                {key: ProductAttributeKey.ORIENTATION, value: 'false'}
                                            ]}/>
                                        </div>
                                        <WiwaButton
                                            title={resourceState?.common?.action.edit}
                                            className="btn-primary btn-xs"
                                            onClick={() => setShowAttributesDialog(true)}
                                        >
                                            <Edit size={18}/>
                                        </WiwaButton>
                                    </div>
                                    <div className="flex w-full">
                                        quantities
                                    </div>
                                    <div className="flex w-full">
                                        unit prices
                                    </div>
                                    <div className="flex w-full">
                                        pictures
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
            </>
    )
}

export default ProductPage;

const ProductDescriptionDialog = (
    {
        description,
        setDescription,
        showDialog,
        setShowDialog
    }: {
        description: string,
        setDescription: (description: string) => void,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void
    }) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(description);
    }, [description, showDialog]);

    const okHandler = () => {
        setDescription(value);
        setShowDialog(false);
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <MdDialog
            disabled={false}
            id={PRODUCT_DESCRIPTION_DIALOG_ID}
            showDialog={showDialog}
            title={resourceState?.manager?.products.product.title}
            label={resourceState?.manager?.products.product.descriptionLabel}
            placeholder={resourceState?.admin?.cookiesInfo.valuePlaceholder}
            value={value}
            setValue={setValue}
            rows={20}
            okHandler={okHandler}
            cancelHandler={() => setShowDialog(false)}
        />
        , dialogState.modalRoot))
}

const ProductAttributesDialog = (
    {
        attributes,
        setAttributes,
        showDialog,
        setShowDialog
    }: {
        attributes: ProductAttribute[],
        setAttributes: (attributes: ProductAttribute[]) => void,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void
    }) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [boardCode, setBoardCode] = useState('');
    const [structureCode, setStructureCode] = useState('');
    const [orientation, setOrientation] = useState(false);

    useEffect(() => {
        attributes.forEach(value => {
            switch (value.key) {
                case ProductAttributeKey.BOARD_CODE:
                    setBoardCode(value.value);
                    break;
                case ProductAttributeKey.STRUCTURE_CODE:
                    setStructureCode(value.value);
                    break;
                case ProductAttributeKey.ORIENTATION:
                    setOrientation(value.value === 'true');
                    break;
            }
        });
    }, [attributes, showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
            <BaseDialog id={PRODUCT_ATTRIBUTES_DIALOG_ID} showDialog={showDialog}
                        closeHandler={() => setShowDialog(false)}>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center">
                            {resourceState?.manager?.products.product.attributes}
                        </div>

                        <WiwaFormInput
                            label={resourceState?.common?.productAttributeKey.boardCode}
                            value={boardCode}
                            setValue={setBoardCode}
                        />

                        <WiwaFormInput
                            label={resourceState?.common?.productAttributeKey.structureCode}
                            value={structureCode}
                            setValue={setStructureCode}
                        />

                        <WiwaFormCheckBox className="py-5" value={orientation} setValue={setOrientation}>
                            <span
                                className="label-text pl-2">{resourceState?.common?.productAttributeKey.orientation}</span>
                        </WiwaFormCheckBox>

                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                onClick={() => {
                                    setAttributes([
                                        {key: ProductAttributeKey.BOARD_CODE, value: boardCode},
                                        {key: ProductAttributeKey.STRUCTURE_CODE, value: structureCode},
                                        {key: ProductAttributeKey.ORIENTATION, value: orientation ? 'true' : 'false'}
                                    ]);
                                    setShowDialog(false);
                                }}
                            >{resourceState?.common?.action.ok}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    setShowDialog(false);
                                }}
                            >{resourceState?.common?.action.cancel}
                            </WiwaButton>
                        </div>
                    </div>
                </div>
            </BaseDialog>
            , dialogState.modalRoot)
    )
}
