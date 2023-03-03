import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WiwaInput, WiwaLabel } from './index';
import { RESOURCE } from '../../locale';

interface WiwaNewPasswordProps {
    name: string,
    value: string,
    setValue: (value: string) => void,
    valid: boolean,
    setValid: (valid: boolean) => void
}

const WiwaNewPassword: React.FC<WiwaNewPasswordProps> = (props) => {
    const {t} = useTranslation();

    const [passwordConfirmation, setPasswordConfirmation] = useState(props.value);
    const didMount = React.useRef(false);
    const [message, setMessage] = useState<string>();

    const revalidate = useCallback(() => {
        setMessage('');
        if (props.value.trim().length === 0) {
            setMessage(t(RESOURCE.COMPONENT.UI.WIWA_NEW_PASSWORD.VALIDATION_MESSAGE1).toString());
            props.setValid(false);
            return;
        }
        if (passwordConfirmation.trim().length === 0) {
            setMessage(t(RESOURCE.COMPONENT.UI.WIWA_NEW_PASSWORD.VALIDATION_MESSAGE2).toString());
            props.setValid(false);
            return;
        }
        if (props.value !== passwordConfirmation) {
            setMessage(t(RESOURCE.COMPONENT.UI.WIWA_NEW_PASSWORD.VALIDATION_MESSAGE3).toString());
            props.setValid(false);
        }
        props.setValid(true);
    }, [props.value, passwordConfirmation]);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        revalidate();
    }, [props.value, passwordConfirmation]);

    return (
        <>
            <WiwaLabel htmlFor={props.name + '01'}>{t(RESOURCE.COMPONENT.UI.WIWA_NEW_PASSWORD.LABEL)}</WiwaLabel>
            <div className="block flex flex-col md:flex-row gap-2">
                <WiwaInput
                    className="w-full p-0.5"
                    type="password"
                    id={props.name + '01'}
                    name={props.name + '01'}
                    placeholder={t(RESOURCE.COMPONENT.UI.WIWA_NEW_PASSWORD.PLACEHOLDER1).toString()}
                    value={props.value}
                    onChange={event => props.setValue(event.target.value)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            revalidate();
                        }
                    }}
                />
                <WiwaInput
                    className="w-full p-0.5"
                    type="password"
                    id={props.name + '02'}
                    name={props.name + '02'}
                    placeholder={t(RESOURCE.COMPONENT.UI.WIWA_NEW_PASSWORD.PLACEHOLDER2).toString()}
                    value={passwordConfirmation}
                    onChange={event => setPasswordConfirmation(event.target.value)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            revalidate();
                        }
                    }}
                />
            </div>
            {message && (
                <span className="text-xs md:text-base text-red-500">{message}</span>
            )}
        </>
    );
}

export default WiwaNewPassword;
