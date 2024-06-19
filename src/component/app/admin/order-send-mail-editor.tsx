import { useEffect, useState } from 'react';

import { getOrderSendMail, setOrderSendMail } from '../../../api/controller/config';
import { OrderSendMail } from '../../../api/model/application';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormInput from '../../ui/wiwa-form-input';
import { useAuthState } from '../../../state/auth';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const OrderSendMailEditor = () => {
    const authState = useAuthState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<OrderSendMail>();

    const [subject, setSubject] = useState('');
    const [subjectValid, setSubjectValid] = useState(false);

    const [title, setTitle] = useState('');
    const [titleValid, setTitleValid] = useState(false);

    const [message, setMessage] = useState('');
    const [messageValid, setMessageValid] = useState(false);

    const [link, setLink] = useState('');
    const [linkValid, setLinkValid] = useState(false);

    const [attachment, setAttachment] = useState('');
    const [attachmentValid, setAttachmentValid] = useState(false);

    useEffect(() => {
        getOrderSendMail(authState?.authToken?.accessToken).then(data => setValue(data.data));
    }, []);

    useEffect(() => {
        if (value) {
            setSubject(value.subject);
            setSubjectValid(true);

            setTitle(value.title);
            setTitleValid(true);

            setMessage(value.message);
            setMessageValid(true);

            setLink(value.link);
            setLinkValid(true);

            setAttachment(value.attachment);
            setAttachmentValid(true);
        }
    }, [value]);

    const isFormValid = (): boolean => {
        return subjectValid && titleValid && messageValid && linkValid && attachmentValid;
    }

    const submit = async () => {
        setBusy(true);
        try {
            if (isFormValid()) {
                const response = await setOrderSendMail({
                        subject,
                        title,
                        message,
                        link,
                        attachment
                    },
                    authState?.authToken?.accessToken
                );
                if (response?.error) {
                    errorState?.addError(response?.error);
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
                    label={resourceState?.admin?.mailFormat.orderSend.subjectLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderSend.subjectPlaceholder}
                    value={subject}
                    setValue={setSubject}
                    setValid={setSubjectValid}
                    validate={() => {
                        if (subject.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderSend.subjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderSend.titleLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderSend.titlePlaceholder}
                    value={title}
                    setValue={setTitle}
                    setValid={setTitleValid}
                    validate={() => {
                        if (title.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderSend.titleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderSend.messageLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderSend.messagePlaceholder}
                    value={message}
                    setValue={setMessage}
                    setValid={setMessageValid}
                    validate={() => {
                        if (message.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderSend.messageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderSend.linkLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderSend.linkPlaceholder}
                    value={link}
                    setValue={setLink}
                    setValid={setLinkValid}
                    validate={() => {
                        if (link.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderSend.linkRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderSend.attachmentLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderSend.attachmentPlaceholder}
                    value={attachment}
                    setValue={setAttachment}
                    setValid={setAttachmentValid}
                    validate={() => {
                        if (attachment.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderSend.attachmentRequired
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
            </div>
        </div>
    )
}

export default OrderSendMailEditor;
