import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CompanyInfo, LocaleData, uiClient } from '../../../../client';
import { useUiState } from '../../../../state';
import { getLanguages, LOCALE, RESOURCE, toLocale } from '../../../../locale';

import { WiwaButton, WiwaInput, WiwaLabel, WiwaSpinner, WiwaTextArea } from '../../../ui';
import { FlagSk, FlagUs } from '../../../ui/icon';

interface ChangeCompanyInfoDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void
}

const ChangeCompanyInfoDialog: React.FC<ChangeCompanyInfoDialogProps> = (props) => {
    const {t} = useTranslation();

    const uiState = useUiState();

    const languages = getLanguages();

    const [companyInfoData, setCompanyInfoData] = useState<LocaleData<CompanyInfo>>({items: []});
    const [isFormValid, setFormValid] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        languages.map(language => uiClient.getCompanyInfo(toLocale(language)).then(
                data => {
                    setCompanyInfoData((prevState) => {
                        const nextItems = [...prevState.items.filter(item => item.language !== language)];
                        const companyInfo = data.data;
                        if (companyInfo) {
                            nextItems.push({language, data: companyInfo});
                        }
                        return {items: nextItems};
                    });
                }
            )
        );
    }, []);

    useEffect(() => {
        const validArray: boolean[] = companyInfoData.items.map(item => {
            return Array.from(Object.values(item.data))
                .map(value => value.toString().trim().length > 0)
                .reduce((previousValue, currentValue) => previousValue && currentValue);
        });
        setFormValid(
            validArray.length > 1
            && validArray.reduce((previousValue, currentValue) => previousValue && currentValue)
        );
    }, [companyInfoData.items])

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid) {
                const wiwaError = await uiState?.changeCompanyInfo(companyInfoData);
                if (wiwaError) {
                    setError(t(RESOURCE.COMPONENT.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.ERROR).toString());
                } else {
                    props.setShowDialog(false);
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
                                    {t(RESOURCE.COMPONENT.PAGE.CONFIG.DIALOG.CHANGE_COMPANY_INFO.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    {languages.length === companyInfoData.items.length &&
                                        <CompanyInfoEditor companyInfoData={companyInfoData}
                                                           setCompanyInfoData={setCompanyInfoData}/>
                                    }

                                    {isSubmitting ?
                                        <div className="flex items-center justify-center">
                                            <WiwaSpinner className="w-5 h-5 border-2 pr-1"/>
                                        </div>
                                        :
                                        <WiwaButton
                                            type="submit"
                                            className="w-full"
                                            disabled={!isFormValid || isSubmitting}
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

interface CompanyInfoEditorProps extends PropsWithChildren {
    companyInfoData: LocaleData<CompanyInfo>,
    setCompanyInfoData: React.Dispatch<React.SetStateAction<LocaleData<CompanyInfo>>>
}

const CompanyInfoEditor: React.FC<CompanyInfoEditorProps> = (props) => {
    const {t} = useTranslation();

    const languages = getLanguages();

    const [name, setName] = useState<LocaleData<string>>({items: []});
    const [street, setStreet] = useState<LocaleData<string>>({items: []});
    const [city, setCity] = useState<LocaleData<string>>({items: []});
    const [zipCode, setZipCode] = useState<string>('');
    const [state, setState] = useState<LocaleData<string>>({items: []});
    const [phone, setPhone] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [businessId, setBusinessId] = useState<string>('');
    const [taxId, setTaxId] = useState<string>('');
    const [vatRegNo, setVatRegNo] = useState<string>('');
    const [commercialRegisterInfo, setCommercialRegisterInfo] = useState<LocaleData<string>>({items: []});
    const [mapUrl, setMapUrl] = useState<string>('');

    useEffect(() => {
        languages.map(language => {
            const item = props.companyInfoData.items.find(item => item.language === language);
            if (item) {
                setName((prevState) => {
                    const nextItems = prevState.items.filter(nameItem => nameItem.language !== item.language);
                    nextItems.push({language: item.language, data: item.data.name});
                    return {items: nextItems};
                });
                setStreet((prevState) => {
                    const nextItems = prevState.items.filter(streetItem => streetItem.language !== item.language);
                    nextItems.push({language: item.language, data: item.data.street});
                    return {items: nextItems};
                });
                setCity((prevState) => {
                    const nextItems = prevState.items.filter(cityItem => cityItem.language !== item.language);
                    nextItems.push({language: item.language, data: item.data.city});
                    return {items: nextItems};
                });
                setZipCode(item.data.zipCode);
                setState((prevState) => {
                    const nextItems = prevState.items.filter(stateItem => stateItem.language !== item.language);
                    nextItems.push({language: item.language, data: item.data.state});
                    return {items: nextItems};
                });
                setPhone(item.data.phone);
                setMail(item.data.mail);
                setBusinessId(item.data.businessId);
                setTaxId(item.data.taxId);
                setVatRegNo(item.data.vatRegNo);
                setCommercialRegisterInfo((prevState) => {
                    const nextItems = prevState.items.filter(comRegInfo => comRegInfo.language !== item.language);
                    nextItems.push({language: item.language, data: item.data.commercialRegisterInfo});
                    return {items: nextItems};
                });
                setMapUrl(item.data.mapUrl);
            }
        });
    }, []);

    useEffect(() => {
        const nextItems = props.companyInfoData.items.map(item => {
            const language = item.language;

            const nameItem = name.items.find(nameItem => nameItem.language === language);
            const streetItem = street.items.find(streetItem => streetItem.language === language);
            const cityItem = city.items.find(cityItem => cityItem.language === language);
            const stateItem = state.items.find(stateItem => stateItem.language === language);
            const commercialRegisterInfoItem = commercialRegisterInfo.items.find(
                commercialRegisterInfoItem => commercialRegisterInfoItem.language === language);

            return {
                language,
                data: {
                    name: nameItem ? nameItem.data : '',
                    street: streetItem ? streetItem.data : '',
                    city: cityItem ? cityItem.data : '',
                    zipCode,
                    state: stateItem ? stateItem.data : '',
                    phone,
                    mail,
                    businessId,
                    taxId,
                    vatRegNo,
                    commercialRegisterInfo: commercialRegisterInfoItem ? commercialRegisterInfoItem.data : '',
                    mapUrl
                }
            };
        });
        props.setCompanyInfoData({items: nextItems});
    }, [name, street, city, zipCode, state, phone, mail, businessId, taxId, vatRegNo, commercialRegisterInfo, mapUrl]);

    return (
        <>
            {languages.length === name.items.length &&
                languages.length === street.items.length &&
                languages.length === city.items.length &&
                languages.length === state.items.length &&
                languages.length === commercialRegisterInfo.items.length &&
                <>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="name">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.NAME)}
                        </WiwaLabel>
                        <div id="name" className="grid grid-cols-1">
                            {languages.map((language, index) =>
                                <LocaleDataInput
                                    key={index}
                                    name="name"
                                    language={language}
                                    data={name}
                                    setData={setName}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="street">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.STREET)}
                        </WiwaLabel>
                        <div id="street" className="grid grid-cols-1">
                            {languages.map((language, index) =>
                                <LocaleDataInput
                                    key={index}
                                    name="street"
                                    language={language}
                                    data={street}
                                    setData={setStreet}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="city">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.CITY)}
                        </WiwaLabel>
                        <div id="city" className="grid grid-cols-1">
                            {languages.map((language, index) =>
                                <LocaleDataInput
                                    key={index}
                                    name="city"
                                    language={language}
                                    data={city}
                                    setData={setCity}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="zipCode">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.ZIP_CODE)}</WiwaLabel>
                        {props.children}
                        <WiwaInput
                            className="w-full p-0.5"
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            value={zipCode}
                            onChange={event => setZipCode(event.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="state">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.STATE)}
                        </WiwaLabel>
                        <div id="state" className="grid grid-cols-1">
                            {state.items.map((item, index) =>
                                <LocaleDataInput
                                    key={index}
                                    name="state"
                                    language={item.language}
                                    data={state}
                                    setData={setState}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <WiwaLabel htmlFor="phone">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.PHONE)}</WiwaLabel>
                        <WiwaInput
                            className="w-full p-0.5"
                            id="phone"
                            name="phone"
                            type="phone"
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <WiwaLabel htmlFor="mail">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.MAIL)}</WiwaLabel>
                        <WiwaInput
                            className="w-full p-0.5"
                            id="mail"
                            name="mail"
                            type="mail"
                            value={mail}
                            onChange={event => setMail(event.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="businessId">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.BUSINESS_ID)}</WiwaLabel>
                        <WiwaInput
                            className="w-full p-0.5"
                            id="businessId"
                            name="businessId"
                            type="businessId"
                            value={businessId}
                            onChange={event => setBusinessId(event.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <WiwaLabel htmlFor="taxId">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.TAX_ID)}</WiwaLabel>
                        <WiwaInput
                            className="w-full p-0.5"
                            id="taxId"
                            name="taxId"
                            type="taxId"
                            value={taxId}
                            onChange={event => setTaxId(event.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="vatRegNo">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.VAT_REG_NO)}</WiwaLabel>
                        <WiwaInput
                            className="w-full p-0.5"
                            id="vatRegNo"
                            name="vatRegNo"
                            type="vatRegNo"
                            value={vatRegNo}
                            onChange={event => setVatRegNo(event.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <WiwaLabel
                            htmlFor="commercialRegisterInfo">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.COMMERCIAL_REGISTER_INFO)}
                        </WiwaLabel>
                        <div id="commercialRegisterInfo" className="grid grid-cols-1">
                            {commercialRegisterInfo.items.map((item, index) =>
                                <LocaleDataArea
                                    key={index}
                                    name="commercialRegisterInfo"
                                    language={item.language}
                                    data={commercialRegisterInfo}
                                    setData={setCommercialRegisterInfo}
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <WiwaLabel htmlFor="mapUrl">{t(RESOURCE.COMPONENT.PAGE.CONFIG.COMPANY_INFO.MAP_URL)}</WiwaLabel>
                        <WiwaTextArea
                            className="w-full p-0.5"
                            rows={3}
                            id="mapUrl"
                            name="mapUrl"
                            value={mapUrl}
                            onChange={event => setMapUrl(event.target.value)}
                        />
                        <iframe
                            width="100%"
                            height="280px"
                            src={mapUrl}
                            className="border-0">
                        </iframe>
                    </div>
                </>
            }
        </>
    );
}

interface LocaleDataInputProps extends PropsWithChildren {
    name: string,
    language: string,
    data: LocaleData<string>,
    setData: React.Dispatch<React.SetStateAction<LocaleData<string>>>
}

const LocaleDataInput: React.FC<LocaleDataInputProps> = (props) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const item = props.data?.items.find(item => item.language === props.language);
        if (item) {
            setValue(item.data);
        }
    }, []);

    useEffect(() => {
        props.setData((prevState) => {
                const nextItems = [...prevState.items.filter(item => item.language !== props.language),
                    {language: props.language, data: value}
                ];
                return {items: nextItems};
            }
        );
    }, [value]);

    return (
        <div className="flex flex-row gap-2 items-center">
            {toLocale(props.language) === LOCALE.EN ? <FlagUs/> : <FlagSk/>}
            <WiwaInput
                className="w-full p-0.5"
                type="text"
                id={props.name + '_' + props.language}
                name={props.name + '_' + props.language}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
}

const LocaleDataArea: React.FC<LocaleDataInputProps> = (props) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const item = props.data?.items.find(item => item.language === props.language);
        if (item) {
            setValue(item.data);
        }
    }, []);

    useEffect(() => {
        props.setData((prevState) => {
                const nextItems = [...prevState.items.filter(item => item.language !== props.language),
                    {language: props.language, data: value}
                ];
                return {items: nextItems};
            }
        );
    }, [value]);

    return (
        <div className="flex flex-row gap-2 items-center">
            {toLocale(props.language) === LOCALE.EN ? <FlagUs/> : <FlagSk/>}
            <WiwaTextArea
                className="w-full p-0.5"
                rows={3}
                id={props.name + '_' + props.language}
                name={props.name + '_' + props.language}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
}
