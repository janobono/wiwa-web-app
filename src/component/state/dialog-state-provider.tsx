import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useResourceState } from './resource-state-provider';
import BaseDialog from '../dialog/base-dialog';
import WiwaButton from '../ui/wiwa-button';

export enum DialogType {
    INFO, OK_CANCEL, YES_NO
}

export enum DialogAnswer {
    OK, CANCEL, YES, NO
}

interface DialogData {
    type: DialogType,
    title?: string,
    message?: string,
    callback: (answer: DialogAnswer) => void
}

export interface DialogState {
    modalRoot: HTMLElement | null,
    showDialog: (data: DialogData) => void
}

const dialogStateContext = createContext<DialogState | undefined>(undefined);

const DIALOG_ID = 'dialog-state-provider-dialog-001';

const DialogStateProvider = ({children}: { children: ReactNode }) => {
    const resourceState = useResourceState();

    const [data, setData] = useState<DialogData>();
    const [show, setShow] = useState(false);
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setModalRoot(document.getElementById('modal-root'));
    }, []);

    const showDialog = (data: DialogData) => {
        setData(data);
        setShow(true);
    }

    return (
        <>
            <dialogStateContext.Provider
                value={
                    {
                        modalRoot,
                        showDialog
                    }
                }
            >{children}
            </dialogStateContext.Provider>
            {modalRoot !== null && createPortal(
                <BaseDialog
                    id={DIALOG_ID}
                    showDialog={show}
                >
                    <div className="container p-5 mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            {data?.title &&
                                <h1 className="text-lg md:text-xl font-bold text-center">
                                    {data.title}
                                </h1>
                            }
                            {data?.message &&
                                <p className="text-sm md:text-base text-center py-5">
                                    {data.message}
                                </p>
                            }

                            {data?.type && data.type !== DialogType.OK_CANCEL && data.type !== DialogType.YES_NO &&
                                <WiwaButton
                                    className="btn-primary"
                                    onClick={() => {
                                        setShow(false);
                                        data.callback(DialogAnswer.OK);
                                    }}
                                >{resourceState?.common?.dialogState.ok}
                                </WiwaButton>
                            }

                            {data?.type && data.type === DialogType.OK_CANCEL &&
                                <div className="join">
                                    <WiwaButton
                                        className="btn-primary join-item"
                                        onClick={() => {
                                            setShow(false);
                                            data.callback(DialogAnswer.OK);
                                        }}
                                    >{resourceState?.common?.dialogState.ok}
                                    </WiwaButton>
                                    <WiwaButton
                                        className="btn-accent join-item"
                                        onClick={() => {
                                            setShow(false);
                                            data.callback(DialogAnswer.CANCEL);
                                        }}
                                    >{resourceState?.common?.dialogState.cancel}
                                    </WiwaButton>
                                </div>
                            }

                            {data?.type && data.type === DialogType.YES_NO &&
                                <div className="join">
                                    <WiwaButton
                                        className="btn-primary join-item"
                                        onClick={() => {
                                            setShow(false);
                                            data.callback(DialogAnswer.YES);
                                        }}
                                    >{resourceState?.common?.dialogState.yes}
                                    </WiwaButton>
                                    <WiwaButton
                                        className="btn-accent join-item"
                                        onClick={() => {
                                            setShow(false);
                                            data.callback(DialogAnswer.NO);
                                        }}
                                    >{resourceState?.common?.dialogState.no}
                                    </WiwaButton>
                                </div>
                            }
                        </div>
                    </div>
                </BaseDialog>
                , modalRoot)
            }
        </>
    )
}

export default DialogStateProvider;

export const useDialogState = () => {
    return useContext(dialogStateContext);
}
