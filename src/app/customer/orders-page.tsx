import { useEffect, useState } from 'react';

import { getOrders } from '../../api/controller/order';
import { Order, OrderField, OrderSearchCriteria } from '../../api/model/order';
import OrderTable from '../../component/order/order-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { useAuthState } from '../../state/auth';
import { useErrorState } from '../../state/error';
import { useOrderState } from '../../state/order';
import { useResourceState } from '../../state/resource';
import CustomerOrderSearchCriteriaForm from '../../component/order/customer-order-search-criteria-form.tsx';

const OrdersPage = () => {
    const authState = useAuthState();
    const errorState = useErrorState();
    const orderState = useOrderState();
    const resourceState = useResourceState();

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
                <CustomerOrderSearchCriteriaForm
                    searchHandler={(criteria) => {
                }}/>

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
