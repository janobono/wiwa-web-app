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
    const [saleUnitId, setSaleUnitId] = useState('');

    const [weightValue, setWeightValue] = useState('');
    const [weightUnitId, setWeightUnitId] = useState('');


    const [netWeightValue, setNetWeightValue] = useState('');
    const [netWeightUnitId, setNetWeightUnitId] = useState('');

    const [lengthValue, setLengthValue] = useState('');
    const [lengthUnitId, setLengthUnitId] = useState('');

    const [widthValue, setWidthValue] = useState('');
    const [widthUnitId, setWidthUnitId] = useState('');

    const [thicknessValue, setThicknessValue] = useState('');
    const [thicknessUnitId, setThicknessUnitId] = useState('');

    useEffect(() => {
        quantities.forEach(value => {
            switch (value.key) {
                case ProductQuantityKey.SALE:
                    setSaleValue(value.value.toString());
                    setSaleUnitId(value.unit.toString());
                    break;
                case ProductQuantityKey.WEIGHT:
                    setWeightValue(value.value.toString());
                    setWeightUnitId(value.unit.toString());
                    break;
                case ProductQuantityKey.NET_WEIGHT:
                    setNetWeightValue(value.value.toString());
                    setNetWeightUnitId(value.unit.toString());
                    break;
                case ProductQuantityKey.LENGTH:
                    setLengthValue(value.value.toString());
                    setLengthUnitId(value.unit.toString());
                    break;
                case ProductQuantityKey.WIDTH:
                    setWidthValue(value.value.toString());
                    setWidthUnitId(value.unit.toString());
                    break;
                case ProductQuantityKey.THICKNESS:
                    setThicknessValue(value.value.toString());
                    setThicknessUnitId(value.unit.toString());
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
                                <WiwaSelectQuantityUnit value={saleUnitId} setValue={setSaleUnitId} unitIds={[
                                    UnitId.PIECE, UnitId.PACKAGE, UnitId.METER, UnitId.MILLIMETER, UnitId.KILOGRAM, UnitId.GRAM, UnitId.LITER, UnitId.MILLILITER
                                ]}/>
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
                                <WiwaSelectQuantityUnit value={weightUnitId} setValue={setWeightUnitId} unitIds={[
                                    UnitId.KILOGRAM, UnitId.GRAM
                                ]}/>
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
                                <WiwaSelectQuantityUnit value={netWeightUnitId} setValue={setNetWeightUnitId} unitIds={[
                                    UnitId.KILOGRAM, UnitId.GRAM
                                ]}/>
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
                                <WiwaSelectQuantityUnit value={lengthUnitId} setValue={setLengthUnitId} unitIds={[
                                    UnitId.MILLIMETER, UnitId.METER
                                ]}/>
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
                                <WiwaSelectQuantityUnit value={widthUnitId} setValue={setWidthUnitId} unitIds={[
                                    UnitId.MILLIMETER, UnitId.METER
                                ]}/>
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
                                <WiwaSelectQuantityUnit value={thicknessUnitId} setValue={setThicknessUnitId} unitIds={[
                                    UnitId.MILLIMETER, UnitId.METER
                                ]}/>
                            </div>
                        </div>

                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                onClick={() => {
                                    const newQuantities = [];
                                    if (saleValue.trim().length > 0 && saleUnitId.trim().length > 0) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.SALE,
                                            value: Number(saleValue),
                                            unit: saleUnitId as UnitId
                                        });
                                    }

                                    if (weightValue.trim().length > 0 && weightUnitId.trim().length > 0) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.WEIGHT,
                                            value: Number(weightValue),
                                            unit: weightUnitId as UnitId
                                        });
                                    }

                                    if (netWeightValue.trim().length > 0 && netWeightUnitId.trim().length > 0) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.NET_WEIGHT,
                                            value: Number(netWeightValue),
                                            unit: netWeightUnitId as UnitId
                                        });
                                    }

                                    if (lengthValue.trim().length > 0 && lengthUnitId.trim().length > 0) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.LENGTH,
                                            value: Number(lengthValue),
                                            unit: lengthUnitId as UnitId
                                        });
                                    }

                                    if (widthValue.trim().length > 0 && widthUnitId.trim().length > 0) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.WIDTH,
                                            value: Number(widthValue),
                                            unit: widthUnitId as UnitId
                                        });
                                    }

                                    if (thicknessValue.trim().length > 0 && thicknessUnitId.trim().length > 0) {
                                        newQuantities.push({
                                            key: ProductQuantityKey.THICKNESS,
                                            value: Number(thicknessValue),
                                            unit: thicknessUnitId as UnitId
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

