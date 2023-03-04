import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUiState } from '../../../state';
import { WiwaButton } from '../../ui';
import { RESOURCE } from '../../../locale';
import { Edit } from 'react-feather';
import { ChangeLogoDialog } from './dialog';

const UiConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const [showLogoDialog, setShowLogoDialog] = useState(false);

    return (
        <div className="flex flex-wrap my-5 gap-2">

            <div
                className="flex flex-row gap-5 p-5 items-center justify-center border">
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

            {showLogoDialog &&
                <ChangeLogoDialog showDialog={showLogoDialog} setShowDialog={setShowLogoDialog}/>
            }
        </div>
    );
}

export default UiConfigPage;
