import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Trash } from 'react-feather';

import WiwaSelectQuantityUnit from '../../component/app/wiwa-select-quantity-unit';
import WiwaValueDate from '../../component/app/wiwa-value-date';
import WiwaValueNumber from '../../component/app/wiwa-value-number';
import WiwaUnitValue from '../../component/app/wiwa-unit-value';
import BaseDialog from '../../component/dialog/base-dialog';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useProductState } from '../../component/state/product-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import { ProductUnitPrice, UnitId } from '../../model/service';

const PRICE_DIALOG_ID = 'price-dialog-001';

const ProductUnitPricesPage = () => {
    const navigate = useNavigate();

    const {productId} = useParams();

    const dialogState = useDialogState();
    const productState = useProductState();
    const resourceState = useResourceState();

    const [title, setTitle] = useState<string>();
    const [data, setData] = useState<ProductUnitPrice[]>();
    const [error, setError] = useState<string>();

    const [showDialog, setShowDialog] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        setError(undefined);
        if (productId) {
            const fetchData = async () => {
                const response = await productState?.getProduct(Number(productId));
                if (response?.data) {
                    setTitle(response.data.code + '-' + response.data.name);
                    setData(response.data.unitPrices);
                } else if (response?.error) {
                    setError(resourceState?.manager?.products.product.fetchDataError);
                }
            }
            fetchData().then();
        } else {
            setTitle(undefined);
        }
    }, [productId]);

    const addHandler = (price: ProductUnitPrice) => {
        if (data) {
            const newData = [...data];
            const index = newData.findIndex(value => value.validFrom === price.validFrom);
            if (index !== -1) {
                newData[index] = price;
            } else {
                newData.push(price);
            }
            setData(newData);
            setChanged(true);
        }
    }

    const deleteHandler = (validFrom: string) => {
        if (data) {
            const newData = [...data];
            const index = newData.findIndex(value => value.validFrom === validFrom);
            if (index !== -1) {
                newData.splice(index, 1);
                setData(newData);
                setChanged(true);
            }
        }
    }

    const confirmHandler = async () => {
        if (data) {
            const response = await productState?.setProductUnitPrices(Number(productId), data);
            if (response?.error) {
                setError(resourceState?.manager?.products.product.unitPrices.confirmDataError);
            } else {
                navigate('/manager/products/' + productId);
            }
        }
    }

    return (
        error ?
            <div className="flex flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="flex flex-row w-full items-center justify-center">
                        <div className="label-text text-center grow">
                            {resourceState?.manager?.products.product.unitPrices.title + ': ' + title}
                        </div>
                        <div className="join">
                            <WiwaButton
                                className="btn-primary join-item"
                                title={resourceState?.manager?.products.product.unitPrices.confirm}
                                disabled={!changed || productState?.busy}
                                onClick={confirmHandler}
                            ><Check size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="btn-secondary join-item"
                                title={resourceState?.manager?.products.product.back}
                                onClick={() => navigate('/manager/products/' + productId)}
                            ><ArrowLeft size={18}/>
                            </WiwaButton>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.manager?.products.product.unitPrices.validFrom}</th>
                                <th>{resourceState?.manager?.products.product.unitPrices.price}</th>
                                <th>
                                    <WiwaButton
                                        title={resourceState?.manager?.products.product.unitPrices.addPrice.title}
                                        className="btn-primary btn-xs"
                                        disabled={productState?.busy}
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
                            {data?.map(unitPrice =>
                                <tr key={unitPrice.validFrom} className="hover">
                                    <td><WiwaValueDate value={unitPrice.validFrom}/></td>
                                    <td><WiwaValueNumber value={unitPrice.value}/><span> </span><WiwaUnitValue
                                        unitId={unitPrice.unit}/></td>
                                    <th>
                                        <WiwaButton
                                            className="btn-accent btn-xs join-item"
                                            title={resourceState?.manager?.products.product.unitPrices.deletePrice.title}
                                            disabled={productState?.busy}
                                            onClick={() => {
                                                dialogState?.showDialog({
                                                    type: DialogType.YES_NO,
                                                    title: resourceState?.manager?.products.product.unitPrices.deletePrice.title,
                                                    message: resourceState?.manager?.products.product.unitPrices.deletePrice.message,
                                                    callback: (answer: DialogAnswer) => {
                                                        if (answer === DialogAnswer.YES) {
                                                            deleteHandler(unitPrice.validFrom);
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

                <PriceDialog
                    showDialog={showDialog}
                    okHandler={(price) => {
                        addHandler(price);
                        setShowDialog(false);
                    }}
                    cancelHandler={() => {
                        setShowDialog(false);
                    }}
                />
            </>
    )
}

export default ProductUnitPricesPage;

const PriceDialog = ({showDialog, okHandler, cancelHandler}: {
    showDialog: boolean,
    okHandler: (price: ProductUnitPrice) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [validFrom, setValidFrom] = useState('');
    const [validFromValid, setValidFromValid] = useState(false);

    const [value, setValue] = useState('');
    const [valueValid, setValueValid] = useState(false);

    const [unitId, setUnitId] = useState(UnitId.EUR.toString());

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setValidFrom('');
        setValidFromValid(false);

        setValue('');
        setValueValid(false);
    }, [showDialog]);

    useEffect(() => {
        setFormValid(validFromValid && valueValid);
    }, [validFromValid, valueValid]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={PRICE_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.products.product.unitPrices.addPrice.title}
                    </div>

                    <WiwaFormInput
                        type="date"
                        label={resourceState?.manager?.products.product.unitPrices.addPrice.validFrom}
                        required={true}
                        value={validFrom}
                        setValue={setValidFrom}
                        setValid={setValidFromValid}
                        validate={() => {
                            if (validFrom.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.products.product.unitPrices.addPrice.validFromRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        label={resourceState?.manager?.products.product.unitPrices.addPrice.value}
                        required={true}
                        value={value}
                        setValue={setValue}
                        setValid={setValueValid}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.products.product.unitPrices.addPrice.valueRequired
                                };
                            }
                            return {valid: true};
                        }}
                        min="0"
                    />

                    <div className="form-control w-full">
                        <label className="label">
                            <span
                                className="label-text">{resourceState?.manager?.products.product.unitPrices.addPrice.unit + '*'}</span>
                        </label>
                        <WiwaSelectQuantityUnit
                            value={unitId}
                            setValue={setUnitId}
                            unitIds={[UnitId.EUR]}/>
                    </div>

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!formValid}
                            onClick={() => {
                                okHandler({validFrom, value: Number(value), unit: unitId as UnitId});
                            }}
                        >{resourceState?.common?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={() => {
                                cancelHandler();
                            }}
                        >{resourceState?.common?.action.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
