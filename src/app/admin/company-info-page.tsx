import { useEffect, useState } from 'react';

import { setCompanyInfo } from '../../api/controller/config';
import { getCompanyInfo } from '../../api/controller/ui';
import { CompanyInfo } from '../../api/model/application';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaFormInputEmail from '../../component/ui/wiwa-form-input-email';
import WiwaFormInputString from '../../component/ui/wiwa-form-input-string';
import WiwaFormTextarea from '../../component/ui/wiwa-form-textarea';
import { EMAIL_REGEX } from '../../const';
import { useAuthState } from '../../state/auth';
import { useErrorState } from '../../state/error';
import { useResourceState } from '../../state/resource';

const CompanyInfoPage = () => {
    const authState = useAuthState();
    const errorState = useErrorState();
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

                setValue(response.data);

                errorState?.addError(response.error);
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.adminNav.companyInfo || '',
                    to: '/admin/company-info'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="flex flex-col items-center justify-center">
                    <div className="md:grid md:grid-cols-2 md:gap-5 w-full">
                        <WiwaFormInputString
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

                        <WiwaFormInputString
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
                        <WiwaFormInputString
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

                        <WiwaFormInputString
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

                        <WiwaFormInputString
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
                        <WiwaFormInputString
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

                        <WiwaFormInputEmail
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
                        <WiwaFormInputString
                            label={resourceState?.admin?.companyInfo.businessIdLabel}
                            placeholder={resourceState?.admin?.companyInfo.businessIdPlaceholder}
                            value={businessId}
                            setValue={setBusinessId}
                        />

                        <WiwaFormInputString
                            label={resourceState?.admin?.companyInfo.taxIdLabel}
                            placeholder={resourceState?.admin?.companyInfo.taxIdPlaceholder}
                            value={taxId}
                            setValue={setTaxId}
                        />

                        <WiwaFormInputString
                            label={resourceState?.admin?.companyInfo.vatRegNoLabel}
                            placeholder={resourceState?.admin?.companyInfo.vatRegNoPlaceholder}
                            value={vatRegNo}
                            setValue={setVatRegNo}
                        />
                    </div>

                    <WiwaFormInputString
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
                </div>
            </div>
        </>
    )
}

export default CompanyInfoPage;
