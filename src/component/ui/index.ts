import React, { PropsWithChildren } from 'react';
import { LocaleData } from '../../client/model';

export { default as WiwaButton } from './wiwa-button';
export { default as WiwaCaptcha } from './wiwa-captcha';
export { default as WiwaCheckBox } from './wiwa-check-box';
export { default as WiwaFileInput } from './wiwa-file-input';
export { default as WiwaFormInput, EMAIL_REGEX } from './wiwa-form-input';
export { default as WiwaInput } from './wiwa-input';
export { default as WiwaLabel } from './wiwa-label';
export { default as WiwaLink } from './wiwa-link';
export { default as WiwaLocaleDataArea } from './wiwa-locale-data-area';
export { default as WiwaLocaleDataInput } from './wiwa-locale-data-input';
export { default as WiwaMarkdownRenderer } from './wiwa-markdown-renderer';
export { default as WiwaNavButton } from './wiwa-nav-button';
export { default as WiwaNavLink } from './wiwa-nav-link';
export { default as WiwaNewPassword } from './wiwa-new-password';
export { default as WiwaPageable } from './wiwa-pageable';
export { default as WiwaSpinner } from './wiwa-spinner';
export { default as WiwaTabs } from './wiwa-tabs';
export { default as WiwaTextArea } from './wiwa-textarea';

export interface ValidationResult {
    valid: boolean,
    message?: string
}

export interface WiwaLocaleComponentProps extends PropsWithChildren {
    name: string,
    language: string,
    data: LocaleData<string>,
    setData: React.Dispatch<React.SetStateAction<LocaleData<string>>>
}
