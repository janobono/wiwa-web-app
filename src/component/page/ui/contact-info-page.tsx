import React from 'react';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';
import { WiwaMarkdownRenderer } from '../../ui';

const ContactInfoPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    return (
        <section className="w-full">
            <div className="container p-5 m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        {uiState.companyInfo ?
                            <iframe
                                width="100%"
                                height="280px"
                                src={uiState.companyInfo.mapUrl}
                                className="border-0">
                            </iframe>
                            : <></>}
                    </div>
                    <div>
                        <WiwaMarkdownRenderer className="prose p-5 text-xs" md={uiState.workingHours}/>
                    </div>
                </div>
            </div>
            <div className="container pb-5 px-5 m-auto text-center">
                {uiState.companyInfo ? uiState.companyInfo.commercialRegisterInfo : ''}
            </div>
            <div className="container pb-5 px-5 m-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-items-center">
                    <div className="flex gap-1">
                        {uiState.companyInfo && uiState.companyInfo.businessId.length > 0 ?
                            <><span>
                                    {t(RESOURCE.COMPONENT.PAGE.UI.CONTACT_INFO.BUSINESS_ID)}:
                                   </span>
                                <span>{uiState.companyInfo.businessId}</span>
                            </>
                            : <></>}
                    </div>
                    <div className="flex gap-1">
                        {uiState.companyInfo && uiState.companyInfo.taxId.length > 0 ?
                            <><span>
                                    {t(RESOURCE.COMPONENT.PAGE.UI.CONTACT_INFO.TAX_ID)}:
                                   </span>
                                <span>{uiState.companyInfo.taxId}</span>
                            </>
                            : <></>}
                    </div>
                    <div className="flex gap-1">
                        {uiState.companyInfo && uiState.companyInfo.vatRegNo.length > 0 ?
                            <><span>
                                    {t(RESOURCE.COMPONENT.PAGE.UI.CONTACT_INFO.VAT_REG_NO)}:
                                   </span>
                                <span>{uiState.companyInfo.vatRegNo}</span>
                            </>
                            : <></>}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactInfoPage;
