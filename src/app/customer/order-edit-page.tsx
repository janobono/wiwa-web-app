import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, ChevronsRight, Edit, Plus, Trash } from 'react-feather';

import { CustomerContext } from '../../component/app/customer/customer-provider';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaButton from '../../component/ui/wiwa-button';
import { DialogContext, ResourceContext } from '../../context';
import OrderItemTable from '../../component/order/order-item-table.tsx';
import { OrderItemField } from '../../api/model/order';
import { DialogAnswer, DialogType } from '../../context/model/dialog';

const OrderEditPage = () => {
    const navigate = useNavigate();

    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);
    const customerState = useContext(CustomerContext);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: resourceState?.common?.navigation.customerNav.title || '',
                    to: '/customer'
                },
                {
                    key: 1,
                    label: resourceState?.common?.navigation.customerNav.orderEdit || '',
                    to: '/customer/order-edit'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">
                {customerState?.editEnabled &&
                    <div className="flex flex-row gap-5 w-full">
                        <div className="join">
                            <WiwaButton
                                title={resourceState?.common?.action.add}
                                className="btn-primary join-item"
                                disabled={customerState?.busy}
                                onClick={() => {
                                    customerState?.setEditItemMode(false);
                                    navigate('/customer/order-item-edit');
                                }}
                            >
                                <Plus size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                title={resourceState?.common?.action.edit}
                                className="btn-secondary join-item"
                                disabled={customerState?.busy || customerState?.selectedItem === undefined}
                                onClick={() => {
                                    customerState?.setEditItemMode(true);
                                    navigate('/customer/order-item-edit');
                                }}
                            >
                                <Edit size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                title={resourceState?.common?.action.moveUp}
                                className="btn-ghost join-item"
                                disabled={customerState?.busy || customerState?.selectedItem === undefined}
                                onClick={() => {
                                    customerState?.moveUpItem().then();
                                }}
                            >
                                <ArrowUp size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                title={resourceState?.common?.action.moveDown}
                                className="btn-ghost join-item"
                                disabled={customerState?.busy || customerState?.selectedItem === undefined}
                                onClick={() => {
                                    customerState?.moveDownItem().then();
                                }}
                            >
                                <ArrowDown size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="btn-accent join-item"
                                title={resourceState?.common?.action.delete}
                                disabled={customerState?.busy || customerState?.selectedItem === undefined}
                                onClick={() => {
                                    dialogState?.showDialog({
                                        type: DialogType.YES_NO,
                                        title: resourceState?.customer?.orders.deleteOrderItem.title,
                                        message: resourceState?.customer?.orders.deleteOrderItem.message,
                                        callback: (answer: DialogAnswer) => {
                                            if (answer === DialogAnswer.YES) {
                                                customerState?.deleteItem();
                                            }
                                        }
                                    });
                                }}
                            ><Trash size={18}/>
                            </WiwaButton>

                            <WiwaButton
                                className="join-item"
                                title={resourceState?.common?.navigation.customerNav.orderDetail}
                                disabled={customerState?.busy}
                                onClick={() => navigate('/customer/order-detail')}
                            ><ChevronsRight size={18}/>
                            </WiwaButton>
                        </div>
                    </div>
                }

                <div className="overflow-x-auto">
                    <OrderItemTable
                        fields={[OrderItemField.sortNum, OrderItemField.name, OrderItemField.description, OrderItemField.orientation, OrderItemField.quantity]}
                        rows={customerState?.selected?.items}
                        selected={customerState?.selectedItem}
                        setSelected={(orderItem) => customerState?.setSelectedItem(orderItem)}
                    />
                </div>
            </div>
        </>
    )
}

export default OrderEditPage;
