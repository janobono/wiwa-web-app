import React from 'react';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../../locale';
import { EMAIL_REGEX, WiwaFormInput } from '../ui';

interface UserEmailFieldProps {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    emailValid: boolean
    setEmailValid: React.Dispatch<React.SetStateAction<boolean>>
}

const UserEmailField: React.FC<UserEmailFieldProps> = (props) => {
    const {t} = useTranslation();

    return (
        <div className="mb-2">
            <WiwaFormInput
                type="email"
                name="email"
                label={t(RESOURCE.COMPONENT.USER.USER_EMAIL_FIELD.LABEL)}
                placeholder={t(RESOURCE.COMPONENT.USER.USER_EMAIL_FIELD.PLACEHOLDER).toString()}
                required={true}
                value={props.email}
                setValue={props.setEmail}
                valid={props.emailValid}
                setValid={props.setEmailValid}
                validate={() => {
                    if (props.email.trim().length === 0) {
                        return {
                            valid: false,
                            message: t(RESOURCE.COMPONENT.USER.USER_EMAIL_FIELD.VALIDATION_MESSAGE_1).toString()
                        };
                    }
                    const valid = EMAIL_REGEX.test(props.email);
                    let message;
                    if (!valid) {
                        message = t(RESOURCE.COMPONENT.USER.USER_EMAIL_FIELD.VALIDATION_MESSAGE_2).toString();
                    }
                    return {valid, message};
                }}/>
        </div>
    )
}

export default UserEmailField;
