import React from 'react';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../../locale';
import { WiwaCheckBox, WiwaNavLink } from '../ui';

interface AuthGdprCheckBoxProps {
    gdpr: boolean
    setGdpr: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthGdprCheckBox: React.FC<AuthGdprCheckBoxProps> = (props) => {
    const {t} = useTranslation();

    return (
        <div className="mb-2">
            <WiwaCheckBox
                name="gdpr"
                value={props.gdpr}
                setValue={props.setGdpr}
                message={t(RESOURCE.COMPONENT.AUTH.AUTH_GDPR_CHECK_BOX.VALIDATION_MESSAGE).toString()}
                disabled={false}
                required={true}
            ><span>
                {t(RESOURCE.COMPONENT.AUTH.AUTH_GDPR_CHECK_BOX.LABEL)}
                <WiwaNavLink to="/gdpr-info">{t(RESOURCE.COMPONENT.AUTH.AUTH_GDPR_CHECK_BOX.LINK)}</WiwaNavLink>
            </span>
            </WiwaCheckBox>
        </div>
    )
}

export default AuthGdprCheckBox;
