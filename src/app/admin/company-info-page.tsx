import { useEffect, useState } from 'react';

import { setCompanyInfo } from '../../api/controller/config';
import { getCompanyInfo } from '../../api/controller/ui';
import { CompanyInfo } from '../../api/model/application';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaFormTextarea from '../../component/ui/wiwa-form-textarea';
import { EMAIL_REGEX } from '../../const';
import { useAuthState } from '../../state/auth';
import { useResourceState } from '../../state/resource';

const CompanyInfoPage = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<CompanyInfo>();

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

    const [formError, setFormError] = useState<string>();

    useEffect(() => {
        getCompanyInfo().then(data => setValue(data.data));
    }, []);

    useEffect(() => {
        if (value) {
            setName(value.name);
            setNameValid(true);

            setStreet(value.street);
            setStreetValid(true);

            setCity(value.city);
            setCityValid(true);

            setZipCode(value.zipCode);
            setZipCodeValid(true);

            setState(value.state);
            setStateValid(true);

            setPhone(value.phone);
            setPhoneValid(true);

            setMail(value.mail);
            setMailValid(true);

            setBusinessId(value.businessId);

            setTaxId(value.taxId);

            setVatRegNo(value.vatRegNo);

            setCommercialRegisterInfo(value.commercialRegisterInfo);

            setMapUrl(value.mapUrl);
            setMapUrlValid(true);
        }
    }, [value]);

    const isFormValid = (): boolean => {
        return nameValid && streetValid && cityValid && zipCodeValid && stateValid && phoneValid && mailValid && mapUrlValid;
    }

    const submit = async () => {
        setBusy(true);
        setFormError(undefined);
        try {
            if (isFormValid()) {
                const response = await setCompanyInfo({
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
                    },
                    authState?.authToken?.accessToken
                );
                if (response?.error) {
                    setFormError(resourceState?.admin?.companyInfo.error);
                }
                if (response.data) {
                    setValue(response.data);
                }
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex flex-col p-5 gap-5 w-full">
            <div className="flex flex-col items-center justify-center">
                <div className="md:grid md:grid-cols-2 md:gap-5 w-full">
                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.nameLabel}
                        placeholder={resourceState?.admin?.companyInfo.namePlaceholder}
                        value={name}
                        setValue={setName}
                        setValid={setNameValid}
                        validate={() => {
                            if (name.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.nameRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.streetLabel}
                        placeholder={resourceState?.admin?.companyInfo.streetPlaceholder}
                        value={street}
                        setValue={setStreet}
                        setValid={setStreetValid}
                        validate={() => {
                            if (street.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.stateRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />
                </div>

                <div className="md:grid md:grid-cols-3 md:gap-5 w-full">
                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.cityLabel}
                        placeholder={resourceState?.admin?.companyInfo.cityPlaceholder}
                        value={city}
                        setValue={setCity}
                        setValid={setCityValid}
                        validate={() => {
                            if (city.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.cityRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.zipCodeLabel}
                        placeholder={resourceState?.admin?.companyInfo.zipCodePlaceholder}
                        value={zipCode}
                        setValue={setZipCode}
                        setValid={setZipCodeValid}
                        validate={() => {
                            if (zipCode.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.zipCodeRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.stateLabel}
                        placeholder={resourceState?.admin?.companyInfo.statePlaceholder}
                        value={state}
                        setValue={setState}
                        setValid={setStateValid}
                        validate={() => {
                            if (state.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.stateRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-5 w-full">
                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.phoneLabel}
                        placeholder={resourceState?.admin?.companyInfo.phonePlaceholder}
                        value={phone}
                        setValue={setPhone}
                        setValid={setPhoneValid}
                        validate={() => {
                            if (phone.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.phoneRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />

                    <WiwaFormInput
                        type="email"
                        label={resourceState?.admin?.companyInfo.mailLabel}
                        placeholder={resourceState?.admin?.companyInfo.mailPlaceholder}
                        value={mail}
                        setValue={setMail}
                        setValid={setMailValid}
                        validate={() => {
                            if (mail.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.mailRequired
                                };
                            }
                            if (!EMAIL_REGEX.test(mail)) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.mailFormat
                                };
                            }
                            return {valid: true};
                        }}
                    />
                </div>

                <div className="md:grid md:grid-cols-3 md:gap-5 w-full">
                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.businessIdLabel}
                        placeholder={resourceState?.admin?.companyInfo.businessIdPlaceholder}
                        value={businessId}
                        setValue={setBusinessId}
                    />

                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.taxIdLabel}
                        placeholder={resourceState?.admin?.companyInfo.taxIdPlaceholder}
                        value={taxId}
                        setValue={setTaxId}
                    />

                    <WiwaFormInput
                        label={resourceState?.admin?.companyInfo.vatRegNoLabel}
                        placeholder={resourceState?.admin?.companyInfo.vatRegNoPlaceholder}
                        value={vatRegNo}
                        setValue={setVatRegNo}
                    />
                </div>

                <WiwaFormInput
                    label={resourceState?.admin?.companyInfo.commercialRegisterInfoLabel}
                    placeholder={resourceState?.admin?.companyInfo.commercialRegisterInfoPlaceholder}
                    value={commercialRegisterInfo}
                    setValue={setCommercialRegisterInfo}
                />

                <div className="md:grid md:grid-cols-2 md:gap-5 w-full">
                    <WiwaFormTextarea
                        label={resourceState?.admin?.companyInfo.mapUrlLabel}
                        placeholder={resourceState?.admin?.companyInfo.mapUrlPlaceholder}
                        value={mapUrl}
                        setValue={setMapUrl}
                        setValid={setMapUrlValid}
                        validate={() => {
                            if (mapUrl.trim().length === 0) {
                                return {
                                    valid: false,
                                    message: resourceState?.admin?.companyInfo.mailRequired
                                };
                            }
                            return {valid: true};
                        }}
                    />
                    <iframe
                        title="contact-info-frame"
                        width="100%"
                        height="100%"
                        src={mapUrl}
                        className="border-0 pt-5">
                    </iframe>
                </div>

                <div className="pt-5">
                    <WiwaButton
                        className="btn-primary"
                        disabled={busy || !isFormValid()}
                        onClick={submit}
                    >{resourceState?.common?.action.submit}
                    </WiwaButton>
                </div>
                {formError &&
                    <label className="label">
                        <span className="label-text-alt text-error">{formError}</span>
                    </label>
                }
            </div>
        </div>
    )
}

export default CompanyInfoPage;
