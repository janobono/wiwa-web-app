import { useContext, useEffect, useState } from 'react';

import PartEditor from './part/part-editor';
import WiwaFormInputInteger from '../ui/wiwa-form-input-integer';
import WiwaFormInputString from '../ui/wiwa-form-input-string';
import WiwaButton from '../ui/wiwa-button';
import { UnitId } from '../../api/model/application';
import { Part } from '../../api/model/order/part';
import { OrderItem, OrderItemChange } from '../../api/model/order';
import { CommonResourceContext } from '../../context';

const OrderItemEditor = (
    {
        disabled,
        orderItem,
        setOrderItemChange
    }: {
        disabled: boolean,
        orderItem?: OrderItem,
        setOrderItemChange: (orderItemChange: OrderItemChange) => void
    }
) => {
    const commonResourceState = useContext(CommonResourceContext);

    const [quantitySign, setQuantitySign] = useState<string>();

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [quantity, setQuantity] = useState<number>();
    const [quantityValid, setQuantityValid] = useState(false);

    const [description, setDescription] = useState('');

    const [part, setPart] = useState<Part>();
    const [partValid, setPartValid] = useState(false);

    useEffect(() => {
        setQuantitySign(`[${commonResourceState?.getUnit(UnitId.PIECE)}]`);
    }, [commonResourceState]);

    useEffect(() => {
        if (orderItem) {
            setName(orderItem.name)
            setNameValid(true);

            setQuantity(orderItem.quantity);
            setQuantityValid(true);

            setDescription(orderItem.description);

            setPart(orderItem.part);
            setPartValid(true);
        } else {
            setName('')
            setNameValid(false);

            setQuantity(undefined);
            setQuantityValid(false);

            setDescription('');

            setPart(undefined);
            setPartValid(false);
        }
    }, [orderItem]);

    const isFormValid = () => {
        return nameValid && quantityValid && partValid;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <WiwaFormInputString
                    label={commonResourceState?.resource?.orderItemEditor.nameLabel}
                    required={true}
                    placeholder={commonResourceState?.resource?.orderItemEditor.namePlaceholder}
                    value={name}
                    setValue={setName}
                    setValid={setNameValid}
                    validate={() => {
                        if (name.trim().length === 0) {
                            return {
                                valid: false,
                                message: commonResourceState?.resource?.orderItemEditor.nameRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputInteger
                    min="0"
                    label={`${commonResourceState?.resource?.orderItemEditor.quantityLabel} ${quantitySign}`}
                    required={true}
                    placeholder={commonResourceState?.resource?.orderItemEditor.quantityPlaceholder}
                    value={quantity}
                    setValue={setQuantity}
                    setValid={setQuantityValid}
                    validate={() => {
                        if (quantity === undefined) {
                            return {
                                valid: false,
                                message: commonResourceState?.resource?.orderItemEditor.quantityRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={commonResourceState?.resource?.orderItemEditor.descriptionLabel}
                    placeholder={commonResourceState?.resource?.orderItemEditor.descriptionPlaceholder}
                    value={description}
                    setValue={setDescription}
                />
            </div>
            <hr/>
            <PartEditor
                part={part}
                setPart={setPart}
                valid={partValid}
                setValid={setPartValid}
            />
            <hr/>
            <div className="flex flex-row w-full items-center justify-center">
                <WiwaButton
                    className="btn-primary"
                    disabled={disabled || !isFormValid()}
                    onClick={() => {
                        setOrderItemChange({
                            name,
                            quantity: quantity || 0,
                            description,
                            part: part || {type: 'UNKNOWN'}
                        });
                    }}
                >{commonResourceState?.resource?.action.submit}
                </WiwaButton>
            </div>
        </>
    )
}

export default OrderItemEditor;
