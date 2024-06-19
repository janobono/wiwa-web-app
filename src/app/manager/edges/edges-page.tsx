import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Edit, Image, List, Plus, Trash } from 'react-feather';

import { useEdgeState } from '../edges-base-page';
import { addEdge, deleteEdge, getEdges, setEdge } from '../../../api/controller/edge';
import { getApplicationProperties } from '../../../api/controller/ui';
import { UnitId } from '../../../api/model/application';
import { Edge, EdgeChange, EdgeField, EdgeSearchCriteria } from '../../../api/model/edge';
import EdgeTable from '../../../component/edge/edge-table';
import EdgeSearchCriteriaForm from '../../../component/edge/edge-search-criteria-form';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaFormInput from '../../../component/ui/wiwa-form-input';
import WiwaFormTextarea from '../../../component/ui/wiwa-form-textarea';
import WiwaPageable from '../../../component/ui/wiwa-pageable';
import { DialogAnswer, DialogType } from '../../../model/ui';
import { useAuthState } from '../../../state/auth';
import { useDialogState } from '../../../state/dialog';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const BOARD_DIALOG_ID = 'edge-dialog-001';

const EdgesPage = () => {
    const navigate = useNavigate();

    const authState = useAuthState();
    const dialogState = useDialogState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const edgeState = useEdgeState();

    const [criteria, setCriteria] = useState<EdgeSearchCriteria>();
    const [page, setPage] = useState(0);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, [criteria]);

    useEffect(() => {
        setPrevious(edgeState?.data !== undefined && !edgeState.data.first);
        setNext(edgeState?.data !== undefined && !edgeState.data.last);

        if (edgeState?.selected && edgeState?.data) {
            const index = edgeState.data.content.findIndex(item => item.id === edgeState.selected?.id);
            if (index !== -1) {
                edgeState.setSelected(edgeState.data.content[index]);
            }
        } else {
            edgeState?.setSelected(undefined);
        }
    }, [edgeState?.data, edgeState?.selected]);

    const fetchData = async () => {
        edgeState?.setBusy(true);
        try {
            const response = await getEdges(criteria, {page, size: 10}, authState?.authToken?.accessToken);
            edgeState?.setData(response?.data);
            errorState?.addError(response?.error);
        } finally {
            edgeState?.setBusy(false);
        }
    }

    const okHandler = async (edgeChange: EdgeChange) => {
        edgeState?.setBusy(true);
        try {
            let response;
            if (editMode) {
                if (edgeState?.selected) {
                    response = await setEdge(edgeState?.selected.id, edgeChange, authState?.authToken?.accessToken);
                }
            } else {
                response = await addEdge(edgeChange, authState?.authToken?.accessToken);
            }

            if (edgeState?.data && response?.data) {
                const newData = {...edgeState?.data};
                const index = newData.content.findIndex(item => item.id === response.data.id);
                if (index !== -1) {
                    newData.content[index] = response.data;
                } else {
                    newData.content.push(response.data);
                }
                edgeState?.setData(newData);
            }

            errorState?.addError(response?.error);
        } finally {
            edgeState?.setBusy(false);
        }
    }

    const deleteHandler = async (id: number) => {
        edgeState?.setBusy(true);
        try {
            const response = await deleteEdge(id, authState?.authToken?.accessToken);

            edgeState?.setSelected(undefined);

            if (edgeState?.data) {
                const newData = {...edgeState?.data};
                const index = newData.content.findIndex(item => item.id === id);
                if (index !== -1) {
                    newData.content.splice(index, 1);
                }
                edgeState?.setData(newData);
            }

            errorState?.addError(response?.error);
        } finally {
            edgeState?.setBusy(false);
        }
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.managerNav.edges || '',
                    to: '/manager/edges'
                }
            ]}/>
            <div className="flex flex-col p-5 w-full">
                <EdgeSearchCriteriaForm searchHandler={setCriteria}>
                    <div className="join pl-5">
                        <WiwaButton
                            title={resourceState?.common?.action.add}
                            className="btn-primary join-item"
                            disabled={edgeState?.busy}
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
                            disabled={edgeState?.busy || edgeState?.selected === undefined}
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
                            disabled={edgeState?.busy || edgeState?.selected === undefined}
                            onClick={() => {
                                if (edgeState?.selected) {
                                    navigate('/manager/edges/categories');
                                }
                            }}
                        >
                            <List size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            title={resourceState?.common?.action.image}
                            className="btn-ghost join-item"
                            disabled={edgeState?.busy || edgeState?.selected === undefined}
                            onClick={() => {
                                if (edgeState?.selected) {
                                    navigate('/manager/edges/image');
                                }
                            }}
                        >
                            <Image size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            title={resourceState?.common?.action.delete}
                            disabled={edgeState?.busy || edgeState?.selected === undefined}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: resourceState?.manager?.edges.deleteEdge.title,
                                    message: resourceState?.manager?.edges.deleteEdge.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            if (edgeState?.selected) {
                                                deleteHandler(edgeState?.selected.id).then();
                                            }
                                        }
                                    }
                                });
                            }}
                        ><Trash size={18}/>
                        </WiwaButton>
                    </div>
                </EdgeSearchCriteriaForm>

                <div className="overflow-x-auto">
                    <EdgeTable
                        fields={Object.values(EdgeField)}
                        rows={edgeState?.data?.content}
                        selected={edgeState?.selected}
                        setSelected={(selected) => edgeState?.setSelected(selected)}
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
                        disabled={edgeState?.busy}
                    />
                </div>
            </div>

            <EdgeDataDialog
                showDialog={showDialog}
                edge={editMode ? edgeState?.selected : undefined}
                okHandler={(data) => {
                    okHandler(data).then();
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
                submitting={edgeState?.busy || false}
            />
        </>
    )
}

export default EdgesPage;

const EdgeDataDialog = ({showDialog, edge, okHandler, cancelHandler, submitting}: {
    showDialog: boolean,
    edge?: Edge,
    okHandler: (edgeChange: EdgeChange) => void,
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

    const [weight, setWeight] = useState('');
    const [weightValid, setWeightValid] = useState(false);

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
        if (edge) {
            setCode(edge.code);
            setCodeValid(true);

            setName(edge.name);
            setNameValid(true);

            setDescription(edge.description || '');

            setWeight(String(edge.weight));
            setWeightValid(true);

            setWidth(String(edge.width));
            setWidthValid(true);

            setThickness(String(edge.thickness));
            setThicknessValid(true);

            setPrice(String(edge.price));
            setPriceValid(true);
        } else {
            setCode('');
            setCodeValid(true);

            setName('');
            setNameValid(true);

            setDescription('');

            setWeight('');
            setWeightValid(true);

            setWidth('');
            setWidthValid(true);

            setThickness('');
            setThicknessValid(true);

            setPrice('');
            setPriceValid(true);
        }
    }, [showDialog, edge]);

    useEffect(() => {
        setFormValid(codeValid && nameValid && weightValid && widthValid && thicknessValid && priceValid);
    }, [codeValid, nameValid, weightValid, widthValid, thicknessValid, priceValid]);

    const unitSign = (unitId: UnitId) => {
        return `[${resourceState?.getUnit(unitId)}]`;
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={BOARD_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.manager?.edges.edgeDialog.title}
                    </div>

                    <WiwaFormInput
                        label={resourceState?.manager?.edges.edgeDialog.codeLabel}
                        required={true}
                        placeholder={resourceState?.manager?.edges.edgeDialog.codePlaceholder}
                        value={code}
                        setValue={setCode}
                        setValid={setCodeValid}
                        validate={() => {
                            if (code.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.edges.edgeDialog.codeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.manager?.edges.edgeDialog.nameLabel}
                        required={true}
                        placeholder={resourceState?.manager?.edges.edgeDialog.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.edges.edgeDialog.nameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormTextarea
                        label={resourceState?.manager?.edges.edgeDialog.descriptionLabel}
                        placeholder={resourceState?.manager?.edges.edgeDialog.descriptionPlaceholder}
                        value={description}
                        setValue={setDescription}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.edges.edgeDialog.weightLabel} ${weightSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.edges.edgeDialog.weightPlaceholder}
                        value={weight}
                        setValue={setWeight}
                        setValid={setWeightValid}
                        validate={() => {
                            if (weight.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.edges.edgeDialog.weightRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.edges.edgeDialog.widthLabel} ${lengthSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.edges.edgeDialog.widthPlaceholder}
                        value={width}
                        setValue={setWidth}
                        setValid={setWidthValid}
                        validate={() => {
                            if (width.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.edges.edgeDialog.widthRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.edges.edgeDialog.thicknessLabel} ${lengthSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.edges.edgeDialog.thicknessPlaceholder}
                        value={thickness}
                        setValue={setThickness}
                        setValid={setThicknessValid}
                        validate={() => {
                            if (thickness.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.edges.edgeDialog.thicknessRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="number"
                        min="0"
                        label={`${resourceState?.manager?.edges.edgeDialog.priceLabel} ${priceSign}`}
                        required={true}
                        placeholder={resourceState?.manager?.edges.edgeDialog.pricePlaceholder}
                        value={price}
                        setValue={setPrice}
                        setValid={setPriceValid}
                        validate={() => {
                            if (price.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.manager?.edges.edgeDialog.priceRequired
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
