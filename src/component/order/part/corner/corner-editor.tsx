import { useContext, useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';

import CornerDialog from './corner-dialog';
import CornerValue from './corner-value';
import { PartEditorContext } from '../part-editor-provider';
import WiwaButton from '../../../ui/wiwa-button';
import { CornerPosition } from '../../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../../context';
import { DialogAnswer, DialogType } from '../../../../context/model/dialog';
import { PartCorner } from '../../../../api/model/order/part';

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

    const [partCorner, setPartCorner] = useState<PartCorner>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setPartCorner(partEditorState?.cornerData.find(item => item.cornerPosition === cornerPosition)?.partCorner);
    }, [cornerPosition, partEditorState?.cornerData]);

    const deleteButton = <WiwaButton
        disabled={partCorner === undefined}
        title={commonResourceState?.resource?.action.delete}
        className="btn-accent btn-xs join-item"
        onClick={() => {
            dialogState?.showDialog({
                type: DialogType.YES_NO,
                title: `${commonResourceState?.resource?.partEditor.deleteCornerQuestionTitle} ${partEditorState?.getCornerName(cornerPosition)}`,
                message: commonResourceState?.resource?.partEditor.deleteCornerQuestionMessage,
                callback: (answer: DialogAnswer) => {
                    if (answer === DialogAnswer.YES) {
                        partEditorState?.setPartCorner(cornerPosition, undefined);
                    }
                }
            });
        }}
    >
        <Trash size={12}/>
    </WiwaButton>;

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <CornerValue size={28} cornerPosition={cornerPosition}>
                    <div className="join">
                        {(cornerPosition === CornerPosition.A1B1 || cornerPosition === CornerPosition.A2B1) && deleteButton}
                        <WiwaButton
                            title={commonResourceState?.resource?.action.edit}
                            className="btn-primary btn-xs join-item"
                            onClick={() => setShowDialog(true)}
                        >
                            <Edit size={12}/>
                        </WiwaButton>
                        {(cornerPosition === CornerPosition.A1B2 || cornerPosition === CornerPosition.A2B2) && deleteButton}
                    </div>
                </CornerValue>
            </div>

            <CornerDialog
                cornerPosition={cornerPosition}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    )
}

export default CornerEditor;
