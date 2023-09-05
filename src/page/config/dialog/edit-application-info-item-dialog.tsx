import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationImage, ApplicationInfoItem } from '../../../client/model';

import { RESOURCE } from '../../../locale';

import { WiwaButton, WiwaInput, WiwaLabel, WiwaTextArea } from '../../../component/ui';
import { Image } from 'react-feather';
import { APP_IMAGES_PATH_PREFIX } from '../../../client';
import { SelectApplicationImageDialog } from './index';

interface EditApplicationInfoItemDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    applicationInfoItem?: ApplicationInfoItem,
    onApplicationInfoItemHandler: (applicationInfoItem: ApplicationInfoItem) => void
}

const EditApplicationInfoItemDialog: React.FC<EditApplicationInfoItemDialogProps> = (props) => {
    const {t} = useTranslation();

    const [applicationInfoItem, setApplicationInfoItem] = useState(
        props.applicationInfoItem ? props.applicationInfoItem : {title: '', text: '', imageFileName: ''}
    );
    const [isFormValid, setFormValid] = useState(false);

    useEffect(() => {
        const valid = Array.from(Object.values(applicationInfoItem))
            .map(value => value.toString().trim().length > 0)
            .reduce((previousValue, currentValue) => previousValue && currentValue);
        setFormValid(valid);
    }, [applicationInfoItem]);

    const handleSubmit = async () => {
        if (isFormValid && applicationInfoItem) {
            props.onApplicationInfoItemHandler(applicationInfoItem);
            props.setShowDialog(false);
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

                                    {applicationInfoItem &&
                                        <ApplicationInfoEditor
                                            applicationInfoItem={applicationInfoItem}
                                            setApplicationInfoItem={setApplicationInfoItem}
                                        />
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

interface ApplicationInfoEditorProps extends PropsWithChildren {
    applicationInfoItem: ApplicationInfoItem,
    setApplicationInfoItem: React.Dispatch<React.SetStateAction<ApplicationInfoItem>>
}

const ApplicationInfoEditor: React.FC<ApplicationInfoEditorProps> = (props) => {
    const {t} = useTranslation();

    const [title, setTitle] = useState(props.applicationInfoItem.title);
    const [text, setText] = useState(props.applicationInfoItem.text);
    const [imageFileName, setImageFileName] = useState(props.applicationInfoItem.imageFileName);

    const [showSelectApplicationImageDialog, setShowSelectApplicationImageDialog] = useState(false);

    const onApplicationImageAddHandler = (applicationImage: ApplicationImage) => {
        setImageFileName(applicationImage.fileName);
    }

    useEffect(() => {
        props.setApplicationInfoItem({
            title,
            text,
            imageFileName
        });
    }, [title, text, imageFileName]);

    return (
        <>
            <div className="mb-2">
                <WiwaLabel
                    htmlFor="name">{t(RESOURCE.PAGE.CONFIG.DIALOG.EDIT_APPLICATION_INFO_ITEM.ITEM_TITLE)}
                </WiwaLabel>
                <div id="title" className="grid grid-cols-1">
                    <WiwaInput
                        className="flex-grow p-0.5"
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
            </div>
            <div className="mb-2">
                <WiwaLabel
                    htmlFor="text">{t(RESOURCE.PAGE.CONFIG.DIALOG.EDIT_APPLICATION_INFO_ITEM.ITEM_TEXT)}
                </WiwaLabel>
                <div id="text" className="grid grid-cols-1">
                    <WiwaTextArea
                        className="w-full p-0.5"
                        rows={20}
                        name="markdown"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />
                </div>
            </div>
            <div className="mb-2">
                <WiwaLabel
                    htmlFor="imageFileName">{t(RESOURCE.PAGE.CONFIG.DIALOG.EDIT_APPLICATION_INFO_ITEM.ITEM_FILE_NAME)}
                </WiwaLabel>
                <div className="flex flex-row gap-2 items-center">
                    <WiwaInput
                        className="flex-grow p-0.5"
                        id="imageFileName"
                        name="imageFileName"
                        type="text"
                        value={imageFileName}
                        onChange={event => setImageFileName(event.target.value)}
                    />
                    <WiwaButton
                        title={t(RESOURCE.ACTION.SELECT).toString()}
                        onClick={() => setShowSelectApplicationImageDialog(true)}
                    >
                        <Image size="18"/>
                    </WiwaButton>
                </div>
                <img
                    className="flex-none w-[100px] h-[100px] object-scale-down object-center "
                    src={APP_IMAGES_PATH_PREFIX + (imageFileName?.length && imageFileName?.length > 0 ? imageFileName : 'notFound')}
                    alt={imageFileName}
                />
            </div>

            {showSelectApplicationImageDialog &&
                <SelectApplicationImageDialog
                    showDialog={showSelectApplicationImageDialog}
                    setShowDialog={setShowSelectApplicationImageDialog}
                    onApplicationImageAddHandler={onApplicationImageAddHandler}
                />
            }
        </>
    );
}
