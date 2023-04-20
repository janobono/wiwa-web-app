import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';

import { WiwaButton, WiwaFileInput, WiwaSpinner } from '../../../component/ui';

interface ChangeLogoDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeLogoDialog: React.FC<ChangeLogoDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const [logo, setLogo] = useState<File>();
    const [logoValid, setLogoValid] = useState(false);
    const [logoMessage, setLogoMessage] = useState<string>();

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const isFormValid = (): boolean => {
        return logoValid;
    }

    useEffect(() => {
        setLogoMessage(t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_LOGO.FORM.LOGO.VALIDATION_MESSAGE1).toString());
    }, []);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid() && logo) {
                const clientResponse = await uiState?.changeLogo(logo);
                if (clientResponse !== undefined && clientResponse.error === undefined) {
                    props.setShowDialog(false);
                } else {
                    setError(t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_LOGO.ERROR).toString());
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
                                    {t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_LOGO.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    <div className="mb-5">
                                        <WiwaFileInput
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_LOGO.FORM.LOGO.LABEL)}
                                            message={logoMessage}
                                            required={true}
                                            setValue={(file) => {
                                                if (!file) {
                                                    setLogo(undefined);
                                                    setLogoValid(false);
                                                    setLogoMessage(t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_LOGO.FORM.LOGO.VALIDATION_MESSAGE1).toString());
                                                    return;
                                                }
                                                if (file.type !== 'image/png') {
                                                    setLogo(undefined);
                                                    setLogoValid(false);
                                                    setLogoMessage(t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_LOGO.FORM.LOGO.VALIDATION_MESSAGE2).toString());
                                                    return;
                                                }
                                                setLogo(file);
                                                setLogoValid(true);
                                                setLogoMessage(undefined);
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

export default ChangeLogoDialog;
