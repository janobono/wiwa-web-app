import { useEffect, useState } from 'react';

import { getOrderStatusMail, setOrderStatusMail } from '../../../api/controller/config';
import { OrderStatusMail } from '../../../api/model/application';
import WiwaButton from '../../ui/wiwa-button';
import WiwaFormInput from '../../ui/wiwa-form-input';
import { useAuthState } from '../../../state/auth';
import { useResourceState } from '../../../state/resource';

const OrderStatusMailEditor = () => {
    const authState = useAuthState();
    const resourceState = useResourceState();

    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<OrderStatusMail>();

    const [productionSubject, setProductionSubject] = useState('');
    const [productionSubjectValid, setProductionSubjectValid] = useState(false);

    const [productionTitle, setProductionTitle] = useState('');
    const [productionTitleValid, setProductionTitleValid] = useState(false);

    const [productionMessage, setProductionMessage] = useState('');
    const [productionMessageValid, setProductionMessageValid] = useState(false);

    const [readySubject, setReadySubject] = useState('');
    const [readySubjectValid, setReadySubjectValid] = useState(false);

    const [readyTitle, setReadyTitle] = useState('');
    const [readyTitleValid, setReadyTitleValid] = useState(false);

    const [readyMessage, setReadyMessage] = useState('');
    const [readyMessageValid, setReadyMessageValid] = useState(false);

    const [finishedSubject, setFinishedSubject] = useState('');
    const [finishedSubjectValid, setFinishedSubjectValid] = useState(false);

    const [finishedTitle, setFinishedTitle] = useState('');
    const [finishedTitleValid, setFinishedTitleValid] = useState(false);

    const [finishedMessage, setFinishedMessage] = useState('');
    const [finishedMessageValid, setFinishedMessageValid] = useState(false);

    const [cancelledSubject, setCancelledSubject] = useState('');
    const [cancelledSubjectValid, setCancelledSubjectValid] = useState(false);

    const [cancelledTitle, setCancelledTitle] = useState('');
    const [cancelledTitleValid, setCancelledTitleValid] = useState(false);

    const [cancelledMessage, setCancelledMessage] = useState('');
    const [cancelledMessageValid, setCancelledMessageValid] = useState(false);

    const [link, setLink] = useState('');
    const [linkValid, setLinkValid] = useState(false);

    const [attachment, setAttachment] = useState('');
    const [attachmentValid, setAttachmentValid] = useState(false);

    const [formError, setFormError] = useState<string>();

    useEffect(() => {
        getOrderStatusMail(authState?.authToken?.accessToken).then(data => setValue(data.data));
    }, []);

    useEffect(() => {
        if (value) {
            setProductionSubject(value.productionSubject);
            setProductionSubjectValid(true);

            setProductionTitle(value.productionTitle);
            setProductionTitleValid(true);

            setProductionMessage(value.productionMessage);
            setProductionMessageValid(true);

            setReadySubject(value.readySubject);
            setReadySubjectValid(true);

            setReadyTitle(value.readyTitle);
            setReadyTitleValid(true);

            setReadyMessage(value.readyMessage);
            setReadyMessageValid(true);

            setFinishedSubject(value.finishedSubject);
            setFinishedSubjectValid(true);

            setFinishedTitle(value.finishedTitle);
            setFinishedTitleValid(true);

            setFinishedMessage(value.finishedMessage);
            setFinishedMessageValid(true);

            setCancelledSubject(value.cancelledSubject);
            setCancelledSubjectValid(true);

            setCancelledTitle(value.cancelledTitle);
            setCancelledTitleValid(true);

            setCancelledMessage(value.cancelledMessage);
            setCancelledMessageValid(true);

            setLink(value.link);
            setLinkValid(true);

            setAttachment(value.attachment);
            setAttachmentValid(true);
        }
    }, [value]);

    const isFormValid = (): boolean => {
        return productionSubjectValid && productionTitleValid && productionMessageValid
            && readySubjectValid && readyTitleValid && readyMessageValid
            && finishedSubjectValid && finishedTitleValid && finishedMessageValid
            && cancelledSubjectValid && cancelledTitleValid && cancelledMessageValid
            && linkValid && attachmentValid;
    }

    const submit = async () => {
        setBusy(true);
        setFormError(undefined);
        try {
            if (isFormValid()) {
                const response = await setOrderStatusMail({
                        productionSubject,
                        productionTitle,
                        productionMessage,
                        readySubject,
                        readyTitle,
                        readyMessage,
                        finishedSubject,
                        finishedTitle,
                        finishedMessage,
                        cancelledSubject,
                        cancelledTitle,
                        cancelledMessage,
                        link,
                        attachment
                    },
                    authState?.authToken?.accessToken
                );
                if (response?.error) {
                    setFormError(resourceState?.admin?.mailFormat.orderStatus.error);
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
                    label={resourceState?.admin?.mailFormat.orderStatus.productionSubjectLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.productionSubjectPlaceholder}
                    value={productionSubject}
                    setValue={setProductionSubject}
                    setValid={setProductionSubjectValid}
                    validate={() => {
                        if (productionSubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.productionSubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.productionTitleLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.productionTitlePlaceholder}
                    value={productionTitle}
                    setValue={setProductionTitle}
                    setValid={setProductionTitleValid}
                    validate={() => {
                        if (productionTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.productionTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.productionMessageLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.productionMessagePlaceholder}
                    value={productionMessage}
                    setValue={setProductionMessage}
                    setValid={setProductionMessageValid}
                    validate={() => {
                        if (productionMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.productionMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.readySubjectLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.readySubjectPlaceholder}
                    value={readySubject}
                    setValue={setReadySubject}
                    setValid={setReadySubjectValid}
                    validate={() => {
                        if (readySubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.readySubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.readyTitleLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.readyTitlePlaceholder}
                    value={readyTitle}
                    setValue={setReadyTitle}
                    setValid={setReadyTitleValid}
                    validate={() => {
                        if (readyTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.readyTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.readyMessageLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.readyMessagePlaceholder}
                    value={readyMessage}
                    setValue={setReadyMessage}
                    setValid={setReadyMessageValid}
                    validate={() => {
                        if (readyMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.readyMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.finishedSubjectLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.finishedSubjectPlaceholder}
                    value={finishedSubject}
                    setValue={setFinishedSubject}
                    setValid={setFinishedSubjectValid}
                    validate={() => {
                        if (finishedSubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.finishedSubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.finishedTitleLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.finishedTitlePlaceholder}
                    value={finishedTitle}
                    setValue={setFinishedTitle}
                    setValid={setFinishedTitleValid}
                    validate={() => {
                        if (finishedTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.finishedTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.finishedMessageLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.finishedMessagePlaceholder}
                    value={finishedMessage}
                    setValue={setFinishedMessage}
                    setValid={setFinishedMessageValid}
                    validate={() => {
                        if (finishedMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.finishedMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.cancelledSubjectLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.cancelledSubjectPlaceholder}
                    value={cancelledSubject}
                    setValue={setCancelledSubject}
                    setValid={setCancelledSubjectValid}
                    validate={() => {
                        if (cancelledSubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.cancelledSubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.cancelledTitleLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.cancelledTitlePlaceholder}
                    value={cancelledTitle}
                    setValue={setCancelledTitle}
                    setValid={setCancelledTitleValid}
                    validate={() => {
                        if (cancelledTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.cancelledTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.cancelledMessageLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.cancelledMessagePlaceholder}
                    value={cancelledMessage}
                    setValue={setCancelledMessage}
                    setValid={setCancelledMessageValid}
                    validate={() => {
                        if (cancelledMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.cancelledMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.linkLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.linkPlaceholder}
                    value={link}
                    setValue={setLink}
                    setValid={setLinkValid}
                    validate={() => {
                        if (link.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.linkRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInput
                    label={resourceState?.admin?.mailFormat.orderStatus.attachmentLabel}
                    placeholder={resourceState?.admin?.mailFormat.orderStatus.attachmentPlaceholder}
                    value={attachment}
                    setValue={setAttachment}
                    setValid={setAttachmentValid}
                    validate={() => {
                        if (attachment.trim().length === 0) {
                            return {
                                valid: false,
                                message: resourceState?.admin?.mailFormat.orderStatus.attachmentRequired
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

export default OrderStatusMailEditor;
