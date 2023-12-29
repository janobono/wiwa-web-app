import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import MdDialog from '../../../component/dialog/md-dialog';
import { useDialogState } from '../../../component/state/dialog-state-provider';
import { useResourceState } from '../../../component/state/resource-state-provider';

const PRODUCT_DESCRIPTION_DIALOG_ID = 'product-description-dialog-001';

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
            placeholder={resourceState?.manager?.products.product.descriptionPlaceholder}
            value={value}
            setValue={setValue}
            rows={20}
            okHandler={okHandler}
            cancelHandler={() => setShowDialog(false)}
        />
        , dialogState.modalRoot))
}

export default ProductDescriptionDialog;
