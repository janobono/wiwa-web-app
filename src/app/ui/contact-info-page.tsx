import { useEffect, useState } from 'react';

import { getCompanyInfo, getWorkingHours } from '../../api/controller/ui';
import { CompanyInfo } from '../../api/model/application';
import WiwaMarkdownRenderer from '../../component/ui/wiwa-markdown-renderer';
import { useResourceState } from '../../state/resource';

const ContactInfoPage = () => {
    const resourceState = useResourceState();

    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();
    const [workingHours, setWorkingHours] = useState<string>();

    useEffect(() => {
        getCompanyInfo().then(data => setCompanyInfo(data.data));
        getWorkingHours().then(data => setWorkingHours(data.data?.value));
    }, []);

    return (
        <div className="flex flex-col gap-5 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 w-full">
                <div>
                    {(companyInfo?.mapUrl || '').length > 0 ?
                        <div className="border border-solid flex flex-row h-full p-5">
                            <div className="flex flex-col w-full">
                                <iframe
                                    title="contact-info-frame"
                                    width="100%"
                                    height="380px"
                                    src={companyInfo?.mapUrl}
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
                        <p>{companyInfo?.commercialRegisterInfo || ''}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pb-5">
                <div className="border border-solid flex flex-row h-full w-full p-5">
                    {(companyInfo?.businessId || '').length > 0 ?
                        <p>
                            <span>{resourceState?.ui?.contactInfo.businessId}:</span>
                            <span> </span>
                            <span>{companyInfo?.businessId}</span>
                        </p>
                        : <></>}
                </div>
                <div className="border border-solid flex flex-row h-full w-full p-5">
                    {(companyInfo?.taxId || '').length > 0 ?
                        <p>
                            <span>{resourceState?.ui?.contactInfo.taxId}:</span>
                            <span> </span>
                            <span>{companyInfo?.taxId}</span>
                        </p>
                        : <></>}
                </div>
                <div className="border border-solid flex flex-row h-full w-full p-5">
                    {(companyInfo?.vatRegNo || '').length > 0 ?
                        <p>
                            <span>{resourceState?.ui?.contactInfo.vatRegNo}:</span>
                            <span> </span>
                            <span>{companyInfo?.vatRegNo}</span>
                        </p>
                        : <></>}
                </div>
            </div>
        </div>
    )
}

export default ContactInfoPage;
