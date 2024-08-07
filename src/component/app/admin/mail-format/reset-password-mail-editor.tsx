import { useContext, useEffect, useState } from 'react';

import { getResetPasswordMail, setResetPasswordMail } from '../../../../api/controller/config';
import { ResetPasswordMail } from '../../../../api/model/application';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import { AdminResourceContext, AuthContext, CommonResourceContext, ErrorContext } from '../../../../context';

const ResetPasswordMailEditor = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<ResetPasswordMail>();

    const [subject, setSubject] = useState('');
    const [subjectValid, setSubjectValid] = useState(false);

    const [title, setTitle] = useState('');
    const [titleValid, setTitleValid] = useState(false);

    const [message, setMessage] = useState('');
    const [messageValid, setMessageValid] = useState(false);

    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordMessageValid, setPasswordMessageValid] = useState(false);

    const [link, setLink] = useState('');
    const [linkValid, setLinkValid] = useState(false);

    useEffect(() => {
        getResetPasswordMail(authState?.authToken?.accessToken).then(data => setValue(data.data));
    }, []);

    useEffect(() => {
        if (value) {
            setSubject(value.subject);
            setSubjectValid(true);

            setTitle(value.title);
            setTitleValid(true);

            setMessage(value.message);
            setMessageValid(true);

            setPasswordMessage(value.passwordMessage);
            setPasswordMessageValid(true);

            setLink(value.link);
            setLinkValid(true);
        }
    }, [value]);

    const isFormValid = (): boolean => {
        return subjectValid && titleValid && messageValid && passwordMessageValid && linkValid;
    }

    const submit = async () => {
        setBusy(true);
        try {
            if (isFormValid()) {
                const response = await setResetPasswordMail({
                        subject,
                        title,
                        message,
                        passwordMessage,
                        link
                    },
                    authState?.authToken?.accessToken
                );
                if (response.data) {
                    setValue(response.data);
                }
                errorState?.addError(response?.error);
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex flex-col p-5 gap-5 w-full">
            <div className="flex flex-col items-center justify-center">
                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.resetPassword.subjectLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.resetPassword.subjectPlaceholder}
                    value={subject}
                    setValue={setSubject}
                    setValid={setSubjectValid}
                    validate={() => {
                        if (subject.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.resetPassword.subjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.resetPassword.titleLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.resetPassword.titlePlaceholder}
                    value={title}
                    setValue={setTitle}
                    setValid={setTitleValid}
                    validate={() => {
                        if (title.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.resetPassword.titleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.resetPassword.messageLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.resetPassword.messagePlaceholder}
                    value={message}
                    setValue={setMessage}
                    setValid={setMessageValid}
                    validate={() => {
                        if (message.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.resetPassword.messageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.resetPassword.passwordMessageLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.resetPassword.passwordMessagePlaceholder}
                    value={passwordMessage}
                    setValue={setPasswordMessage}
                    setValid={setPasswordMessageValid}
                    validate={() => {
                        if (passwordMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.resetPassword.passwordMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.resetPassword.linkLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.resetPassword.linkPlaceholder}
                    value={link}
                    setValue={setLink}
                    setValid={setLinkValid}
                    validate={() => {
                        if (link.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.resetPassword.linkRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <div className="join pt-5">
                    <WiwaButton
                        className="btn-primary join-item"
                        disabled={busy || !isFormValid()}
                        onClick={submit}
                    >{commonResourceState?.resource?.action.submit}
                    </WiwaButton>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordMailEditor;
