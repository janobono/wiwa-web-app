import { useContext, useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';

import { getEdgeImagePath } from '../../../api/controller/ui';
import EdgeImageDialog from '../../../component/app/manager/edges/edge-image-dialog';
import { EdgeContext } from '../../../component/edge/edge-provider';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import { CommonResourceContext, DialogContext, ManagerResourceContext } from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const EDGE_IMAGE_DIALOG_ID = 'edge-image-dialog-001';

const EdgeImagePage = () => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);
    const edgeState = useContext(EdgeContext);

    const [data, setData] = useState<string>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (edgeState?.selected !== undefined) {
            setData(getEdgeImagePath(edgeState.selected.id));
        } else {
            setData(undefined);
        }
    }, [edgeState?.selected, data]);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.managerNav.edges || '',
                    to: '/manager/edges'
                },
                {
                    key: 2,
                    label: commonResourceState?.resource?.navigation.managerNav.edgeImage || '',
                    to: '/manager/edges/image'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <div className="join">
                    <WiwaButton
                        title={commonResourceState?.resource?.action.edit}
                        className="btn-secondary join-item"
                        disabled={edgeState?.busy || !edgeState?.editEnabled}
                        onClick={() => {
                            setShowDialog(true);
                        }}
                    >
                        <Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-accent join-item"
                        title={commonResourceState?.resource?.action.delete}
                        disabled={edgeState?.busy || !edgeState?.editEnabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: managerResourceState?.resource?.edges.edgeImage.deleteTitle,
                                message: managerResourceState?.resource?.edges.edgeImage.deleteMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        edgeState?.deleteEdgeImage().then(
                                            () => {
                                                setData(undefined);
                                            }
                                        );
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </div>
                <div className="flex flex-row w-full items-center justify-center">
                    <img
                        className="flex-none w-48 h-48 object-scale-down object-center"
                        src={data}
                        alt={edgeState?.selected?.name}
                    />
                </div>
            </div>

            <EdgeImageDialog
                dialogId={EDGE_IMAGE_DIALOG_ID}
                busy={edgeState?.busy || false}
                showDialog={showDialog}
                okHandler={(file) => {
                    edgeState?.setEdgeImage(file).then(
                        () => {
                            setData(undefined);
                            setShowDialog(false);
                        }
                    );
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default EdgeImagePage;
