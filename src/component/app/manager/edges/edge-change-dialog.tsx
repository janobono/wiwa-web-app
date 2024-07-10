import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../../../dialog/base-dialog';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import WiwaFormTextarea from '../../../ui/wiwa-form-textarea';
import WiwaFormInputDecimal from '../../../ui/wiwa-form-input-decimal';
import WiwaFormInputInteger from '../../../ui/wiwa-form-input-integer';
import WiwaButton from '../../../ui/wiwa-button';
import { getApplicationProperties } from '../../../../api/controller/ui';
import { UnitId } from '../../../../api/model/application';
import { Edge, EdgeChange } from '../../../../api/model/edge';
import { CommonResourceContext, DialogContext, ManagerResourceContext } from '../../../../context';

const EdgeChangeDialog = ({dialogId, showDialog, edge, okHandler, cancelHandler, submitting}: {
    dialogId: string,
    showDialog: boolean,
    edge?: Edge,
    okHandler: (edgeChange: EdgeChange) => void,
    cancelHandler: () => void,
    submitting: boolean
}) => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);

    const [weightSign, setWeightSign] = useState<string>();
    const [lengthSign, setLengthSign] = useState<string>();
    const [priceSign, setPriceSign] = useState<string>();

    const [code, setCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [description, setDescription] = useState('');

    const [weight, setWeight] = useState<number>();
    const [weightValid, setWeightValid] = useState(false);

    const [width, setWidth] = useState<number>();
    const [widthValid, setWidthValid] = useState(false);

    const [thickness, setThickness] = useState<number>();
    const [thicknessValid, setThicknessValid] = useState(false);

    const [price, setPrice] = useState<number>();
    const [priceValid, setPriceValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setWeightSign(unitSign(UnitId.KILOGRAM));
        setLengthSign(unitSign(UnitId.MILLIMETER));
        getApplicationProperties().then(data => setPriceSign(`[${data?.data?.currency?.symbol}]`));
    }, [commonResourceState]);

    useEffect(() => {
        if (edge) {
            setCode(edge.code);
            setCodeValid(true);

            setName(edge.name);
            setNameValid(true);

            setDescription(edge.description || '');

            setWeight(edge.weight);
            setWeightValid(true);

            setWidth(edge.width);
            setWidthValid(true);

            setThickness(edge.thickness);
            setThicknessValid(true);

            setPrice(edge.price);
            setPriceValid(true);
        } else {
            setCode('');
            setCodeValid(true);

            setName('');
            setNameValid(true);

            setDescription('');

            setWeight(undefined);
            setWeightValid(true);

            setWidth(undefined);
            setWidthValid(true);

            setThickness(undefined);
            setThicknessValid(true);

            setPrice(undefined);
            setPriceValid(true);
        }
    }, [showDialog, edge]);

    useEffect(() => {
        setFormValid(codeValid && nameValid && weightValid && widthValid && thicknessValid && priceValid);
    }, [codeValid, nameValid, weightValid, widthValid, thicknessValid, priceValid]);

    const unitSign = (unitId: UnitId) => {
        return `[${commonResourceState?.getUnit(unitId)}]`;
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={dialogId} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {managerResourceState?.resource?.edges.edgeDialog.title}
                    </div>

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.edges.edgeDialog.codeLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.edges.edgeDialog.codePlaceholder}
                        value={code}
                        setValue={setCode}
                        setValid={setCodeValid}
                        validate={() => {
                            if (code.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.edges.edgeDialog.codeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.edges.edgeDialog.nameLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.edges.edgeDialog.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.edges.edgeDialog.nameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormTextarea
                        label={managerResourceState?.resource?.edges.edgeDialog.descriptionLabel}
                        placeholder={managerResourceState?.resource?.edges.edgeDialog.descriptionPlaceholder}
                        value={description}
                        setValue={setDescription}
                    />

                    <WiwaFormInputDecimal
                        min="0"
                        label={`${managerResourceState?.resource?.edges.edgeDialog.weightLabel} ${weightSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.edges.edgeDialog.weightPlaceholder}
                        value={weight}
                        setValue={setWeight}
                        setValid={setWeightValid}
                        validate={() => {
                            if (weight === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.edges.edgeDialog.weightRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputInteger
                        min="0"
                        label={`${managerResourceState?.resource?.edges.edgeDialog.widthLabel} ${lengthSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.edges.edgeDialog.widthPlaceholder}
                        value={width}
                        setValue={setWidth}
                        setValid={setWidthValid}
                        validate={() => {
                            if (width === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.edges.edgeDialog.widthRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputDecimal
                        min="0"
                        label={`${managerResourceState?.resource?.edges.edgeDialog.thicknessLabel} ${lengthSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.edges.edgeDialog.thicknessPlaceholder}
                        value={thickness}
                        setValue={setThickness}
                        setValid={setThicknessValid}
                        validate={() => {
                            if (thickness === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.edges.edgeDialog.thicknessRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputDecimal
                        min="0"
                        label={`${managerResourceState?.resource?.edges.edgeDialog.priceLabel} ${priceSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.edges.edgeDialog.pricePlaceholder}
                        value={price}
                        setValue={setPrice}
                        setValid={setPriceValid}
                        validate={() => {
                            if (price === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.edges.edgeDialog.priceRequired
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
                                okHandler({
                                    code,
                                    name,
                                    description,
                                    weight: Number(weight),
                                    width: Number(width),
                                    thickness: Number(thickness),
                                    price: Number(price)
                                });
                            }}
                        >{commonResourceState?.resource?.action.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={submitting}
                            onClick={() => {
                                cancelHandler();
                            }}
                        >{commonResourceState?.resource?.action.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}

export default EdgeChangeDialog;
