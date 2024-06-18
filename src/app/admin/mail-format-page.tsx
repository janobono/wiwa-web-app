import { useState } from 'react';

import SignUpMailEditor from '../../component/app/admin/sign-up-mail-editor';
import ResetPasswordMailEditor from '../../component/app/admin/reset-password-mail-editor';
import OrderCommentMailEditor from '../../component/app/admin/order-comment-mail-editor';
import OrderSendMailEditor from '../../component/app/admin/order-send-mail-editor';
import OrderStatusMailEditor from '../../component/app/admin/order-status-mail-editor';
import WiwaSelect from '../../component/ui/wiwa-select';
import { useResourceState } from '../../state/resource';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb.tsx';

const MailFormatPage = () => {
    const resourceState = useResourceState();

    const [index, setIndex] = useState(0);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.adminNav.mailFormat || '',
                    to: '/admin/mail-format'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <WiwaSelect
                    defaultValue="0"
                    onChange={event => setIndex(Number(event.currentTarget.value))}
                >
                    <option disabled value="0">{resourceState?.admin?.mailFormat.option.select}</option>
                    <option value="1">{resourceState?.admin?.mailFormat.option.signUpMail}</option>
                    <option value="2">{resourceState?.admin?.mailFormat.option.resetPasswordMail}</option>
                    <option value="3">{resourceState?.admin?.mailFormat.option.orderCommentMail}</option>
                    <option value="4">{resourceState?.admin?.mailFormat.option.orderSendMail}</option>
                    <option value="5">{resourceState?.admin?.mailFormat.option.orderStatusMail}</option>
                </WiwaSelect>

                <div>
                    {index == 1 && <SignUpMailEditor/>}
                    {index == 2 && <ResetPasswordMailEditor/>}
                    {index == 3 && <OrderCommentMailEditor/>}
                    {index == 4 && <OrderSendMailEditor/>}
                    {index == 5 && <OrderStatusMailEditor/>}
                </div>
            </div>
        </>
    )
}

export default MailFormatPage;
