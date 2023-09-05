import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit } from 'react-feather';

import { RESOURCE } from '../../locale';
import { useUiState } from '../../state';

import { WiwaButton, WiwaMarkdownRenderer } from '../../component/ui';
import { ChangeMarkdownDialog } from './dialog';

const WorkingHoursConfigPage: React.FC = () => {
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
                        <WiwaMarkdownRenderer className="prose p-5 text-xs" md={uiState?.workingHours}/>
                    </div>
                </div>
            </div>

            {uiState && uiState.workingHours !== undefined && showMarkdownDataDialog &&
                <ChangeMarkdownDialog
                    title={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_WORKING_HOURS.TITLE)}
                    errorMessage={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_WORKING_HOURS.ERROR)}
                    initialData={uiState.workingHours}
                    saveData={uiState.changeWorkingHours}
                    showDialog={showMarkdownDataDialog}
                    setShowDialog={setShowMarkdownDataDialog}
                />
            }
        </>
    );
}

export default WorkingHoursConfigPage;
