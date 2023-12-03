import { Globe, Mail, Phone } from 'react-feather';
import { NavLink } from 'react-router-dom';

import BaseFooter from './base-footer';
import { useResourceState } from '../state/resource-state-provider';
import { useUiState } from '../state/ui-state-provider';

const Footer = () => {
    const resourceState = useResourceState();
    const uiState = useUiState();

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
            </nav>
            {uiState?.companyInfo &&
                <nav>
                    <header className="footer-title">{resourceState?.common?.footer.contact.title}</header>
                    <ul>
                        <li className="mb-2 leading-6">
                            <div className="flex gap-1 text-gray-500 items-center">
                                <Globe size="18"/>
                                <span>{uiState.companyInfo.name + ', ' + uiState.companyInfo.street}</span>
                            </div>
                            <div className="flex gap-1 text-gray-500 items-center">
                                <span>{uiState.companyInfo.zipCode + ' ' + uiState.companyInfo.city + ', ' + uiState.companyInfo.state}</span>
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
        </BaseFooter>
    )
}

export default Footer;
