import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, List, MessageSquare, Plus, Send, Trash } from 'react-feather';

import { CustomerContext } from './customer-page';
import { OrderField } from '../../api/model/order';
import CustomerOrderSearchCriteriaForm from '../../component/order/customer-order-search-criteria-form';
import OrderTable from '../../component/order/order-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { DialogContext, ResourceContext } from '../../context';
import { DialogAnswer, DialogType } from '../../context/model/dialog';

const OrdersPage = () => {
    const navigate = useNavigate();
    const resourceState = useContext(ResourceContext);
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
                    label: resourceState?.common?.navigation.customerNav.title || '',
                    to: '/customer'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <CustomerOrderSearchCriteriaForm
                    searchHandler={(criteria) => customerState?.setCriteria(criteria)}
                >
                    <WiwaButton
                        title={resourceState?.common?.action.add}
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
                        title={resourceState?.common?.action.edit}
                        className="btn-secondary join-item"
                        disabled={customerState?.busy || !customerState?.editEnabled}
                        onClick={() => {
                            navigate('/customer/order-edit');
                        }}
                    >
                        <Edit size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={resourceState?.common?.action.items}
                        className="btn-ghost join-item"
                        disabled={customerState?.busy || customerState?.selected === undefined}
                        onClick={() => {
                            navigate('/customer/order-detail');
                        }}
                    >
                        <List size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={resourceState?.customer?.orders.comments.title}
                        className="btn-ghost join-item"
                        disabled={customerState?.busy || customerState?.selected === undefined}
                        onClick={() => {
                            navigate('/customer/order-comments');
                        }}
                    >
                        <MessageSquare size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        title={resourceState?.common?.action.submit}
                        className="btn-primary join-item"
                        disabled={customerState?.busy || !customerState?.editEnabled}
                        onClick={() => {
                            navigate('/customer/order-submit');
                        }}
                    >
                        <Send size={18}/>
                    </WiwaButton>
                    <WiwaButton
                        className="btn-accent join-item"
                        title={resourceState?.common?.action.delete}
                        disabled={customerState?.busy || !customerState?.editEnabled}
                        onClick={() => {
                            dialogState?.showDialog({
                                type: DialogType.YES_NO,
                                title: resourceState?.customer?.orders.deleteOrder.title,
                                message: resourceState?.customer?.orders.deleteOrder.message,
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
