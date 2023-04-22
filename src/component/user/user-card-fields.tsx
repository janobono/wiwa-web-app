import React from 'react';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../../locale';
import { WiwaFormInput } from '../ui';

interface UserCardFieldsProps {
    titleBefore: string
    setTitleBefore: React.Dispatch<React.SetStateAction<string>>
    titleAfter: string
    setTitleAfter: React.Dispatch<React.SetStateAction<string>>
    firstName: string
    setFirstName: React.Dispatch<React.SetStateAction<string>>
    firstNameValid: boolean
    setFirstNameValid: React.Dispatch<React.SetStateAction<boolean>>
    midName: string
    setMidName: React.Dispatch<React.SetStateAction<string>>
    lastName: string
    setLastName: React.Dispatch<React.SetStateAction<string>>
    lastNameValid: boolean
    setLastNameValid: React.Dispatch<React.SetStateAction<boolean>>
}

const UserCardFields: React.FC<UserCardFieldsProps> = (props) => {
    const {t} = useTranslation();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-2">
                <div>
                    <WiwaFormInput
                        type="text"
                        name="titleBefore"
                        label={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.TITLE_BEFORE.LABEL)}
                        placeholder={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.TITLE_BEFORE.PLACEHOLDER).toString()}
                        required={false}
                        value={props.titleBefore}
                        setValue={props.setTitleBefore}
                        valid={true}
                        setValid={() => {
                        }}
                        validate={() => {
                            return {valid: true};
                        }}
                    />
                </div>

                <div>
                    <WiwaFormInput
                        type="text"
                        name="titleAfter"
                        label={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.TITLE_AFTER.LABEL)}
                        placeholder={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.TITLE_AFTER.PLACEHOLDER).toString()}
                        required={false}
                        value={props.titleAfter}
                        setValue={props.setTitleAfter}
                        valid={true}
                        setValid={() => {
                        }}
                        validate={() => {
                            return {valid: true};
                        }}
                    />
                </div>
            </div>

            <div className="mb-2">
                <WiwaFormInput
                    type="text"
                    name="firstName"
                    label={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.FIRST_NAME.LABEL)}
                    placeholder={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.FIRST_NAME.PLACEHOLDER).toString()}
                    required={true}
                    value={props.firstName}
                    setValue={props.setFirstName}
                    valid={props.firstNameValid}
                    setValid={props.setFirstNameValid}
                    validate={() => {
                        if (props.firstName.trim().length === 0) {
                            return {
                                valid: false,
                                message: t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.FIRST_NAME.VALIDATION_MESSAGE).toString()
                            };
                        }
                        return {valid: true};
                    }}
                />
            </div>

            <div className="mb-2">
                <WiwaFormInput
                    type="text"
                    name="midName"
                    label={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.MID_NAME.LABEL)}
                    placeholder={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.MID_NAME.PLACEHOLDER).toString()}
                    required={false}
                    value={props.midName}
                    setValue={props.setMidName}
                    valid={true}
                    setValid={() => {
                    }}
                    validate={() => {
                        return {valid: true};
                    }}
                />
            </div>

            <div className="mb-2">
                <WiwaFormInput
                    type="text"
                    name="lastName"
                    label={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.LAST_NAME.LABEL)}
                    placeholder={t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.LAST_NAME.PLACEHOLDER).toString()}
                    required={true}
                    value={props.lastName}
                    setValue={props.setLastName}
                    valid={props.lastNameValid}
                    setValid={props.setLastNameValid}
                    validate={() => {
                        if (props.lastName.trim().length === 0) {
                            return {
                                valid: false,
                                message: t(RESOURCE.COMPONENT.USER.USER_CARD_FIELDS.LAST_NAME.VALIDATION_MESSAGE).toString()
                            };
                        }
                        return {valid: true};
                    }}
                />
            </div>
        </>
    )
}

export default UserCardFields;
