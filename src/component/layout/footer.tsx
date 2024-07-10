import { useContext, useEffect, useState } from 'react';
import { ExternalLink, Globe, Mail, Phone } from 'react-feather';
import { NavLink } from 'react-router-dom';

import { getCompanyInfo, getLogoPath, getTitle } from '../../api/controller/ui';
import { CompanyInfo } from '../../api/model/application';
import { CommonResourceContext } from '../../context';

const Footer = () => {
    const commonResourceState = useContext(CommonResourceContext);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();
    const [title, setTitle] = useState<string>();

    useEffect(() => {
        getCompanyInfo().then(data => setCompanyInfo(data.data));
        getTitle().then(data => setTitle(data.data?.value));
    }, []);

    return (
        <>
            <footer className="footer p-10 bg-base-300 text-base-content">
                <aside className="flex-col justify-center items-center">
                    <NavLink
                        title={title}
                        to="/"
                    >
                        <img
                            className="flex-none w-24 h-24 object-scale-down object-center"
                            src={getLogoPath()}
                            alt="Logo"
                        />
                    </NavLink>
                    <p>{title}</p>
                </aside>
                <nav>
                    <header className="footer-title">{commonResourceState?.resource?.footer.links.title}</header>
                    <NavLink
                        className="link"
                        to="/ui/contact-info"
                    >{commonResourceState?.resource?.footer.links.contactInfo}</NavLink>
                    <NavLink
                        className="link"
                        to="/ui/cookies-info"
                    >{commonResourceState?.resource?.footer.links.cookiesInfo}</NavLink>
                    <NavLink
                        className="link"
                        to="/ui/gdpr-info"
                    >{commonResourceState?.resource?.footer.links.gdprInfo}</NavLink>
                    <NavLink
                        className="link"
                        to="/ui/business-conditions"
                    >{commonResourceState?.resource?.footer.links.businessConditions}</NavLink>
                    <NavLink
                        className="link"
                        to="/ui/order-info"
                    >{commonResourceState?.resource?.footer.links.orderInfo}</NavLink>
                </nav>
                {companyInfo &&
                    <nav>
                        <header className="footer-title">{commonResourceState?.resource?.footer.contact.title}</header>
                        <ul>
                            <li className="mb-2 leading-6">
                                <div className="flex gap-1 text-gray-500 items-center">
                                    <Globe size="18"/>
                                    <span>{companyInfo.name + ', ' + companyInfo.street}</span>
                                </div>
                                <div className="flex gap-1 text-gray-500 items-center">
                                    <span>{companyInfo.zipCode + ' ' + companyInfo.city + ', ' + companyInfo.state}</span>
                                </div>
                            </li>
                            <li className="mb-2 leading-6">
                                <div className="flex gap-1 text-gray-500 items-center">
                                    <Mail size="18"/>
                                    <span>{companyInfo.mail}</span>
                                </div>
                            </li>
                            <li className="mb-2 leading-6">
                                <div className="flex gap-1 text-gray-500 items-center">
                                    <Phone size="18"/>
                                    <span>{companyInfo.phone}</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                }
            </footer>
            <div className="py-5 text-sm bg-base-100 text-base-content">
                <div className="container px-5 m-auto">
                    <div className="flex gap-1 justify-center">
                        <span>© 2023 Copyright:</span>
                        <a
                            className="link"
                            href="https://www.janobono.com"
                        >
                            <div className="flex items-center"><span>janobono</span><ExternalLink size="18"/></div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
