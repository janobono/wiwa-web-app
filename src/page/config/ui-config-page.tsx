import React, { useEffect, useState } from 'react';
import { Edit, FileMinus, FilePlus } from 'react-feather';
import { useTranslation } from 'react-i18next';

import { uiClient } from '../../client';
import { ApplicationInfo, ApplicationInfoItem, LocaleData } from '../../client/model';
import { getLanguages, RESOURCE, toLanguage, toLocale } from '../../locale';
import { useConfigState, useUiState } from '../../state';

import { WiwaButton } from '../../component/ui';
import { ChangeLogoDialog, ChangeTitleDialog, ChangeWelcomeTextDialog, EditApplicationInfoItemDialog } from './dialog';
import ApplicationInfoItemCard from '../../component/application-info/application-info-item-card';
import { DialogAnswer, YesNoDialog } from '../../component/dialog';

const UiConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const configState = useConfigState();
    const uiState = useUiState();

    const [showLogoDialog, setShowLogoDialog] = useState(false);
    const [showTitleDialog, setShowTitleDialog] = useState(false);
    const [showWelcomeTextDialog, setShowWelcomeTextDialog] = useState(false);

    const languages = getLanguages();
    const [language, setLanguage] = useState<string>();
    const [applicationInfoData, setApplicationInfoData] = useState<LocaleData<ApplicationInfo>>({items: []});
    const [selectedApplicationInfoItemIndex, setSelectedApplicationInfoItemIndex] = useState<number>();
    const [showAddApplicationInfoItem, setShowAddApplicationInfoItem] = useState(false);
    const [showEditApplicationInfoItem, setShowEditApplicationInfoItem] = useState(false);
    const [showDeleteApplicationInfoItem, setShowDeleteApplicationInfoItem] = useState(false);

    useEffect(() => {
        if (configState) {
            setLanguage(toLanguage(configState.locale));
        }
    }, [configState?.locale]);

    useEffect(() => {
        languages.map(language => uiClient.getApplicationInfo(toLocale(language)).then(
                data => {
                    setApplicationInfoData((prevState) => {
                        const nextItems = [...prevState.items.filter(item => item.language !== language)];
                        const applicationInfo = data.data;
                        if (applicationInfo) {
                            nextItems.push({language, data: applicationInfo});
                        }
                        return {items: nextItems};
                    });
                }
            )
        );
    }, []);

    const onApplicationItemSelectHandler = (applicationInfoItem: ApplicationInfoItem) => {
        if (language !== undefined) {
            const index = applicationInfoData.items.find(value => value.language === language)?.data.items.findIndex(
                item => item.title === applicationInfoItem.title
                    && item.text === applicationInfoItem.text
                    && item.imageFileName === applicationInfoItem.imageFileName
            );
            setSelectedApplicationInfoItemIndex(index);
        }
    }

    const getSelectedApplicationInfoItems = (): LocaleData<ApplicationInfoItem> | undefined => {
        if (selectedApplicationInfoItemIndex === undefined) {
            return undefined;
        }
        const items = languages.map(language => {
            let item = applicationInfoData.items.find(value => value.language === language)?.data.items[selectedApplicationInfoItemIndex];
            if (!item) {
                item = {title: '', text: '', imageFileName: ''};
            }
            return {language, data: item};
        });
        return {items};
    }

    const addApplicationInfoItemHandler = (applicationInfoItems: LocaleData<ApplicationInfoItem>) => {
        const newItems = applicationInfoData.items.map(
            localeDataItem => {
                const newLocaleDataItem = applicationInfoItems.items
                    .filter(dataItem => dataItem.language === localeDataItem.language)
                    .map(dataItem => dataItem.data)[0];

                return {
                    language: localeDataItem.language,
                    data: {items: [...localeDataItem.data.items, newLocaleDataItem]}
                };
            });
        uiState?.changeApplicationInfo({items: newItems});
        setApplicationInfoData({items: newItems});
    }

    const editApplicationInfoItemHandler = (applicationInfoItems: LocaleData<ApplicationInfoItem>) => {
        const newItems = applicationInfoData.items.map(
            localeDataItem => {
                const newLocaleDataItem = applicationInfoItems.items
                    .filter(dataItem => dataItem.language === localeDataItem.language)
                    .map(dataItem => dataItem.data)[0];

                const newLocaleDataItems = [...localeDataItem.data.items];
                if (selectedApplicationInfoItemIndex !== undefined) {
                    newLocaleDataItems[selectedApplicationInfoItemIndex] = newLocaleDataItem;
                }

                return {
                    language: localeDataItem.language,
                    data: {items: newLocaleDataItems}
                };
            });
        uiState?.changeApplicationInfo({items: newItems});
        setApplicationInfoData({items: newItems});
    }

    const deleteApplicationInfoItemHandler = (dialogAnswer: DialogAnswer) => {
        if (dialogAnswer == DialogAnswer.YES && selectedApplicationInfoItemIndex !== undefined) {
            const newItems = applicationInfoData.items.map(
                localeDataItem => {
                    return {
                        language: localeDataItem.language,
                        data: {items: localeDataItem.data.items.filter((value, index) => index !== selectedApplicationInfoItemIndex)}
                    };
                });
            uiState?.changeApplicationInfo({items: newItems});
            setApplicationInfoData({items: newItems});
        }
    }

    return (
        <>
            <div className="w-full">
                <div className="container py-5 mx-auto">
                    <div className="flex flex-col md:flex-row gap-2 items-stretch">
                        <div className="flex flex-row flex-none gap-5 p-5 items-center justify-center border">
                            <img
                                title={t(RESOURCE.PAGE.CONFIG.UI.LOGO).toString()}
                                className="flex-none border w-[100px] h-[100px] object-scale-down object-center"
                                src={uiState?.logoUrl ? uiState.logoUrl : '/logo192.png'}
                                alt={t(RESOURCE.PAGE.CONFIG.UI.LOGO).toString()}
                            />
                            <WiwaButton
                                title={t(RESOURCE.ACTION.EDIT).toString()}
                                onClick={() => setShowLogoDialog(true)}
                            >
                                <Edit size="18"/>
                            </WiwaButton>
                        </div>

                        <div className="flex flex-row flex-grow border items-center justify-center gap-5 p-5">
                            <div className="flex-grow font-bold text-xl md:text-3xl text-center">
                                {uiState?.title ? uiState.title : t(RESOURCE.TITLE)}
                            </div>

                            <WiwaButton
                                title={t(RESOURCE.ACTION.EDIT).toString()}
                                onClick={() => setShowTitleDialog(true)}
                            >
                                <Edit size="18"/>
                            </WiwaButton>
                        </div>
                    </div>
                </div>

                <div className="container pb-5 mx-auto">
                    <div className="flex flex-row flex-grow border items-center justify-center gap-5 p-5">
                        <div className="container mx-auto text-sm md:text-base text-center">
                            {uiState?.welcomeText ? uiState.welcomeText : ''}
                        </div>

                        <WiwaButton
                            title={t(RESOURCE.ACTION.EDIT).toString()}
                            onClick={() => setShowWelcomeTextDialog(true)}
                        >
                            <Edit size="18"/>
                        </WiwaButton>
                    </div>
                </div>

                <div className="container pb-5 mx-auto">
                    <div className="flex flex-col flex-grow border items-center justify-center gap-5 p-5">
                        <div className="flex flex-row gap-5">
                            <WiwaButton
                                title={t(RESOURCE.ACTION.ADD).toString()}
                                onClick={() => setShowAddApplicationInfoItem(true)}
                            >
                                <FilePlus size="18"/>
                            </WiwaButton>

                            <WiwaButton
                                disabled={selectedApplicationInfoItemIndex === undefined}
                                title={t(RESOURCE.ACTION.EDIT).toString()}
                                onClick={() => setShowEditApplicationInfoItem(true)}
                            >
                                <Edit size="18"/>
                            </WiwaButton>

                            <WiwaButton
                                disabled={selectedApplicationInfoItemIndex === undefined}
                                variant="error"
                                title={t(RESOURCE.ACTION.REMOVE).toString()}
                                onClick={() => setShowDeleteApplicationInfoItem(true)}
                            >
                                <FileMinus size="18"/>
                            </WiwaButton>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {language !== undefined
                                && applicationInfoData.items.find(value => value.language === language)?.data.items.map((item, index) => {
                                        return <ApplicationInfoItemCard
                                            key={index}
                                            applicationInfoItem={item}
                                            editMode={true}
                                            selected={index === selectedApplicationInfoItemIndex}
                                            onSelect={onApplicationItemSelectHandler}
                                        />
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            {showLogoDialog &&
                <ChangeLogoDialog
                    showDialog={showLogoDialog}
                    setShowDialog={setShowLogoDialog}
                />
            }

            {showTitleDialog &&
                <ChangeTitleDialog
                    showDialog={showTitleDialog}
                    setShowDialog={setShowTitleDialog}
                />
            }

            {showWelcomeTextDialog &&
                <ChangeWelcomeTextDialog
                    showDialog={showWelcomeTextDialog}
                    setShowDialog={setShowWelcomeTextDialog}
                />
            }

            {showAddApplicationInfoItem &&
                <EditApplicationInfoItemDialog
                    showDialog={showAddApplicationInfoItem}
                    setShowDialog={setShowAddApplicationInfoItem}
                    onApplicationInfoItemsHandler={addApplicationInfoItemHandler}
                />
            }

            {showEditApplicationInfoItem && selectedApplicationInfoItemIndex !== undefined &&
                <EditApplicationInfoItemDialog
                    showDialog={showEditApplicationInfoItem}
                    setShowDialog={setShowEditApplicationInfoItem}
                    applicationInfoItems={getSelectedApplicationInfoItems()}
                    onApplicationInfoItemsHandler={editApplicationInfoItemHandler}
                />
            }

            {showDeleteApplicationInfoItem && selectedApplicationInfoItemIndex !== undefined &&
                <YesNoDialog
                    showDialog={showDeleteApplicationInfoItem}
                    setShowDialog={setShowDeleteApplicationInfoItem}
                    title={t(RESOURCE.PAGE.CONFIG.UI.TITLE).toString()}
                    question={t(RESOURCE.PAGE.CONFIG.UI.DELETE_APPLICATION_INFO_ITEM_CONFIRMATION_QUESTION).toString()}
                    dialogAnswerHandler={deleteApplicationInfoItemHandler}
                />
            }
        </>
    );
}

export default UiConfigPage;
