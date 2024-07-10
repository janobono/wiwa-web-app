import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight, Plus } from 'react-feather';

import { CustomerContext } from '../../component/app/customer/customer-provider';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import { AuthContext, CommonResourceContext } from '../../context';
import OrderUserValue from '../../component/order/order-user-value.tsx';
import WiwaValueDatetime from '../../component/ui/wiwa-value-datetime.tsx';
import OrderCommentDialog from '../../component/order/order-comment-dialog.tsx';

const CUSTOMER_ORDER_COMMENT_DIALOG_ID = 'customer-order-comment-dialog-001';

const OrderCommentsPage = () => {
    const navigate = useNavigate();

    const authState = useContext(AuthContext);
    const commonResourceState = useContext(CommonResourceContext);
    const customerState = useContext(CustomerContext);

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: commonResourceState?.resource?.navigation.customerNav.title || '',
                    to: '/customer'
                },
                {
                    key: 1,
                    label: commonResourceState?.resource?.navigation.customerNav.orderComments || '',
                    to: '/customer/order-comments'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">

                {!customerState?.orderFinal &&
                    <div className="flex flex-row gap-5 w-full">
                        <div className="join">
                            {customerState?.editEnabled &&
                                <WiwaButton
                                    className="btn-ghost join-item"
                                    title={commonResourceState?.resource?.navigation.customerNav.orderDetail}
                                    disabled={customerState?.busy}
                                    onClick={() => navigate('/customer/order-detail')}
                                ><ChevronsLeft size={18}/>
                                </WiwaButton>
                            }
                            <WiwaButton
                                className="btn-primary join-item"
                                title={commonResourceState?.resource?.action.add}
                                disabled={customerState?.busy || customerState?.orderFinal}
                                onClick={() => setShowDialog(true)}
                            ><Plus size={18}/>
                            </WiwaButton>
                            {customerState?.submitEnabled &&
                                <WiwaButton
                                    className="btn-ghost join-item"
                                    title={commonResourceState?.resource?.navigation.customerNav.orderSubmit}
                                    disabled={customerState?.busy}
                                    onClick={() => navigate('/customer/order-submit')}
                                ><ChevronsRight size={18}/>
                                </WiwaButton>
                            }
                        </div>
                    </div>
                }

                {customerState?.selected?.comments?.map(comment =>
                    <div key={comment.id}>
                        {comment.creator.id === authState?.authUser?.user.id ?
                            <div className="chat chat-start">
                                <div className="chat-bubble chat-bubble-primary">
                                    <div className="text-xs"><WiwaValueDatetime value={comment.created}/></div>
                                    <div>
                                        {comment.comment}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="chat chat-end">
                                <div className="chat-bubble chat-bubble-success">
                                    <div className="text-xs"><OrderUserValue value={comment.creator}/></div>
                                    <div className="text-xs"><WiwaValueDatetime value={comment.created}/></div>
                                    <div>
                                        {comment.comment}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>

            <OrderCommentDialog
                dialogId={CUSTOMER_ORDER_COMMENT_DIALOG_ID}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                okHandler={(orderCommentChange) => {
                    customerState?.addComment(orderCommentChange);
                }}
            />
        </>
    )
}

export default OrderCommentsPage;
