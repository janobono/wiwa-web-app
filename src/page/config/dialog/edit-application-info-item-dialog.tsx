import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationImage, ApplicationInfoItem, LocaleData } from '../../../client/model';

import { getLanguages, LOCALE, RESOURCE, toLocale } from '../../../locale';

import { WiwaButton, WiwaInput, WiwaLabel, WiwaTextArea } from '../../../component/ui';
import { FlagSk, FlagUs } from '../../../component/ui/icon';
import { Image } from 'react-feather';
import { APP_IMAGES_PATH_PREFIX } from '../../../client';
import { SelectApplicationImageDialog } from './index';

interface EditApplicationInfoItemDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    applicationInfoItems?: LocaleData<ApplicationInfoItem>,
    onApplicationInfoItemsHandler: (applicationInfoItems: LocaleData<ApplicationInfoItem>) => void
}

const EditApplicationInfoItemDialog: React.FC<EditApplicationInfoItemDialogProps> = (props) => {
    const {t} = useTranslation();

    const languages = getLanguages();

    const [applicationInfoData, setApplicationInfoData] = useState<LocaleData<ApplicationInfoItem>>({items: []});
    const [isFormValid, setFormValid] = useState(false);

    useEffect(() => {
        if (props.applicationInfoItems) {
            setApplicationInfoData(props.applicationInfoItems);
        } else {
            const items = languages.map(language => {
                return {language, data: {title: '', text: '', imageFileName: ''}}
            });
            setApplicationInfoData({items});
        }
    }, []);

    useEffect(() => {
        const validArray: boolean[] = applicationInfoData.items.map(item => {
            return Array.from(Object.values(item.data))
                .map(value => value.toString().trim().length > 0)
                .reduce((previousValue, currentValue) => previousValue && currentValue);
        });
        setFormValid(
            validArray.length > 1
            && validArray.reduce((previousValue, currentValue) => previousValue && currentValue)
        );
    }, [applicationInfoData.items])

    const handleSubmit = async () => {
        if (isFormValid) {
            props.onApplicationInfoItemsHandler(applicationInfoData);
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

                                    {languages.length === applicationInfoData?.items.length &&
                                        <ApplicationInfoEditor
                                            applicationInfoData={applicationInfoData}
                                            setApplicationInfoData={setApplicationInfoData}
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
    applicationInfoData: LocaleData<ApplicationInfoItem>,
    setApplicationInfoData: React.Dispatch<React.SetStateAction<LocaleData<ApplicationInfoItem>>>
}

const ApplicationInfoEditor: React.FC<ApplicationInfoEditorProps> = (props) => {
    const {t} = useTranslation();

    const languages = getLanguages();

    const [title, setTitle] = useState<LocaleData<string>>({items: []});
    const [text, setText] = useState<LocaleData<string>>({items: []});
    const [imageFileName, setImageFileName] = useState<string>();

    const [showSelectApplicationImageDialog, setShowSelectApplicationImageDialog] = useState(false);

    const onApplicationImageAddHandler = (applicationImage: ApplicationImage) => {
        setImageFileName(applicationImage.fileName);
    }

    useEffect(() => {
        languages.map(language => {
            const item = props.applicationInfoData.items.find(item => item.language === language);
            if (item) {
                setTitle((prevState) => {
                    const nextItems = prevState.items.filter(titleItem => titleItem.language !== item.language);
                    nextItems.push({language: item.language, data: item.data.title});
                    return {items: nextItems};
                });
                setText((prevState) => {
                    const nextItems = prevState.items.filter(textItem => textItem.language !== item.language);
                    nextItems.push({language: item.language, data: item.data.text});
                    return {items: nextItems};
                });
                setImageFileName(item.data.imageFileName);
            }
        });
    }, []);

    useEffect(() => {
        const nextItems = languages.map(language => {

            const titleItem = title.items.find(nameItem => nameItem.language === language);
            const textItem = text.items.find(textItem => textItem.language === language);

            return {
                language,
                data: {
                    title: titleItem ? titleItem.data : '',
                    text: textItem ? textItem.data : '',
                    imageFileName: imageFileName ? imageFileName : ''
                }
            };
        });
        props.setApplicationInfoData({items: nextItems});
    }, [title, text, imageFileName]);

    return (
        <>
            {languages.length === title.items.length &&
                languages.length === text.items.length &&
                <>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="name">{t(RESOURCE.PAGE.CONFIG.DIALOG.EDIT_APPLICATION_INFO_ITEM.ITEM_TITLE)}
                        </WiwaLabel>
                        <div id="title" className="grid grid-cols-1">
                            {languages.map((language, index) =>
                                <LocaleDataInput
                                    key={index}
                                    name="title"
                                    language={language}
                                    data={title}
                                    setData={setTitle}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="text">{t(RESOURCE.PAGE.CONFIG.DIALOG.EDIT_APPLICATION_INFO_ITEM.ITEM_TEXT)}
                        </WiwaLabel>
                        <div id="text" className="grid grid-cols-1">
                            {languages.map((language, index) =>
                                <LocaleDataArea
                                    key={index}
                                    name="text"
                                    language={language}
                                    data={text}
                                    setData={setText}
                                />
                            )}
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
            }
        </>
    );
}

interface LocaleDataInputProps extends PropsWithChildren {
    name: string,
    language: string,
    data: LocaleData<string>,
    setData: React.Dispatch<React.SetStateAction<LocaleData<string>>>
}

const LocaleDataInput: React.FC<LocaleDataInputProps> = (props) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const item = props.data?.items.find(item => item.language === props.language);
        if (item) {
            setValue(item.data);
        }
    }, []);

    useEffect(() => {
        props.setData((prevState) => {
                const nextItems = [...prevState.items.filter(item => item.language !== props.language),
                    {language: props.language, data: value}
                ];
                return {items: nextItems};
            }
        );
    }, [value]);

    return (
        <div className="flex flex-row gap-2 items-center">
            {toLocale(props.language) === LOCALE.EN ? <FlagUs/> : <FlagSk/>}
            <WiwaInput
                className="w-full p-0.5"
                type="text"
                id={props.name + '_' + props.language}
                name={props.name + '_' + props.language}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
}

const LocaleDataArea: React.FC<LocaleDataInputProps> = (props) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const item = props.data?.items.find(item => item.language === props.language);
        if (item) {
            setValue(item.data);
        }
    }, []);

    useEffect(() => {
        props.setData((prevState) => {
                const nextItems = [...prevState.items.filter(item => item.language !== props.language),
                    {language: props.language, data: value}
                ];
                return {items: nextItems};
            }
        );
    }, [value]);

    return (
        <div className="flex flex-row gap-2 items-center">
            {toLocale(props.language) === LOCALE.EN ? <FlagUs/> : <FlagSk/>}
            <WiwaTextArea
                className="w-full p-0.5"
                rows={3}
                id={props.name + '_' + props.language}
                name={props.name + '_' + props.language}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
}
