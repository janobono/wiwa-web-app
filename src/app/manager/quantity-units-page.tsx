import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Plus, Trash } from 'react-feather';

import WiwaQuantityType from '../../component/app/wiwa-quantity-type';
import BaseDialog from '../../component/dialog/base-dialog';
import { useAuthState } from '../../component/state/auth-state-provider';
import { DialogAnswer, DialogType, useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import { useQuantityUnitState } from '../../component/state/quantity-unit-provider';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaSelect from '../../component/ui/wiwa-select';
import { QuantityType, QuantityUnit } from '../../model/service';

const QUANTITY_UNIT_DIALOG_ID = 'manager-quantity-unit-dialog-001';

const QuantityUnitsPage = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();
    const quantityUnitState = useQuantityUnitState();

    const [showDialog, setShowDialog] = useState(false);
    const [selectedQuantityUnit, setSelectedQuantityUnit] = useState<QuantityUnit>();
    const [error, setError] = useState<string>();

    const okHandler = async (quantityUnit: QuantityUnit) => {
        setError(undefined);
        let response;
        if (selectedQuantityUnit) {
            response = await quantityUnitState?.setQuantityUnit(quantityUnit);
        } else {
            response = await quantityUnitState?.addQuantityUnit(quantityUnit);
        }
        if (response) {
            if (selectedQuantityUnit) {
                setError(resourceState?.manager?.quantityUnits.editQuantityUnit.error);
            } else {
                setError(resourceState?.manager?.quantityUnits.addQuantityUnit.error);
            }
        }
    }

    const deleteHandler = async (id: string) => {
        setError(undefined);
        const error = await quantityUnitState?.deleteQuantityUnit(id);
        if (error) {
            setError(resourceState?.manager?.quantityUnits.deleteQuantityUnit.error);
        }
    }

    useEffect(() => {
        quantityUnitState?.fetchData().then();
    }, [authState?.accessToken]);

    return (
        error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>{resourceState?.manager?.quantityUnits.id}</th>
                                <th>{resourceState?.manager?.quantityUnits.type}</th>
                                <th>{resourceState?.manager?.quantityUnits.unit}</th>
                                <th>
                                    <WiwaButton
                                        title={resourceState?.manager?.quantityUnits.addQuantityUnit.title}
                                        className="btn-primary btn-xs"
                                        disabled={quantityUnitState?.busy}
                                        onClick={() => {
                                            setSelectedQuantityUnit(undefined);
                                            setShowDialog(true);
                                        }}
                                    >
                                        <Plus size={18}/>
                                    </WiwaButton>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {quantityUnitState?.data.map(quantityUnit =>
                                <tr key={quantityUnit.id} className="hover">
                                    <td>{quantityUnit.id}</td>
                                    <td><WiwaQuantityType type={quantityUnit.type}/></td>
                                    <td>{quantityUnit.unit}</td>
                                    <th>
                                        <div className="join">
                                            <WiwaButton
                                                title={resourceState?.manager?.quantityUnits.editQuantityUnit.title}
                                                className="btn-primary btn-xs join-item"
                                                disabled={quantityUnitState?.busy}
                                                onClick={() => {
                                                    setSelectedQuantityUnit(quantityUnit);
                                                    setShowDialog(true);
                                                }}
                                            >
                                                <Edit size={18}/>
                                            </WiwaButton>
                                            <WiwaButton
                                                title={resourceState?.manager?.quantityUnits.deleteQuantityUnit.title}
                                                className="btn-accent btn-xs join-item"
                                                disabled={quantityUnitState?.busy}
                                                onClick={() => {
                                                    dialogState?.showDialog({
                                                        type: DialogType.YES_NO,
                                                        title: resourceState?.manager?.quantityUnits.deleteQuantityUnit.title,
                                                        message: resourceState?.manager?.quantityUnits.deleteQuantityUnit.message,
                                                        callback: (answer: DialogAnswer) => {
                                                            if (answer === DialogAnswer.YES) {
                                                                deleteHandler(quantityUnit.id).then();
                                                            }
                                                        }
                                                    });
                                                }}
                                            >
                                                <Trash size={18}/>
                                            </WiwaButton>
                                        </div>
                                    </th>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <QuantityUnitDialog
                    showDialog={showDialog}
                    quantityUnit={selectedQuantityUnit}
                    okHandler={(data) => {
                        okHandler(data).then();
                        setShowDialog(false);
                    }}
                    cancelHandler={() => {
                        setError(undefined);
                        setShowDialog(false);
                    }}
                    submitting={quantityUnitState?.busy || false}
                />
            </>
    )
}

export default QuantityUnitsPage;

const QuantityUnitDialog = ({showDialog, quantityUnit, okHandler, cancelHandler, submitting}: {
    showDialog: boolean,
    quantityUnit?: QuantityUnit,
    okHandler: (quantityUnit: QuantityUnit) => void,
    cancelHandler: () => void,
    submitting: boolean
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [id, setId] = useState('');
    const [idValid, setIdValid] = useState(false);

    const [type, setType] = useState<QuantityType>();
    const [typeValid, setTypeValid] = useState(false);

    const [unit, setUnit] = useState('');
    const [unitValid, setUnitValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (quantityUnit) {
            setId(quantityUnit.id);
            setIdValid(true);

            setType(quantityUnit.type);
            setTypeValid(true);

            setUnit(quantityUnit.unit);
            setUnitValid(true);
        } else {
            setId('');
            setIdValid(false);

            setType(undefined);
            setTypeValid(false);

            setUnit('');
            setUnitValid(false);
        }
    }, [showDialog, quantityUnit]);

    useEffect(() => {
        setFormValid(idValid && typeValid && unitValid);
    }, [idValid, typeValid, unitValid]);

    const typeChangeHandler = (event: FormEvent<HTMLSelectElement>) => {
        setType(event.currentTarget.value as QuantityType);
        setTypeValid(true);
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={QUANTITY_UNIT_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.quantityUnits.quantityUnitDialog.title}
                    </div>

                    <WiwaFormInput
                        label={resourceState?.manager?.quantityUnits.quantityUnitDialog.idLabel}
                        required={true}
                        placeholder={resourceState?.manager?.quantityUnits.quantityUnitDialog.idPlaceholder}
                        value={id}
                        setValue={setId}
                        setValid={setIdValid}
                        validate={() => {
                            if (id.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.quantityUnits.quantityUnitDialog.idRequired
                                };
                            }
                            return {valid: true};
                        }}
                        disabled={quantityUnit !== undefined}
                    />

                    <div className="form-control w-full">
                        <label className="label">
                            <span
                                className="label-text">{resourceState?.manager?.quantityUnits.quantityUnitDialog.typeLabel + '*'}</span>
                        </label>
                        <WiwaSelect
                            onChange={event => typeChangeHandler(event)}
                        >
                            <option
                                selected={type === undefined}
                                disabled>{resourceState?.manager?.quantityUnits.quantityUnitDialog.typePlaceholder}</option>

                            {Object.values(QuantityType).map(value =>
                                <option
                                    key={value}
                                    value={value}><WiwaQuantityType type={value}/></option>
                            )}
                        </WiwaSelect>
                        {type === undefined &&
                            <label className="label">
                                <span
                                    className="label-text-alt text-error">{resourceState?.manager?.quantityUnits.quantityUnitDialog.typeRequired}</span>
                            </label>
                        }
                    </div>

                    <WiwaFormInput
                        label={resourceState?.manager?.quantityUnits.quantityUnitDialog.unitLabel}
                        required={true}
                        placeholder={resourceState?.manager?.quantityUnits.quantityUnitDialog.unitPlaceholder}
                        value={unit}
                        setValue={setUnit}
                        setValid={setUnitValid}
                        validate={() => {
                            if (unit.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.quantityUnits.quantityUnitDialog.unitRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={submitting || !formValid}
                            onClick={() => {
                                if (type !== undefined) {
                                    okHandler({id, type, unit});
                                }
                            }}
                        >{resourceState?.common?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={submitting}
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
