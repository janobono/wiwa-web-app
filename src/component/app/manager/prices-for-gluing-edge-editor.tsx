import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit, Plus, Trash } from 'react-feather';

import PriceForGluingEdgeTable from './price-for-gluing-edge';
import BaseDialog from '../../dialog/base-dialog';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormInputInteger from '../../ui/wiwa-form-input-integer';
import WiwaFormInputDecimal from '../../ui/wiwa-form-input-decimal';
import { getPricesForGluingEdge, setPricesForGluingEdge } from '../../../api/controller/config';
import { getApplicationProperties } from '../../../api/controller/ui';
import { PriceForGluingEdge, PriceForGluingEdgeField, UnitId } from '../../../api/model/application';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const PRICES_FOR_GLUING_EDGE_DIALOG_ID = 'prices-for-gluing-edge-dialog-001';

const PricesForGluingEdgeEditor = () => {
    const authState = useAuthState();
    const dialogState = useDialogState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [data, setData] = useState<PriceForGluingEdge[]>();
    const [selected, setSelected] = useState<PriceForGluingEdge>();

    const [edit, setEdit] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        getPricesForGluingEdge(authState?.authToken?.accessToken).then(data => setData(data.data));
    }, []);

    const okHandler = async (priceForGluingEdge: PriceForGluingEdge) => {
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.width === priceForGluingEdge.width);
                if (index !== -1) {
                    newData[index] = priceForGluingEdge;
                } else {
                    newData.push(priceForGluingEdge);
                }

                const response = await setPricesForGluingEdge(newData, authState?.authToken?.accessToken);

                setData(response.data);

                errorState?.addError(response.error);
            }
        } finally {
            setBusy(false);
        }
    }

    const deleteHandler = async (priceForGluingEdge: PriceForGluingEdge) => {
        setBusy(true);
        try {
            if (data) {
                const newData = [...data];
                const index = newData.findIndex(item => item.width === priceForGluingEdge.width);
                if (index !== -1) {
                    newData.splice(index, 1);
                    const response = await setPricesForGluingEdge(newData, authState?.authToken?.accessToken);
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
                                title: resourceState?.manager?.orderInputs.pricesForGluingEdge.deleteQuestionTitle,
                                message: resourceState?.manager?.orderInputs.pricesForGluingEdge.deleteQuestionMessage,
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
                <div className="overflow-x-auto">
                    <PriceForGluingEdgeTable
                        fields={Object.values(PriceForGluingEdgeField)}
                        rows={data}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
            </div>

            <PricesForGluingEdgeDialog
                showDialog={showDialog}
                priceForGluingEdge={edit ? selected : undefined}
                okHandler={(data) => {
                    okHandler(data).then();
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default PricesForGluingEdgeEditor;

const PricesForGluingEdgeDialog = ({showDialog, priceForGluingEdge, okHandler, cancelHandler}: {
    showDialog: boolean,
    priceForGluingEdge?: PriceForGluingEdge,
    okHandler: (priceForGluingEdge: PriceForGluingEdge) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    const [width, setWidth] = useState<number>();
    const [widthValid, setWidthValid] = useState(false);

    const [price, setPrice] = useState<number>();
    const [priceValid, setPriceValid] = useState(false);

    useEffect(() => {
        setLengthSign(unitSign(UnitId.MILLIMETER));
        getApplicationProperties().then(data => setPriceSign(`[${data?.data?.currency?.symbol}]`));
    }, [resourceState]);

    useEffect(() => {
        if (priceForGluingEdge) {
            setWidth(priceForGluingEdge.width);
            setPrice(priceForGluingEdge.price);
        } else {
            setWidth(undefined);
            setPrice(undefined);
        }
    }, [priceForGluingEdge]);

    const isFormValid = (): boolean => {
        return widthValid && priceValid;
    }

    const unitSign = (unitId: UnitId) => {
        return `[${resourceState?.getUnit(unitId)}]`;
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={PRICES_FOR_GLUING_EDGE_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.orderInputs.pricesForGluingEdge.title}
                    </div>

                    <WiwaFormInputInteger
                        label={`${resourceState?.manager?.orderInputs.pricesForGluingEdge.widthLabel} ${lengthSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.orderInputs.pricesForGluingEdge.widthPlaceholder}
                        value={width}
                        setValue={setWidth}
                        setValid={setWidthValid}
                        validate={() => {
                            if (width === undefined) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.orderInputs.pricesForGluingEdge.widthRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputDecimal
                        label={`${resourceState?.manager?.orderInputs.pricesForGluingEdge.priceLabel} ${priceSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.orderInputs.pricesForGluingEdge.pricePlaceholder}
                        value={price}
                        setValue={setPrice}
                        setValid={setPriceValid}
                        validate={() => {
                            if (price === undefined) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.orderInputs.pricesForGluingEdge.priceRequired
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
                                    width: width ? width : 0,
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
