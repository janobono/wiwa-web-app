import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit } from 'react-feather';

import { LocaleData, uiClient } from '../../client';
import { getLanguages, RESOURCE, toLocale } from '../../locale';
import { useUiState } from '../../state';

import { WiwaButton, WiwaMarkdownRenderer } from '../../component/ui';
import { ChangeMarkdownDialog } from './dialog';

const CookiesInfoConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const languages = getLanguages();

    const [markdownData, setMarkdownData] = useState<LocaleData<string>>({items: []});
    const [showMarkdownDataDialog, setShowMarkdownDataDialog] = useState(false);

    useEffect(() => {
        reloadData();
    }, [uiState?.cookiesInfo]);

    const reloadData = () => {
        languages.map(language => uiClient.getCookiesInfo(toLocale(language)).then(
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
            <div className="w-full">
                <div className="container py-5 mx-auto">
                    <WiwaButton
                        className="mb-5"
                        title={t(RESOURCE.ACTION.EDIT).toString()}
                        onClick={() => setShowMarkdownDataDialog(true)}
                    >
                        <Edit size="18"/>
                    </WiwaButton>
                    <div className="flex flex-row flex-none gap-5 p-5 items-center justify-center border">
                        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={uiState?.cookiesInfo}/>
                    </div>
                </div>
            </div>

            {showMarkdownDataDialog && (markdownData.items.length === languages.length) &&
                <ChangeMarkdownDialog
                    title={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COOKIES_INFO.TITLE)}
                    errorMessage={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COOKIES_INFO.ERROR)}
                    initialData={markdownData}
                    saveData={(data) => {
                        return uiState?.changeCookiesInfo(data);
                    }}
                    showDialog={showMarkdownDataDialog}
                    setShowDialog={setShowMarkdownDataDialog}
                />
            }
        </>
    );
}

export default CookiesInfoConfigPage;
