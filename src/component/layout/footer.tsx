import { useContext, useEffect, useState } from 'react';
import { Globe, Mail, Phone } from 'react-feather';
import { NavLink } from 'react-router-dom';

import BaseFooter from './base-footer';
import { getCompanyInfo } from '../../api/controller/ui';
import { CompanyInfo } from '../../api/model/application';
import { ResourceContext } from '../../context';

const Footer = () => {
    const resourceState = useContext(ResourceContext);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();

    useEffect(() => {
        getCompanyInfo().then(data => setCompanyInfo(data.data));
    }, []);

    return (
        <BaseFooter>
            <nav>
                <header className="footer-title">{resourceState?.common?.footer.links.title}</header>
                <NavLink
                    className="link"
                    to="/ui/contact-info"
                >{resourceState?.common?.footer.links.contactInfo}</NavLink>
                <NavLink
                    className="link"
                    to="/ui/cookies-info"
                >{resourceState?.common?.footer.links.cookiesInfo}</NavLink>
                <NavLink
                    className="link"
                    to="/ui/gdpr-info"
                >{resourceState?.common?.footer.links.gdprInfo}</NavLink>
                <NavLink
                    className="link"
                    to="/ui/business-conditions"
                >{resourceState?.common?.footer.links.businessConditions}</NavLink>
                <NavLink
                    className="link"
                    to="/ui/order-info"
                >{resourceState?.common?.footer.links.orderInfo}</NavLink>
            </nav>
            {companyInfo &&
                <nav>
                    <header className="footer-title">{resourceState?.common?.footer.contact.title}</header>
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
        </BaseFooter>
    )
}

export default Footer;
