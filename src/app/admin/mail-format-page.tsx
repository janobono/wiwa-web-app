import { useResourceState } from '../../state/resource';
import { useState } from 'react';
import SignUpMailEditor from '../../component/app/admin/sign-up-mail-editor.tsx';
import ResetPasswordMailEditor from '../../component/app/admin/reset-password-mail-editor.tsx';
import OrderCommentMailEditor from '../../component/app/admin/order-comment-mail-editor.tsx';
import OrderSendMailEditor from '../../component/app/admin/order-send-mail-editor.tsx';
import OrderStatusMailEditor from '../../component/app/admin/order-status-mail-editor.tsx';

const MailFormatPage = () => {
    const resourceState = useResourceState();

    const [index, setIndex] = useState(0);

    return (
        <div className="flex flex-col p-5 gap-5 w-full">
            <select
                defaultValue="0"
                className="select select-bordered w-full"
                onChange={event => setIndex(Number(event.target.value))}
            >
                <option disabled value="0">{resourceState?.admin?.mailFormat.option.select}</option>
                <option value="1">{resourceState?.admin?.mailFormat.option.signUpMail}</option>
                <option value="2">{resourceState?.admin?.mailFormat.option.resetPasswordMail}</option>
                <option value="3">{resourceState?.admin?.mailFormat.option.orderCommentMail}</option>
                <option value="4">{resourceState?.admin?.mailFormat.option.orderSendMail}</option>
                <option value="5">{resourceState?.admin?.mailFormat.option.orderStatusMail}</option>
            </select>

            <div>
                {index == 1 && <SignUpMailEditor/>}
                {index == 2 && <ResetPasswordMailEditor/>}
                {index == 3 && <OrderCommentMailEditor/>}
                {index == 4 && <OrderSendMailEditor/>}
                {index == 5 && <OrderStatusMailEditor/>}
            </div>
        </div>
    )
}

export default MailFormatPage;
