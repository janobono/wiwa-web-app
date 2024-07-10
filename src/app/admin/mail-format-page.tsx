import { useContext, useState } from 'react';

import SignUpMailEditor from '../../component/app/admin/mail-format/sign-up-mail-editor';
import ResetPasswordMailEditor from '../../component/app/admin/mail-format/reset-password-mail-editor';
import OrderCommentMailEditor from '../../component/app/admin/mail-format/order-comment-mail-editor';
import OrderSendMailEditor from '../../component/app/admin/mail-format/order-send-mail-editor';
import OrderStatusMailEditor from '../../component/app/admin/mail-format/order-status-mail-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaSelect from '../../component/ui/wiwa-select';
import { AdminResourceContext, CommonResourceContext } from '../../context';

const MailFormatPage = () => {
    const adminResourceState = useContext(AdminResourceContext);
    const commonResourceState = useContext(CommonResourceContext);

    const [index, setIndex] = useState(0);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: commonResourceState?.resource?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.adminNav.mailFormat || '',
                    to: '/admin/mail-format'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <WiwaSelect
                    defaultValue="0"
                    onChange={event => setIndex(Number(event.currentTarget.value))}
                >
                    <option disabled value="0">{adminResourceState?.resource?.mailFormat.option.select}</option>
                    <option value="1">{adminResourceState?.resource?.mailFormat.option.signUpMail}</option>
                    <option value="2">{adminResourceState?.resource?.mailFormat.option.resetPasswordMail}</option>
                    <option value="3">{adminResourceState?.resource?.mailFormat.option.orderCommentMail}</option>
                    <option value="4">{adminResourceState?.resource?.mailFormat.option.orderSendMail}</option>
                    <option value="5">{adminResourceState?.resource?.mailFormat.option.orderStatusMail}</option>
                </WiwaSelect>

                {index == 1 && <SignUpMailEditor/>}
                {index == 2 && <ResetPasswordMailEditor/>}
                {index == 3 && <OrderCommentMailEditor/>}
                {index == 4 && <OrderSendMailEditor/>}
                {index == 5 && <OrderStatusMailEditor/>}
            </div>
        </>
    )
}

export default MailFormatPage;
