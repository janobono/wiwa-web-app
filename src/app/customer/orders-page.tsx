import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, List, MessageSquare, Plus, Send, Trash } from 'react-feather';

import { OrderField } from '../../api/model/order';
import { CustomerContext } from '../../component/app/customer/customer-provider';
import CustomerOrderSearchCriteriaForm from '../../component/app/customer/customer-order-search-criteria-form';
import OrderTable from '../../component/order/order-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { CommonResourceContext, CustomerResourceContext, DialogContext } from '../../context';
import { DialogAnswer, DialogType } from '../../context/model/dialog';

const OrdersPage = () => {
    const navigate = useNavigate();
    const commonResourceState = useContext(CommonResourceContext);
    const customerResourceState = useContext(CustomerResourceContext);
    const customerState = useContext(CustomerContext);
    const dialogState = useContext(DialogContext);

    useEffect(() => {
        customerState?.getOrders().then();
    }, []);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: commonResourceState?.resource?.navigation.customerNav.title || '',
                    to: '/customer'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                <CustomerOrderSearchCriteriaForm
                    searchHandler={(criteria) => customerState?.setCriteria(criteria)}
                >
                    <WiwaButton
                        title={commonResourceState?.resource?.action.add}
                        className="btn-primary join-item"
                        disabled={customerState?.busy}
                        onClick={() => {
                            customerState?.addOrder().then(result => {
                                if (result) {
                                    navigate('/customer/order-edit');
                                }
                            });
                        }}
                    >
                        <Plus size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={commonResourceState?.resource?.action.edit}
                        className="btn-secondary join-item"
                        disabled={customerState?.busy || !customerState?.editEnabled}
                        onClick={() => {
                            navigate('/customer/order-edit');
                        }}
                    >
                        <Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={commonResourceState?.resource?.action.items}
                        className="btn-ghost join-item"
                        disabled={customerState?.busy || customerState?.selected === undefined}
                        onClick={() => {
                            navigate('/customer/order-detail');
                        }}
                    >
                        <List size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={customerResourceState?.resource?.orders.comments.title}
                        className="btn-ghost join-item"
                        disabled={customerState?.busy || customerState?.selected === undefined}
                        onClick={() => {
                            navigate('/customer/order-comments');
                        }}
                    >
                        <MessageSquare size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={commonResourceState?.resource?.action.submit}
                        className="btn-primary join-item"
                        disabled={customerState?.busy || !customerState?.submitEnabled}
                        onClick={() => {
                            navigate('/customer/order-submit');
                        }}
                    >
                        <Send size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-accent join-item"
                        title={commonResourceState?.resource?.action.delete}
                        disabled={customerState?.busy || !customerState?.editEnabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: customerResourceState?.resource?.orders.deleteOrder.title,
                                message: customerResourceState?.resource?.orders.deleteOrder.message,
                                callback: (answer: DialogAnswer) => {
                                    if (answer === DialogAnswer.YES) {
                                        customerState?.deleteOrder().then();
                                    }
                                }
                            });
                        }}
                    ><Trash size={18}/>
                    </WiwaButton>
                </CustomerOrderSearchCriteriaForm>

                <div className="overflow-x-auto">
                    <OrderTable
                        fields={[
                            OrderField.orderNumber,
                            OrderField.created,
                            OrderField.status,
                            OrderField.total,
                            OrderField.vatTotal
                        ]}
                        rows={customerState?.data}
                        selected={customerState?.selected}
                        setSelected={(order) => customerState?.setSelected(order)}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <WiwaPageable
                        isPrevious={customerState?.previous || false}
                        previousHandler={() => customerState?.setPage(customerState.page - 1)}
                        page={(customerState?.page || 0) + 1}
                        pageHandler={() => customerState?.getOrders()}
                        isNext={customerState?.next || false}
                        nextHandler={() => customerState?.setPage(customerState.page + 1)}
                        disabled={customerState?.busy}
                    />
                </div>
            </div>
        </>
    )
}

export default OrdersPage;
