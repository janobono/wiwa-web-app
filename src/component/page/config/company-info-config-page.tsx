import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit } from 'react-feather';

import { RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';

import { WiwaButton } from '../../ui';
import { ChangeCompanyInfoDialog } from './dialog';

const CompanyInfoConfigPage: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    const [showCompanyInfoDialog, setShowCompanyInfoDialog] = useState(false);

    return (
        <>
            <div className="w-full">
                <div className="container py-5 mx-auto">
                    <WiwaButton
                        className="mb-5"
                        title={t(RESOURCE.ACTION.EDIT).toString()}
                        onClick={() => setShowCompanyInfoDialog(true)}
                    >
                        <Edit size="18"/>
                    </WiwaButton>

                    <div className="w-full border">
                        <div className="container p-5 mx-auto flex flex-col items-center justify-center text-left">
                            <div className="items-start text-left text-xs md:text-base">
                                {uiState?.companyInfo &&
                                    <>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.NAME)}</span>
                                            <span>{uiState.companyInfo.name}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.STREET)}</span>
                                            <span>{uiState.companyInfo.street}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.CITY)}</span>
                                            <span>{uiState.companyInfo.city}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.ZIP_CODE)}</span>
                                            <span>{uiState.companyInfo.zipCode}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.STATE)}</span>
                                            <span>{uiState.companyInfo.state}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.PHONE)}</span>
                                            <span>{uiState.companyInfo.phone}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.MAIL)}</span>
                                            <span>{uiState.companyInfo.mail}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.BUSINESS_ID)}</span>
                                            <span>{uiState.companyInfo.businessId}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.TAX_ID)}</span>
                                            <span>{uiState.companyInfo.taxId}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.VAT_REG_NO)}</span>
                                            <span>{uiState.companyInfo.vatRegNo}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.COMMERCIAL_REGISTER_INFO)}</span>
                                            <span>{uiState.companyInfo.commercialRegisterInfo}</span>
                                        </div>
                                        <div className="mb-2 grid grid-cols-1 gap-5">
                                            <span className="font-bold">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.MAP_URL)}</span>
                                            <div>
                                                {uiState?.companyInfo ?
                                                    <iframe
                                                        width="100%"
                                                        height="280px"
                                                        src={uiState.companyInfo.mapUrl}
                                                        className="border-0">
                                                    </iframe>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showCompanyInfoDialog &&
                <ChangeCompanyInfoDialog showDialog={showCompanyInfoDialog} setShowDialog={setShowCompanyInfoDialog}/>
            }
        </>
    );
}

export default CompanyInfoConfigPage;
