import { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, Image, Trash } from 'react-feather';

import CornerValue from './corner-value';
import CornerDialog from '../corner/corner-dialog';
import EdgeDialog from '../edge/edge-dialog';
import EdgeProvider from '../../../edge/edge-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { CornerPosition } from '../../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';
import { Edge } from '../../../../api/model/edge';
import { Dimensions } from '../../../../api/model';
import { PartCornerType } from '../../../../api/model/order/part';

const CornerEditor = (
    {
        position,
        name,
        type,
        radius,
        dimensions,
        edge,
        setCornerDimensions,
        setCornerEdge,
        setCornerRadius,
        deleteCorner
    }: {
        position: CornerPosition,
        name?: string,
        type?: PartCornerType,
        radius?: number,
        dimensions?: Dimensions,
        edge?: Edge,
        setCornerDimensions: (data: Dimensions) => void,
        setCornerEdge: (data: Edge) => void,
        setCornerRadius: (data: number) => void,
        deleteCorner: () => void
    }
) => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [showDimensionsDialog, setShowDimensionsDialog] = useState(false);
    const [showEdgeDialog, setShowEdgeDialog] = useState(false);

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <CornerValue
                    position={position}
                    name={name}
                    type={type}
                    radius={radius}
                    dimensions={dimensions}
                    edge={edge}
                >
                    <div className="join">
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.actions.editDimensions}
                            className="btn-secondary btn-xs join-item"
                            onClick={() => setShowDimensionsDialog(true)}
                        >
                            <div className="grid grid-cols-2">
                                <ArrowLeft size={12}/>
                                <ArrowRight size={12}/>
                            </div>
                        </WiwaButton>
                        <WiwaButton
                            title={commonResourceState?.resource?.partEditor.actions.editEdge}
                            className="btn-secondary btn-xs join-item"
                            onClick={() => setShowEdgeDialog(true)}
                        >
                            <Image size={12}/>
                        </WiwaButton>
                        <WiwaButton
                            disabled={type === undefined}
                            title={commonResourceState?.resource?.action.delete}
                            className="btn-accent btn-xs join-item"
                            onClick={() => {
                                dialogState?.showDialog({
                                    type: DialogType.YES_NO,
                                    title: `${commonResourceState?.resource?.partEditor.deleteCornerDialog.title} ${name}`,
                                    message: commonResourceState?.resource?.partEditor.deleteCornerDialog.message,
                                    callback: (answer: DialogAnswer) => {
                                        if (answer === DialogAnswer.YES) {
                                            deleteCorner();
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
                name={name}
                dimensionsData={dimensions}
                setDimensionsData={(data) => setCornerDimensions(data)}
                radiusData={radius}
                setRadiusData={(data) => setCornerRadius(data)}
                showDialog={showDimensionsDialog}
                setShowDialog={setShowDimensionsDialog}
            />
            <EdgeProvider>
                <EdgeDialog
                    name={name}
                    data={edge}
                    setData={(data) => setCornerEdge(data)}
                    showDialog={showEdgeDialog}
                    setShowDialog={setShowEdgeDialog}
                />
            </EdgeProvider>
        </>
    )
}

export default CornerEditor;
