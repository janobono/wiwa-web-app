import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';

import { WiwaButton, WiwaSpinner, WiwaTextArea } from '../../../component/ui';

interface ChangeWelcomeTextDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeWelcomeTextDialog: React.FC<ChangeWelcomeTextDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const [welcomeText, setWelcomeText] = useState(
        uiState?.welcomeText ? uiState.welcomeText : ''
    );
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            const clientResponse = await uiState?.changeWelcomeText(welcomeText);
            if (clientResponse !== undefined && clientResponse.data !== undefined) {
                props.setShowDialog(false);
            } else {
                setError(t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_WELCOME_TEXT.ERROR).toString());
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
                                className="w-full max-w-md transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                                <div className="text-lg md:text-xl font-bold text-center mb-5">
                                    {t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_WELCOME_TEXT.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    {welcomeText &&
                                        <div className="mb-5">
                                            <div className="flex flex-row gap-2 items-center">
                                                <WiwaTextArea
                                                    className="w-full p-0.5"
                                                    rows={10}
                                                    value={welcomeText}
                                                    onChange={event => setWelcomeText(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    }

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

export default ChangeWelcomeTextDialog;
