import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../dialog/base-dialog';
import WiwaButton from '../ui/wiwa-button';
import WiwaFormTextarea from '../ui/wiwa-form-textarea';
import { OrderCommentChange } from '../../api/model/order';
import { CommonResourceContext, DialogContext } from '../../context';

const OrderCommentDialog = (
    {
        dialogId,
        showDialog,
        setShowDialog,
        okHandler
    }: {
        dialogId: string,
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void,
        okHandler: (comment: OrderCommentChange) => void
    }
) => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);

    const closeHandler = () => {
        setShowDialog(false);
    }

    useEffect(() => {
        setValue('');
    }, [showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={dialogId} showDialog={showDialog} closeHandler={closeHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {commonResourceState?.resource?.orderCommentDialog.title}
                    </div>
                    <WiwaFormTextarea
                        label={commonResourceState?.resource?.orderCommentDialog.valueLabel}
                        required={true}
                        placeholder={commonResourceState?.resource?.orderCommentDialog.valuePlaceholder}
                        value={value}
                        setValue={setValue}
                        validate={() => {
                            if (value.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: commonResourceState?.resource?.orderCommentDialog.valueRequired
                                };
                            }
                            return {valid: true};
                        }}
                        setValid={setValid}
                        rows={5}
                    />
                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!valid}
                            onClick={() => {
                                okHandler({comment: value});
                                setShowDialog(false);
                            }}
                        >{commonResourceState?.resource?.mdDialog.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={closeHandler}
                        >{commonResourceState?.resource?.mdDialog.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}

export default OrderCommentDialog;
