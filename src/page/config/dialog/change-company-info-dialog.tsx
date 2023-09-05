import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { uiClient } from '../../../client';

import { RESOURCE } from '../../../locale';
import { useUiState } from '../../../state';

import { EMAIL_REGEX, WiwaButton, WiwaFormInput, WiwaSpinner } from '../../../component/ui';

interface ChangeCompanyInfoDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeCompanyInfoDialog: React.FC<ChangeCompanyInfoDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [street, setStreet] = useState('');
    const [streetValid, setStreetValid] = useState(false);

    const [city, setCity] = useState('');
    const [cityValid, setCityValid] = useState(false);

    const [zipCode, setZipCode] = useState('');
    const [zipCodeValid, setZipCodeValid] = useState(false);

    const [state, setState] = useState('');
    const [stateValid, setStateValid] = useState(false);

    const [phone, setPhone] = useState('');
    const [phoneValid, setPhoneValid] = useState(false);

    const [mail, setMail] = useState('');
    const [mailValid, setMailValid] = useState(false);

    const [businessId, setBusinessId] = useState('');

    const [taxId, setTaxId] = useState('');

    const [vatRegNo, setVatRegNo] = useState('');

    const [commercialRegisterInfo, setCommercialRegisterInfo] = useState('');

    const [mapUrl, setMapUrl] = useState('');
    const [mapUrlValid, setMapUrlValid] = useState(false);

    const isFormValid = (): boolean => {
        return nameValid && streetValid && cityValid && zipCodeValid && stateValid && phoneValid && mailValid && mapUrlValid;
    };

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        uiClient.getCompanyInfo().then(response => {
            if (response.data) {
                setName(response.data.name);
                setStreet(response.data.street);
                setCity(response.data.city);
                setZipCode(response.data.zipCode);
                setState(response.data.state);
                setPhone(response.data.phone);
                setMail(response.data.mail);
                setBusinessId(response.data.businessId);
                setTaxId(response.data.taxId);
                setVatRegNo(response.data.vatRegNo);
                setCommercialRegisterInfo(response.data.commercialRegisterInfo);
                setMapUrl(response.data.mapUrl);
            }
        });
    }, []);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid()) {
                const clientResponse = await uiState?.changeCompanyInfo({
                    name,
                    street,
                    city,
                    zipCode,
                    state,
                    phone,
                    mail,
                    businessId,
                    taxId,
                    vatRegNo,
                    commercialRegisterInfo,
                    mapUrl
                });
                if (clientResponse !== undefined && clientResponse.data !== undefined) {
                    props.setShowDialog(false);
                } else {
                    setError(t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.ERROR).toString());
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Transition appear show={props.showDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.setShowDialog(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                                <div className="text-lg md:text-xl font-bold text-center mb-5">
                                    {t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="name"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.NAME.LABEL)}
                                            required={true}
                                            value={name}
                                            setValue={setName}
                                            valid={nameValid}
                                            setValid={setNameValid}
                                            validate={() => {
                                                if (name.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.NAME.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="street"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.STREET.LABEL)}
                                            required={true}
                                            value={street}
                                            setValue={setStreet}
                                            valid={streetValid}
                                            setValid={setStreetValid}
                                            validate={() => {
                                                if (street.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.STREET.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="city"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.CITY.LABEL)}
                                            required={true}
                                            value={city}
                                            setValue={setCity}
                                            valid={cityValid}
                                            setValid={setCityValid}
                                            validate={() => {
                                                if (city.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.CITY.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="zipCode"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.ZIP_CODE.LABEL)}
                                            required={true}
                                            value={zipCode}
                                            setValue={setZipCode}
                                            valid={zipCodeValid}
                                            setValid={setZipCodeValid}
                                            validate={() => {
                                                if (zipCode.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.ZIP_CODE.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="state"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.STATE.LABEL)}
                                            required={true}
                                            value={state}
                                            setValue={setState}
                                            valid={stateValid}
                                            setValid={setStateValid}
                                            validate={() => {
                                                if (state.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.STATE.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="phone"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.PHONE.LABEL)}
                                            required={true}
                                            value={phone}
                                            setValue={setPhone}
                                            valid={phoneValid}
                                            setValid={setPhoneValid}
                                            validate={() => {
                                                if (phone.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.PHONE.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="mail"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.MAIL.LABEL)}
                                            required={true}
                                            value={mail}
                                            setValue={setMail}
                                            valid={mailValid}
                                            setValid={setMailValid}
                                            validate={() => {
                                                if (mail.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.MAIL.VALIDATION_MESSAGE_1).toString()
                                                    };
                                                }
                                                const valid = EMAIL_REGEX.test(mail);
                                                let message;
                                                if (!valid) {
                                                    message = t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.MAIL.VALIDATION_MESSAGE_2).toString();
                                                }
                                                return {valid, message};
                                            }}/>
                                    </div>

                                    <div className="mb-2">
                                        <WiwaFormInput
                                            type="text"
                                            name="businessId"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.BUSINESS_ID.LABEL)}
                                            value={businessId}
                                            setValue={setBusinessId}
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
                                            name="taxId"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.TAX_ID.LABEL)}
                                            value={taxId}
                                            setValue={setTaxId}
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
                                            name="vatRegNo"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.VAT_REG_NO.LABEL)}
                                            value={vatRegNo}
                                            setValue={setVatRegNo}
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
                                            name="commercialRegisterInfo"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.COMMERCIAL_REGISTER_INFO.LABEL)}
                                            value={commercialRegisterInfo}
                                            setValue={setCommercialRegisterInfo}
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
                                            name="mapUrl"
                                            label={t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.MAP_URL.LABEL)}
                                            required={true}
                                            value={mapUrl}
                                            setValue={setMapUrl}
                                            valid={mapUrlValid}
                                            setValid={setMapUrlValid}
                                            validate={() => {
                                                if (mapUrl.trim().length === 0) {
                                                    return {
                                                        valid: false,
                                                        message: t(RESOURCE.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.FORM.MAP_URL.VALIDATION_MESSAGE).toString()
                                                    };
                                                }
                                                return {valid: true};
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <iframe
                                            title="change-company-info-frame"
                                            width="100%"
                                            height="280px"
                                            src={mapUrl}
                                            className="border-0">
                                        </iframe>
                                    </div>

                                    {isSubmitting ?
                                        <div className="flex items-center justify-center">
                                            <WiwaSpinner className="w-5 h-5 border-2 pr-1"/>
                                        </div>
                                        :
                                        <WiwaButton
                                            type="submit"
                                            className="w-full"
                                            disabled={!isFormValid() || isSubmitting}
                                        >
                                            {t(RESOURCE.ACTION.SAVE)}
                                        </WiwaButton>
                                    }
                                </form>
                                {error && <p className="m-5 text-xs md:text-base text-red-500">{error}</p>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ChangeCompanyInfoDialog;
