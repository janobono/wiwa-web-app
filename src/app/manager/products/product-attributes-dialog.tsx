import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../../../component/dialog/base-dialog';
import { useDialogState } from '../../../component/state/dialog-state-provider';
import { useResourceState } from '../../../component/state/resource-state-provider';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormCheckBox from '../../../component/ui/wiwa-form-check-box';
import WiwaFormInput from '../../../component/ui/wiwa-form-input';
import { ProductAttribute, ProductAttributeKey } from '../../../model/service';

const PRODUCT_ATTRIBUTES_DIALOG_ID = 'product-attributes-dialog-001';

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
    const [orientation, setOrientation] = useState<boolean>();

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
                            {resourceState?.manager?.products.product.attributes.title}
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

                        <WiwaFormCheckBox className="py-5" value={orientation || false} setValue={setOrientation}>
                            <span
                                className="label-text pl-2">{resourceState?.common?.productAttributeKey.orientation}</span>
                        </WiwaFormCheckBox>

                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                onClick={() => {
                                    const newAttributes = [];
                                    if (boardCode.trim().length > 0) {
                                        newAttributes.push({
                                            key: ProductAttributeKey.BOARD_CODE,
                                            value: boardCode
                                        });
                                    }
                                    if (structureCode.trim().length > 0) {
                                        newAttributes.push({
                                            key: ProductAttributeKey.STRUCTURE_CODE,
                                            value: structureCode
                                        });
                                    }
                                    if (orientation !== undefined) {
                                        newAttributes.push({
                                            key: ProductAttributeKey.ORIENTATION,
                                            value: orientation ? 'true' : 'false'
                                        });
                                    }
                                    setAttributes(newAttributes);
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

export default ProductAttributesDialog;
