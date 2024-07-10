import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import SelectCodeList from './select-code-list';
import SelectCodeListItem from '../../../code-list/select-code-list-item';
import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { CodeList, CodeListItem } from '../../../../api/model/code-list';
import { CommonResourceContext, DialogContext, ManagerResourceContext } from '../../../../context';

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
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);

    const [selectedCodeList, setSelectedCodeList] = useState<CodeList>();
    const [selectedCodeListItem, setSelectedCodeListItem] = useState<CodeListItem>();

    return (!dialogState?.modalRoot ? null : createPortal(
            <BaseDialog id={dialogId} showDialog={showDialog}
                        closeHandler={() => setShowDialog(false)}>
                <div className="container p-5 mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-lg md:text-xl font-bold text-center">
                            {managerResourceState?.resource?.selectCodeListItemDialog.title}
                        </div>
                        <div className="flex flex-col p-5 w-full">
                            <SelectCodeList
                                placeholder={managerResourceState?.resource?.selectCodeListItemDialog.codeListPlaceholder}
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
                            >{commonResourceState?.resource?.action.ok}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    setShowDialog(false);
                                }}
                            >{commonResourceState?.resource?.action.cancel}
                            </WiwaButton>
                        </div>
                    </div>
                </div>
            </BaseDialog>
            , dialogState.modalRoot)
    )
}

export default SelectCodeListItemDialog;
