import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogAnswer } from './index';
import { WiwaButton } from '../ui';
import { RESOURCE } from '../../locale';

interface YesNoDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    title: string,
    question: string,
    dialogAnswerHandler: (dialogAnswer: DialogAnswer) => void
}

const YesNoDialog: React.FC<YesNoDialogProps> = (props) => {
    const {t} = useTranslation();

    const answer = (dialogAnswer: DialogAnswer) => {
        props.setShowDialog(false);
        props.dialogAnswerHandler(dialogAnswer);
    }

    return (
        <Transition appear show={props.showDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => answer(DialogAnswer.NO)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                                <div className="text-lg md:text-xl font-bold text-center mb-5">
                                    {props.title}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex-grow text-center py-5">
                                        {props.question}
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <WiwaButton
                                            title={t(RESOURCE.ACTION.YES).toString()}
                                            variant="success"
                                            onClick={() => answer(DialogAnswer.YES)}
                                        >
                                            {t(RESOURCE.ACTION.YES).toString()}
                                        </WiwaButton>

                                        <WiwaButton
                                            title={t(RESOURCE.ACTION.NO).toString()}
                                            variant="error"
                                            onClick={() => answer(DialogAnswer.NO)}
                                        >
                                            {t(RESOURCE.ACTION.NO).toString()}
                                        </WiwaButton>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default YesNoDialog;
