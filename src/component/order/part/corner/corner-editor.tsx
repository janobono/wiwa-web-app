import { useContext, useEffect, useState } from 'react';
import { Edit, Image, Trash } from 'react-feather';

import CornerDialog from './corner-dialog';
import CornerValue from './corner-value';
import { CornerData, PartEditorContext } from '../part-editor-provider';
import EdgeMaterialDialog from '../edge/edge-material-dialog';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { CornerPosition } from '../../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';

const CornerEditor = (
    {
        cornerPosition
    }: {
        cornerPosition: CornerPosition
    }
) => {
    const dialogState = useContext(DialogContext);
    const partEditorState = useContext(PartEditorContext)
    const commonResourceState = useContext(CommonResourceContext);

    const [data, setData] = useState<CornerData>();
    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    useEffect(() => {
        setData(partEditorState?.cornerData.find(item => item.cornerPosition === cornerPosition));
    }, [cornerPosition, partEditorState?.cornerData]);

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <CornerValue cornerPosition={cornerPosition}>
                    <div className="join">
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.cornerDimensions}
                            className="btn-primary btn-xs join-item"
                            onClick={() => setShowDimensionsDialog(true)}
                        >
                            <Edit size={12}/>
                        </WiwaButton>
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.cornerEdge}
                            className="btn-secondary btn-xs join-item"
                            onClick={() => setShowEdgeDialog(true)}
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
                                    title: `${commonResourceState?.resource?.partEditor.deleteCornerQuestionTitle} ${partEditorState?.getCornerName(cornerPosition)}`,
                                    message: commonResourceState?.resource?.partEditor.deleteCornerQuestionMessage,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            partEditorState?.deleteCorner(cornerPosition);
                                        }
                                    }
                                });
                            }}
                        >
                            <Trash size={12}/>
                        </WiwaButton>
                    </div>
                </CornerValue>
            </div>

            <CornerDialog
                cornerPosition={cornerPosition}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />
            <EdgeProvider>
                <EdgeMaterialDialog
                    edge={partEditorState?.cornerData.find(item => item.cornerPosition === cornerPosition)?.edge}
                    setEdge={(edge) => partEditorState?.setCornerEdge(cornerPosition, edge)}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default CornerEditor;
