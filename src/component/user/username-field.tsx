import React from 'react';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../../locale';
import { WiwaFormInput } from '../ui';

interface UsernameFieldProps {
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    usernameValid: boolean
    setUsernameValid: React.Dispatch<React.SetStateAction<boolean>>
}

const UsernameField: React.FC<UsernameFieldProps> = (props) => {
    const {t} = useTranslation();

    return (
        <div className="mb-2">
            <WiwaFormInput
                type="text"
                name="username"
                label={t(RESOURCE.COMPONENT.USER.USERNAME_FIELD.LABEL)}
                placeholder={t(RESOURCE.COMPONENT.USER.USERNAME_FIELD.PLACEHOLDER).toString()}
                required={true}
                value={props.username}
                setValue={props.setUsername}
                valid={props.usernameValid}
                setValid={props.setUsernameValid}
                validate={() => {
                    if (props.username.trim().length === 0) {
                        return {
                            valid: false,
                            message: t(RESOURCE.COMPONENT.USER.USERNAME_FIELD.VALIDATION_MESSAGE).toString()
                        };
                    }
                    return {valid: true};
                }}
            />
        </div>
    )
}

export default UsernameField;
