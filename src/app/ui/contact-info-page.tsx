import { useEffect, useState } from 'react';

import { useConfigState } from '../../component/state/config-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import { useUiState } from '../../component/state/ui-state-provider';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { SingleValueBody } from '../../model/service';
import { CONTEXT_PATH, getData } from '../../data';

const PATH_UI_WORKING_HOURS = CONTEXT_PATH + 'ui/working-hours';

const ContactInfoPage = () => {
    const configState = useConfigState();
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [workingHours, setWorkingHours] = useState<string>();

    useEffect(() => {
        if (configState?.up) {
            const fetchWorkingHours = async () => {
                const response = await getData<SingleValueBody<string>>(PATH_UI_WORKING_HOURS);
                if (response.data) {
                    setWorkingHours(response.data.value);
                }
            }
            fetchWorkingHours().then();
        }
    }, [configState?.up]);

    return (

        <div className="flex flex-col gap-5 pt-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 w-full">
                <div>
                    {uiState?.companyInfo ?
                        <div className="border border-solid flex flex-row h-full p-5">
                            <div className="flex flex-col w-full">
                                <iframe
                                    title="contact-info-frame"
                                    width="100%"
                                    height="380px"
                                    src={uiState.companyInfo.mapUrl}
                                    className="border-0">
                                </iframe>
                            </div>
                        </div>
                        : <></>}
                </div>
                <div className="border border-solid flex flex-row h-full p-5">
                    <div className="flex flex-col w-full">
                        <WiwaMarkdownRenderer className="prose" md={workingHours}/>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-5">
                <div className="border border-solid">
                    <div className="flex flex-col w-full justify-center text-center text-xs h-full p-5">
                        <p>{uiState?.companyInfo ? uiState.companyInfo.commercialRegisterInfo : ''}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pb-5">
                <div className="border border-solid flex flex-row h-full w-full p-5">
                    {uiState?.companyInfo && uiState.companyInfo.businessId.length > 0 ?
                        <p>
                            <span>{resourceState?.ui?.contactInfo.businessId}:</span>
                            <span> </span>
                            <span>{uiState.companyInfo.businessId}</span>
                        </p>
                        : <></>}
                </div>
                <div className="border border-solid flex flex-row h-full w-full p-5">
                    {uiState?.companyInfo && uiState.companyInfo.taxId.length > 0 ?
                        <p>
                            <span>{resourceState?.ui?.contactInfo.taxId}:</span>
                            <span> </span>
                            <span>{uiState.companyInfo.taxId}</span>
                        </p>
                        : <></>}
                </div>
                <div className="border border-solid flex flex-row h-full w-full p-5">
                    {uiState?.companyInfo && uiState.companyInfo.vatRegNo.length > 0 ?
                        <p>
                            <span>{resourceState?.ui?.contactInfo.vatRegNo}:</span>
                            <span> </span>
                            <span>{uiState.companyInfo.vatRegNo}</span>
                        </p>
                        : <></>}
                </div>
            </div>
        </div>
    )
}

export default ContactInfoPage;
