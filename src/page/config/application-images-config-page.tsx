import React, { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../locale';
import { useUiState } from '../../state';

import { WiwaButton } from '../../component/ui';
import { AddApplicationImageDialog } from './dialog';
import { ApplicationImage } from '../../client/config';

const ApplicationImagesConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const [applicationImages, setApplicationImages] = useState<ApplicationImage[]>([]);
    const [showAddApplicationImageDialog, setShowAddApplicationImageDialog] = useState(false);

    useEffect(() => {
        if (!showAddApplicationImageDialog) {
            uiState?.getApplicationImages().then(data => {
                if (data?.data) {
                    setApplicationImages(data.data);
                }
            })
        }
    }, [applicationImages, showAddApplicationImageDialog]);

    return (
        <>
            <div className="w-full">
                <div className="container py-5 mx-auto">
                    <WiwaButton
                        className="mb-5"
                        title={t(RESOURCE.ACTION.ADD).toString()}
                        onClick={() => setShowAddApplicationImageDialog(true)}
                    >
                        <Plus size="18"/>
                    </WiwaButton>
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            {applicationImages.map(applicationImage =>
                                <ApplicationImageCard
                                    key={applicationImage.fileName}
                                    applicationImage={applicationImage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showAddApplicationImageDialog &&
                <AddApplicationImageDialog showDialog={showAddApplicationImageDialog}
                                           setShowDialog={setShowAddApplicationImageDialog}/>
            }
        </>
    );
}

export default ApplicationImagesConfigPage;

interface ApplicationImageCardProps {
    applicationImage: ApplicationImage
}

const ApplicationImageCard: React.FC<ApplicationImageCardProps> = (props) => {
    const {t} = useTranslation();
    const uiState = useUiState();

    return (
        <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
            <figure>
                <img
                    src={props.applicationImage.thumbnail}
                    alt={props.applicationImage.fileName}
                    className="aspect-video w-full"
                />
            </figure>
            <div className="p-5">
                <header>
                    <div className="text-sm font-bold text-center mb-5">
                        {props.applicationImage.fileName}
                    </div>
                </header>
            </div>
        </div>
    )
}
