import { useContext, useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';

import EdgeValue from './edge-value.tsx';
import EdgeDialog from '../edge-dialog';
import { PartEditorContext } from '../part-editor-provider';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { EdgePosition } from '../../../../api/model/application';
import { Edge } from '../../../../api/model/edge';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';

const EdgeEditor = (
    {
        edgePosition
    }: {
        edgePosition: EdgePosition
    }
) => {
    const dialogState = useContext(DialogContext);
    const partEditorState = useContext(PartEditorContext)
    const commonResourceState = useContext(CommonResourceContext);

    const [edge, setEdge] = useState<Edge>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setEdge(partEditorState?.edgeData.find(item => item.edgePosition === edgePosition)?.edge);
    }, [edgePosition, partEditorState?.edgeData]);

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <EdgeValue edgePosition={edgePosition}>
                    <div className="join">
                        <WiwaButton
                            title={commonResourceState?.resource?.action.edit}
                            className="btn-primary btn-xs join-item"
                            onClick={() => setShowDialog(true)}
                        >
                            <Edit size={12}/>
                        </WiwaButton>
                        <WiwaButton
                            disabled={edge === undefined}
                            title={commonResourceState?.resource?.action.delete}
                            className="btn-accent btn-xs join-item"
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: `${commonResourceState?.resource?.partEditor.deleteEdgeDialog.title} ${partEditorState?.getEdgeName(edgePosition)}`,
                                    message: commonResourceState?.resource?.partEditor.deleteEdgeDialog.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            partEditorState?.deleteEdge([edgePosition]);
                                        }
                                    }
                                });
                            }}
                        >
                            <Trash size={12}/>
                        </WiwaButton>
                    </div>
                </EdgeValue>
            </div>

            <EdgeProvider>
                <EdgeDialog
                    title={partEditorState?.getEdgeName(edgePosition)}
                    data={edge}
                    setData={(data) => partEditorState?.setEdge([edgePosition], data)}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default EdgeEditor;
