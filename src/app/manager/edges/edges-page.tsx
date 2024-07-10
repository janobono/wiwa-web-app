import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Image, List, Plus, Trash } from 'react-feather';

import { EdgeField } from '../../../api/model/edge';
import EdgeChangeDialog from '../../../component/app/manager/edges/edge-change-dialog';
import { EdgeContext } from '../../../component/edge/edge-provider';
import EdgeTable from '../../../component/edge/edge-table';
import EdgeSearchCriteriaForm from '../../../component/edge/edge-search-criteria-form';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import WiwaPageable from '../../../component/ui/wiwa-pageable';
import { CommonResourceContext, DialogContext, ManagerResourceContext } from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const EDGE_DIALOG_ID = 'manager-edge-dialog-001';

const EdgesPage = () => {
    const navigate = useNavigate();

    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);
    const edgeState = useContext(EdgeContext);

    const [editMode, setEditMode] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        edgeState?.getEdges().then();
    }, []);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.managerNav.edges || '',
                    to: '/manager/edges'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <EdgeSearchCriteriaForm searchHandler={(criteria) => edgeState?.setCriteria(criteria)}>
                    <>
                        <WiwaButton
                            title={commonResourceState?.resource?.action.add}
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
                            title={commonResourceState?.resource?.action.edit}
                            className="btn-secondary join-item"
                            disabled={edgeState?.busy || !edgeState?.editEnabled}
                            onClick={() => {
                                setEditMode(true);
                                setShowDialog(true);
                            }}
                        >
                            <Edit size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            title={commonResourceState?.resource?.action.categories}
                            className="btn-ghost join-item"
                            disabled={edgeState?.busy || !edgeState?.editEnabled}
                            onClick={() => {
                                if (edgeState?.selected) {
                                    navigate('/manager/edges/categories');
                                }
                            }}
                        >
                            <List size={18}/>
                        </WiwaButton>
                        <WiwaButton
                            title={commonResourceState?.resource?.action.image}
                            className="btn-ghost join-item"
                            disabled={edgeState?.busy || !edgeState?.editEnabled}
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
                            title={commonResourceState?.resource?.action.delete}
                            disabled={edgeState?.busy || !edgeState?.editEnabled}
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: managerResourceState?.resource?.edges.deleteEdge.title,
                                    message: managerResourceState?.resource?.edges.deleteEdge.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            edgeState?.deleteEdge().then();
                                        }
                                    }
                                });
                            }}
                        ><Trash size={18}/>
                        </WiwaButton>
                    </>
                </EdgeSearchCriteriaForm>

                <div className="overflow-x-auto">
                    <EdgeTable
                        fields={Object.values(EdgeField)}
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
            </div>

            <EdgeChangeDialog
                dialogId={EDGE_DIALOG_ID}
                showDialog={showDialog}
                edge={editMode ? edgeState?.selected : undefined}
                okHandler={(data) => {
                    if (editMode) {
                        edgeState?.setEdge(data).then();
                    } else {
                        edgeState?.addEdge(data).then();
                    }
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
                submitting={edgeState?.busy || false}
            />
        </>
    )
}

export default EdgesPage;
