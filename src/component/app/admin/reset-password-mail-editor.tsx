import { useEffect, useState } from 'react';

import { getResetPasswordMail, setResetPasswordMail } from '../../../api/controller/config';
import { ResetPasswordMail } from '../../../api/model/application';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormInput from '../../ui/wiwa-form-input';
import { useAuthState } from '../../../state/auth';
import { useResourceState } from '../../../state/resource';

const ResetPasswordMailEditor = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

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

    const [formError, setFormError] = useState<string>();

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
        setFormError(undefined);
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
                if (response?.error) {
                    setFormError(resourceState?.admin?.mailFormat.resetPassword.error);
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
                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.resetPassword.subjectLabel}
                    placeholder={resourceState?.admin?.mailFormat.resetPassword.subjectPlaceholder}
                    value={subject}
                    setValue={setSubject}
                    setValid={setSubjectValid}
                    validate={() => {
                        if (subject.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.resetPassword.subjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.resetPassword.titleLabel}
                    placeholder={resourceState?.admin?.mailFormat.resetPassword.titlePlaceholder}
                    value={title}
                    setValue={setTitle}
                    setValid={setTitleValid}
                    validate={() => {
                        if (title.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.resetPassword.titleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.resetPassword.messageLabel}
                    placeholder={resourceState?.admin?.mailFormat.resetPassword.messagePlaceholder}
                    value={message}
                    setValue={setMessage}
                    setValid={setMessageValid}
                    validate={() => {
                        if (message.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.resetPassword.messageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.resetPassword.passwordMessageLabel}
                    placeholder={resourceState?.admin?.mailFormat.resetPassword.passwordMessagePlaceholder}
                    value={passwordMessage}
                    setValue={setPasswordMessage}
                    setValid={setPasswordMessageValid}
                    validate={() => {
                        if (passwordMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.resetPassword.passwordMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.resetPassword.linkLabel}
                    placeholder={resourceState?.admin?.mailFormat.resetPassword.linkPlaceholder}
                    value={link}
                    setValue={setLink}
                    setValid={setLinkValid}
                    validate={() => {
                        if (link.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.resetPassword.linkRequired
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

export default ResetPasswordMailEditor;
