import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en_US from './en_US/translation.json';
import sk_SK from './sk_SK/translation.json';

export const LOCALE_ITEM = 'LOCALE';

export const LOCALE = {
    EN: 'en_US',
    SK: 'sk_SK'
};

export const RESOURCE = {
    CONNECTING: 'connecting',
    TITLE: 'title',
    PAGE_NOT_FOUND: 'page-not-found',
    UNKNOWN_ERROR: 'unknown-error',
    ACTION: {
        CANCEL: 'action.cancel',
        CHANGE_PASSWORD: 'action.change-password',
        CHANGE_EMAIL: 'action.change-email',
        CHANGE_USER_DETAILS: 'action.change-user-details',
        CONFIG: 'action.config',
        EDIT: 'action.edit',
        HOME: 'action.home',
        OK: 'action.ok',
        RESEND: 'action.resend',
        SAVE: 'action.save',
        SWITCH_LOCALE: 'action.switch-locale',
        SIGN_IN: 'action.sign-in',
        SIGN_OUT: 'action.sign-out',
        SIGN_UP: 'action.sign-up',
        USER_ACCOUNT: 'action.user-account',
        USERS: 'action.users',
        YES: 'action.yes'
    },
    COMPONENT: {
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
        PAGE: {
            AUTH: {
                DIALOG: {
                    CHANGE_EMAIL: {
                        TITLE: 'component.page.auth.dialog.change-email.title',
                        FORM: {
                            EMAIL: {
                                LABEL: 'component.page.auth.dialog.change-email.form.email.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-email.form.email.placeholder',
                                VALIDATION_MESSAGE_1: 'component.page.auth.dialog.change-email.form.email.validation-message-1',
                                VALIDATION_MESSAGE_2: 'component.page.auth.dialog.change-email.form.email.validation-message-2'
                            },
                            PASSWORD: {
                                LABEL: 'component.page.auth.dialog.change-email.form.password.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-email.form.password.placeholder',
                                VALIDATION_MESSAGE: 'component.page.auth.dialog.change-email.form.password.validation-message'
                            }
                        },
                        MESSAGE: 'component.page.auth.dialog.change-email.message',
                        ERROR: 'component.page.auth.dialog.change-email.error'
                    },
                    CHANGE_PASSWORD: {
                        TITLE: 'component.page.auth.dialog.change-password.title',
                        FORM: {
                            ACTUAL_PASSWORD: {
                                LABEL: 'component.page.auth.dialog.change-password.form.actual-password.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-password.form.actual-password.placeholder',
                                VALIDATION_MESSAGE: 'component.page.auth.dialog.change-password.form.actual-password.validation-message'
                            }
                        },
                        MESSAGE: 'component.page.auth.dialog.change-password.message',
                        ERROR: 'component.page.auth.dialog.change-password.error'
                    },
                    CHANGE_USER_DETAILS: {
                        TITLE: 'component.page.auth.dialog.change-user-details.title',
                        FORM: {
                            TITLE_BEFORE: {
                                LABEL: 'component.page.auth.dialog.change-user-details.form.title-before.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-user-details.form.title-before.placeholder',
                                VALIDATION_MESSAGE: 'component.page.auth.dialog.change-user-details.form.title-before.validation-message'
                            },
                            TITLE_AFTER: {
                                LABEL: 'component.page.auth.dialog.change-user-details.form.title-after.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-user-details.form.title-after.placeholder',
                                VALIDATION_MESSAGE: 'component.page.auth.dialog.change-user-details.form.title-after.validation-message'
                            },
                            FIRST_NAME: {
                                LABEL: 'component.page.auth.dialog.change-user-details.form.first-name.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-user-details.form.first-name.placeholder',
                                VALIDATION_MESSAGE: 'component.page.auth.dialog.change-user-details.form.first-name.validation-message'
                            },
                            MID_NAME: {
                                LABEL: 'component.page.auth.dialog.change-user-details.form.mid-name.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-user-details.form.mid-name.placeholder'
                            },
                            LAST_NAME: {
                                LABEL: 'component.page.auth.dialog.change-user-details.form.last-name.label',
                                PLACEHOLDER: 'component.page.auth.dialog.change-user-details.form.last-name.placeholder',
                                VALIDATION_MESSAGE: 'component.page.auth.dialog.change-user-details.form.last-name.validation-message'
                            },
                            GDPR: {
                                LABEL: 'component.page.auth.dialog.change-user-details.form.gdpr.label',
                                LINK: 'component.page.auth.dialog.change-user-details.form.gdpr.link',
                                VALIDATION_MESSAGE: 'component.page.auth.dialog.change-user-details.form.gdpr.validation-message'
                            }
                        },
                        MESSAGE: 'component.page.auth.dialog.change-user-details.message',
                        ERROR: 'component.page.auth.dialog.change-user-details.error'
                    },
                    RESEND_CONFIRMATION: {
                        TITLE: 'component.page.auth.dialog.resend-confirmation.title',
                        MESSAGE: 'component.page.auth.dialog.resend-confirmation.message',
                        ERROR: 'component.page.auth.dialog.resend-confirmation.error'
                    }
                },
                CONFIRM: {
                    SUBMITTED_MESSAGE: 'component.page.auth.confirm.submitted-message',
                    ERROR_MESSAGE: 'component.page.auth.confirm.error-message'
                },
                RESET_PASSWORD: {
                    SUBMITTED_MESSAGE: 'component.page.auth.reset-password.submitted-message',
                    TITLE: 'component.page.auth.reset-password.title',
                    FORM: {
                        EMAIL: {
                            LABEL: 'component.page.auth.reset-password.form.email.label',
                            PLACEHOLDER: 'component.page.auth.reset-password.form.email.placeholder',
                            VALIDATION_MESSAGE_1: 'component.page.auth.reset-password.form.email.validation-message-1',
                            VALIDATION_MESSAGE_2: 'component.page.auth.reset-password.form.email.validation-message-2'
                        }
                    }
                },
                SIGN_IN: {
                    TITLE: 'component.page.auth.sign-in.title',
                    SUBTITLE: 'component.page.auth.sign-in.subtitle',
                    SUBTITLE_LINK: 'component.page.auth.sign-in.subtitle-link',
                    FORM: {
                        USERNAME: {
                            LABEL: 'component.page.auth.sign-in.form.username.label',
                            PLACEHOLDER: 'component.page.auth.sign-in.form.username.placeholder',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-in.form.username.validation-message'
                        },
                        PASSWORD: {
                            LABEL: 'component.page.auth.sign-in.form.password.label',
                            PLACEHOLDER: 'component.page.auth.sign-in.form.password.placeholder',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-in.form.password.validation-message'
                        },
                        LINK: 'component.page.auth.sign-in.form.link',
                        SUBMIT: 'component.page.auth.sign-in.form.submit',
                    }
                },
                SIGN_UP: {
                    TITLE: 'component.page.auth.sign-up.title',
                    SUBTITLE: 'component.page.auth.sign-up.subtitle',
                    SUBTITLE_LINK: 'component.page.auth.sign-up.subtitle-link',
                    FORM: {
                        USERNAME: {
                            LABEL: 'component.page.auth.sign-up.form.username.label',
                            PLACEHOLDER: 'component.page.auth.sign-up.form.username.placeholder',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-up.form.username.validation-message'
                        },
                        EMAIL: {
                            LABEL: 'component.page.auth.sign-up.form.email.label',
                            PLACEHOLDER: 'component.page.auth.sign-up.form.email.placeholder',
                            VALIDATION_MESSAGE1: 'component.page.auth.sign-up.form.email.validation-message1',
                            VALIDATION_MESSAGE2: 'component.page.auth.sign-up.form.email.validation-message2'
                        },
                        TITLE_BEFORE: {
                            LABEL: 'component.page.auth.sign-up.form.title-before.label',
                            PLACEHOLDER: 'component.page.auth.sign-up.form.title-before.placeholder',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-up.form.title-before.validation-message'
                        },
                        TITLE_AFTER: {
                            LABEL: 'component.page.auth.sign-up.form.title-after.label',
                            PLACEHOLDER: 'component.page.auth.sign-up.form.title-after.placeholder',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-up.form.title-after.validation-message'
                        },
                        FIRST_NAME: {
                            LABEL: 'component.page.auth.sign-up.form.first-name.label',
                            PLACEHOLDER: 'component.page.auth.sign-up.form.first-name.placeholder',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-up.form.first-name.validation-message'
                        },
                        MID_NAME: {
                            LABEL: 'component.page.auth.sign-up.form.mid-name.label',
                            PLACEHOLDER: 'component.page.auth.sign-up.form.mid-name.placeholder'
                        },
                        LAST_NAME: {
                            LABEL: 'component.page.auth.sign-up.form.last-name.label',
                            PLACEHOLDER: 'component.page.auth.sign-up.form.last-name.placeholder',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-up.form.last-name.validation-message'
                        },
                        GDPR: {
                            LABEL: 'component.page.auth.sign-up.form.gdpr.label',
                            LINK: 'component.page.auth.sign-up.form.gdpr.link',
                            VALIDATION_MESSAGE: 'component.page.auth.sign-up.form.gdpr.validation-message'
                        },
                        SUBMIT: 'component.page.auth.sign-up.form.submit'
                    }
                },
                USER_ACCOUNT: {
                    TITLE: 'component.page.auth.user-account.title',
                    USERNAME: 'component.page.auth.user-account.username',
                    PASSWORD: 'component.page.auth.user-account.password',
                    EMAIL: 'component.page.auth.user-account.email',
                    TITLE_BEFORE: 'component.page.auth.user-account.title-before',
                    FIRST_NAME: 'component.page.auth.user-account.first-name',
                    MID_NAME: 'component.page.auth.user-account.mid-name',
                    LAST_NAME: 'component.page.auth.user-account.last-name',
                    TITLE_AFTER: 'component.page.auth.user-account.title-after',
                    GDPR: 'component.page.auth.user-account.gdpr',
                    CONFIRMATION_WARNING: 'component.page.auth.user-account.confirmation-warning',
                    SEND_CONFIRMATION: 'component.page.auth.user-account.send-confirmation'
                }
            },
            CONFIG: {
                DIALOG: {
                    CHANGE_LOGO: {
                        TITLE: 'component.page.config.dialog.change-logo.title',
                        FORM: {
                            LOGO: {
                                LABEL: 'component.page.config.dialog.change-logo.form.logo.label',
                                VALIDATION_MESSAGE1: 'component.page.config.dialog.change-logo.form.logo.validation-message1',
                                VALIDATION_MESSAGE2: 'component.page.config.dialog.change-logo.form.logo.validation-message2'
                            }
                        },
                        ERROR: 'component.page.config.dialog.change-logo.error'
                    }
                },
                APPLICATION_IMAGES: {
                    TITLE: 'component.page.config.application-images.title'
                },
                UI: {
                    TITLE: 'component.page.config.ui.title',
                    LOGO: 'component.page.config.ui.logo'
                }
            },
            UI: {
                CONTACT_INFO: {
                    BUSINESS_ID: 'component.page.ui.contact-info.business-id',
                    TAX_ID: 'component.page.ui.contact-info.tax-id',
                    VAT_REG_NO: 'component.page.ui.contact-info.vat-reg-no'
                }
            },
            USERS: {
                USERS: {
                    TITLE: 'component.page.users.users.title'
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
        }
    },
    ERROR: {
        GDPR: 'error.gdpr',
        INVALID_CAPTCHA: 'error.invalid-captcha',
        INVALID_CREDENTIALS: 'error.invalid-credentials',
        USER_EMAIL_IS_USED: 'error.user-email-is-used',
        USER_IS_DISABLED: 'error.user-is-disabled',
        USER_NOT_FOUND: 'error.user-not-found',
        USER_USERNAME_IS_USED: 'error.user-username-is-used'
    }
};

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
