import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit } from 'react-feather';

import { uiClient } from '../../client';
import { LocaleData } from '../../client/model';

import { getLanguages, RESOURCE, toLocale } from '../../locale';
import { useUiState } from '../../state';

import { WiwaButton, WiwaMarkdownRenderer } from '../../component/ui';
import { ChangeMarkdownDialog } from './dialog';

const GdprInfoConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const languages = getLanguages();

    const [markdownData, setMarkdownData] = useState<LocaleData<string>>({items: []});
    const [showMarkdownDataDialog, setShowMarkdownDataDialog] = useState(false);

    useEffect(() => {
        reloadData();
    }, [uiState?.gdprInfo]);

    const reloadData = () => {
        languages.map(language => uiClient.getGdprInfo(toLocale(language)).then(
                data => {
                    setMarkdownData((prevState) => {
                        const nextItems = [...prevState.items.filter(item => item.language !== language),
                            {language, data: data.data ? data.data : ''}
                        ];
                        return {items: nextItems};
                    });
                }
            )
        );
    }

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

            {showMarkdownDataDialog && (markdownData.items.length === languages.length) &&
                <ChangeMarkdownDialog
                    title={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_GDPR_INFO.TITLE)}
                    errorMessage={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_GDPR_INFO.ERROR)}
                    initialData={markdownData}
                    saveData={(data) => {
                        return uiState?.changeGdprInfo(data);
                    }}
                    showDialog={showMarkdownDataDialog}
                    setShowDialog={setShowMarkdownDataDialog}
                />
            }
        </>
    );
}

export default GdprInfoConfigPage;
