import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { getApplicationProperties } from '../../../../api/controller/ui';
import { UnitId } from '../../../../api/model/application';
import { Board, BoardChange } from '../../../../api/model/board';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import WiwaFormTextarea from '../../../ui/wiwa-form-textarea';
import WiwaSelect from '../../../ui/wiwa-select';
import WiwaFormInputDecimal from '../../../ui/wiwa-form-input-decimal';
import WiwaFormInputInteger from '../../../ui/wiwa-form-input-integer';
import WiwaButton from '../../../ui/wiwa-button';
import { CommonResourceContext, DialogContext, ManagerResourceContext } from '../../../../context';

const BoardChangeDialog = ({dialogId, showDialog, board, okHandler, cancelHandler, submitting}: {
    dialogId: string,
    showDialog: boolean,
    board?: Board,
    okHandler: (boardChange: BoardChange) => void,
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

    const [boardCode, setBoardCode] = useState('');
    const [boardCodeValid, setBoardCodeValid] = useState(false);

    const [structureCode, setStructureCode] = useState('');
    const [structureCodeValid, setStructureCodeValid] = useState(false);

    const [orientation, setOrientation] = useState(false);

    const [weight, setWeight] = useState<number>();
    const [weightValid, setWeightValid] = useState(false);

    const [length, setLength] = useState<number>();
    const [lengthValid, setLengthValid] = useState(false);

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
        if (board) {
            setCode(board.code);
            setCodeValid(true);

            setName(board.name);
            setNameValid(true);

            setDescription(board.description || '');

            setBoardCode(board.boardCode);
            setBoardCodeValid(true);

            setStructureCode(board.structureCode);
            setStructureCodeValid(true);

            setOrientation(board.orientation);

            setWeight(board.weight);
            setWeightValid(true);

            setLength(board.length);
            setLengthValid(true);

            setWidth(board.width);
            setWidthValid(true);

            setThickness(board.thickness);
            setThicknessValid(true);

            setPrice(board.price);
            setPriceValid(true);
        } else {
            setCode('');
            setCodeValid(true);

            setName('');
            setNameValid(true);

            setDescription('');

            setBoardCode('');
            setBoardCodeValid(true);

            setStructureCode('');
            setStructureCodeValid(true);

            setOrientation(false);

            setWeight(undefined);
            setWeightValid(true);

            setLength(undefined);
            setLengthValid(true);

            setWidth(undefined);
            setWidthValid(true);

            setThickness(undefined);
            setThicknessValid(true);

            setPrice(undefined);
            setPriceValid(true);
        }
    }, [showDialog, board]);

    useEffect(() => {
        setFormValid(codeValid && nameValid && boardCodeValid && structureCodeValid && weightValid && lengthValid
            && widthValid && thicknessValid && priceValid);
    }, [codeValid, nameValid, boardCodeValid, structureCodeValid, weightValid, lengthValid, widthValid, thicknessValid, priceValid]);

    const unitSign = (unitId: UnitId) => {
        return `[${commonResourceState?.getUnit(unitId)}]`;
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={dialogId} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {managerResourceState?.resource?.boards.boardDialog.title}
                    </div>

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.boards.boardDialog.codeLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.codePlaceholder}
                        value={code}
                        setValue={setCode}
                        setValid={setCodeValid}
                        validate={() => {
                            if (code.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.codeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.boards.boardDialog.nameLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.nameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormTextarea
                        label={managerResourceState?.resource?.boards.boardDialog.descriptionLabel}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.descriptionPlaceholder}
                        value={description}
                        setValue={setDescription}
                    />

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.boards.boardDialog.boardCodeLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.boardCodePlaceholder}
                        value={boardCode}
                        setValue={setBoardCode}
                        setValid={setBoardCodeValid}
                        validate={() => {
                            if (boardCode.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.boardCodeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputString
                        label={managerResourceState?.resource?.boards.boardDialog.structureCodeLabel}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.structureCodePlaceholder}
                        value={structureCode}
                        setValue={setStructureCode}
                        setValid={setStructureCodeValid}
                        validate={() => {
                            if (structureCode.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.structureCodeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                {managerResourceState?.resource?.boards.boardDialog.orientationLabel}
                            </span>
                        </label>
                        <WiwaSelect
                            defaultValue={orientation ? '1' : '0'}
                            onChange={event => setOrientation(Number(event.currentTarget.value) === 1)}
                        >
                            <option value="1">{commonResourceState?.resource?.value.yes}</option>
                            <option value="0">{commonResourceState?.resource?.value.no}</option>
                        </WiwaSelect>
                    </div>

                    <WiwaFormInputDecimal
                        min="0"
                        label={`${managerResourceState?.resource?.boards.boardDialog.weightLabel} ${weightSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.weightPlaceholder}
                        value={weight}
                        setValue={setWeight}
                        setValid={setWeightValid}
                        validate={() => {
                            if (weight === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.weightRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputInteger
                        min="0"
                        label={`${managerResourceState?.resource?.boards.boardDialog.lengthLabel} ${lengthSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.lengthPlaceholder}
                        value={length}
                        setValue={setLength}
                        setValid={setLengthValid}
                        validate={() => {
                            if (length === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.lengthRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputInteger
                        min="0"
                        label={`${managerResourceState?.resource?.boards.boardDialog.widthLabel} ${lengthSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.widthPlaceholder}
                        value={width}
                        setValue={setWidth}
                        setValid={setWidthValid}
                        validate={() => {
                            if (width === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.widthRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputInteger
                        min="0"
                        label={`${managerResourceState?.resource?.boards.boardDialog.thicknessLabel} ${lengthSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.thicknessPlaceholder}
                        value={thickness}
                        setValue={setThickness}
                        setValid={setThicknessValid}
                        validate={() => {
                            if (thickness === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.thicknessRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInputDecimal
                        min="0"
                        label={`${managerResourceState?.resource?.boards.boardDialog.priceLabel} ${priceSign}`}
                        required={true}
                        placeholder={managerResourceState?.resource?.boards.boardDialog.pricePlaceholder}
                        value={price}
                        setValue={setPrice}
                        setValid={setPriceValid}
                        validate={() => {
                            if (price === undefined) {
                                return {
                                    valid: false,
                                    message: managerResourceState?.resource?.boards.boardDialog.priceRequired
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
                                    description: description.length === 0 ? undefined : description,
                                    boardCode,
                                    structureCode,
                                    orientation,
                                    weight: weight ? weight : 0,
                                    length: length ? length : 0,
                                    width: width ? width : 0,
                                    thickness: thickness ? thickness : 0,
                                    price: price ? price : 0
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

export default BoardChangeDialog;
