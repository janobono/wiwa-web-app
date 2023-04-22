import React from 'react';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../../locale';
import { WiwaFormInput } from '../ui';

interface UserPasswordFieldProps {
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    passwordValid: boolean
    setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
}

const UserPasswordField: React.FC<UserPasswordFieldProps> = (props) => {
    const {t} = useTranslation();

    return (
        <div className="mb-2">
            <WiwaFormInput
                type="password"
                name="password"
                label={t(RESOURCE.COMPONENT.USER.USER_PASSWORD_FIELD.LABEL)}
                placeholder={t(RESOURCE.COMPONENT.USER.USER_PASSWORD_FIELD.PLACEHOLDER).toString()}
                required={true}
                value={props.password}
                setValue={props.setPassword}
                valid={props.passwordValid}
                setValid={props.setPasswordValid}
                validate={() => {
                    if (props.password.trim().length === 0) {
                        return {
                            valid: false,
                            message: t(RESOURCE.COMPONENT.USER.USER_PASSWORD_FIELD.VALIDATION_MESSAGE).toString()
                        };
                    }
                    return {valid: true};
                }}
            />
        </div>
    )
}

export default UserPasswordField;
