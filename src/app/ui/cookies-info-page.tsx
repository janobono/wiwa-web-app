import { useEffect, useState } from 'react';

import { useConfigState } from '../../component/state/config-state-provider';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { SingleValueBody } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_UI_COOKIES_INFO = CONTEXT_PATH + 'ui/cookies-info';

const CookiesInfoPage = () => {
    const configState = useConfigState();

    const [cookiesInfo, setCookiesInfo] = useState<string>();

    useEffect(() => {
        if (configState?.up) {
            const fetchCookiesInfo = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_COOKIES_INFO);
                if (response.data) {
                    setCookiesInfo(response.data.value);
                }
            }
            fetchCookiesInfo().then();
        }
    }, [configState?.up]);

    return (
        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={cookiesInfo}/>
    )
}

export default CookiesInfoPage;
