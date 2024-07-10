import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PartEditorContext } from '../part-editor-provider';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { Dimensions } from '../../../../api/model';
import { BoardDimension, BoardPosition, UnitId } from '../../../../api/model/application';
import { CommonResourceContext, DialogContext } from '../../../../context';
import WiwaFormDimensions from '../../../ui/wiwa-form-dimensions.tsx';

const BoardDimensionsDialog = ({boardPosition, showDialog, setShowDialog}: {
    boardPosition: BoardPosition,
    showDialog: boolean,
    setShowDialog: (showDialog: boolean) => void
}) => {
    const partEditorState = useContext(PartEditorContext);
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [dimensions, setDimensions] = useState<Dimensions>();
    const [dimensionsValid, setDimensionsValid] = useState(false);

    useEffect(() => {
        setDimensions(partEditorState?.boardDimensionsData.find(item => item.boardPosition === boardPosition)?.dimensions);
    }, [showDialog]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={`part-editor-board-dimensions-dialog-${boardPosition}`} showDialog={showDialog}
                    closeHandler={() => setShowDialog(false)}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {`${commonResourceState?.resource?.partEditor.boardDimensionsDialogTitle} ${partEditorState?.getBoardName(boardPosition)}`}
                    </div>

                    <WiwaFormDimensions
                        label={`${partEditorState?.getBoardName(boardPosition)} [${commonResourceState?.getUnit(UnitId.MILLIMETER)}]`}
                        required={true}
                        placeholderX={`${commonResourceState?.resource?.partEditor.valuePlaceholder} ${partEditorState?.getDimensionName(BoardDimension.X)}`}
                        placeholderY={`${commonResourceState?.resource?.partEditor.valuePlaceholder} ${partEditorState?.getDimensionName(BoardDimension.Y)}`}
                        value={dimensions}
                        setValue={setDimensions}
                        setValid={setDimensionsValid}
                        validate={() => {
                            if (dimensions === undefined) {
                                return {
                                    valid: false,
                                    message: `${partEditorState?.getBoardName(boardPosition)} ${commonResourceState?.resource?.partEditor.valueRequired}`
                                };
                            }

                            // TODO other validations

                            return {valid: true};
                        }}
                    />

                    <div className="join">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={!dimensionsValid}
                            onClick={() => {
                                partEditorState?.setBoardDimensions(boardPosition, dimensions);
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

export default BoardDimensionsDialog;
