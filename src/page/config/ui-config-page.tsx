import React, { useState } from 'react';
import { Edit, FileMinus, FilePlus } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { ApplicationInfo, ApplicationInfoItem } from '../../client/model';
import { RESOURCE } from '../../locale';
import { useUiState } from '../../state';

import { WiwaButton } from '../../component/ui';
import { ChangeLogoDialog, ChangeTitleDialog, ChangeWelcomeTextDialog, EditApplicationInfoItemDialog } from './dialog';
import ApplicationInfoItemCard from '../../component/application-info/application-info-item-card';
import { DialogAnswer, YesNoDialog } from '../../component/dialog';

const UiConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const [showLogoDialog, setShowLogoDialog] = useState(false);
    const [showTitleDialog, setShowTitleDialog] = useState(false);
    const [showWelcomeTextDialog, setShowWelcomeTextDialog] = useState(false);

    const [applicationInfo, setApplicationInfo] = useState<ApplicationInfo>(
        uiState?.applicationInfo ? uiState.applicationInfo : {items: []}
    );
    const [selectedApplicationInfoItemIndex, setSelectedApplicationInfoItemIndex] = useState<number>();
    const [showAddApplicationInfoItem, setShowAddApplicationInfoItem] = useState(false);
    const [showEditApplicationInfoItem, setShowEditApplicationInfoItem] = useState(false);
    const [showDeleteApplicationInfoItem, setShowDeleteApplicationInfoItem] = useState(false);

    const onApplicationItemSelectHandler = (applicationInfoItem: ApplicationInfoItem) => {
        const index = applicationInfo?.items.findIndex(item =>
            item.title === applicationInfoItem.title && item.text === applicationInfoItem.text
            && item.imageFileName === applicationInfoItem.imageFileName
        );
        setSelectedApplicationInfoItemIndex(index);
    }

    const getSelectedApplicationInfoItem = (): ApplicationInfoItem | undefined => {
        if (selectedApplicationInfoItemIndex === undefined) {
            return undefined;
        }
        return applicationInfo.items[selectedApplicationInfoItemIndex];
    }

    const addApplicationInfoItemHandler = (applicationInfoItem: ApplicationInfoItem) => {
        const newItems = [...applicationInfo.items];
        newItems.push(applicationInfoItem);
        uiState?.changeApplicationInfo({items: newItems});
        setApplicationInfo({items: newItems});
    }

    const editApplicationInfoItemHandler = (applicationInfoItem: ApplicationInfoItem) => {
        if (selectedApplicationInfoItemIndex !== undefined) {
            const newItems = [...applicationInfo.items];
            newItems[selectedApplicationInfoItemIndex] = applicationInfoItem;
            uiState?.changeApplicationInfo({items: newItems});
            setApplicationInfo({items: newItems});
        }
    }

    const deleteApplicationInfoItemHandler = (dialogAnswer: DialogAnswer) => {
        if (selectedApplicationInfoItemIndex !== undefined) {
            const newItems = [...applicationInfo.items];
            newItems.splice(selectedApplicationInfoItemIndex, 1);
            uiState?.changeApplicationInfo({items: newItems});
            setApplicationInfo({items: newItems});
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
                                size="xs"
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
                                size="xs"
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
                            size="xs"
                            title={t(RESOURCE.ACTION.EDIT).toString()}
                            onClick={() => setShowWelcomeTextDialog(true)}
                        >
                            <Edit size="18"/>
                        </WiwaButton>
                    </div>
                </div>

                <div className="container pb-5 mx-auto">
                    <div className="flex flex-col flex-grow border items-center justify-center gap-5 p-5">
                        <div className="flex flex-row gap-1">
                            <WiwaButton
                                size="xs"
                                title={t(RESOURCE.ACTION.ADD).toString()}
                                onClick={() => setShowAddApplicationInfoItem(true)}
                            >
                                <FilePlus size="18"/>
                            </WiwaButton>

                            <WiwaButton
                                size="xs"
                                disabled={selectedApplicationInfoItemIndex === undefined}
                                title={t(RESOURCE.ACTION.EDIT).toString()}
                                onClick={() => setShowEditApplicationInfoItem(true)}
                            >
                                <Edit size="18"/>
                            </WiwaButton>

                            <WiwaButton
                                size="xs"
                                disabled={selectedApplicationInfoItemIndex === undefined}
                                variant="error"
                                title={t(RESOURCE.ACTION.REMOVE).toString()}
                                onClick={() => setShowDeleteApplicationInfoItem(true)}
                            >
                                <FileMinus size="18"/>
                            </WiwaButton>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {applicationInfo.items.map((item, index) => {
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
                    onApplicationInfoItemHandler={addApplicationInfoItemHandler}
                />
            }

            {showEditApplicationInfoItem && selectedApplicationInfoItemIndex !== undefined &&
                <EditApplicationInfoItemDialog
                    showDialog={showEditApplicationInfoItem}
                    setShowDialog={setShowEditApplicationInfoItem}
                    applicationInfoItem={getSelectedApplicationInfoItem()}
                    onApplicationInfoItemHandler={editApplicationInfoItemHandler}
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
