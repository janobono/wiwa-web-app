import { useEffect, useState } from 'react';

import { useConfigState } from '../../component/state/config-state-provider';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { SingleValueBody } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_UI_GDPR_INFO = CONTEXT_PATH + 'ui/gdpr-info';

const GdprInfoPage = () => {
    const configState = useConfigState();

    const [gdprInfo, setGdprInfo] = useState<string>();

    useEffect(() => {
        if (configState?.up) {
            const fetchGdprInfo = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_GDPR_INFO);
                if (response.data) {
                    setGdprInfo(response.data.value);
                }
            }
            fetchGdprInfo().then();
        }
    }, [configState?.up]);

    return (
        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={gdprInfo}/>
    )
}

export default GdprInfoPage;
