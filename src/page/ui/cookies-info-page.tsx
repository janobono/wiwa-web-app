import React from 'react';

import { useUiState } from '../../state';

import { WiwaMarkdownRenderer } from '../../component/ui';

const CookiesInfoPage: React.FC = () => {
    const uiState = useUiState();

    return (
        <section className="w-full min-h-[250px]">
            <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={uiState?.cookiesInfo}/>
        </section>
    );
}

export default CookiesInfoPage;
