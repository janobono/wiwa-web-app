import React from 'react';
import { WiwaMarkdownRenderer } from '../../ui';

import { useUiState } from '../../../state';

const CookiesInfoPage: React.FC = () => {
    const uiState = useUiState();

    return (
        <section className="w-full min-h-[250px]">
            <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={uiState?.cookiesInfo}/>
        </section>
    );
}

export default CookiesInfoPage;
