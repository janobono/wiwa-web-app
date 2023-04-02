import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';

import { WiwaError } from '../../../client';
import { LocaleData } from '../../../client/model';

import { LOCALE, RESOURCE, toLocale } from '../../../locale';

import { WiwaButton, WiwaMarkdownRenderer, WiwaSpinner, WiwaTextArea } from '../../../component/ui';
import { FlagSk, FlagUs } from '../../../component/ui/icon';

interface ChangeMarkdownDialogProps {
    title: string,
    errorMessage: string,
    initialData: LocaleData<string>,
    saveData: (data: LocaleData<string>) => Promise<WiwaError | undefined> | undefined,
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeMarkdownDialog: React.FC<ChangeMarkdownDialogProps> = (props) => {
    const {t} = useTranslation();

    const [markdownData, setMarkdownData] = useState<LocaleData<string>>(props.initialData);
    const [isFormValid, setFormValid] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const validArray: boolean[] = markdownData.items.map(item => item.data.trim().length > 0);
        setFormValid(
            validArray.length > 1
            && validArray.reduce((previousValue, currentValue) => previousValue && currentValue)
        );
    }, [markdownData.items])

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid) {
                const wiwaError = await props.saveData(markdownData);
                if (wiwaError) {
                    setError(props.errorMessage);
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
                                className="w-full transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                                <div className="text-lg md:text-xl font-bold text-center mb-5">{props.title}</div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    {props.initialData.items.map((dataItem, index) =>
                                        <div className="mb-5" key={index}>
                                            <LocaleDataEditor
                                                language={dataItem.language}
                                                markdownData={markdownData}
                                                setMarkdownData={setMarkdownData}
                                            />
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

export default ChangeMarkdownDialog;

interface LocaleDataEditorProps extends PropsWithChildren {
    language: string,
    markdownData: LocaleData<string>,
    setMarkdownData: React.Dispatch<React.SetStateAction<LocaleData<string>>>
}

const LocaleDataEditor: React.FC<LocaleDataEditorProps> = (props) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const item = props.markdownData?.items.find(item => item.language === props.language);
        if (item) {
            setValue(item.data);
        }
    }, []);

    useEffect(() => {
        props.setMarkdownData((prevState) => {
                const nextItems = [...prevState.items.filter(item => item.language !== props.language),
                    {language: props.language, data: value}
                ];
                return {items: nextItems};
            }
        );
    }, [value]);

    return (
        <>
            <div className="flex flex-row mb-5">
                {toLocale(props.language) === LOCALE.EN ? <FlagUs/> : <FlagSk/>}
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
                <WiwaTextArea
                    className="w-full p-0.5"
                    rows={20}
                    id={props.language}
                    name={props.language}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
                <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={value}/>
            </div>
        </>
    );
}
