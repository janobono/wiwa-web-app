import React, { useEffect, useState } from 'react';
import { File, FileMinus, FilePlus } from 'react-feather';
import { useTranslation } from 'react-i18next';

import { ApplicationImage } from '../../client/model';
import { RESOURCE } from '../../locale';
import { useUiState } from '../../state';

import { ApplicationImageCard } from '../../component/application-image';
import { WiwaButton } from '../../component/ui';
import { AddApplicationImageDialog, ApplicationImageDetailsDialog } from './dialog';
import { DialogAnswer, YesNoDialog } from '../../component/dialog';

const ApplicationImagesConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const [selectedApplicationImage, setSelectedApplicationImage] = useState<ApplicationImage>();
    const [applicationImages, setApplicationImages] = useState<ApplicationImage[]>([]);
    const [showAddApplicationImageDialog, setShowAddApplicationImageDialog] = useState(false);
    const [showApplicationImageDetailsDialog, setShowApplicationImageDetailsDialog] = useState(false);
    const [showYesNoDialog, setShowYesNoDialog] = useState(false);

    useEffect(() => {
        uiState?.getApplicationImages().then(data => {
            if (data?.data) {
                setSelectedApplicationImage(undefined);
                setApplicationImages(data.data);
            }
        })
    }, []);

    const onApplicationImageAddHandler = (applicationImage: ApplicationImage) => {
        const newApplicationImages = [...applicationImages];
        newApplicationImages.unshift(applicationImage);
        setApplicationImages(newApplicationImages);
        setSelectedApplicationImage(applicationImage);
    }

    const deleteApplicationImageAnswerHandler = (dialogAnswer: DialogAnswer) => {
        if (dialogAnswer === DialogAnswer.YES && selectedApplicationImage !== undefined) {
            uiState?.deleteApplicationImage(selectedApplicationImage.fileName);
            setApplicationImages(applicationImages.filter(value => value.fileName !== selectedApplicationImage.fileName));
            setSelectedApplicationImage(undefined);
        }
    }

    return (
        <>
            <div className="w-full">
                <div className="container py-5 mx-auto">
                    <div className="flex flex-row gap-1 mb-5">
                        <WiwaButton
                            title={t(RESOURCE.ACTION.ADD).toString()}
                            onClick={() => setShowAddApplicationImageDialog(true)}
                        >
                            <FilePlus size="18"/>
                        </WiwaButton>

                        <WiwaButton
                            disabled={selectedApplicationImage === undefined}
                            title={t(RESOURCE.ACTION.DETAIL).toString()}
                            onClick={() => setShowApplicationImageDetailsDialog(true)}
                        >
                            <File size="18"/>
                        </WiwaButton>

                        <WiwaButton
                            disabled={selectedApplicationImage === undefined}
                            variant="error"
                            title={t(RESOURCE.ACTION.REMOVE).toString()}
                            onClick={() => setShowYesNoDialog(true)}
                        >
                            <FileMinus size="18"/>
                        </WiwaButton>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            {applicationImages.map(applicationImage =>
                                <ApplicationImageCard
                                    key={applicationImage.fileName}
                                    applicationImage={applicationImage}
                                    selected={selectedApplicationImage !== undefined && selectedApplicationImage.fileName === applicationImage.fileName}
                                    onSelect={setSelectedApplicationImage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showAddApplicationImageDialog &&
                <AddApplicationImageDialog
                    showDialog={showAddApplicationImageDialog}
                    setShowDialog={setShowAddApplicationImageDialog}
                    onApplicationImageAddHandler={onApplicationImageAddHandler}
                />
            }

            {showApplicationImageDetailsDialog && selectedApplicationImage !== undefined &&
                <ApplicationImageDetailsDialog
                    showDialog={showApplicationImageDetailsDialog}
                    setShowDialog={setShowApplicationImageDetailsDialog}
                    applicationImage={selectedApplicationImage}
                />
            }

            {showYesNoDialog && selectedApplicationImage !== undefined &&
                <YesNoDialog
                    showDialog={showYesNoDialog}
                    setShowDialog={setShowYesNoDialog}
                    title={t(RESOURCE.PAGE.CONFIG.APPLICATION_IMAGES.TITLE).toString()}
                    question={t(RESOURCE.PAGE.CONFIG.APPLICATION_IMAGES.DELETE_CONFIRMATION_QUESTION).toString()}
                    dialogAnswerHandler={deleteApplicationImageAnswerHandler}
                />
            }
        </>
    );
}

export default ApplicationImagesConfigPage;
