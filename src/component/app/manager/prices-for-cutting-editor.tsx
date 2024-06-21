import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Plus, Trash } from 'react-feather';

import PriceForCuttingTable from './price-for-cutting-table';
import BaseDialog from '../../dialog/base-dialog';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormInputInteger from '../../ui/wiwa-form-input-integer';
import WiwaFormInputDecimal from '../../ui/wiwa-form-input-decimal';
import { getPricesForCutting, setPricesForCutting } from '../../../api/controller/config';
import { getApplicationProperties } from '../../../api/controller/ui';
import { PriceForCutting, PriceForCuttingField, UnitId } from '../../../api/model/application';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const PRICES_FOR_CUTTING_DIALOG_ID = 'prices-for-cutting-dialog-001';

const PricesForCuttingEditor = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<PriceForCutting[]>();
    const [selected, setSelected] = useState<PriceForCutting>();

    const [edit, setEdit] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getPricesForCutting(authState?.authToken?.accessToken).then(data => setData(data.data));
    }, []);

    const okHandler = async (priceForCutting: PriceForCutting) => {
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.thickness === priceForCutting.thickness);
                if (index !== -1) {
                    newData[index] = priceForCutting;
                } else {
                    newData.push(priceForCutting);
                }

                const response = await setPricesForCutting(newData, authState?.authToken?.accessToken);

                setData(response.data);

                errorState?.addError(response.error);
            }
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (priceForCutting: PriceForCutting) => {
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.thickness === priceForCutting.thickness);
                if (index !== -1) {
                    newData.splice(index, 1);
                    const response = await setPricesForCutting(newData, authState?.authToken?.accessToken);
                    setData(response.data);
                    errorState?.addError(response.error);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <div className="flex flex-col p-5 w-full">
                <div className="flex flex-col w-full items-center justify-center pb-5 gap-5">
                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            title={resourceState?.common?.action.add}
                            disabled={busy}
                            onClick={() => {
                                setEdit(false);
                                setShowDialog(true);
                            }}
                        ><Plus size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            className="btn-secondary join-item"
                            title={resourceState?.common?.action.edit}
                            disabled={busy || selected === undefined}
                            onClick={() => {
                                setEdit(true);
                                setShowDialog(true);
                            }}
                        ><Edit size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            title={resourceState?.common?.action.delete}
                            disabled={busy || selected === undefined}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: resourceState?.manager?.orderInputs.pricesForCutting.deleteQuestionTitle,
                                    message: resourceState?.manager?.orderInputs.pricesForCutting.deleteQuestionMessage,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            if (selected) {
                                                deleteHandler(selected).then();
                                            }
                                        }
                                    }
                                });
                            }}
                        ><Trash size={18}/>
                        </WiwaButton>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <PriceForCuttingTable
                        fields={Object.values(PriceForCuttingField)}
                        rows={data}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
            </div>

            <PricesForCuttingDialog
                showDialog={showDialog}
                priceForCutting={edit ? selected : undefined}
                okHandler={(data) => {
                    okHandler(data).then();
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default PricesForCuttingEditor;

const PricesForCuttingDialog = ({showDialog, priceForCutting, okHandler, cancelHandler}: {
    showDialog: boolean,
    priceForCutting?: PriceForCutting,
    okHandler: (priceForCutting: PriceForCutting) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    const [thickness, setThickness] = useState<number>();
    const [thicknessValid, setThicknessValid] = useState(false);

    const [price, setPrice] = useState<number>();
    const [priceValid, setPriceValid] = useState(false);

    useEffect(() => {
        setLengthSign(unitSign(UnitId.MILLIMETER));
        getApplicationProperties().then(data => setPriceSign(`[${data?.data?.currency?.symbol}]`));
    }, [resourceState]);

    useEffect(() => {
        if (priceForCutting) {
            setThickness(priceForCutting.thickness);
            setPrice(priceForCutting.price);
        } else {
            setThickness(undefined);
            setPrice(undefined);
        }
    }, [priceForCutting]);

    const isFormValid = (): boolean => {
        return thicknessValid && priceValid;
    }

    const unitSign = (unitId: UnitId) => {
        return `[${resourceState?.getUnit(unitId)}]`;
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={PRICES_FOR_CUTTING_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.orderInputs.pricesForCutting.title}
                    </div>

                    <WiwaFormInputInteger
                        label={`${resourceState?.manager?.orderInputs.pricesForCutting.thicknessLabel} ${lengthSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.orderInputs.pricesForCutting.thicknessPlaceholder}
                        value={thickness}
                        setValue={setThickness}
                        setValid={setThicknessValid}
                        validate={() => {
                            if (thickness === undefined) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.orderInputs.pricesForCutting.thicknessRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputDecimal
                        label={`${resourceState?.manager?.orderInputs.pricesForCutting.priceLabel} ${priceSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.orderInputs.pricesForCutting.pricePlaceholder}
                        value={price}
                        setValue={setPrice}
                        setValid={setPriceValid}
                        validate={() => {
                            if (price === undefined) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.orderInputs.pricesForCutting.priceRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!isFormValid()}
                            onClick={() => {
                                okHandler({
                                    thickness: thickness ? thickness : 0,
                                    price: price ? price : 0
                                });
                            }}
                        >{resourceState?.common?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={cancelHandler}
                        >{resourceState?.common?.action.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
