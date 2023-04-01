import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ApplicationInfo, LocaleData } from '../../../client';
import { getLanguages, RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';

import { WiwaButton, WiwaSpinner } from '../../../component/ui';

interface ChangeApplicationInfoDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeApplicationInfoDialog: React.FC<ChangeApplicationInfoDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const languages = getLanguages();

    const [applicationInfoData, setApplicationInfoData] = useState<LocaleData<ApplicationInfo>>({items: []});
    const [isFormValid, setFormValid] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        // languages.map(language => uiClient.getApplicationInfo(toLocale(language)).then(
        //         data => {
        //             setApplicationInfoData((prevState) => {
        //                 const nextItems = [...prevState.items.filter(item => item.language !== language),
        //                     {language, data: data.data ? data.data : ''}
        //                 ];
        //                 return {items: nextItems};
        //             });
        //         }
        //     )
        // );
    }, []);

    useEffect(() => {
        // const validArray: boolean[] = applicationInfoData.items.map(item => item.data.trim().length > 0);
        // setFormValid(
        //     validArray.length > 1
        //     && validArray.reduce((previousValue, currentValue) => previousValue && currentValue)
        // );
        setFormValid(false);
    }, [applicationInfoData.items])

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid) {
                const wiwaError = await uiState?.changeApplicationInfo(applicationInfoData);
                if (wiwaError) {
                    setError(t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_APPLICATION_INFO.ERROR).toString());
                } else {
                    props.setShowDialog(false);
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
                                    {t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_APPLICATION_INFO.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    {languages.map((language, index) =>
                                        <div className="mb-5" key={index}>
                                        </div>
                                    )}

                                    {isSubmitting ?
                                        <div className="flex items-center justify-center">
                                            <WiwaSpinner className="w-5 h-5 border-2 pr-1"/>
                                        </div>
                                        :
                                        <WiwaButton
                                            type="submit"
                                            className="w-full"
                                            disabled={!isFormValid || isSubmitting}
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

export default ChangeApplicationInfoDialog;
