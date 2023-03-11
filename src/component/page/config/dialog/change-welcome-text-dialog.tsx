import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { configClient, uiClient } from '../../../../client';
import { useUiState } from '../../../../state';
import { getLanguages, LOCALE, RESOURCE, toLocale } from '../../../../locale';

import { WiwaButton, WiwaSpinner, WiwaTextArea } from '../../../ui';
import { FlagSk, FlagUs } from '../../../ui/icon';

interface ChangeWelcomeTextDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeWelcomeTextDialog: React.FC<ChangeWelcomeTextDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const languages = getLanguages();

    const [welcomeTextData, setWelcomeTextData] = useState<configClient.LocaleData<string>>({items: []});
    const [isFormValid, setFormValid] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        languages.map(language => uiClient.getWelcomeText(toLocale(language)).then(
                data => {
                    setWelcomeTextData((prevState) => {
                        const nextItems = [...prevState.items.filter(item => item.language !== language),
                            {language, data: data.data ? data.data : ''}
                        ];
                        return {items: nextItems};
                    });
                }
            )
        );
    }, []);

    useEffect(() => {
        console.log(welcomeTextData.items);
        const validArray: boolean[] = welcomeTextData.items.map(item => item.data.trim().length > 0);
        setFormValid(
            validArray.length > 1
            && validArray.reduce((previousValue, currentValue) => previousValue && currentValue)
        );
    }, [welcomeTextData.items])

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid) {
                const wiwaError = await uiState?.changeWelcomeText(welcomeTextData);
                if (wiwaError) {
                    setError(t(RESOURCE.COMPONENT.PAGE.CONFIG.DIALOG.CHANGE_WELCOME_TEXT.ERROR).toString());
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
                                    {t(RESOURCE.COMPONENT.PAGE.CONFIG.DIALOG.CHANGE_WELCOME_TEXT.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    {languages.map((language, index) =>
                                        <div className="mb-5" key={index}>
                                            <WelcomeTextEditor
                                                language={language}
                                                titleData={welcomeTextData}
                                                setTitleData={setWelcomeTextData}
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

export default ChangeWelcomeTextDialog;

interface WelcomeTextEditorProps extends PropsWithChildren {
    language: string,
    titleData: configClient.LocaleData<string>,
    setTitleData: React.Dispatch<React.SetStateAction<configClient.LocaleData<string>>>
}

const WelcomeTextEditor: React.FC<WelcomeTextEditorProps> = (props) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const item = props.titleData?.items.find(item => item.language === props.language);
        if (item) {
            setValue(item.data);
        }
    }, [props.titleData]);

    useEffect(() => {
        props.setTitleData((prevState) => {
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
                rows={10}
                id={props.language}
                name={props.language}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
}
