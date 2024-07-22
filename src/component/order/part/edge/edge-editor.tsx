import { useContext, useState } from 'react';
import { Image, Trash } from 'react-feather';

import EdgeDialog from './edge-dialog';
import EdgeValue from './edge-value';
import { EdgeData } from '../part-editor-provider';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { EdgePosition } from '../../../../api/model/application';
import { Edge } from '../../../../api/model/edge';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';

const EdgeEditor = (
    {
        position,
        name,
        data,
        setEdge,
        deleteEdge
    }: {
        position: EdgePosition,
        name?: string,
        data?: EdgeData,
        setEdge: (position: EdgePosition, data: Edge) => void,
        deleteEdge: (position: EdgePosition) => void
    }
) => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <EdgeValue
                    position={position}
                    name={name}
                    data={data}
                >
                    <div className="join">
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.actions.editEdge}
                            className="btn-secondary btn-xs join-item"
                            onClick={() => setShowDialog(true)}
                        >
                            <Image size={12}/>
                        </WiwaButton>
                        <WiwaButton
                            disabled={data === undefined}
                            title={commonResourceState?.resource?.action.delete}
                            className="btn-accent btn-xs join-item"
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: `${commonResourceState?.resource?.partEditor.deleteEdgeDialog.title} ${name}`,
                                    message: commonResourceState?.resource?.partEditor.deleteEdgeDialog.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            deleteEdge(position);
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
                    name={name}
                    data={data?.edge}
                    setData={(data) => setEdge(position, data)}
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default EdgeEditor;
