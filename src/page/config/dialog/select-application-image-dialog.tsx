import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';
import { ApplicationImage } from '../../../client/model';
import { ApplicationImageCard } from '../../../component/application-image';
import { WiwaButton } from '../../../component/ui';

interface SelectApplicationImageDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    onApplicationImageAddHandler: (applicationImage: ApplicationImage) => void
}

const SelectApplicationImageDialog: React.FC<SelectApplicationImageDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const [selectedApplicationImage, setSelectedApplicationImage] = useState<ApplicationImage>();
    const [applicationImages, setApplicationImages] = useState<ApplicationImage[]>([]);

    useEffect(() => {
        uiState?.getApplicationImages().then(data => {
            if (data?.data) {
                setSelectedApplicationImage(undefined);
                setApplicationImages(data.data);
            }
        })
    }, []);

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
                                    {t(RESOURCE.PAGE.CONFIG.DIALOG.SELECT_APPLICATION_IMAGE.TITLE)}
                                </div>
                                <div className="grid grid-cols-2 gap-5 mb-5">
                                    {applicationImages.map(applicationImage =>
                                        <ApplicationImageCard
                                            key={applicationImage.fileName}
                                            applicationImage={applicationImage}
                                            selected={selectedApplicationImage !== undefined && selectedApplicationImage.fileName === applicationImage.fileName}
                                            onSelect={setSelectedApplicationImage}
                                        />
                                    )}
                                </div>
                                <WiwaButton
                                    className="w-full"
                                    disabled={selectedApplicationImage === undefined}
                                    onClick={() => {
                                        if (selectedApplicationImage) {
                                            props.onApplicationImageAddHandler(selectedApplicationImage);
                                        }
                                        props.setShowDialog(false);
                                    }}
                                >
                                    {t(RESOURCE.ACTION.SELECT)}
                                </WiwaButton>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default SelectApplicationImageDialog;
