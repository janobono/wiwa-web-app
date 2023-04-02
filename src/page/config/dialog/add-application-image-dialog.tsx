import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';

import { WiwaButton, WiwaFileInput, WiwaSpinner } from '../../../component/ui';
import { ApplicationImage } from '../../../client/model';

interface AddApplicationImageDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    onApplicationImageAddHandler: (applicationImage: ApplicationImage) => void
}

const AddApplicationImageDialog: React.FC<AddApplicationImageDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const [applicationImage, setApplicationImage] = useState<File>();
    const [applicationImageValid, setApplicationImageValid] = useState(false);
    const [applicationImageMessage, setApplicationImageMessage] = useState<string>();

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const isFormValid = (): boolean => {
        return applicationImageValid;
    }

    useEffect(() => {
        setApplicationImageMessage(t(RESOURCE.PAGE.CONFIG.DIALOG.ADD_APPLICATION_IMAGE.FORM.APPLICATION_IMAGE.VALIDATION_MESSAGE1).toString());
    }, []);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid() && applicationImage) {
                const clientResponse = await uiState?.addApplicationImage(applicationImage);
                if (!clientResponse || clientResponse?.error || clientResponse.data === undefined) {
                    setError(t(RESOURCE.PAGE.CONFIG.DIALOG.ADD_APPLICATION_IMAGE.ERROR).toString());
                } else {
                    props.setShowDialog(false);
                    props.onApplicationImageAddHandler(clientResponse.data);
                }
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
                                    {t(RESOURCE.PAGE.CONFIG.DIALOG.ADD_APPLICATION_IMAGE.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    <div className="mb-5">
                                        <WiwaFileInput
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.ADD_APPLICATION_IMAGE.FORM.APPLICATION_IMAGE.LABEL)}
                                            message={applicationImageMessage}
                                            required={true}
                                            setValue={(file) => {
                                                console.log(file.type);
                                                if (!file) {
                                                    setApplicationImage(undefined);
                                                    setApplicationImageValid(false);
                                                    setApplicationImageMessage(t(RESOURCE.PAGE.CONFIG.DIALOG.ADD_APPLICATION_IMAGE.FORM.APPLICATION_IMAGE.VALIDATION_MESSAGE1).toString());
                                                    return;
                                                }
                                                if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                                                    setApplicationImage(undefined);
                                                    setApplicationImageValid(false);
                                                    setApplicationImageMessage(t(RESOURCE.PAGE.CONFIG.DIALOG.ADD_APPLICATION_IMAGE.FORM.APPLICATION_IMAGE.VALIDATION_MESSAGE2).toString());
                                                    return;
                                                }
                                                setApplicationImage(file);
                                                setApplicationImageValid(true);
                                                setApplicationImageMessage(undefined);
                                            }}
                                        />
                                    </div>

                                    {isSubmitting ?
                                        <div className="flex items-center justify-center">
                                            <WiwaSpinner className="w-5 h-5 border-2 pr-1"/>
                                        </div>
                                        :
                                        <WiwaButton
                                            type="submit"
                                            className="w-full"
                                            disabled={!isFormValid() || isSubmitting}
                                        >
                                            {t(RESOURCE.ACTION.ADD)}
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

export default AddApplicationImageDialog;
