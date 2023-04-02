import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationInfoItem, LocaleData, LocaleDataItem } from '../../../client/model';

import { getLanguages, RESOURCE } from '../../../locale';

import { WiwaButton } from '../../../component/ui';

interface EditApplicationInfoItemDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    applicationInfoItems?: LocaleDataItem<ApplicationInfoItem | undefined>[],
    onApplicationInfoItemsHandler: (applicationInfoItems: LocaleDataItem<ApplicationInfoItem>[]) => void
}

const EditApplicationInfoItemDialog: React.FC<EditApplicationInfoItemDialogProps> = (props) => {
    const {t} = useTranslation();

    const languages = getLanguages();

    const [applicationInfoItems, setApplicationInfoItems] = useState<LocaleData<ApplicationInfoItem>[]>([]);
    const [isFormValid, setFormValid] = useState(false);

    useEffect(() => {

        // TODO

    }, []);

    useEffect(() => {

        // TODO

    }, [applicationInfoItems])

    const handleSubmit = async () => {
        if (isFormValid) {
            // TODO

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
                                    {t(RESOURCE.PAGE.CONFIG.DIALOG.EDIT_APPLICATION_INFO_ITEM.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    {languages.length === applicationInfoItems.length &&
                                        <>
                                        </>
                                    }

                                    <WiwaButton
                                        type="submit"
                                        className="w-full"
                                        disabled={!isFormValid}
                                    >
                                        {t(RESOURCE.ACTION.SAVE)}
                                    </WiwaButton>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default EditApplicationInfoItemDialog;
