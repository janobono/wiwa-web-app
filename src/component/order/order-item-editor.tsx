import { useContext, useEffect, useState } from 'react';

import PartEditor from './part/part-editor';
import WiwaFormInputInteger from '../ui/wiwa-form-input-integer';
import WiwaFormInputString from '../ui/wiwa-form-input-string';
import WiwaButton from '../ui/wiwa-button';
import WiwaSelect from '../ui/wiwa-select';
import WiwaFormTextarea from '../ui/wiwa-form-textarea';
import { UnitId } from '../../api/model/application';
import { Part } from '../../api/model/order/part';
import { OrderItem, OrderItemChange } from '../../api/model/order';
import { ResourceContext } from '../../context';

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
    const resourceState = useContext(ResourceContext);

    const [quantitySign, setQuantitySign] = useState<string>();

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [orientation, setOrientation] = useState(false);

    const [quantity, setQuantity] = useState<number>();
    const [quantityValid, setQuantityValid] = useState(false);

    const [description, setDescription] = useState('');

    const [part, setPart] = useState<Part>();
    const [partValid, setPartValid] = useState(false);

    useEffect(() => {
        setQuantitySign(`[${resourceState?.getUnit(UnitId.PIECE)}]`);
    }, [resourceState]);

    useEffect(() => {
        if (orderItem) {
            setName(orderItem.name)
            setNameValid(true);

            setOrientation(orderItem.orientation);

            setQuantity(orderItem.quantity);
            setQuantityValid(true);

            setDescription(orderItem.description);

            setPart(orderItem.part);
            setPartValid(true);
        } else {
            setName('')
            setNameValid(false);

            setOrientation(false);

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
            <div className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 w-full md:gap-5">
                    <WiwaFormInputString
                        label={resourceState?.common?.orderItemEditor.nameLabel}
                        required={true}
                        placeholder={resourceState?.common?.orderItemEditor.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.common?.orderItemEditor.nameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                {resourceState?.common?.orderItemEditor.orientationLabel}
                            </span>
                        </label>
                        <WiwaSelect
                            defaultValue={orientation ? '1' : '0'}
                            onChange={event => setOrientation(Number(event.currentTarget.value) === 1)}
                        >
                            <option value="1">{resourceState?.common?.value.yes}</option>
                            <option value="0">{resourceState?.common?.value.no}</option>
                        </WiwaSelect>
                    </div>

                    <WiwaFormInputInteger
                        min="0"
                        label={`${resourceState?.common?.orderItemEditor.quantityLabel} ${quantitySign}`}
                        required={true}
                        placeholder={resourceState?.common?.orderItemEditor.quantityPlaceholder}
                        value={quantity}
                        setValue={setQuantity}
                        setValid={setQuantityValid}
                        validate={() => {
                            if (quantity === undefined) {
                                return {
                                    valid: false,
                                    message: resourceState?.common?.orderItemEditor.quantityRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />
                </div>
                <WiwaFormTextarea
                    label={resourceState?.common?.orderItemEditor.descriptionLabel}
                    placeholder={resourceState?.common?.orderItemEditor.descriptionPlaceholder}
                    rows={2}
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
                            orientation,
                            quantity: quantity || 0,
                            description,
                            part: part || {type: 'UNKNOWN'}
                        });
                    }}
                >{resourceState?.common?.action.submit}
                </WiwaButton>
            </div>
        </>
    )
}

export default OrderItemEditor;
