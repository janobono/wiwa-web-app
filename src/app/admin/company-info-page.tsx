import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit } from 'react-feather';

import BaseDialog from '../../component/dialog/base-dialog';
import { useConfigState } from '../../component/state/config-state-provider';
import { useDialogState } from '../../component/state/dialog-state-provider';
import { useResourceState } from '../../component/state/resource-state-provider';
import { useUiState } from '../../component/state/ui-state-provider';
import WiwaButton from '../../component/ui/wiwa-button.tsx';
import WiwaFormInput from '../../component/ui/wiwa-form-input';
import WiwaFormTextarea from '../../component/ui/wiwa-form-textarea';
import { EMAIL_REGEX } from '../../const';

const COMPANY_INFO_DIALOG_ID = 'admin-company-info-dialog-001';

const CompanyInfoPage = () => {
    const resourceState = useResourceState();
    const uiState = useUiState();

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <div className="flex flex-col p-5 gap-5 w-full">
                <div className="border border-solid flex flex-col justify-between p-5">
                    <div className="p-5 flex content-stretch justify-center items-center">
                        <WiwaButton
                            className="btn-primary"
                            title={resourceState?.admin?.companyInfo.title}
                            onClick={() => setShowDialog(true)}
                        ><Edit size={18}/></WiwaButton>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.nameLabel}</td>
                                <td>{uiState?.companyInfo?.name}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.streetLabel}</td>
                                <td>{uiState?.companyInfo?.street}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.cityLabel}</td>
                                <td>{uiState?.companyInfo?.city}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.zipCodeLabel}</td>
                                <td>{uiState?.companyInfo?.zipCode}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.stateLabel}</td>
                                <td>{uiState?.companyInfo?.street}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.phoneLabel}</td>
                                <td>{uiState?.companyInfo?.phone}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.mailLabel}</td>
                                <td>{uiState?.companyInfo?.mail}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.businessIdLabel}</td>
                                <td>{uiState?.companyInfo?.businessId}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.taxIdLabel}</td>
                                <td>{uiState?.companyInfo?.taxId}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.vatRegNoLabel}</td>
                                <td>{uiState?.companyInfo?.vatRegNo}</td>
                            </tr>
                            <tr>
                                <td>{resourceState?.admin?.companyInfo.commercialRegisterInfoLabel}</td>
                                <td>{uiState?.companyInfo?.commercialRegisterInfo}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <iframe
                        title="contact-info-frame"
                        width="100%"
                        height="380px"
                        src={uiState?.companyInfo?.mapUrl}
                        className="border-0">
                    </iframe>
                </div>
            </div>
            <EditCompanyDialog
                showDialog={showDialog}
                okHandler={() => {
                    setShowDialog(false);
                }}
                cancelHandler={() => setShowDialog(false)}
            />
        </>
    )
}

export default CompanyInfoPage;

const EditCompanyDialog = ({showDialog, okHandler, cancelHandler}: {
    showDialog: boolean,
    okHandler: () => void,
    cancelHandler: () => void
}) => {
    const configState = useConfigState();
    const dialogState = useDialogState();
    const resourceState = useResourceState();
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

    const [formSubmit, setFormSubmit] = useState(false);
    const [formError, setFormError] = useState<string>();

    useEffect(() => {
        if (uiState?.companyInfo) {
            setName(uiState?.companyInfo.name);
            setNameValid(true);

            setStreet(uiState?.companyInfo.street);
            setStreetValid(true);

            setCity(uiState?.companyInfo.city);
            setCityValid(true);

            setZipCode(uiState?.companyInfo.zipCode);
            setZipCodeValid(true);

            setState(uiState?.companyInfo.state);
            setStateValid(true);

            setPhone(uiState?.companyInfo.phone);
            setPhoneValid(true);

            setMail(uiState?.companyInfo.mail);
            setMailValid(true);

            setBusinessId(uiState?.companyInfo.businessId);

            setTaxId(uiState?.companyInfo.taxId);

            setVatRegNo(uiState?.companyInfo.vatRegNo);

            setCommercialRegisterInfo(uiState?.companyInfo.commercialRegisterInfo);

            setMapUrl(uiState?.companyInfo.mapUrl);
            setMapUrlValid(true);
        }
    }, [showDialog, uiState?.companyInfo]);

    const isFormValid = (): boolean => {
        return nameValid && streetValid && cityValid && zipCodeValid && stateValid && phoneValid && mailValid && mapUrlValid;
    }

    const submit = async () => {
        setFormSubmit(true);
        setFormError(undefined);
        try {
            if (isFormValid()) {
                const response = await configState?.setCompanyInfo({
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
                if (response?.error) {
                    setFormError(resourceState?.admin?.companyInfo.error);
                } else {
                    okHandler();
                }
            }
        } finally {
            setFormSubmit(false);
        }
    }

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={COMPANY_INFO_DIALOG_ID} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.companyInfo.title}
                    </div>

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

                    <WiwaFormTextarea
                        label={resourceState?.admin?.companyInfo.commercialRegisterInfoLabel}
                        placeholder={resourceState?.admin?.companyInfo.commercialRegisterInfoPlaceholder}
                        value={commercialRegisterInfo}
                        setValue={setCommercialRegisterInfo}
                    />

                    <div className="flex flex-col w-full">
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
                            height="380px"
                            src={mapUrl}
                            className="border-0 pt-5">
                        </iframe>
                    </div>

                    <div className="join pt-5">
                        <WiwaButton
                            className="btn-primary join-item"
                            disabled={formSubmit || !isFormValid()}
                            onClick={submit}
                        >{resourceState?.admin?.companyInfo.submit}
                        </WiwaButton>
                        <WiwaButton
                            className="btn-accent join-item"
                            disabled={formSubmit}
                            onClick={cancelHandler}
                        >{resourceState?.admin?.companyInfo.cancel}
                        </WiwaButton>
                    </div>
                    {formError &&
                        <label className="label">
                            <span className="label-text-alt text-error">{formError}</span>
                        </label>
                    }
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}
