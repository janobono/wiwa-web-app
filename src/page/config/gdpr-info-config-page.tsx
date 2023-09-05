import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit } from 'react-feather';

import { RESOURCE } from '../../locale';
import { useUiState } from '../../state';

import { WiwaButton, WiwaMarkdownRenderer } from '../../component/ui';
import { ChangeMarkdownDialog } from './dialog';

const GdprInfoConfigPage: React.FC = () => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const [showMarkdownDataDialog, setShowMarkdownDataDialog] = useState(false);

    return (
        <>
            <div className="w-full min-h-[420px]">
                <div className="container py-5 mx-auto">
                    <WiwaButton
                        size="xs"
                        className="mb-5"
                        title={t(RESOURCE.ACTION.EDIT).toString()}
                        onClick={() => setShowMarkdownDataDialog(true)}
                    >
                        <Edit size="18"/>
                    </WiwaButton>
                    <div className="flex flex-row flex-none gap-5 p-5 items-center justify-center border">
                        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={uiState?.gdprInfo}/>
                    </div>
                </div>
            </div>

            {uiState && uiState.gdprInfo !== undefined && showMarkdownDataDialog &&
                <ChangeMarkdownDialog
                    title={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_GDPR_INFO.TITLE)}
                    errorMessage={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_GDPR_INFO.ERROR)}
                    initialData={uiState.gdprInfo}
                    saveData={uiState.changeGdprInfo}
                    showDialog={showMarkdownDataDialog}
                    setShowDialog={setShowMarkdownDataDialog}
                />
            }
        </>
    );
}

export default GdprInfoConfigPage;
