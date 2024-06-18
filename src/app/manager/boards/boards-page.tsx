import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Edit, Image, List, Plus, Trash } from 'react-feather';

import { useBoardState } from '../boards-base-page';
import { addBoard, deleteBoard, getBoards, setBoard } from '../../../api/controller/board';
import { getApplicationProperties } from '../../../api/controller/ui';
import { UnitId } from '../../../api/model/application';
import { Board, BoardChange, BoardField, BoardSearchCriteria } from '../../../api/model/board';
import BoardTable from '../../../component/board/board-table';
import BoardSearchCriteriaForm from '../../../component/board/board-search-criteria-form';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormInput from '../../../component/ui/wiwa-form-input';
import WiwaFormTextarea from '../../../component/ui/wiwa-form-textarea';
import WiwaPageable from '../../../component/ui/wiwa-pageable';
import WiwaSelect from '../../../component/ui/wiwa-select';
import { getUnitIdName } from '../../../model';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useResourceState } from '../../../state/resource';

const BOARD_DIALOG_ID = 'board-dialog-001';

const BoardsPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const boardState = useBoardState();

    const [error, setError] = useState<string>();

    const [criteria, setCriteria] = useState<BoardSearchCriteria>();
    const [page, setPage] = useState(0);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, [criteria]);

    useEffect(() => {
        setPrevious(boardState?.data !== undefined && !boardState.data.first);
        setNext(boardState?.data !== undefined && !boardState.data.last);

        if (boardState?.selected && boardState?.data) {
            const index = boardState.data.content.findIndex(item => item.id === boardState.selected?.id);
            if (index !== -1) {
                boardState.setSelected(boardState.data.content[index]);
            }
        } else {
            boardState?.setSelected(undefined);
        }
    }, [boardState?.data, boardState?.selected]);

    const fetchData = async () => {
        setError(undefined);
        boardState?.setBusy(true);
        try {
            const response = await getBoards(criteria, {page, size: 10}, authState?.authToken?.accessToken);
            boardState?.setData(response?.data);
            if (response?.error) {
                setError(resourceState?.manager?.boards.fetchDataError);
            }
        } finally {
            boardState?.setBusy(false);
        }
    }

    const okHandler = async (boardChange: BoardChange) => {
        setError(undefined);
        boardState?.setBusy(true);
        try {
            let response;
            if (editMode) {
                if (boardState?.selected) {
                    response = await setBoard(boardState?.selected.id, boardChange, authState?.authToken?.accessToken);
                }
            } else {
                response = await addBoard(boardChange, authState?.authToken?.accessToken);
            }

            if (boardState?.data && response?.data) {
                const newData = {...boardState?.data};
                const index = newData.content.findIndex(item => item.id === response.data.id);
                if (index !== -1) {
                    newData.content[index] = response.data;
                } else {
                    newData.content.push(response.data);
                }
                boardState?.setData(newData);
            }

            if (response?.error) {
                if (editMode) {
                    setError(resourceState?.manager?.boards.editBoard.error);
                } else {
                    setError(resourceState?.manager?.boards.addBoard.error);
                }
            }
        } finally {
            boardState?.setBusy(false);
        }
    }

    const deleteHandler = async (id: number) => {
        setError(undefined);
        boardState?.setBusy(true);
        try {
            const response = await deleteBoard(id, authState?.authToken?.accessToken);

            boardState?.setSelected(undefined);

            if (boardState?.data) {
                const newData = {...boardState?.data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content.splice(index, 1);
                }
                boardState?.setData(newData);
            }

            if (response?.error) {
                setError(resourceState?.manager?.boards.deleteBoard.error);
            }
        } finally {
            boardState?.setBusy(false);
        }
    }

    return (error ?
            <div className="flex  flex-col justify-center items-center w-full">
                <div className="font-mono text-xl">{error}</div>
            </div>
            :
            <>
                <div className="flex flex-col p-5 w-full">
                    <BoardSearchCriteriaForm searchHandler={setCriteria}>
                        <div className="join pl-5">
                            <WiwaButton
                                title={resourceState?.common?.action.add}
                                className="btn-primary join-item"
                                disabled={boardState?.busy}
                                onClick={() => {
                                    setEditMode(false);
                                    setShowDialog(true);
                                }}
                            >
                                <Plus size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                title={resourceState?.common?.action.edit}
                                className="btn-secondary join-item"
                                disabled={boardState?.busy || boardState?.selected === undefined}
                                onClick={() => {
                                    setEditMode(true);
                                    setShowDialog(true);
                                }}
                            >
                                <Edit size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                title={resourceState?.common?.action.categories}
                                className="btn-ghost join-item"
                                disabled={boardState?.busy || boardState?.selected === undefined}
                                onClick={() => {
                                    if (boardState?.selected) {
                                        navigate('/manager/boards/categories');
                                    }
                                }}
                            >
                                <List size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                title={resourceState?.common?.action.image}
                                className="btn-ghost join-item"
                                disabled={boardState?.busy || boardState?.selected === undefined}
                                onClick={() => {
                                    if (boardState?.selected) {
                                        navigate('/manager/boards/image');
                                    }
                                }}
                            >
                                <Image size={18}/>
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                title={resourceState?.common?.action.delete}
                                disabled={boardState?.busy || boardState?.selected === undefined}
                                onClick={() => {
                                    dialogState?.showDialog({
                                        type: DialogType.YES_NO,
                                        title: resourceState?.manager?.boards.deleteBoard.title,
                                        message: resourceState?.manager?.boards.deleteBoard.message,
                                        callback: (answer: DialogAnswer) => {
                                            if (answer === DialogAnswer.YES) {
                                                if (boardState?.selected) {
                                                    deleteHandler(boardState?.selected.id).then();
                                                }
                                            }
                                        }
                                    });
                                }}
                            ><Trash size={18}/>
                            </WiwaButton>
                        </div>
                    </BoardSearchCriteriaForm>

                    <div className="overflow-x-auto">
                        <BoardTable
                            fields={Object.values(BoardField)}
                            rows={boardState?.data?.content}
                            selected={boardState?.selected}
                            setSelected={(selected) => boardState?.setSelected(selected)}
                        />
                    </div>

                    <div className="w-full flex justify-center pt-5">
                        <WiwaPageable
                            isPrevious={previous}
                            previousHandler={() => setPage(page + 1)}
                            page={page + 1}
                            pageHandler={() => fetchData()}
                            isNext={next}
                            nextHandler={() => setPage(page - 1)}
                            disabled={boardState?.busy}
                        />
                    </div>
                </div>

                <BoardDataDialog
                    showDialog={showDialog}
                    board={editMode ? boardState?.selected : undefined}
                    okHandler={(data) => {
                        okHandler(data).then();
                        setShowDialog(false);
                    }}
                    cancelHandler={() => {
                        setError(undefined);
                        setShowDialog(false);
                    }}
                    submitting={boardState?.busy || false}
                />
            </>
    )
}

export default BoardsPage;

const BoardDataDialog = ({showDialog, board, okHandler, cancelHandler, submitting}: {
    showDialog: boolean,
    board?: Board,
    okHandler: (boardChange: BoardChange) => void,
    cancelHandler: () => void,
    submitting: boolean
}) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

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

    const [weight, setWeight] = useState('');
    const [weightValid, setWeightValid] = useState(false);

    const [length, setLength] = useState('');
    const [lengthValid, setLengthValid] = useState(false);

    const [width, setWidth] = useState('');
    const [widthValid, setWidthValid] = useState(false);

    const [thickness, setThickness] = useState('');
    const [thicknessValid, setThicknessValid] = useState(false);

    const [price, setPrice] = useState('');
    const [priceValid, setPriceValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setWeightSign(unitSign(UnitId.KILOGRAM));
        setLengthSign(unitSign(UnitId.MILLIMETER));
        getApplicationProperties().then(data => setPriceSign(`[${data?.data?.currency?.symbol}]`));
    }, [resourceState]);

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

            setWeight(String(board.weight));
            setWeightValid(true);

            setLength(String(board.length));
            setLengthValid(true);

            setWidth(String(board.width));
            setWidthValid(true);

            setThickness(String(board.thickness));
            setThicknessValid(true);

            setPrice(String(board.price));
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

            setWeight('');
            setWeightValid(true);

            setLength('');
            setLengthValid(true);

            setWidth('');
            setWidthValid(true);

            setThickness('');
            setThicknessValid(true);

            setPrice('');
            setPriceValid(true);
        }
    }, [showDialog, board]);

    useEffect(() => {
        setFormValid(codeValid && nameValid && boardCodeValid && structureCodeValid && weightValid && lengthValid
            && widthValid && thicknessValid && priceValid);
    }, [codeValid, nameValid, boardCodeValid, structureCodeValid, weightValid, lengthValid, widthValid, thicknessValid, priceValid]);

    const unitSign = (unitId: UnitId) => {
        return `[${getUnitIdName(unitId, resourceState?.common)}]`;
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={BOARD_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.boards.boardDialog.title}
                    </div>

                    <WiwaFormInput
                        label={resourceState?.manager?.boards.boardDialog.codeLabel}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.codePlaceholder}
                        value={code}
                        setValue={setCode}
                        setValid={setCodeValid}
                        validate={() => {
                            if (code.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.codeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.manager?.boards.boardDialog.nameLabel}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.nameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormTextarea
                        label={resourceState?.manager?.boards.boardDialog.descriptionLabel}
                        placeholder={resourceState?.manager?.boards.boardDialog.descriptionPlaceholder}
                        value={description}
                        setValue={setDescription}
                    />

                    <WiwaFormInput
                        label={resourceState?.manager?.boards.boardDialog.boardCodeLabel}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.boardCodePlaceholder}
                        value={boardCode}
                        setValue={setBoardCode}
                        setValid={setBoardCodeValid}
                        validate={() => {
                            if (boardCode.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.boardCodeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.manager?.boards.boardDialog.structureCodeLabel}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.structureCodePlaceholder}
                        value={structureCode}
                        setValue={setStructureCode}
                        setValid={setStructureCodeValid}
                        validate={() => {
                            if (structureCode.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.structureCodeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                {resourceState?.manager?.boards.boardDialog.orientationLabel}
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

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.boards.boardDialog.weightLabel} ${weightSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.weightPlaceholder}
                        value={weight}
                        setValue={setWeight}
                        setValid={setWeightValid}
                        validate={() => {
                            if (weight.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.weightRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.boards.boardDialog.lengthLabel} ${lengthSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.lengthPlaceholder}
                        value={length}
                        setValue={setLength}
                        setValid={setLengthValid}
                        validate={() => {
                            if (length.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.lengthRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.boards.boardDialog.widthLabel} ${lengthSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.widthPlaceholder}
                        value={width}
                        setValue={setWidth}
                        setValid={setWidthValid}
                        validate={() => {
                            if (width.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.widthRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.boards.boardDialog.thicknessLabel} ${lengthSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.thicknessPlaceholder}
                        value={thickness}
                        setValue={setThickness}
                        setValid={setThicknessValid}
                        validate={() => {
                            if (thickness.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.thicknessRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.boards.boardDialog.priceLabel} ${priceSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.boards.boardDialog.pricePlaceholder}
                        value={price}
                        setValue={setPrice}
                        setValid={setPriceValid}
                        validate={() => {
                            if (price.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.boards.boardDialog.priceRequired
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
                                    boardCode,
                                    structureCode,
                                    orientation,
                                    weight: Number(weight),
                                    length: Number(length),
                                    width: Number(width),
                                    thickness: Number(thickness),
                                    price: Number(price)
                                });
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
