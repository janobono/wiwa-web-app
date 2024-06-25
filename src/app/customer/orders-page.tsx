import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { useResourceState } from '../../state/resource';
import { Order, OrderField, OrderSearchCriteria, OrderStatus } from '../../api/model/order';
import OrderTable from '../../component/order/order-table';
import { useOrderState } from '../../state/order';
import WiwaPageable from '../../component/ui/wiwa-pageable.tsx';
import { useEffect, useState } from 'react';
import { getOrders } from '../../api/controller/order';
import { useAuthState } from '../../state/auth';
import { useErrorState } from '../../state/error';
import WiwaFormInputDate from '../../component/ui/wiwa-form-input-date.tsx';
import WiwaFormCheckBox from '../../component/ui/wiwa-form-check-box.tsx';
import OrderStatusValue from '../../component/order/order-status-value.tsx';

const OrdersPage = () => {
    const authState = useAuthState();
    const errorState = useErrorState();
    const orderState = useOrderState();
    const resourceState = useResourceState();

    const [statusNew, setStatusNew] = useState(false);
    const [statusSent, setStatusSent] = useState(false);
    const [statusInProduction, setStatusInProduction] = useState(false);
    const [statusReady, setStatusReady] = useState(false);
    const [statusFinished, setStatusFinished] = useState(false);
    const [statusCancelled, setStatusCancelled] = useState(false);

    const [createdFrom, setCreatedFrom] = useState<Date>();
    const [createdTo, setCreatedTo] = useState<Date>();

    const [busy, setBusy] = useState(false);
    const [criteria, setCriteria] = useState<OrderSearchCriteria>();
    const [page, setPage] = useState(0);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, [criteria]);

    useEffect(() => {
        setPrevious(orderState?.data !== undefined && !orderState.data.first);
        setNext(orderState?.data !== undefined && !orderState.data.last);

        const data = orderState?.data;
        const selected = orderState?.selected;
        if (data && selected) {
            const index = data.content.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                orderState?.setSelected(data.content[index]);
            }
        } else {
            orderState?.setSelected(undefined);
        }
    }, [orderState, orderState?.data, orderState?.selected]);

    const fetchData = async () => {
        setBusy(true);
        try {
            const response = await getOrders(criteria, {page, size: 10}, authState?.authToken?.accessToken);
            orderState?.setData(response.data);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setSelected = (order?: Order) => {
        orderState?.setSelected(order)
    }

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
                <div className="flex flex-col w-full items-center justify-center gap-5">
                    <div className="flex flex-col w-2/3">
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <WiwaFormCheckBox
                                className="flex flex-row gap-2 items-center"
                                value={statusNew}
                                setValue={setStatusNew}>
                                <OrderStatusValue value={OrderStatus.NEW}/>
                            </WiwaFormCheckBox>
                            <WiwaFormCheckBox
                                className="flex flex-row gap-2 items-center"
                                value={statusSent}
                                setValue={setStatusSent}>
                                <OrderStatusValue value={OrderStatus.SENT}/>
                            </WiwaFormCheckBox>
                            <WiwaFormCheckBox
                                className="flex flex-row gap-2 items-center"
                                value={statusInProduction}
                                setValue={setStatusInProduction}>
                                <OrderStatusValue value={OrderStatus.IN_PRODUCTION}/>
                            </WiwaFormCheckBox>
                            <WiwaFormCheckBox
                                className="flex flex-row gap-2 items-center"
                                value={statusReady}
                                setValue={setStatusReady}>
                                <OrderStatusValue value={OrderStatus.READY}/>
                            </WiwaFormCheckBox>
                            <WiwaFormCheckBox
                                className="flex flex-row gap-2 items-center"
                                value={statusFinished}
                                setValue={setStatusFinished}>
                                <OrderStatusValue value={OrderStatus.FINISHED}/>
                            </WiwaFormCheckBox>
                            <WiwaFormCheckBox
                                className="flex flex-row gap-2 items-center"
                                value={statusCancelled}
                                setValue={setStatusCancelled}>
                                <OrderStatusValue value={OrderStatus.CANCELLED}/>
                            </WiwaFormCheckBox>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <WiwaFormInputDate
                                label={resourceState?.customer?.orderCriteria.createdFromLabel}
                                value={createdFrom}
                                setValue={setCreatedFrom}
                            />
                            <WiwaFormInputDate
                                label={resourceState?.customer?.orderCriteria.createdToLabel}
                                value={createdTo}
                                setValue={setCreatedTo}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <OrderTable
                        fields={[
                            OrderField.orderNumber,
                            OrderField.created,
                            OrderField.status,
                            OrderField.weight,
                            OrderField.total,
                            OrderField.vatTotal,
                            OrderField.deliveryDate,
                            OrderField.packageType
                        ]}
                        rows={orderState?.data?.content}
                        selected={orderState?.selected}
                        setSelected={setSelected}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <WiwaPageable
                        isPrevious={previous}
                        previousHandler={() => setPage(page + 1)}
                        page={page + 1}
                        pageHandler={() => fetchData()}
                        isNext={next}
                        nextHandler={() => setPage(page - 1)}
                        disabled={busy}
                    />
                </div>
            </div>
        </>
    )
}

export default OrdersPage;
