import { useEffect, useState } from 'react';

import { useConfigState } from '../../component/state/config-state-provider';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { SingleValueBody } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_UI_BUSINESS_CONDITIONS = CONTEXT_PATH + 'ui/business-conditions';

const BusinessConditionsPage = () => {
    const configState = useConfigState();

    const [businessConditions, setBusinessConditions] = useState<string>();

    useEffect(() => {
        if (configState?.up) {
            const fetchBusinessConditions = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_BUSINESS_CONDITIONS);
                if (response.data) {
                    setBusinessConditions(response.data.value);
                }
            }
            fetchBusinessConditions().then();
        }
    }, [configState?.up]);

    return (
        <WiwaMarkdownRenderer className="prose container p-5 mx-auto" md={businessConditions}/>
    )
}

export default BusinessConditionsPage;
