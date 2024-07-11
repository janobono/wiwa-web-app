import { useContext, useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';

import EdgeMaterialDialog from './edge-material-dialog';
import EdgeMaterialValue from './edge-material-value';
import { PartEditorContext } from '../part-editor-provider';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { EdgePosition } from '../../../../api/model/application';
import { Edge } from '../../../../api/model/edge';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';

const EdgeMaterialEditor = (
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
        setEdge(partEditorState?.edgeMaterialData.find(item => item.edgePosition === edgePosition)?.edge);
    }, [edgePosition, partEditorState?.edgeMaterialData]);

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <EdgeMaterialValue edgePosition={edgePosition}>
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
                                    title: `${commonResourceState?.resource?.partEditor.deleteEdgeMaterialQuestionTitle} ${partEditorState?.getEdgeName(edgePosition)}`,
                                    message: commonResourceState?.resource?.partEditor.deleteEdgeMaterialQuestionMessage,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            partEditorState?.setEdgeMaterial(edgePosition, undefined);
                                        }
                                    }
                                });
                            }}
                        >
                            <Trash size={12}/>
                        </WiwaButton>
                    </div>
                </EdgeMaterialValue>
            </div>

            <EdgeProvider>
                <EdgeMaterialDialog
                    edgePosition={edgePosition}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default EdgeMaterialEditor;
