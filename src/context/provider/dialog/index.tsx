import { ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { CommonResourceContext, DialogContext, } from '../../';
import { DialogAnswer, DialogData, DialogType } from '../../model/dialog';
import BaseDialog from '../../../component/dialog/base-dialog';
import WiwaButton from '../../../component/ui/wiwa-button';

const DIALOG_ID = 'dialog-state-provider-dialog-001';

const DialogProvider = ({children}: { children: ReactNode }) => {
    const commonResourceState = useContext(CommonResourceContext);

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
            <DialogContext.Provider
                value={
                    {
                        modalRoot,
                        showDialog
                    }
                }
            >{children}
            </DialogContext.Provider>
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
                                <p className="text-sm text-center py-5">
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
                                >{commonResourceState?.resource?.dialogState.ok}
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
                                    >{commonResourceState?.resource?.dialogState.ok}
                                    </WiwaButton>
                                    <WiwaButton
                                        className="btn-accent join-item"
                                        onClick={() => {
                                            setShow(false);
                                            data.callback(DialogAnswer.CANCEL);
                                        }}
                                    >{commonResourceState?.resource?.dialogState.cancel}
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
                                    >{commonResourceState?.resource?.dialogState.yes}
                                    </WiwaButton>
                                    <WiwaButton
                                        className="btn-accent join-item"
                                        onClick={() => {
                                            setShow(false);
                                            data.callback(DialogAnswer.NO);
                                        }}
                                    >{commonResourceState?.resource?.dialogState.no}
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

export default DialogProvider;
