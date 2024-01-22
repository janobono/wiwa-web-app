import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../../../component/dialog/base-dialog';
import { useDialogState } from '../../../component/state/dialog-state-provider';
import { useResourceState } from '../../../component/state/resource-state-provider';
import WiwaButton from '../../../component/ui/wiwa-button';
import { ProductQuantity, ProductQuantityKey, UnitId } from '../../../model/service';
import WiwaInput from '../../../component/ui/wiwa-input';
import WiwaSelectQuantityUnit from '../../../component/app/wiwa-select-quantity-unit.tsx';

const PRODUCT_QUANTITIES_DIALOG_ID = 'product-quantities-dialog-001';

const ProductQuantitiesDialog = (
    {
        quantities,
        setQuantities,
        showDialog,
        setShowDialog
    }: {
        quantities: ProductQuantity[],
        setQuantities: (quantities: ProductQuantity[]) => void,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void
    }) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [saleValue, setSaleValue] = useState('');
    const [saleUnitId, setSaleUnitId] = useState<UnitId>();

    const [weightValue, setWeightValue] = useState('');
    const [weightUnitId, setWeightUnitId] = useState<UnitId>();


    const [netWeightValue, setNetWeightValue] = useState('');
    const [netWeightUnitId, setNetWeightUnitId] = useState<UnitId>();

    const [lengthValue, setLengthValue] = useState('');
    const [lengthUnitId, setLengthUnitId] = useState<UnitId>();

    const [widthValue, setWidthValue] = useState('');
    const [widthUnitId, setWidthUnitId] = useState<UnitId>();

    const [thicknessValue, setThicknessValue] = useState('');
    const [thicknessUnitId, setThicknessUnitId] = useState<UnitId>();

    useEffect(() => {
        quantities.forEach(value => {
            switch (value.key) {
                case ProductQuantityKey.SALE:
                    setSaleValue(value.value.toString());
                    setSaleUnitId(value.unit);
                    break;
                case ProductQuantityKey.WEIGHT:
                    setWeightValue(value.value.toString());
                    setWeightUnitId(value.unit);
                    break;
                case ProductQuantityKey.NET_WEIGHT:
                    setNetWeightValue(value.value.toString());
                    setNetWeightUnitId(value.unit);
                    break;
                case ProductQuantityKey.LENGTH:
                    setLengthValue(value.value.toString());
                    setLengthUnitId(value.unit);
                    break;
                case ProductQuantityKey.WIDTH:
                    setWidthValue(value.value.toString());
                    setWidthUnitId(value.unit);
                    break;
                case ProductQuantityKey.THICKNESS:
                    setThicknessValue(value.value.toString());
                    setThicknessUnitId(value.unit);
                    break;
            }
        });
    }, [quantities, showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
            <BaseDialog id={PRODUCT_QUANTITIES_DIALOG_ID} showDialog={showDialog}
                        closeHandler={() => setShowDialog(false)}>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center">
                            {resourceState?.manager?.products.product.quantities.title}
                        </div>

                        <span
                            className="label-text text-left w-full pt-5">{resourceState?.common?.productQuantityKey.sale}</span>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row grow">
                                <WiwaInput
                                    type="number"
                                    min="0"
                                    value={saleValue}
                                    onChange={event => setSaleValue(event.target.value)}
                                />
                            </div>
                            <div className="flex flex-row shrink pl-2">
                                <WiwaSelectQuantityUnit
                                    placeholder={resourceState?.manager?.products.product.quantities.salePlaceholder}
                                    value={saleUnitId}
                                    setValue={(unit) => setSaleUnitId(unit as UnitId)}
                                    unitIds={[
                                        UnitId.PIECE,
                                        UnitId.PACKAGE,
                                        UnitId.METER,
                                        UnitId.MILLIMETER,
                                        UnitId.KILOGRAM,
                                        UnitId.GRAM,
                                        UnitId.LITER,
                                        UnitId.MILLILITER
                                    ]}
                                />
                            </div>
                        </div>

                        <span
                            className="label-text text-left w-full pt-2">{resourceState?.common?.productQuantityKey.weight}</span>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row grow">
                                <WiwaInput
                                    type="number"
                                    min="0"
                                    value={weightValue}
                                    onChange={event => setWeightValue(event.target.value)}
                                />
                            </div>
                            <div className="flex flex-row shrink pl-2">
                                <WiwaSelectQuantityUnit
                                    placeholder={resourceState?.manager?.products.product.quantities.weightPlaceholder}
                                    value={weightUnitId}
                                    setValue={(unit) => setWeightUnitId(unit as UnitId)}
                                    unitIds={[UnitId.KILOGRAM, UnitId.GRAM]}
                                />
                            </div>
                        </div>

                        <span
                            className="label-text text-left w-full pt-2">{resourceState?.common?.productQuantityKey.netWeight}</span>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row grow">
                                <WiwaInput
                                    type="number"
                                    min="0"
                                    value={netWeightValue}
                                    onChange={event => setNetWeightValue(event.target.value)}
                                />
                            </div>
                            <div className="flex flex-row shrink pl-2">
                                <WiwaSelectQuantityUnit
                                    placeholder={resourceState?.manager?.products.product.quantities.netWeightPlaceholder}
                                    value={netWeightUnitId}
                                    setValue={(unit) => setNetWeightUnitId(unit as UnitId)}
                                    unitIds={[UnitId.KILOGRAM, UnitId.GRAM]}
                                />
                            </div>
                        </div>

                        <span
                            className="label-text text-left w-full pt-2">{resourceState?.common?.productQuantityKey.length}</span>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row grow">
                                <WiwaInput
                                    type="number"
                                    min="0"
                                    value={lengthValue}
                                    onChange={event => setLengthValue(event.target.value)}
                                />
                            </div>
                            <div className="flex flex-row shrink pl-2">
                                <WiwaSelectQuantityUnit
                                    placeholder={resourceState?.manager?.products.product.quantities.lengthPlaceholder}
                                    value={lengthUnitId}
                                    setValue={(unit) => setLengthUnitId(unit as UnitId)}
                                    unitIds={[UnitId.MILLIMETER, UnitId.METER]}
                                />
                            </div>
                        </div>

                        <span
                            className="label-text text-left w-full pt-2">{resourceState?.common?.productQuantityKey.width}</span>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row grow">
                                <WiwaInput
                                    type="number"
                                    min="0"
                                    value={widthValue}
                                    onChange={event => setWidthValue(event.target.value)}
                                />
                            </div>
                            <div className="flex flex-row shrink pl-2">
                                <WiwaSelectQuantityUnit
                                    placeholder={resourceState?.manager?.products.product.quantities.widthPlaceholder}
                                    value={widthUnitId}
                                    setValue={(unit) => setWidthUnitId(unit as UnitId)}
                                    unitIds={[UnitId.MILLIMETER, UnitId.METER]}
                                />
                            </div>
                        </div>

                        <span
                            className="label-text text-left w-full pt-2">{resourceState?.common?.productQuantityKey.thickness}</span>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row grow">
                                <WiwaInput
                                    type="number"
                                    min="0"
                                    value={thicknessValue}
                                    onChange={event => setThicknessValue(event.target.value)}
                                />
                            </div>
                            <div className="flex flex-row shrink pl-2">
                                <WiwaSelectQuantityUnit
                                    placeholder={resourceState?.manager?.products.product.quantities.thicknessPlaceholder}
                                    value={thicknessUnitId}
                                    setValue={(unit) => setThicknessUnitId(unit as UnitId)}
                                    unitIds={[UnitId.MILLIMETER, UnitId.METER]}
                                />
                            </div>
                        </div>

                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                onClick={() => {
                                    const newQuantities = [];
                                    if (saleValue.trim().length > 0 && saleUnitId !== undefined) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.SALE,
                                            value: Number(saleValue),
                                            unit: saleUnitId
                                        });
                                    }

                                    if (weightValue.trim().length > 0 && weightUnitId !== undefined) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.WEIGHT,
                                            value: Number(weightValue),
                                            unit: weightUnitId
                                        });
                                    }

                                    if (netWeightValue.trim().length > 0 && netWeightUnitId !== undefined) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.NET_WEIGHT,
                                            value: Number(netWeightValue),
                                            unit: netWeightUnitId
                                        });
                                    }

                                    if (lengthValue.trim().length > 0 && lengthUnitId !== undefined) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.LENGTH,
                                            value: Number(lengthValue),
                                            unit: lengthUnitId
                                        });
                                    }

                                    if (widthValue.trim().length > 0 && widthUnitId !== undefined) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.WIDTH,
                                            value: Number(widthValue),
                                            unit: widthUnitId
                                        });
                                    }

                                    if (thicknessValue.trim().length > 0 && thicknessUnitId !== undefined) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.THICKNESS,
                                            value: Number(thicknessValue),
                                            unit: thicknessUnitId
                                        });
                                    }

                                    setQuantities(newQuantities);
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

export default ProductQuantitiesDialog;

