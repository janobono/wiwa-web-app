import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';

import { ClientResponse } from '../../../client';

import { RESOURCE } from '../../../locale';

import { WiwaButton, WiwaMarkdownRenderer, WiwaSpinner, WiwaTextArea } from '../../../component/ui';
import { SingleValueBody } from '../../../client/model';

interface ChangeMarkdownDialogProps {
    title: string,
    errorMessage: string,
    initialData: string,
    saveData: (data: string) => Promise<ClientResponse<SingleValueBody<string>> | undefined>,
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeMarkdownDialog: React.FC<ChangeMarkdownDialogProps> = (props) => {
    const {t} = useTranslation();

    const [markdown, setMarkdown] = useState(props.initialData);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            const clientResponse = await props.saveData(markdown);
            if (clientResponse !== undefined && clientResponse.data !== undefined) {
                props.setShowDialog(false);
            } else {
                setError(props.errorMessage);
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Transition appear show={props.showDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.setShowDialog(false)}>
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
                                className="w-full transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                                <div className="text-lg md:text-xl font-bold text-center mb-5">{props.title}</div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    <div className="grid grid-cols-2 gap-5 mb-5">
                                        <WiwaTextArea
                                            className="w-full p-0.5"
                                            rows={20}
                                            name="markdown"
                                            value={markdown}
                                            onChange={event => setMarkdown(event.target.value)}
                                        />
                                        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={markdown}/>
                                    </div>

                                    {isSubmitting ?
                                        <div className="flex items-center justify-center">
                                            <WiwaSpinner className="w-5 h-5 border-2 pr-1"/>
                                        </div>
                                        :
                                        <WiwaButton
                                            type="submit"
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            {t(RESOURCE.ACTION.SAVE)}
                                        </WiwaButton>
                                    }
                                </form>
                                {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ChangeMarkdownDialog;
