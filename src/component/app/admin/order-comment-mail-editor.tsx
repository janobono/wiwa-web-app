import { useEffect, useState } from 'react';

import { getOrderCommentMail, setOrderCommentMail } from '../../../api/controller/config';
import { OrderCommentMail } from '../../../api/model/application';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormInputString from '../../ui/wiwa-form-input-string';
import { useAuthState } from '../../../state/auth';
import { useErrorState } from '../../../state/error';
import { useResourceState } from '../../../state/resource';

const OrderCommentMailEditor = () => {
    const authState = useAuthState();
    const errorState = useErrorState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<OrderCommentMail>();

    const [subject, setSubject] = useState('');
    const [subjectValid, setSubjectValid] = useState(false);

    const [title, setTitle] = useState('');
    const [titleValid, setTitleValid] = useState(false);

    const [message, setMessage] = useState('');
    const [messageValid, setMessageValid] = useState(false);

    const [link, setLink] = useState('');
    const [linkValid, setLinkValid] = useState(false);

    useEffect(() => {
        getOrderCommentMail(authState?.authToken?.accessToken).then(data => setValue(data.data));
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
        }
    }, [value]);

    const isFormValid = (): boolean => {
        return subjectValid && titleValid && messageValid && linkValid;
    }

    const submit = async () => {
        setBusy(true);
        try {
            if (isFormValid()) {
                const response = await setOrderCommentMail({
                        subject,
                        title,
                        message,
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
                    label={resourceState?.admin?.mailFormat.orderComment.subjectLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderComment.subjectPlaceholder}
                    value={subject}
                    setValue={setSubject}
                    setValid={setSubjectValid}
                    validate={() => {
                        if (subject.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderComment.subjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={resourceState?.admin?.mailFormat.orderComment.titleLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderComment.titlePlaceholder}
                    value={title}
                    setValue={setTitle}
                    setValid={setTitleValid}
                    validate={() => {
                        if (title.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderComment.titleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={resourceState?.admin?.mailFormat.orderComment.messageLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderComment.messagePlaceholder}
                    value={message}
                    setValue={setMessage}
                    setValid={setMessageValid}
                    validate={() => {
                        if (message.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderComment.messageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={resourceState?.admin?.mailFormat.orderComment.linkLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderComment.linkPlaceholder}
                    value={link}
                    setValue={setLink}
                    setValid={setLinkValid}
                    validate={() => {
                        if (link.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderComment.linkRequired
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

export default OrderCommentMailEditor;
