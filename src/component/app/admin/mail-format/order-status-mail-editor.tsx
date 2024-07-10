import { useContext, useEffect, useState } from 'react';

import { getOrderStatusMail, setOrderStatusMail } from '../../../../api/controller/config';
import { OrderStatusMail } from '../../../../api/model/application';
import WiwaButton from '../../../ui/wiwa-button';
import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import { AdminResourceContext, AuthContext, CommonResourceContext, ErrorContext } from '../../../../context';

const OrderStatusMailEditor = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

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
                    label={adminResourceState?.resource?.mailFormat.orderStatus.productionSubjectLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.productionSubjectPlaceholder}
                    value={productionSubject}
                    setValue={setProductionSubject}
                    setValid={setProductionSubjectValid}
                    validate={() => {
                        if (productionSubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.productionSubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.productionTitleLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.productionTitlePlaceholder}
                    value={productionTitle}
                    setValue={setProductionTitle}
                    setValid={setProductionTitleValid}
                    validate={() => {
                        if (productionTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.productionTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.productionMessageLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.productionMessagePlaceholder}
                    value={productionMessage}
                    setValue={setProductionMessage}
                    setValid={setProductionMessageValid}
                    validate={() => {
                        if (productionMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.productionMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.readySubjectLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.readySubjectPlaceholder}
                    value={readySubject}
                    setValue={setReadySubject}
                    setValid={setReadySubjectValid}
                    validate={() => {
                        if (readySubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.readySubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.readyTitleLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.readyTitlePlaceholder}
                    value={readyTitle}
                    setValue={setReadyTitle}
                    setValid={setReadyTitleValid}
                    validate={() => {
                        if (readyTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.readyTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.readyMessageLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.readyMessagePlaceholder}
                    value={readyMessage}
                    setValue={setReadyMessage}
                    setValid={setReadyMessageValid}
                    validate={() => {
                        if (readyMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.readyMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.finishedSubjectLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.finishedSubjectPlaceholder}
                    value={finishedSubject}
                    setValue={setFinishedSubject}
                    setValid={setFinishedSubjectValid}
                    validate={() => {
                        if (finishedSubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.finishedSubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.finishedTitleLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.finishedTitlePlaceholder}
                    value={finishedTitle}
                    setValue={setFinishedTitle}
                    setValid={setFinishedTitleValid}
                    validate={() => {
                        if (finishedTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.finishedTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.finishedMessageLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.finishedMessagePlaceholder}
                    value={finishedMessage}
                    setValue={setFinishedMessage}
                    setValid={setFinishedMessageValid}
                    validate={() => {
                        if (finishedMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.finishedMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.cancelledSubjectLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.cancelledSubjectPlaceholder}
                    value={cancelledSubject}
                    setValue={setCancelledSubject}
                    setValid={setCancelledSubjectValid}
                    validate={() => {
                        if (cancelledSubject.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.cancelledSubjectRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.cancelledTitleLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.cancelledTitlePlaceholder}
                    value={cancelledTitle}
                    setValue={setCancelledTitle}
                    setValid={setCancelledTitleValid}
                    validate={() => {
                        if (cancelledTitle.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.cancelledTitleRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.cancelledMessageLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.cancelledMessagePlaceholder}
                    value={cancelledMessage}
                    setValue={setCancelledMessage}
                    setValid={setCancelledMessageValid}
                    validate={() => {
                        if (cancelledMessage.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.cancelledMessageRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.linkLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.linkPlaceholder}
                    value={link}
                    setValue={setLink}
                    setValid={setLinkValid}
                    validate={() => {
                        if (link.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.linkRequired
                            };
                        }
                        return {valid: true};
                    }}
                />

                <WiwaFormInputString
                    label={adminResourceState?.resource?.mailFormat.orderStatus.attachmentLabel}
                    placeholder={adminResourceState?.resource?.mailFormat.orderStatus.attachmentPlaceholder}
                    value={attachment}
                    setValue={setAttachment}
                    setValid={setAttachmentValid}
                    validate={() => {
                        if (attachment.trim().length === 0) {
                            return {
                                valid: false,
                                message: adminResourceState?.resource?.mailFormat.orderStatus.attachmentRequired
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

export default OrderStatusMailEditor;
