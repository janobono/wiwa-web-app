import { useState } from 'react';
import { createPortal } from 'react-dom';

import SelectCodeList from './select-code-list';
import SelectCodeListItem from '../../../code-list/select-code-list-item';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { CodeList, CodeListItem } from '../../../../api/model/code-list';
import { useResourceState } from '../../../../state/resource';
import { useDialogState } from '../../../../state/dialog';

const SelectCodeListItemDialog = (
    {
        dialogId,
        codeLists,
        showDialog,
        setShowDialog,
        onSelectCodeListItem
    }: {
        dialogId: string,
        codeLists: CodeList[],
        showDialog: boolean,
        setShowDialog: (showDialog: boolean) => void,
        onSelectCodeListItem: (codeListItem: CodeListItem) => void
    }
) => {
    const dialogState = useDialogState();
    const resourceState = useResourceState();

    const [selectedCodeList, setSelectedCodeList] = useState<CodeList>();
    const [selectedCodeListItem, setSelectedCodeListItem] = useState<CodeListItem>();

    return (!dialogState?.modalRoot ? null : createPortal(
            <BaseDialog id={dialogId} showDialog={showDialog}
                        closeHandler={() => setShowDialog(false)}>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center">
                            {resourceState?.manager?.selectCodeListItemDialog.title}
                        </div>
                        <div className="flex flex-col p-5 w-full">
                            <SelectCodeList
                                placeholder={resourceState?.manager?.selectCodeListItemDialog.codeListPlaceholder}
                                setValue={(codeList) => {
                                    setSelectedCodeList(codeList);
                                    setSelectedCodeListItem(undefined);
                                }}
                                codeLists={codeLists}
                            />
                            {selectedCodeList &&
                                <SelectCodeListItem
                                    codeListId={selectedCodeList.id}
                                    itemSelectedHandler={setSelectedCodeListItem}
                                />
                            }
                        </div>
                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                disabled={selectedCodeList === undefined}
                                onClick={() => {
                                    if (selectedCodeListItem) {
                                        onSelectCodeListItem(selectedCodeListItem);
                                        setShowDialog(false);
                                    }
                                }}
                            >{resourceState?.common?.action.ok}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    setShowDialog(false);
                                }}
                            >{resourceState?.common?.action.cancel}
                            </WiwaButton>
                        </div>
                    </div>
                </div>
            </BaseDialog>
            , dialogState.modalRoot)
    )
}

export default SelectCodeListItemDialog;
