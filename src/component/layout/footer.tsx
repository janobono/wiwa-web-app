import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Globe, Mail, Phone } from 'react-feather';

import { RESOURCE } from '../../locale';
import { useUiState } from '../../state';

import { WiwaLink, WiwaNavLink } from '../ui';

const Footer: React.FC = () => {
    const {t} = useTranslation();
    const uiState = useUiState();

    return (
        <footer className="w-full">
            <div className="py-10 text-sm border-t blue-emerald-200 bg-blue-50">
                <div className="container px-5 mx-auto">
                    <div className="grid grid-cols-4 gap-5 md:grid-cols-8 lg:grid-cols-12">
                        <nav className="col-span-4 lg:col-span-6">
                            <h3 className="mb-6 text-base font-medium text-gray-700">
                                {t(RESOURCE.COMPONENT.LAYOUT.FOOTER.LINKS.TITLE)}
                            </h3>
                            <ul>
                                <li className="mb-2 leading-6">
                                    <WiwaNavLink to="/ui/contact-info">
                                        {t(RESOURCE.COMPONENT.LAYOUT.FOOTER.LINKS.CONTACT_INFO)}
                                    </WiwaNavLink>
                                </li>
                                <li className="mb-2 leading-6">
                                    <WiwaNavLink to="/ui/cookies-info">
                                        {t(RESOURCE.COMPONENT.LAYOUT.FOOTER.LINKS.COOKIES_INFO)}
                                    </WiwaNavLink>
                                </li>
                                <li className="mb-2 leading-6">
                                    <WiwaNavLink to="/ui/gdpr-info">
                                        {t(RESOURCE.COMPONENT.LAYOUT.FOOTER.LINKS.GDPR_INFO)}
                                    </WiwaNavLink>
                                </li>
                            </ul>
                        </nav>
                        {uiState?.companyInfo &&
                            <nav className="col-span-2 md:col-span-4 lg:col-span-6">
                                <h3 className="mb-5 text-base font-medium text-gray-700">
                                    {t(RESOURCE.COMPONENT.LAYOUT.FOOTER.CONTACT.TITLE)}
                                </h3>
                                <ul>
                                    <li className="mb-2 leading-6">
                                        <div className="flex gap-1 text-gray-500 items-center">
                                            <Globe size="18"/>
                                            <span>
                                                {
                                                    uiState.companyInfo.name + ', '
                                                    + uiState.companyInfo.street
                                                }
                                            </span>
                                        </div>
                                        <div className="flex gap-1 text-gray-500 items-center">
                                            <span>
                                                {
                                                    uiState.companyInfo.zipCode + ' ' + uiState.companyInfo.city + ', '
                                                    + uiState.companyInfo.state
                                                }
                                            </span>
                                        </div>
                                    </li>
                                    <li className="mb-2 leading-6">
                                        <div className="flex gap-1 text-gray-500 items-center">
                                            <Mail size="18"/>
                                            <span>{uiState.companyInfo.mail}</span>
                                        </div>
                                    </li>
                                    <li className="mb-2 leading-6">
                                        <div className="flex gap-1 text-gray-500 items-center">
                                            <Phone size="18"/>
                                            <span>{uiState.companyInfo.phone}</span>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        }
                    </div>
                </div>
            </div>
            <div className="py-5 text-sm border-t border-blue-200/90 bg-blue-100/80">
                <div className="container px-5 m-auto">
                    <div className="flex gap-1 justify-center">
                        <span>© 2022 Copyright:</span>
                        <WiwaLink
                            target="_blank"
                            href="https://www.janobono.com"
                        >
                            <div className="flex items-center"><span>janobono</span><ExternalLink size="18"/></div>
                        </WiwaLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
