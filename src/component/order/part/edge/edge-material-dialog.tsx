import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

import BaseDialog from '../../../dialog/base-dialog';
import { EdgeContext } from '../../../edge/edge-provider';
import EdgeSearchCriteriaForm from '../../../edge/edge-search-criteria-form';
import EdgeTable from '../../../edge/edge-table';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaPageable from '../../../ui/wiwa-pageable';
import { getEdgeImagePath } from '../../../../api/controller/ui';
import { Edge, EdgeField } from '../../../../api/model/edge';
import { CommonResourceContext, DialogContext } from '../../../../context';

const EdgeMaterialDialog = ({edge, setEdge, showDialog, setShowDialog}: {
    edge?: Edge,
    setEdge: (edge: Edge) => void,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const edgeState = useContext(EdgeContext);
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    useEffect(() => {
        edgeState?.getEdges().then();
        edgeState?.setSelected(edge);
    }, [edge, showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog
            id="part-editor-edge-material-dialog"
            maxWidth={true}
            showDialog={showDialog}
            closeHandler={() => setShowDialog(false)}
        >
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {commonResourceState?.resource?.partEditor.edgeMaterialDialogTitle}
                    </div>
                    <EdgeSearchCriteriaForm searchHandler={(criteria) => edgeState?.setCriteria(criteria)}/>

                    <div className="overflow-x-auto">
                        <EdgeTable
                            fields={[EdgeField.code, EdgeField.name, EdgeField.width, EdgeField.thickness, EdgeField.price, EdgeField.image]}
                            rows={edgeState?.data}
                            selected={edgeState?.selected}
                            setSelected={(selected) => edgeState?.setSelected(selected)}
                        />
                    </div>

                    <div className="flex justify-center w-full">
                        <WiwaPageable
                            isPrevious={edgeState?.previous || false}
                            previousHandler={() => edgeState?.setPage(edgeState?.page + 1)}
                            page={(edgeState?.page || 0) + 1}
                            pageHandler={() => edgeState?.getEdges()}
                            isNext={edgeState?.next || false}
                            nextHandler={() => edgeState?.setPage(edgeState?.page - 1)}
                            disabled={edgeState?.busy}
                        />
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <img
                            className="flex-none w-24 h-24 object-scale-down object-center"
                            src={getEdgeImagePath(edgeState?.selected ? edgeState.selected.id : -1)}
                            alt="Board image"
                        />
                        <span
                            className="text-xs">{edgeState?.selected ? `${edgeState.selected.code} ${edgeState.selected.name}` : ''}
                        </span>
                    </div>
                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={edgeState?.selected === undefined}
                            onClick={() => {
                                if (edgeState?.selected) {
                                    setEdge(edgeState?.selected);
                                }
                                setShowDialog(false);
                            }}
                        >{commonResourceState?.resource?.imageDialog.ok}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            onClick={() => setShowDialog(false)}
                        >{commonResourceState?.resource?.imageDialog.cancel}
                        </WiwaButton>
                    </div>
                </div>
            </div>
        </BaseDialog>, dialogState.modalRoot))
}

export default EdgeMaterialDialog;
