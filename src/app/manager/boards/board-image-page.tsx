import { useContext, useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';

import { getBoardImagePath } from '../../../api/controller/ui';
import BoardImageDialog from '../../../component/app/manager/boards/board-image-dialog';
import { BoardContext } from '../../../component/board/board-provider';
import WiwaBreadcrumb from '../../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../../component/ui/wiwa-button';
import { CommonResourceContext, DialogContext, ManagerResourceContext } from '../../../context';
import { DialogAnswer, DialogType } from '../../../context/model/dialog';

const BOARD_IMAGE_DIALOG_ID = 'board-image-dialog-001';

const BoardImagePage = () => {
    const dialogState = useContext(DialogContext);
    const commonResourceState = useContext(CommonResourceContext);
    const managerResourceState = useContext(ManagerResourceContext);
    const boardState = useContext(BoardContext);

    const [data, setData] = useState<string>();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (boardState?.selected !== undefined) {
            setData(getBoardImagePath(boardState.selected.id));
        } else {
            setData(undefined);
        }
    }, [boardState?.selected, data]);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.managerNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.managerNav.boards || '',
                    to: '/manager/boards'
                },
                {
                    key: 2,
                    label: commonResourceState?.resource?.navigation.managerNav.boardImage || '',
                    to: '/manager/boards/image'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <div className="join">
                    <WiwaButton
                        title={commonResourceState?.resource?.action.edit}
                        className="btn-secondary join-item"
                        disabled={boardState?.busy || !boardState?.editEnabled}
                        onClick={() => {
                            setShowDialog(true);
                        }}
                    >
                        <Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-accent join-item"
                        title={commonResourceState?.resource?.action.delete}
                        disabled={boardState?.busy || !boardState?.editEnabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: managerResourceState?.resource?.boards.boardImage.deleteTitle,
                                message: managerResourceState?.resource?.boards.boardImage.deleteMessage,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        boardState?.deleteBoardImage().then(
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
                        alt={boardState?.selected?.name}
                    />
                </div>
            </div>

            <BoardImageDialog
                dialogId={BOARD_IMAGE_DIALOG_ID}
                busy={boardState?.busy || false}
                showDialog={showDialog}
                okHandler={(file) => {
                    boardState?.setBoardImage(file).then(
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

export default BoardImagePage;
