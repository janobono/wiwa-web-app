import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUiState } from '../../../state';
import { WiwaButton } from '../../ui';
import { RESOURCE } from '../../../locale';
import { Edit } from 'react-feather';
import { ChangeLogoDialog, ChangeTitleDialog } from './dialog';

const UiConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const [showLogoDialog, setShowLogoDialog] = useState(false);
    const [showTitleDialog, setShowTitleDialog] = useState(false);

    return (
        <>
            <div className="w-full">
                <div className="container py-5 mx-auto">
                    <div className="flex flex-col md:flex-row gap-2 items-stretch">
                        <div className="flex flex-row flex-none gap-5 p-5 items-center justify-center border">
                            <img
                                title={t(RESOURCE.COMPONENT.PAGE.CONFIG.UI.LOGO).toString()}
                                className="flex-none border w-[100px] h-[100px] object-scale-down object-center"
                                src={uiState?.logoUrl ? uiState.logoUrl : '/logo192.png'}
                                alt={t(RESOURCE.COMPONENT.PAGE.CONFIG.UI.LOGO).toString()}
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
            </div>


            {showLogoDialog &&
                <ChangeLogoDialog showDialog={showLogoDialog} setShowDialog={setShowLogoDialog}/>
            }
            {showTitleDialog &&
                <ChangeTitleDialog showDialog={showTitleDialog} setShowDialog={setShowTitleDialog}/>
            }
        </>
    );
}

export default UiConfigPage;
