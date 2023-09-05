import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en_US from './en_US/translation.json';
import sk_SK from './sk_SK/translation.json';

export const LOCALE_ITEM = 'LOCALE';

export const LOCALE = {
    EN: 'en_US',
    SK: 'sk_SK'
};

export const toLocale = (language: string) => {
    if (language === 'sk') {
        return LOCALE.SK;
    }
    return LOCALE.EN;
}

export const toLanguage = (locale: string) => {
    return locale.split('_')[0];
}

export const getLanguages = (): string[] => {
    return Object.values(LOCALE).map(value => toLanguage(value));
}

export const RESOURCE = {
        CONNECTING: 'connecting',
        LOADING: 'loading',
        TITLE: 'title',
        PAGE_NOT_FOUND: 'page-not-found',
        UNKNOWN_ERROR: 'unknown-error',
        ACTION: {
            ADD: 'action.add',
            CANCEL: 'action.cancel',
            CREATE: 'action.create',
            CHANGE_PASSWORD: 'action.change-password',
            CHANGE_EMAIL: 'action.change-email',
            CHANGE_USER_DETAILS: 'action.change-user-details',
            CONFIG: 'action.config',
            DELETE: 'action.delete',
            DETAIL: 'action.detail',
            EDIT: 'action.edit',
            FIRST: 'action.first',
            HOME: 'action.home',
            LAST: 'action.last',
            NEW: 'action.new',
            NEXT: 'action.next',
            NO: 'action.no',
            OK: 'action.ok',
            PREVIOUS: 'action.previous',
            REMOVE: 'action.remove',
            RESEND: 'action.resend',
            SAVE: 'action.save',
            SEARCH: 'action.search',
            SELECT: 'action.select',
            SIGN_IN: 'action.sign-in',
            SIGN_OUT: 'action.sign-out',
            SIGN_UP: 'action.sign-up',
            SWITCH_LOCALE: 'action.switch-locale',
            USER_ACCOUNT: 'action.user-account',
            USERS: 'action.users',
            YES: 'action.yes'
        },
        ERROR: {
            GDPR: 'error.gdpr',
            INVALID_CAPTCHA: 'error.invalid-captcha',
            INVALID_CREDENTIALS: 'error.invalid-credentials',
            USER_EMAIL_IS_USED: 'error.user-email-is-used',
            USER_IS_DISABLED: 'error.user-is-disabled',
            USER_NOT_FOUND: 'error.user-not-found',
            USER_USERNAME_IS_USED: 'error.user-username-is-used'
        },
        COMPONENT: {
            AUTH: {
                AUTH_GDPR_CHECK_BOX: {
                    LABEL: 'component.auth.auth-gdpr-check-box.label',
                    LINK: 'component.auth.auth-gdpr-check-box.link',
                    VALIDATION_MESSAGE: 'component.auth.auth-gdpr-check-box.validation-message'
                }
            },
            LAYOUT: {
                FOOTER: {
                    LINKS: {
                        TITLE: 'component.layout.footer.links.title',
                        CONTACT_INFO: 'component.layout.footer.links.contact-info',
                        COOKIES_INFO: 'component.layout.footer.links.cookies-info',
                        GDPR_INFO: 'component.layout.footer.links.gdpr-info'
                    },
                    CONTACT: {
                        TITLE: 'component.layout.footer.contact.title'
                    }
                },
                NAVIGATION: {
                    COOKIES_CONSENT: {
                        TEXT: 'component.layout.navigation.cookies-consent.text',
                        LINK: 'component.layout.navigation.cookies-consent.link',
                        ACTION: 'component.layout.navigation.cookies-consent.action'
                    }
                }
            },
            UI: {
                WIWA_CAPTCHA: {
                    LABEL: 'component.ui.wiwa-captcha.label',
                    PLACEHOLDER: 'component.ui.wiwa-captcha.placeholder',
                    VALIDATION_MESSAGE: 'component.ui.wiwa-captcha.validation-message',
                    ERROR: 'component.ui.wiwa-captcha.error'
                },
                WIWA_NEW_PASSWORD: {
                    LABEL: 'component.ui.wiwa-new-password.label',
                    PLACEHOLDER1: 'component.ui.wiwa-new-password.placeholder1',
                    PLACEHOLDER2: 'component.ui.wiwa-new-password.placeholder2',
                    VALIDATION_MESSAGE1: 'component.ui.wiwa-new-password.validation-message1',
                    VALIDATION_MESSAGE2: 'component.ui.wiwa-new-password.validation-message2',
                    VALIDATION_MESSAGE3: 'component.ui.wiwa-new-password.validation-message3'
                }
            },
            USER: {
                USER_CARD: {
                    USERNAME: 'component.user.user-card.username',
                    EMAIL: 'component.user.user-card.email',
                    FIRST_NAME: 'component.user.user-card.first-name',
                    LAST_NAME: 'component.user.user-card.last-name',
                    AUTHORITIES: 'component.user.user-card.authorities'
                },
                USER_CARD_FIELDS: {
                    TITLE_BEFORE: {
                        LABEL: 'component.user.user-card-fields.title-before.label',
                        PLACEHOLDER: 'component.user.user-card-fields.title-before.placeholder',
                        VALIDATION_MESSAGE: 'component.user.user-card-fields.title-before.validation-message'
                    },
                    TITLE_AFTER: {
                        LABEL: 'component.user.user-card-fields.title-after.label',
                        PLACEHOLDER: 'component.user.user-card-fields.title-after.placeholder',
                        VALIDATION_MESSAGE: 'component.user.user-card-fields.title-after.validation-message'
                    },
                    FIRST_NAME: {
                        LABEL: 'component.user.user-card-fields.first-name.label',
                        PLACEHOLDER: 'component.user.user-card-fields.first-name.placeholder',
                        VALIDATION_MESSAGE: 'component.user.user-card-fields.first-name.validation-message'
                    },
                    MID_NAME: {
                        LABEL: 'component.user.user-card-fields.mid-name.label',
                        PLACEHOLDER: 'component.user.user-card-fields.mid-name.placeholder'
                    },
                    LAST_NAME: {
                        LABEL: 'component.user.user-card-fields.last-name.label',
                        PLACEHOLDER: 'component.user.user-card-fields.last-name.placeholder',
                        VALIDATION_MESSAGE: 'component.user.user-card-fields.last-name.validation-message'
                    }
                },
                USER_EMAIL_FIELD: {
                    LABEL: 'component.user.user-email-field.label',
                    PLACEHOLDER: 'component.user.user-email-field.placeholder',
                    VALIDATION_MESSAGE_1: 'component.user.user-email-field.validation-message-1',
                    VALIDATION_MESSAGE_2: 'component.user.user-email-field.validation-message-2'
                },
                USER_PASSWORD_FIELD: {
                    LABEL: 'component.user.user-password-field.label',
                    PLACEHOLDER: 'component.user.user-password-field.placeholder',
                    VALIDATION_MESSAGE: 'component.user.user-password-field.validation-message'
                },
                USERNAME_FIELD: {
                    LABEL: 'component.user.username-field.label',
                    PLACEHOLDER: 'component.user.username-field.placeholder',
                    VALIDATION_MESSAGE: 'component.user.username-field.validation-message'
                }
            }
        },
        PAGE: {
            AUTH: {
                DIALOG: {
                    CHANGE_EMAIL: {
                        TITLE: 'page.auth.dialog.change-email.title',
                        MESSAGE: 'page.auth.dialog.change-email.message',
                        ERROR: 'page.auth.dialog.change-email.error'
                    },
                    CHANGE_PASSWORD: {
                        TITLE: 'page.auth.dialog.change-password.title',
                        FORM: {
                            ACTUAL_PASSWORD: {
                                LABEL: 'page.auth.dialog.change-password.form.actual-password.label',
                                PLACEHOLDER: 'page.auth.dialog.change-password.form.actual-password.placeholder',
                                VALIDATION_MESSAGE: 'page.auth.dialog.change-password.form.actual-password.validation-message'
                            }
                        },
                        MESSAGE: 'page.auth.dialog.change-password.message',
                        ERROR: 'page.auth.dialog.change-password.error'
                    },
                    CHANGE_USER_DETAILS: {
                        TITLE: 'page.auth.dialog.change-user-details.title',
                        MESSAGE: 'page.auth.dialog.change-user-details.message',
                        ERROR: 'page.auth.dialog.change-user-details.error'
                    },
                    RESEND_CONFIRMATION: {
                        TITLE: 'page.auth.dialog.resend-confirmation.title',
                        MESSAGE: 'page.auth.dialog.resend-confirmation.message',
                        ERROR: 'page.auth.dialog.resend-confirmation.error'
                    }
                },
                CONFIRM: {
                    SUBMITTED_MESSAGE: 'page.auth.confirm.submitted-message',
                    ERROR_MESSAGE: 'page.auth.confirm.error-message'
                },
                RESET_PASSWORD: {
                    SUBMITTED_MESSAGE: 'page.auth.reset-password.submitted-message',
                    TITLE: 'page.auth.reset-password.title'
                },
                SIGN_IN: {
                    TITLE: 'page.auth.sign-in.title',
                    SUBTITLE: 'page.auth.sign-in.subtitle',
                    SUBTITLE_LINK: 'page.auth.sign-in.subtitle-link',
                    FORM: {
                        LINK: 'page.auth.sign-in.form.link',
                        SUBMIT: 'page.auth.sign-in.form.submit',
                    }
                },
                SIGN_UP: {
                    TITLE: 'page.auth.sign-up.title',
                    SUBTITLE: 'page.auth.sign-up.subtitle',
                    SUBTITLE_LINK: 'page.auth.sign-up.subtitle-link',
                    FORM: {
                        SUBMIT: 'page.auth.sign-up.form.submit'
                    }
                },
                USER_ACCOUNT: {
                    TITLE: 'page.auth.user-account.title',
                    USERNAME: 'page.auth.user-account.username',
                    PASSWORD: 'page.auth.user-account.password',
                    EMAIL: 'page.auth.user-account.email',
                    TITLE_BEFORE: 'page.auth.user-account.title-before',
                    FIRST_NAME: 'page.auth.user-account.first-name',
                    MID_NAME: 'page.auth.user-account.mid-name',
                    LAST_NAME: 'page.auth.user-account.last-name',
                    TITLE_AFTER: 'page.auth.user-account.title-after',
                    GDPR: 'page.auth.user-account.gdpr',
                    CONFIRMATION_WARNING: 'page.auth.user-account.confirmation-warning',
                    SEND_CONFIRMATION: 'page.auth.user-account.send-confirmation'
                }
            },
            CONFIG: {
                DIALOG: {
                    ADD_APPLICATION_IMAGE: {
                        TITLE: 'page.config.dialog.add-application-image.title',
                        FORM: {
                            APPLICATION_IMAGE: {
                                LABEL: 'page.config.dialog.add-application-image.form.application-image.label',
                                VALIDATION_MESSAGE1: 'page.config.dialog.add-application-image.form.application-image.validation-message1',
                                VALIDATION_MESSAGE2: 'page.config.dialog.add-application-image.form.application-image.validation-message2'
                            }
                        },
                        ERROR: 'page.config.dialog.add-application-image.error'
                    },
                    APPLICATION_IMAGE_DETAILS: {
                        TITLE: 'page.config.dialog.application-image-details.title'
                    },
                    CHANGE_COMPANY_INFO: {
                        TITLE: 'page.config.dialog.change-company-info.title',
                        FORM: {
                            NAME: {
                                LABEL: 'page.config.dialog.change-company-info.form.name.label',
                                VALIDATION_MESSAGE: 'page.config.dialog.change-company-info.form.name.validation-message'
                            },
                            STREET: {
                                LABEL: 'page.config.dialog.change-company-info.form.street.label',
                                VALIDATION_MESSAGE: 'page.config.dialog.change-company-info.form.street.validation-message'
                            },
                            CITY: {
                                LABEL: 'page.config.dialog.change-company-info.form.city.label',
                                VALIDATION_MESSAGE: 'page.config.dialog.change-company-info.form.city.validation-message'
                            },
                            ZIP_CODE: {
                                LABEL: 'page.config.dialog.change-company-info.form.zip-code.label',
                                VALIDATION_MESSAGE: 'page.config.dialog.change-company-info.form.zip-code.validation-message'
                            },
                            STATE: {
                                LABEL: 'page.config.dialog.change-company-info.form.state.label',
                                VALIDATION_MESSAGE: 'page.config.dialog.change-company-info.form.state.validation-message'
                            },
                            PHONE: {
                                LABEL: 'page.config.dialog.change-company-info.form.phone.label',
                                VALIDATION_MESSAGE: 'page.config.dialog.change-company-info.form.phone.validation-message'
                            },
                            MAIL: {
                                LABEL: 'page.config.dialog.change-company-info.form.mail.label',
                                VALIDATION_MESSAGE_1: 'page.config.dialog.change-company-info.form.mail.validation-message1',
                                VALIDATION_MESSAGE_2: 'page.config.dialog.change-company-info.form.mail.validation-message2'
                            },
                            BUSINESS_ID: {
                                LABEL: 'page.config.dialog.change-company-info.form.business-id.label'
                            },
                            TAX_ID: {
                                LABEL: 'page.config.dialog.change-company-info.form.tax-id.label'
                            },
                            VAT_REG_NO: {
                                LABEL: 'page.config.dialog.change-company-info.form.vag-reg-no.label'
                            },
                            COMMERCIAL_REGISTER_INFO: {
                                LABEL: 'page.config.dialog.change-company-info.form.commercial-register-info.label'
                            },
                            MAP_URL: {
                                LABEL: 'page.config.dialog.change-company-info.form.map-url.label',
                                VALIDATION_MESSAGE: 'page.config.dialog.change-company-info.form.map-url.validation-message'
                            }
                        },
                        ERROR: 'page.config.dialog.change-company-info.error'
                    },
                    CHANGE_COOKIES_INFO: {
                        TITLE: 'page.config.dialog.change-cookies-info.title',
                        ERROR: 'page.config.dialog.change-cookies-info.error'
                    },
                    CHANGE_GDPR_INFO: {
                        TITLE: 'page.config.dialog.change-gdpr-info.title',
                        ERROR: 'page.config.dialog.change-gdpr-info.error'
                    },
                    CHANGE_LOGO: {
                        TITLE: 'page.config.dialog.change-logo.title',
                        FORM: {
                            LOGO: {
                                LABEL: 'page.config.dialog.change-logo.form.logo.label',
                                VALIDATION_MESSAGE1: 'page.config.dialog.change-logo.form.logo.validation-message1',
                                VALIDATION_MESSAGE2: 'page.config.dialog.change-logo.form.logo.validation-message2'
                            }
                        },
                        ERROR: 'page.config.dialog.change-logo.error'
                    },
                    CHANGE_TITLE: {
                        TITLE: 'page.config.dialog.change-title.title',
                        ERROR: 'page.config.dialog.change-title.error'
                    },
                    CHANGE_WELCOME_TEXT: {
                        TITLE: 'page.config.dialog.change-welcome-text.title',
                        ERROR: 'page.config.dialog.change-welcome-text.error'
                    },
                    CHANGE_WORKING_HOURS: {
                        TITLE: 'page.config.dialog.change-working-hours.title',
                        ERROR: 'page.config.dialog.change-working-hours.error'
                    },
                    EDIT_APPLICATION_INFO_ITEM: {
                        TITLE: 'page.config.dialog.edit-application-info-item.title',
                        ITEM_TITLE: 'page.config.dialog.edit-application-info-item.item-title',
                        ITEM_TEXT: 'page.config.dialog.edit-application-info-item.item-text',
                        ITEM_FILE_NAME: 'page.config.dialog.edit-application-info-item.item-file-name'
                    },
                    SELECT_APPLICATION_IMAGE: {
                        TITLE: 'page.config.dialog.select-application-image.title'
                    }
                },
                APPLICATION_IMAGES: {
                    TITLE: 'page.config.application-images.title',
                    DELETE_CONFIRMATION_QUESTION: 'page.config.application-images.delete-confirmation-question'
                },
                COMPANY_INFO: {
                    TITLE: 'page.config.company-info.title',
                    NAME: 'page.config.company-info.name',
                    STREET: 'page.config.company-info.street',
                    CITY: 'page.config.company-info.city',
                    ZIP_CODE: 'page.config.company-info.zip-code',
                    STATE: 'page.config.company-info.state',
                    PHONE: 'page.config.company-info.phone',
                    MAIL: 'page.config.company-info.mail',
                    BUSINESS_ID: 'page.config.company-info.business-id',
                    TAX_ID: 'page.config.company-info.tax-id',
                    VAT_REG_NO: 'page.config.company-info.vat-reg-no',
                    COMMERCIAL_REGISTER_INFO: 'page.config.company-info.commercial-register-info',
                    MAP_URL: 'page.config.company-info.map-url'
                },
                COOKIES_INFO: {
                    TITLE: 'page.config.cookies-info.title'
                },
                GDPR_INFO: {
                    TITLE: 'page.config.gdpr-info.title'
                },
                UI: {
                    TITLE: 'page.config.ui.title',
                    LOGO: 'page.config.ui.logo',
                    DELETE_APPLICATION_INFO_ITEM_CONFIRMATION_QUESTION: 'page.config.ui.delete-application-info-item-confirmation-question'
                },
                WORKING_HOURS: {
                    TITLE: 'page.config.working-hours.title'
                }
            },
            UI: {
                CONTACT_INFO: {
                    BUSINESS_ID: 'page.ui.contact-info.business-id',
                    TAX_ID: 'page.ui.contact-info.tax-id',
                    VAT_REG_NO: 'page.ui.contact-info.vat-reg-no'
                }
            },
            USERS: {
                DIALOG: {
                    ADD_USER: {
                        TITLE: 'page.users.dialog.add-user.title',
                        FORM: {
                            CONFIRMED: {
                                LABEL: 'page.users.dialog.add-user.form.confirmed.label'
                            },
                            ENABLED: {
                                LABEL: 'page.users.dialog.add-user.form.enabled.label'
                            }
                        },
                        ERROR: 'page.users.dialog.add-user.error'
                    },
                    EDIT_AUTHORITIES: {
                        TITLE: 'page.users.dialog.edit-authorities.title',
                        FORM: {
                            CUSTOMER: {
                                LABEL: 'page.users.dialog.edit-authorities.form.customer.label'
                            },
                            EMPLOYEE: {
                                LABEL: 'page.users.dialog.edit-authorities.form.employee.label'
                            },
                            MANAGER: {
                                LABEL: 'page.users.dialog.edit-authorities.form.manager.label'
                            },
                            ADMIN: {
                                LABEL: 'page.users.dialog.edit-authorities.form.admin.label'
                            }
                        }
                    },
                    EDIT_USER: {
                        TITLE: 'page.users.dialog.edit-user.title',
                        ERROR: 'page.users.dialog.edit-user.error'
                    }
                },
                USERS: {
                    TITLE: 'page.users.users.title',
                    DELETE_USER_CONFIRMATION_QUESTION: 'page.users.users.user-confirmation-question'
                }
            }
        }
    }
;

const resources = {
    en_US: {
        translation: en_US
    },
    sk_SK: {
        translation: sk_SK
    }
};

export const getLocale = () => {
    const locale = localStorage.getItem(LOCALE_ITEM);
    return locale ? locale : 'en_US';
}

i18n
    .use(initReactI18next)
    .init({
        debug: true,
        lng: getLocale(),
        fallbackLng: LOCALE.EN,
        interpolation: {
            escapeValue: false,
        },
        resources
    });

export default i18n;
